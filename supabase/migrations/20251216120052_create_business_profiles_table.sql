-- Create table
CREATE TABLE business_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_by_id text REFERENCES profiles(id), -- Tracks original creator (Agent) for commission
  pending_owner_id text REFERENCES profiles(id), -- For ownership transfer
  title text,
  description text,
  status text DEFAULT 'pending', -- active, pending, deactivated, etc.
  tags text[],
  contact_info jsonb, -- Stores address, email, phone, whatsapp, etc.
  profile_images_info jsonb, -- Stores slider, gallery, and product images
  products jsonb DEFAULT '[]'::jsonb, -- Dedicated products column
  published boolean DEFAULT false,
  schedule jsonb, -- Stores array of day/time objects
  social_links jsonb, -- Stores social media links (facebook, instagram, etc.)
  videos jsonb DEFAULT '[]'::jsonb, -- Dedicated videos column
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  category_info jsonb, -- Stores primary category and subcategories
  visit_count integer DEFAULT 0,
  verified boolean DEFAULT false,
  location_info jsonb, -- Stores lat/lng, landmark, address components
  company_profile_pdf_url text,
  business_profile_card_url text, -- Stores downloadable business card URL (PDF/Image)
  pending_updates jsonb, -- Stores proposed changes for admin approval
  city text,
  district text, -- Colombo, Kandy, Gampaha, etc.
  subscription_plan text, -- 'free', 'starter', 'pro', 'enterprise'
  subscription_status text DEFAULT 'pending', -- 'active', 'pending', 'expired', 'cancelled'
  subscription_expiry timestamp WITH time zone,
  subscription_payment_id text, -- ID of the latest successful payment record from payments collection
  
  -- Construction Specific Fields
  br_number text,
  cida_grading text, -- e.g., 'C1', 'C2', 'C3', 'C4'
  cida_specialties text[], -- e.g., ['Building Construction', 'Water Supply']
  year_established integer,
  service_districts text[], -- Array of districts covered
  is_vat_registered boolean DEFAULT false,
  project_portfolio jsonb DEFAULT '[]'::jsonb, -- Array of {project_name, year, description, images}
  insurance_details text, -- For liability/worker insurance info

  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Policies

-- Select: Public businesses are viewable by everyone
CREATE POLICY "Public businesses are viewable by everyone" 
ON business_profiles FOR SELECT 
USING ( TRUE );

-- Insert: Users can insert their own business profile
CREATE POLICY "Users can create business profiles" 
ON business_profiles FOR INSERT 
WITH CHECK ( (auth.jwt() ->> 'sub') = user_id );

-- Update: Users can update their own business profile
CREATE POLICY "Users can update own business profile" 
ON business_profiles FOR UPDATE 
USING ( (auth.jwt() ->> 'sub') = user_id );

-- Delete: Users can delete their own business profile
CREATE POLICY "Users can delete own business profile" 
ON business_profiles FOR DELETE 
USING ( (auth.jwt() ->> 'sub') = user_id );

-- Admin Policies
-- Admins can view all business profiles (including unpublished)
CREATE POLICY "Admins can view all business profiles" 
ON business_profiles FOR SELECT 
USING ( is_admin() );

-- Admins can update any business profile
CREATE POLICY "Admins can update any business profile" 
ON business_profiles FOR UPDATE 
USING ( is_admin() );

-- Admins can delete any business profile
CREATE POLICY "Admins can delete any business profile" 
ON business_profiles FOR DELETE 
USING ( is_super_admin() );

-- Allow pending owner to accept ownership
CREATE POLICY "Pending owners can accept transfer" 
ON business_profiles FOR UPDATE 
USING ( (auth.jwt() ->> 'sub') = pending_owner_id );

-- Performance: Indexes for common lookups
CREATE INDEX idx_business_profiles_user_id ON business_profiles(user_id);
CREATE INDEX idx_business_profiles_created_by_id ON business_profiles(created_by_id);
CREATE INDEX idx_business_profiles_title ON business_profiles(title);
CREATE INDEX idx_business_profiles_br_number ON business_profiles(br_number);
CREATE INDEX idx_business_profiles_cida_grading ON business_profiles(cida_grading);
CREATE INDEX idx_business_profiles_district ON business_profiles(district);
CREATE INDEX idx_business_profiles_city ON business_profiles(city);

-- Trigger for business_profiles updated_at
CREATE TRIGGER handle_business_profiles_updated_at
  BEFORE UPDATE ON public.business_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
