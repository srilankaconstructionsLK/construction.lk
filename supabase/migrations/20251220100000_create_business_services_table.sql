-- ================================================
-- Migration 004: Business Services Table
-- ================================================

CREATE TABLE public.business_services (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id  uuid REFERENCES public.business_profiles(id) ON DELETE CASCADE NOT NULL,
  title        text NOT NULL,
  slug         text,
  description  text,

  -- Pricing
  price_type   text DEFAULT 'negotiable' CHECK (price_type IN ('fixed', 'range', 'starting_at', 'negotiable')),
  price_amount numeric,
  price_max    numeric,
  price_unit   text,
  currency     text DEFAULT 'LKR',

  -- Media & Content
  images       jsonb DEFAULT '[]'::jsonb,
  tags         text[],
  status       text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  is_featured  boolean DEFAULT false,

  -- Metadata
  view_count   integer DEFAULT 0,
  created_at   timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  updated_at   timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

-- ================================================
-- Enable RLS
-- ================================================

ALTER TABLE public.business_services ENABLE ROW LEVEL SECURITY;

-- ================================================
-- RLS Policies
-- ================================================

-- Anyone can view active services
CREATE POLICY "Public can view active services"
ON public.business_services FOR SELECT
USING ( status = 'active' );

-- Admins can view all services
CREATE POLICY "Admins can view all services"
ON public.business_services FOR SELECT
USING ( public.is_admin() );

-- Business owners can view their own services (including draft/inactive)
CREATE POLICY "Business owners can view own services"
ON public.business_services FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.business_profiles
    WHERE id = business_id
    AND user_id = public.get_my_firebase_uid()
  )
);

-- Business owners can insert services to their own business
CREATE POLICY "Business owners can insert services"
ON public.business_services FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.business_profiles
    WHERE id = business_id
    AND user_id = public.get_my_firebase_uid()
  )
);

-- Business owners can update their own services
CREATE POLICY "Business owners can update own services"
ON public.business_services FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.business_profiles
    WHERE id = business_id
    AND user_id = public.get_my_firebase_uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.business_profiles
    WHERE id = business_id
    AND user_id = public.get_my_firebase_uid()
  )
);

-- Business owners can delete their own services
CREATE POLICY "Business owners can delete own services"
ON public.business_services FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.business_profiles
    WHERE id = business_id
    AND user_id = public.get_my_firebase_uid()
  )
);

-- Admins can update any service
CREATE POLICY "Admins can update any service"
ON public.business_services FOR UPDATE
USING ( public.is_admin() );

-- Super admins can delete any service
CREATE POLICY "Super admins can delete any service"
ON public.business_services FOR DELETE
USING ( public.is_super_admin() );

-- ================================================
-- Indexes
-- ================================================

CREATE INDEX idx_business_services_business_id ON public.business_services (business_id);
CREATE INDEX idx_business_services_status      ON public.business_services (status);
CREATE INDEX idx_business_services_slug        ON public.business_services (slug);
CREATE INDEX idx_business_services_is_featured ON public.business_services (is_featured);

-- ================================================
-- Triggers
-- ================================================

CREATE TRIGGER handle_business_services_updated_at
  BEFORE UPDATE ON public.business_services
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();