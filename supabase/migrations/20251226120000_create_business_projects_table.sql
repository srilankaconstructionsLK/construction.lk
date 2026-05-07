-- Create business_projects table to showcase past and ongoing construction work
CREATE TABLE business_projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE NOT NULL,
  
  title text NOT NULL,
  slug text, -- For SEO URLs
  description text,
  
  -- Project Specifics
  location text, -- e.g., "Nawala, Colombo"
  project_type text, -- Residential, Commercial, Industrial, Infrastructure, etc.
  status text DEFAULT 'completed', -- completed, ongoing, planned
  completion_date date,
  client_name text, -- Optional: "Private Client", "Ministry of Highways", etc.
  
  -- Media
  cover_image text,
  gallery jsonb DEFAULT '[]'::jsonb, -- Array of image objects {url, caption}
  
  -- Metadata
  tags text[], -- e.g., ['luxury', 'eco-friendly', 'high-rise']
  view_count integer DEFAULT 0,
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE business_projects ENABLE ROW LEVEL SECURITY;

-- Policies

-- Select: Public can view active/completed projects
CREATE POLICY "Public can view completed and ongoing projects" 
ON business_projects FOR SELECT 
USING ( true ); -- Usually projects are public to show credibility

-- Admins can view all projects
CREATE POLICY "Admins can view all projects" 
ON business_projects FOR SELECT 
USING ( is_admin() );

-- Insert: Business owners can add projects
CREATE POLICY "Business owners can insert projects" 
ON business_projects FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
);

-- Update: Business owners can update their own projects
CREATE POLICY "Business owners can update own projects" 
ON business_projects FOR UPDATE 
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

-- Delete: Business owners can delete their own projects
CREATE POLICY "Business owners can delete own projects" 
ON business_projects FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
);

-- Performance: Indexes
CREATE INDEX idx_business_projects_business_id ON business_projects(business_id);
CREATE INDEX idx_business_projects_type ON business_projects(project_type);
CREATE INDEX idx_business_projects_status ON business_projects(status);
CREATE INDEX idx_business_projects_slug ON business_projects(slug);

-- Trigger for updated_at
CREATE TRIGGER handle_business_projects_updated_at
  BEFORE UPDATE ON public.business_projects
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
