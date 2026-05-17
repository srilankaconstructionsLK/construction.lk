import { cache } from "react";
import { supabase } from "@/lib/supabase/client";
import { createStaticClient } from "@/lib/supabase/static";

export type District = {
  id?: string;
  name: string;
  cities: string[];
};

interface DistrictQueryRow {
  id: string;
  name: string;
  cities: {
    name: string;
  }[];
}

export class LocationService {
  /**
   * Fetches the entire location hierarchy from Supabase.
   * Maps normalized tables back to the District[] structure used by the UI.
   * ✅ Wrapped in React cache() with zero arguments for a 100% stable cache key.
   * ✅ Instantiates createStaticClient() internally to ensure clean server-side queries.
   */
  static getLocationsHierarchy = cache(async (): Promise<District[]> => {
    const supabase = createStaticClient();
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

    const rows = (data || []) as unknown as DistrictQueryRow[];

    return rows.map((d) => ({
      id: d.id,
      name: d.name,
      cities: d.cities.map((c) => c.name).sort(),
    }));
  });

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
}
