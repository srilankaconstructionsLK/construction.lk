-- Create invoices table for professional billing and sharing
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text NOT NULL,
  invoice_date date NOT NULL,
  due_date date,
  
  -- Parties
  company_name text, -- Construction.lk billing info
  client_name text, -- Business owner / Firm name
  client_email text,
  owner_user_id text REFERENCES public.profiles(id) ON DELETE SET NULL, -- Who this invoice belongs to
  
  -- Billing Details
  subtotal numeric(12,2) NOT NULL DEFAULT 0,
  tax_rate numeric(8,2) NOT NULL DEFAULT 0,
  tax_amount numeric(12,2) NOT NULL DEFAULT 0,
  total_amount numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'issued' CHECK (status IN ('draft', 'issued', 'cancelled', 'paid')),
  
  -- Sharing & Security
  is_shared boolean NOT NULL DEFAULT true,
  share_token text UNIQUE NOT NULL DEFAULT replace(gen_random_uuid()::text, '-', ''),
  payload jsonb NOT NULL, -- Full line item details and metadata
  
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS invoices_owner_invoice_number_idx ON public.invoices(owner_user_id, invoice_number);
CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON public.invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS invoices_share_token_idx ON public.invoices(share_token);

-- RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view shared invoices"
  ON public.invoices FOR SELECT
  USING (is_shared = true);

CREATE POLICY "Users can view own invoices"
  ON public.invoices FOR SELECT
  USING ((auth.jwt() ->> 'sub') = owner_user_id);

CREATE POLICY "Admins can manage invoices"
  ON public.invoices FOR ALL
  USING (is_admin());

-- Trigger for updated_at
CREATE TRIGGER handle_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
