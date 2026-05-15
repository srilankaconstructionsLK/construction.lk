import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];
type UserProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
type UserProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

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

    if (error) {
      console.error("[UserService] Error getting profile:", error);
      throw error;
    }
    
    return data as UserProfile;
  }

  /**
   * Create a new user profile
   */
  static async createProfile(profile: UserProfileInsert) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  }

  /**
   * Update an existing profile
   */
  static async updateProfile(id: string, updates: UserProfileUpdate) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  }

  /**
   * Get all users with pagination and search
   */
  static async getUsersPaginated(page: number, limit: number, search?: string) {
    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      console.error("[UserService] Error getting paginated users:", error);
      throw error;
    }
    
    return { data: data as UserProfile[], count };
  }

  /**
   * Get users by role
   */
  static async getUsersByRole(role: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role);

    if (error) {
      console.error("[UserService] Error getting users by role:", error);
      throw error;
    }

    return (data || []) as UserProfile[];
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    return data as UserProfile;
  }
}
