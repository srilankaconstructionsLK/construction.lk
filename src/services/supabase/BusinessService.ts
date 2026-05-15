import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export type BusinessServiceItem = Database["public"]["Tables"]["business_services"]["Row"];
type BusinessProfileRow = Database["public"]["Tables"]["business_profiles"]["Row"];
type BusinessProfileUpdate = Database["public"]["Tables"]["business_profiles"]["Update"];
interface ListBusinessesOptions {
  offset?: number;
  limit?: number;
  createdById?: string;
  status?: string;
  actionRequired?: boolean;
}

export interface BusinessProfile extends BusinessProfileRow {
  business_services?: BusinessServiceItem[];
}

export class BusinessService {
  static async listBusinesses(
    supabase: SupabaseClient<Database>,
    options: ListBusinessesOptions = {},
  ): Promise<{ data: BusinessProfile[]; count: number }> {
    const {
      offset = 0,
      limit = 10,
      createdById,
      status,
      actionRequired = false,
    } = options;

    let query = supabase
      .from("business_profiles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (createdById) {
      query = query.eq("created_by_id", createdById);
    }
    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (actionRequired) {
      query = query.in("subscription_status", ["pending_payment", "expired"]);
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) {
      console.error("[BusinessService] Error listing businesses:", error);
      throw error;
    }

    return { data: (data || []) as BusinessProfile[], count: count || 0 };
  }

  /**
   * Get business profile by ID with its services
   */
  static async getBusinessById(
    supabase: SupabaseClient<Database>,
    id: string,
  ): Promise<BusinessProfile | null> {
    // Simple UUID validation to prevent console errors when using numeric mock IDs
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return null;
    }

    const { data, error } = await supabase
      .from("business_profiles")
      .select("*, business_services(*)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[BusinessService] Error getting business by ID:", error);
      return null;
    }

    return data as unknown as BusinessProfile;
  }

  /**
   * Get businesses by user ID
   */
  static async getBusinessesByUserId(
    supabase: SupabaseClient<Database>,
    userId: string,
  ): Promise<BusinessProfile[]> {
    const { data, error } = await supabase
      .from("business_profiles")
      .select("*, business_services(*)")
      .eq("user_id", userId);

    if (error) {
      console.error("[BusinessService] Error getting businesses by user ID:", error);
      return [];
    }

    return (data || []) as unknown as BusinessProfile[];
  }

  /**
   * Update business profile
   */
  static async updateBusinessProfile(
    supabase: SupabaseClient<Database>,
    id: string,
    updates: BusinessProfileUpdate,
  ) {
    const { data, error } = await supabase
      .from("business_profiles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[BusinessService] Error updating business profile:", error);
      throw error;
    }

    return data as unknown as BusinessProfile;
  }

  static async deleteBusinessProfile(
    supabase: SupabaseClient<Database>,
    id: string,
  ): Promise<void> {
    const { error } = await supabase.from("business_profiles").delete().eq("id", id);
    if (error) {
      console.error("[BusinessService] Error deleting business profile:", error);
      throw error;
    }
  }
}
