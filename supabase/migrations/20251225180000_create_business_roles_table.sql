-- Create business_roles table for per-business permissions (Team Management)
CREATE TABLE business_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE NOT NULL,
  user_id text REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('moderator', 'editor', 'viewer')),
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, user_id)
);

-- Enable RLS
ALTER TABLE business_roles ENABLE ROW LEVEL SECURITY;

-- Helper: Check if user is owner of business
CREATE OR REPLACE FUNCTION public.check_is_business_owner(target_business_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.business_profiles
    WHERE id = target_business_id
    AND user_id = (auth.jwt() ->> 'sub')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Policies for business_roles

-- Select: Users can view their own roles, or business owners can view all roles for their business
CREATE POLICY "Users can view own roles"
ON business_roles FOR SELECT
USING (
  (auth.jwt() ->> 'sub') = user_id
  OR
  public.check_is_business_owner(business_id)
);

-- Manage: Only Business Owners can add/update/delete roles
CREATE POLICY "Owner can manage roles"
ON business_roles FOR ALL
USING ( public.check_is_business_owner(business_id) )
WITH CHECK ( public.check_is_business_owner(business_id) );

-- Cross-table Policies: Extend permissions to business_profiles
-- Helper: Check if user is moderator/editor
CREATE OR REPLACE FUNCTION public.check_is_business_moderator(target_business_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.business_roles
    WHERE business_id = target_business_id
    AND user_id = (auth.jwt() ->> 'sub')
    AND role IN ('moderator', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Allow Moderators/Editors to update the business profile
CREATE POLICY "Team members can update assigned businesses" 
ON business_profiles FOR UPDATE 
USING ( public.check_is_business_moderator(id) );

-- Performance: Index
CREATE INDEX idx_business_roles_user_id ON business_roles(user_id);
CREATE INDEX idx_business_roles_business_id ON business_roles(business_id);
