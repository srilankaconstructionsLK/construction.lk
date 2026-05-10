-- Create business_branches table to handle multiple physical locations
CREATE TABLE business_branches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE NOT NULL,
  
  branch_name text NOT NULL, -- e.g., "Head Office", "Kandy Branch"
  is_main_branch boolean DEFAULT false,
  
  -- Location Details
  address text,
  city text,
  district text, -- Colombo, Kandy, Gampaha, etc.
  location_coords point, -- For Map integration (latitude, longitude)
  
  -- Branch Specific Contact (Overrides main profile if present)
  phone text,
  whatsapp text,
  email text,
  manager_name text,
  
  -- Metadata
  status text DEFAULT 'active',
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE business_branches ENABLE ROW LEVEL SECURITY;

-- Policies

-- Select: Public can view active branches
CREATE POLICY "Public can view active branches" 
ON business_branches FOR SELECT 
USING ( status = 'active' );

-- Admins can view all branches
CREATE POLICY "Admins can view all branches" 
ON business_branches FOR SELECT 
USING ( is_admin() );

-- Insert: Business owners can add branches
CREATE POLICY "Business owners can insert branches" 
ON business_branches FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
);

-- Update: Business owners can update their own branches
CREATE POLICY "Business owners can update own branches" 
ON business_branches FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
);

-- Delete: Business owners can delete their own branches
CREATE POLICY "Business owners can delete own branches" 
ON business_branches FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
);

-- Performance: Indexes
CREATE INDEX idx_business_branches_business_id ON business_branches(business_id);
CREATE INDEX idx_business_branches_district ON business_branches(district);
CREATE INDEX idx_business_branches_city ON business_branches(city);
CREATE INDEX idx_business_branches_is_main ON business_branches(is_main_branch);

-- Trigger for updated_at
CREATE TRIGGER handle_business_branches_updated_at
  BEFORE UPDATE ON public.business_branches
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Ensure only one main branch per business
-- This is a partial index that acts as a unique constraint
CREATE UNIQUE INDEX idx_one_main_branch_per_business 
ON business_branches (business_id) 
WHERE (is_main_branch = true);
