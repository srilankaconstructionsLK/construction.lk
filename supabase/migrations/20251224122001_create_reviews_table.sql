-- Create reviews table for construction businesses
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE NOT NULL,
  user_id text REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, user_id) -- Prevent duplicate reviews from same user
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies

-- Select: Public can view reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON reviews FOR SELECT 
USING ( TRUE );

-- Insert: Users can create reviews (only for themselves)
CREATE POLICY "Users can create reviews" 
ON reviews FOR INSERT 
WITH CHECK ( (auth.jwt() ->> 'sub') = user_id );

-- Update: Users can update their own reviews
CREATE POLICY "Users can update own reviews" 
ON reviews FOR UPDATE 
USING ( (auth.jwt() ->> 'sub') = user_id );

-- Delete: Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" 
ON reviews FOR DELETE 
USING ( (auth.jwt() ->> 'sub') = user_id );

-- Admin Policies
CREATE POLICY "Admins can view all reviews" 
ON reviews FOR SELECT 
USING ( is_admin() );

CREATE POLICY "Admins can delete any review" 
ON reviews FOR DELETE 
USING ( is_super_admin() );

CREATE POLICY "Admins can update any review" 
ON reviews FOR UPDATE 
USING ( is_admin() );

-- Performance: Index for business lookups
CREATE INDEX idx_reviews_business_id ON reviews(business_id);

-- Trigger for updated_at
CREATE TRIGGER handle_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
