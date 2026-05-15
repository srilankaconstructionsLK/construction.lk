export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      business_profiles: {
        Row: {
          br_number: string | null
          business_profile_card_url: string | null
          category_info: Json | null
          cida_grading: string | null
          cida_specialties: string[] | null
          city: string | null
          company_profile_pdf_url: string | null
          contact_info: Json | null
          created_at: string
          created_by_id: string | null
          description: string | null
          district: string | null
          id: string
          insurance_details: string | null
          is_vat_registered: boolean | null
          location_info: Json | null
          pending_owner_id: string | null
          pending_updates: Json | null
          products: Json | null
          profile_images_info: Json | null
          project_portfolio: Json | null
          published: boolean | null
          rating: number | null
          review_count: number | null
          schedule: Json | null
          service_districts: string[] | null
          social_links: Json | null
          status: string | null
          subscription_expiry: string | null
          subscription_payment_id: string | null
          subscription_plan: string | null
          subscription_status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string
          verified: boolean | null
          videos: Json | null
          visit_count: number | null
          year_established: number | null
        }
        Insert: {
          br_number?: string | null
          business_profile_card_url?: string | null
          category_info?: Json | null
          cida_grading?: string | null
          cida_specialties?: string[] | null
          city?: string | null
          company_profile_pdf_url?: string | null
          contact_info?: Json | null
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          district?: string | null
          id?: string
          insurance_details?: string | null
          is_vat_registered?: boolean | null
          location_info?: Json | null
          pending_owner_id?: string | null
          pending_updates?: Json | null
          products?: Json | null
          profile_images_info?: Json | null
          project_portfolio?: Json | null
          published?: boolean | null
          rating?: number | null
          review_count?: number | null
          schedule?: Json | null
          service_districts?: string[] | null
          social_links?: Json | null
          status?: string | null
          subscription_expiry?: string | null
          subscription_payment_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean | null
          videos?: Json | null
          visit_count?: number | null
          year_established?: number | null
        }
        Update: {
          br_number?: string | null
          business_profile_card_url?: string | null
          category_info?: Json | null
          cida_grading?: string | null
          cida_specialties?: string[] | null
          city?: string | null
          company_profile_pdf_url?: string | null
          contact_info?: Json | null
          created_at?: string
          created_by_id?: string | null
          description?: string | null
          district?: string | null
          id?: string
          insurance_details?: string | null
          is_vat_registered?: boolean | null
          location_info?: Json | null
          pending_owner_id?: string | null
          pending_updates?: Json | null
          products?: Json | null
          profile_images_info?: Json | null
          project_portfolio?: Json | null
          published?: boolean | null
          rating?: number | null
          review_count?: number | null
          schedule?: Json | null
          service_districts?: string[] | null
          social_links?: Json | null
          status?: string | null
          subscription_expiry?: string | null
          subscription_payment_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean | null
          videos?: Json | null
          visit_count?: number | null
          year_established?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "business_profiles_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_profiles_pending_owner_id_fkey"
            columns: ["pending_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_services: {
        Row: {
          business_id: string
          created_at: string
          currency: string | null
          description: string | null
          id: string
          images: Json | null
          is_featured: boolean | null
          price_amount: number | null
          price_max: number | null
          price_type: string | null
          price_unit: string | null
          slug: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          business_id: string
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          price_amount?: number | null
          price_max?: number | null
          price_type?: string | null
          price_unit?: string | null
          slug?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          business_id?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          price_amount?: number | null
          price_max?: number | null
          price_type?: string | null
          price_unit?: string | null
          slug?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "business_services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          created_at: string
          district_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          district_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          district_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          gender: string | null
          have_business_profile: boolean | null
          id: string
          name: string | null
          phone: string | null
          profile_picture_url: string | null
          role: string | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          have_business_profile?: boolean | null
          id: string
          name?: string | null
          phone?: string | null
          profile_picture_url?: string | null
          role?: string | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          have_business_profile?: boolean | null
          id?: string
          name?: string | null
          phone?: string | null
          profile_picture_url?: string | null
          role?: string | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_firebase_uid: { Args: never; Returns: string }
      get_my_role: { Args: never; Returns: string }
      get_profile_role: { Args: { profile_id: string }; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      is_agent: { Args: never; Returns: boolean }
      is_authenticated: { Args: never; Returns: boolean }
      is_business_owner: { Args: never; Returns: boolean }
      is_customer: { Args: never; Returns: boolean }
      is_moderator: { Args: never; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
