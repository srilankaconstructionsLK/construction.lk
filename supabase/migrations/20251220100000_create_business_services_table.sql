-- Create business_services table to support the "Store" model (Services as Products)
CREATE TABLE business_services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  slug text, -- For SEO friendly URLs (e.g., concrete-slab-work-colombo)
  description text,
  
  -- Pricing Info
  price_type text DEFAULT 'negotiable', -- fixed, range, starting_at, negotiable
  price_amount numeric,
  price_max numeric, -- For range pricing
  price_unit text, -- e.g., 'per sqft', 'per day', 'per project'
  currency text DEFAULT 'LKR',
  
  -- Media & Content
  images jsonb DEFAULT '[]'::jsonb, -- Array of image URLs/objects
  tags text[],
  status text DEFAULT 'active', -- active, inactive, draft
  is_featured boolean DEFAULT false,
  
  -- Metadata
  view_count integer DEFAULT 0,
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE business_services ENABLE ROW LEVEL SECURITY;

-- Policies

-- Select: Anyone can view active services
CREATE POLICY "Public can view active services" 
ON business_services FOR SELECT 
USING ( status = 'active' );

-- Admins can view all services
CREATE POLICY "Admins can view all services" 
ON business_services FOR SELECT 
USING ( is_admin() );

-- Insert: Business owners can add services to their own business
CREATE POLICY "Business owners can insert services" 
ON business_services FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
);

-- Update: Business owners can update their own services
CREATE POLICY "Business owners can update own services" 
ON business_services FOR UPDATE 
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

-- Delete: Business owners can delete their own services
CREATE POLICY "Business owners can delete own services" 
ON business_services FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = business_id AND user_id = (auth.jwt() ->> 'sub')
  )
);

-- Performance: Indexes
CREATE INDEX idx_business_services_business_id ON business_services(business_id);
CREATE INDEX idx_business_services_title ON business_services(title);
CREATE INDEX idx_business_services_status ON business_services(status);
CREATE INDEX idx_business_services_slug ON business_services(slug);

-- Trigger for updated_at
CREATE TRIGGER handle_business_services_updated_at
  BEFORE UPDATE ON public.business_services
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
