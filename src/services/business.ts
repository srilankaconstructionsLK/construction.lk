import { SupabaseClient } from "@supabase/supabase-js";

export interface BusinessService {
  id: string;
  business_id: string;
  title: string;
  slug: string;
  description: string;
  price_type: 'fixed' | 'range' | 'starting_at' | 'negotiable';
  price_amount: number;
  price_max: number;
  price_unit: string;
  currency: string;
  images: string[];
  tags: string[];
  status: 'active' | 'inactive' | 'draft';
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface BusinessProfile {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'deactivated' | 'suspended';
  tags: string[];
  contact_info: any;
  profile_images_info: any;
  products: any[];
  published: boolean;
  schedule: any;
  social_links: any;
  videos: any[];
  rating: number;
  review_count: number;
  category_info: any;
  visit_count: number;
  verified: boolean;
  location_info: any;
  company_profile_pdf_url: string;
  business_profile_card_url: string;
  city: string;
  district: string;
  subscription_plan: 'free' | 'starter' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'pending' | 'expired' | 'cancelled';
  subscription_expiry: string;
  br_number: string;
  cida_grading: string;
  cida_specialties: string[];
  year_established: number;
  service_districts: string[];
  is_vat_registered: boolean;
  project_portfolio: any[];
  insurance_details: string;
  created_at: string;
  updated_at: string;
  business_services?: BusinessService[];
}

/**
 * Get business profile by ID with its services
 */
export async function getBusinessById(supabase: SupabaseClient, id: string): Promise<BusinessProfile | null> {
  const { data, error } = await supabase
    .from('business_profiles')
    .select('*, business_services(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error("[BusinessService] Error getting business by ID:", error);
    return null;
  }

  return data as BusinessProfile;
}

/**
 * Get businesses by user ID
 */
export async function getBusinessesByUserId(supabase: SupabaseClient, userId: string): Promise<BusinessProfile[]> {
  const { data, error } = await supabase
    .from('business_profiles')
    .select('*, business_services(*)')
    .eq('user_id', userId);

  if (error) {
    console.error("[BusinessService] Error getting businesses by user ID:", error);
    return [];
  }

  return data || [];
}

/**
 * Update business profile
 */
export async function updateBusinessProfile(supabase: SupabaseClient, id: string, updates: Partial<BusinessProfile>) {
  const { data, error } = await supabase
    .from('business_profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error("[BusinessService] Error updating business profile:", error);
    throw error;
  }

  return data as BusinessProfile;
}
