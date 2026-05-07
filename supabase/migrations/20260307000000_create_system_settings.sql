-- Create system_settings table for global app configuration
CREATE TABLE IF NOT EXISTS public.system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_by text REFERENCES public.profiles(id),
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read settings" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.system_settings FOR ALL USING (is_admin());

-- Seed basic settings
INSERT INTO public.system_settings (key, value, description) VALUES
('AD_CONFIG', '{
  "min_duration_days": 7,
  "max_slots_home": 6,
  "approval_required": true
}', 'Configuration for the advertising engine'),
('APP_METADATA', '{
  "site_name": "Construction.lk",
  "contact_email": "support@construction.lk",
  "support_whatsapp": "+94700000000"
}', 'Global application metadata')
ON CONFLICT (key) DO NOTHING;

-- Trigger for updated_at
CREATE TRIGGER handle_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
