-- ================================================
-- Migration: Locations (Districts and Cities)
-- ================================================

-- 1. Create districts table
CREATE TABLE public.districts (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text UNIQUE NOT NULL,
  created_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  updated_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

-- 2. Create cities table
CREATE TABLE public.cities (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  district_id uuid REFERENCES public.districts(id) ON DELETE CASCADE NOT NULL,
  name        text NOT NULL,
  created_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  updated_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  UNIQUE(district_id, name)
);

-- 3. Enable RLS
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Public: View all districts and cities
CREATE POLICY "Public can view districts"
ON public.districts FOR SELECT
USING ( true );

CREATE POLICY "Public can view cities"
ON public.cities FOR SELECT
USING ( true );

-- Admins: Manage districts and cities
CREATE POLICY "Admins can manage districts"
ON public.districts FOR ALL
USING ( public.is_admin() )
WITH CHECK ( public.is_admin() );

CREATE POLICY "Admins can manage cities"
ON public.cities FOR ALL
USING ( public.is_admin() )
WITH CHECK ( public.is_admin() );

-- 5. Indexes
CREATE INDEX idx_districts_name ON public.districts (name);
CREATE INDEX idx_cities_district_id ON public.cities (district_id);
CREATE INDEX idx_cities_name ON public.cities (name);

-- 6. Triggers for updated_at
CREATE TRIGGER handle_districts_updated_at
  BEFORE UPDATE ON public.districts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_cities_updated_at
  BEFORE UPDATE ON public.cities
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 7. Realtime Replication
-- Enable Realtime for these tables to allow the UI to update instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.districts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cities;

-- 8. Initial Data (Optional, but helpful for industrial context)
INSERT INTO public.districts (name) VALUES 
('Colombo'), ('Gampaha'), ('Kandy'), ('Kalutara'), ('Galle'), ('Matara'), ('Jaffna'), ('Kurunegala'), ('Anuradhapura'), ('Ratnapura');
