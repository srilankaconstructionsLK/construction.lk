-- Function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Create tables
CREATE TABLE profiles (
  id text PRIMARY KEY, -- Firebase UID
  email text,
  name text,
  roles text[] DEFAULT array[]::text[],
  gender text CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say') OR gender IS NULL),
  have_business_profile boolean DEFAULT false,
  phone text,
  address text,
  profile_picture_url text,
  date_of_birth date,
  city text,
  verified boolean DEFAULT false,
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
-- Secure policy using JWT 'sub' claim from Firebase

-- Select: Users can view their own profile
CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
USING ( (auth.jwt() ->> 'sub') = id );

-- Insert: Users can insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT 
WITH CHECK ( (auth.jwt() ->> 'sub') = id );

-- Update: Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING ( (auth.jwt() ->> 'sub') = id )
WITH CHECK (
  (auth.jwt() ->> 'sub') = id
  AND
  roles = (SELECT roles FROM profiles WHERE id = (auth.jwt() ->> 'sub'))
);

-- Admin Policies
-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
ON profiles FOR SELECT 
USING ( is_admin() );

-- Admins can update any profile (including roles)
CREATE POLICY "Admins can update any profile" 
ON profiles FOR UPDATE 
USING ( is_admin() );

-- Admins can delete profiles
CREATE POLICY "Admins can delete profiles" 
ON profiles FOR DELETE 
USING ( is_super_admin() );

-- Performance: GIN Index for fast Role checks (@> operator)
CREATE INDEX idx_profiles_roles ON profiles USING GIN (roles);
CREATE INDEX idx_profiles_email ON profiles (email);
CREATE INDEX idx_profiles_phone ON profiles (phone);

-- Trigger for profiles updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
