-- Create pricing_plans table for dynamic pricing configuration
CREATE TABLE pricing_plans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_name text UNIQUE NOT NULL CHECK (plan_name IN ('free', 'starter', 'pro', 'enterprise')),
  display_name text NOT NULL,
  price_monthly numeric NOT NULL DEFAULT 0,
  price_yearly numeric,
  currency text DEFAULT 'LKR',
  features jsonb NOT NULL DEFAULT '{}'::jsonb, -- Stores duration, feature list, search ranking boost, etc.
  is_popular boolean DEFAULT false,
  active boolean DEFAULT true,
  display_order int NOT NULL,
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active pricing plans" 
ON pricing_plans FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can manage pricing plans" 
ON pricing_plans FOR ALL 
USING (is_admin());

-- Seed construction-specific pricing data
INSERT INTO pricing_plans (plan_name, display_name, price_monthly, price_yearly, features, is_popular, display_order) VALUES
('free', 'Basic Directory', 0, 0, '{
  "duration_months": 3,
  "features_list": [
    "Company Logo",
    "Contact Number",
    "Basic Description",
    "Standard Search Ranking"
  ]
}'::jsonb, false, 1),

('starter', 'Starter Contractor', 2500, 25000, '{
  "duration_months": 12,
  "features_list": [
    "Verified Badge (BR required)",
    "WhatsApp Integration",
    "Gallery (Up to 10 photos)",
    "Portfolio (Up to 3 projects)",
    "Priority Search Placement"
  ]
}'::jsonb, false, 2),

('pro', 'Pro Construction Firm', 5000, 50000, '{
  "duration_months": 12,
  "features_list": [
    "CIDA Grading Highlight",
    "Unlimited Portfolio Projects",
    "Lead Generation Form (RFQ)",
    "Customer Reviews Enabled",
    "High Priority Search Ranking",
    "Branch Management (Up to 5)"
  ]
}'::jsonb, true, 3),

('enterprise', 'Corporate / Material Supplier', 10000, 100000, '{
  "duration_months": 12,
  "features_list": [
    "Featured \"Store\" with Service Ads",
    "Machinery Rental Inventory",
    "Video Showcase",
    "Downloadable Profile Card",
    "Top Tier Search Ranking",
    "Unlimited Branches"
  ]
}'::jsonb, false, 4);

-- Indexes
CREATE INDEX idx_pricing_plans_active ON pricing_plans (active);
CREATE INDEX idx_pricing_plans_display_order ON pricing_plans (display_order);

-- Trigger for updated_at
CREATE TRIGGER handle_pricing_plans_updated_at
  BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
