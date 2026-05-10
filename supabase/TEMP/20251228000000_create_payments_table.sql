-- Create payments table to track subscription and advertisement transactions
CREATE TABLE payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text UNIQUE NOT NULL, -- The PayHere order ID or internal reference
  user_id text REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_id uuid REFERENCES business_profiles(id) ON DELETE SET NULL, -- Specific business this payment is for
  
  -- Payment Details
  package_id text NOT NULL, -- 'starter', 'pro', 'top_ad', etc.
  amount numeric NOT NULL,
  currency text DEFAULT 'LKR',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  payment_mode text, -- 'online', 'bank_transfer', 'manual'
  
  -- Metadata
  payment_data jsonb, -- Stores gateway response details
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies

-- Users can view their own payments
CREATE POLICY "Users can view own payments" 
ON payments FOR SELECT 
USING ( (auth.jwt() ->> 'sub') = user_id );

-- Admins can view all payments
CREATE POLICY "Admins can view all payments" 
ON payments FOR SELECT 
USING ( is_admin() );

-- Admins can update payments (e.g. manually mark paid)
CREATE POLICY "Admins can update payments" 
ON payments FOR UPDATE 
USING ( is_admin() );

-- Users can insert their own payments (initiated from client)
CREATE POLICY "Users can create payments" 
ON payments FOR INSERT 
WITH CHECK ( (auth.jwt() ->> 'sub') = user_id );

-- Performance: Indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_business_id ON payments(business_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);

-- Trigger for updated_at
CREATE TRIGGER handle_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
