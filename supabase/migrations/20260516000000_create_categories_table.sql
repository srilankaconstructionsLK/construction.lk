-- Migration: Categories (Hierarchy)
CREATE TABLE public.categories (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id   uuid REFERENCES public.categories(id) ON DELETE CASCADE,
  name        text NOT NULL,
  slug        text UNIQUE NOT NULL,
  icon_url    text,
  status      text DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  created_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  updated_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Public: View active categories
CREATE POLICY "Public can view active categories"
ON public.categories FOR SELECT
USING ( status = 'active' OR public.is_admin() );

-- Admins: Manage everything
CREATE POLICY "Admins can manage categories"
ON public.categories FOR ALL
USING ( public.is_admin() )
WITH CHECK ( public.is_admin() );

-- Indexes
CREATE INDEX idx_categories_parent_id ON public.categories (parent_id);
CREATE INDEX idx_categories_slug ON public.categories (slug);

-- Trigger for updated_at
CREATE TRIGGER handle_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Seed initial industrial categories
INSERT INTO public.categories (name, slug) VALUES 
('Building Materials', 'building-materials'),
('Heavy Machinery', 'heavy-machinery'),
('Consultancy Services', 'consultancy-services'),
('Electrical & Power', 'electrical-power'),
('Tools & Equipment', 'tools-equipment');
