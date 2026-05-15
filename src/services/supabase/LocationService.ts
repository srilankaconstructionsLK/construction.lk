// src/services/supabase/LocationService.ts
import { supabase } from "@/lib/supabase/client";

export type District = {
  id?: string;
  name: string;
  cities: string[];
};

export class LocationService {
  /**
   * Fetches the entire location hierarchy from Supabase.
   * Maps normalized tables back to the District[] structure used by the UI.
   */
  static async getLocationsHierarchy(): Promise<District[]> {
    console.log("[LocationService] Fetching hierarchy...");
    const { data, error } = await supabase
      .from("districts")
      .select(`
        id,
        name,
        cities (
          name
        )
      `)
      .order("name");

    if (error) {
      console.error("Error fetching locations hierarchy:", error);
      throw error;
    }

    return (data || []).map((d: any) => ({
      id: d.id,
      name: d.name,
      cities: d.cities.map((c: any) => c.name).sort(),
    }));
  }

  /**
   * Reconciles the local District[] state with the database.
   * Only syncs districts that were actually changed (dirtyDistrictNames).
   * This is called when the admin clicks "Publish Changes".
   */
  static async updateLocationsAggregation(
    districts: District[],
    dirtyDistrictNames: Set<string>
  ) {
    // 1. Fetch current DB state
    const { data: currentDistricts } = await supabase.from("districts").select("id, name");
    const currentDistrictsMap = new Map(currentDistricts?.map(d => [d.name, d.id]));

    const processedNames = new Set<string>();

    for (const district of districts) {
      processedNames.add(district.name);
      let districtId = currentDistrictsMap.get(district.name);

      // If district doesn't exist in DB, create it (always dirty)
      if (!districtId) {
        const { data: newDistrict, error: dError } = await supabase
          .from("districts")
          .insert({ name: district.name })
          .select()
          .single();
        if (dError) throw dError;
        districtId = newDistrict.id;
        dirtyDistrictNames.add(district.name);
      }

      // Skip city sync for untouched districts
      if (!dirtyDistrictNames.has(district.name)) continue;

      // Clean-slate sync for this dirty district's cities only
      const { error: deleteError } = await supabase
        .from("cities")
        .delete()
        .eq("district_id", districtId);
      if (deleteError) throw deleteError;

      if (district.cities.length > 0) {
        const { error: insertError } = await supabase
          .from("cities")
          .insert(district.cities.map(cityName => ({
            district_id: districtId,
            name: cityName,
          })));
        if (insertError) throw insertError;
      }
    }

    // 2. Batch delete all districts removed in the UI (single query = single event)
    const idsToDelete: string[] = [];
    for (const [name, id] of Array.from(currentDistrictsMap.entries())) {
      if (!processedNames.has(name)) {
        idsToDelete.push(id);
      }
    }
    if (idsToDelete.length > 0) {
      const { error } = await supabase
        .from("districts")
        .delete()
        .in("id", idsToDelete);
      if (error) throw error;
    }
  }

  /**
   * Legacy wrapper for real-time (not strictly needed for cities but kept for compatibility)
   */
  static listenToLocationsAggregation(callback: (districts: District[]) => void) {
    // Initial fetch
    this.getLocationsHierarchy().then(callback);
    
    let debounceTimer: NodeJS.Timeout | null = null;

    const refreshData = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.getLocationsHierarchy().then(callback);
      }, 300); // Wait 300ms for changes to settle
    };

    // Set up a real-time listener on both tables
    const channel = supabase
      .channel('location-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'districts' }, refreshData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cities' }, refreshData)
      .subscribe();

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }
}
