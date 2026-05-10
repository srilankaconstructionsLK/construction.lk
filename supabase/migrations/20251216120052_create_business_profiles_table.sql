-- ================================================
-- Migration 003: Business Profiles Table
-- ================================================

CREATE TABLE public.business_profiles (
  id                        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                   text REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_by_id             text REFERENCES public.profiles(id),
  pending_owner_id          text REFERENCES public.profiles(id),
  title                     text,
  description               text,
  status                    text DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'deactivated', 'suspended')),
  tags                      text[],
  contact_info              jsonb,
  profile_images_info       jsonb,
  products                  jsonb DEFAULT '[]'::jsonb,
  published                 boolean DEFAULT false,
  schedule                  jsonb,
  social_links              jsonb,
  videos                    jsonb DEFAULT '[]'::jsonb,
  rating                    numeric DEFAULT 0,
  review_count              integer DEFAULT 0,
  category_info             jsonb,
  visit_count               integer DEFAULT 0,
  verified                  boolean DEFAULT false,
  location_info             jsonb,
  company_profile_pdf_url   text,
  business_profile_card_url text,
  pending_updates           jsonb,
  city                      text,
  district                  text,
  subscription_plan         text DEFAULT 'free' CHECK (subscription_plan IN ('free', 'starter', 'pro', 'enterprise')),
  subscription_status       text DEFAULT 'pending' CHECK (subscription_status IN ('active', 'pending', 'expired', 'cancelled')),
  subscription_expiry       timestamptz,
  subscription_payment_id   text,

  -- Construction Specific Fields
  br_number                 text,
  cida_grading              text CHECK (cida_grading IN ('C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7') OR cida_grading IS NULL),
  cida_specialties          text[],
  year_established          integer,
  service_districts         text[],
  is_vat_registered         boolean DEFAULT false,
  project_portfolio         jsonb DEFAULT '[]'::jsonb,
  insurance_details         text,

  created_at                timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  updated_at                timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

-- ================================================
-- Enable RLS
-- ================================================

ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

-- ================================================
-- RLS Policies
-- ================================================

-- Anyone can view published business profiles
CREATE POLICY "Public can view published business profiles"
ON public.business_profiles FOR SELECT
USING ( published = true AND status = 'active' );

-- Authenticated users can view their own profiles (even unpublished)
CREATE POLICY "Users can view their own business profiles"
ON public.business_profiles FOR SELECT
USING ( public.get_my_firebase_uid() = user_id );

-- Users can create their own business profile
CREATE POLICY "Users can create business profiles"
ON public.business_profiles FOR INSERT
WITH CHECK ( public.get_my_firebase_uid() = user_id );

-- Users can update their own business profile
-- But cannot change user_id, verified, rating, review_count, visit_count
CREATE POLICY "Users can update own business profile"
ON public.business_profiles FOR UPDATE
USING ( public.get_my_firebase_uid() = user_id )
WITH CHECK ( public.get_my_firebase_uid() = user_id );

-- Users can delete their own business profile
CREATE POLICY "Users can delete own business profile"
ON public.business_profiles FOR DELETE
USING ( public.get_my_firebase_uid() = user_id );

-- Admins can view all business profiles including unpublished
CREATE POLICY "Admins can view all business profiles"
ON public.business_profiles FOR SELECT
USING ( public.is_admin() );

-- Admins can update any business profile
CREATE POLICY "Admins can update any business profile"
ON public.business_profiles FOR UPDATE
USING ( public.is_admin() );

-- Super admins only can delete any business profile
CREATE POLICY "Super admins can delete any business profile"
ON public.business_profiles FOR DELETE
USING ( public.is_super_admin() );

-- Pending owner can accept ownership transfer
CREATE POLICY "Pending owners can accept transfer"
ON public.business_profiles FOR UPDATE
USING ( public.get_my_firebase_uid() = pending_owner_id );

-- Agents can view all business profiles they created
CREATE POLICY "Agents can view business profiles they created"
ON public.business_profiles FOR SELECT
USING ( public.get_my_firebase_uid() = created_by_id );

-- ================================================
-- Indexes
-- ================================================

CREATE INDEX idx_business_profiles_user_id       ON public.business_profiles (user_id);
CREATE INDEX idx_business_profiles_created_by_id ON public.business_profiles (created_by_id);
CREATE INDEX idx_business_profiles_status        ON public.business_profiles (status);
CREATE INDEX idx_business_profiles_published     ON public.business_profiles (published);
CREATE INDEX idx_business_profiles_district      ON public.business_profiles (district);
CREATE INDEX idx_business_profiles_city          ON public.business_profiles (city);
CREATE INDEX idx_business_profiles_br_number     ON public.business_profiles (br_number);
CREATE INDEX idx_business_profiles_cida_grading  ON public.business_profiles (cida_grading);
CREATE INDEX idx_business_profiles_subscription  ON public.business_profiles (subscription_plan, subscription_status);

-- ================================================
-- Triggers
-- ================================================

CREATE TRIGGER handle_business_profiles_updated_at
  BEFORE UPDATE ON public.business_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();