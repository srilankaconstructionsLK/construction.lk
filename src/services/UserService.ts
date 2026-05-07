import { supabase } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  roles: string[];
  gender?: string;
  phone?: string;
  address?: string;
  profile_picture_url?: string;
  city?: string;
  verified?: boolean;
  created_at: string;
  updated_at: string;
}

export class UserService {
  /**
   * Get profile by ID
   */
  static async getProfileById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as UserProfile;
  }

  /**
   * Create a new user profile
   */
  static async createProfile(profile: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  }

  /**
   * Update an existing profile
   */
  static async updateProfile(id: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  }
}
