-- ================================================
-- Migration 002: Profiles Table
-- ================================================

-- 1. handle_updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create profiles table
CREATE TABLE public.profiles (
  id                    text PRIMARY KEY,  -- Firebase UID
  email                 text,
  name                  text,
  role                  text DEFAULT 'customer' CHECK (role IN ('customer', 'business_owner', 'agent', 'moderator', 'admin', 'super_admin')),
  have_business_profile boolean DEFAULT false,
  gender                text CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say') OR gender IS NULL),
  phone                 text,
  address               text,
  profile_picture_url   text,
  date_of_birth         date,
  city                  text,
  verified              boolean DEFAULT false,
  created_at            timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  updated_at            timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

-- 3. get_profile_role() — must be after table creation, before policies
CREATE OR REPLACE FUNCTION public.get_profile_role(profile_id text)
RETURNS text AS $$
  SELECT role FROM public.profiles WHERE id = profile_id;
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.get_profile_role(text) TO authenticated, service_role;

-- 4. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Users: read own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING ( public.get_my_firebase_uid() = id );

-- Users: create own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK ( public.get_my_firebase_uid() = id );

-- Users: update own profile but cannot change their own role
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING ( public.get_my_firebase_uid() = id )
WITH CHECK (
  public.get_my_firebase_uid() = id
  AND
  role = public.get_profile_role(public.get_my_firebase_uid())
);

-- Admins: read all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING ( public.is_admin() );

-- Admins: update any profile including role column
CREATE POLICY "Admins can update any profile"
ON public.profiles FOR UPDATE
USING ( public.is_admin() );

-- Super admins only: delete profiles
CREATE POLICY "Super admins can delete profiles"
ON public.profiles FOR DELETE
USING ( public.is_super_admin() );

-- 6. Indexes
CREATE INDEX idx_profiles_role  ON public.profiles (role);
CREATE INDEX idx_profiles_email ON public.profiles (email);
CREATE INDEX idx_profiles_phone ON public.profiles (phone);

-- 7. Trigger
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();