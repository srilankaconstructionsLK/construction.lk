-- Migration: Force Enable pg_cron and Implement Ad Expiration
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant Permissions
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Update Advertisements Approval Status Constraint to include 'expired'
ALTER TABLE public.advertisements 
DROP CONSTRAINT IF EXISTS advertisements_approval_status_check;

ALTER TABLE public.advertisements 
ADD CONSTRAINT advertisements_approval_status_check 
CHECK (approval_status IN ('pending', 'approved', 'rejected', 'expired'));

-- Create Advertisement Expiry Function
CREATE OR REPLACE FUNCTION public.handle_expired_advertisements()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  WITH expired_rows AS (
    UPDATE public.advertisements
    SET 
      approval_status = 'expired',
      updated_at = timezone('utc'::text, now())
    WHERE 
      approval_status = 'approved'
      AND end_date < timezone('utc'::text, now())
    RETURNING id
  )
  SELECT count(*) INTO v_count FROM expired_rows;

  RETURN v_count;
END;
$$;

-- Schedule Cron Job
SELECT cron.schedule(
  'expire_ads_job',
  '0 * * * *',
  'SELECT public.handle_expired_advertisements()'
);
