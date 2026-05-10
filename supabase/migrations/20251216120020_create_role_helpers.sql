-- ================================================
-- Migration 001: Helper Functions for Firebase + Supabase RBAC
-- JWT claim 'app_role' is set by Firebase Cloud Functions
-- Firebase UID is in 'user_id' claim (not 'sub')
-- ================================================

CREATE OR REPLACE FUNCTION public.get_my_firebase_uid()
RETURNS text AS $$
BEGIN
  RETURN auth.jwt() ->> 'user_id';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text AS $$
BEGIN
  RETURN auth.jwt() ->> 'app_role';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_authenticated()
RETURNS boolean AS $$
BEGIN
  RETURN (auth.jwt() ->> 'user_id') IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN public.is_authenticated() AND
         auth.jwt() ->> 'app_role' IN ('admin', 'super_admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean AS $$
BEGIN
  RETURN public.is_authenticated() AND
         auth.jwt() ->> 'app_role' = 'super_admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_agent()
RETURNS boolean AS $$
BEGIN
  RETURN public.is_authenticated() AND
         auth.jwt() ->> 'app_role' = 'agent';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_moderator()
RETURNS boolean AS $$
BEGIN
  RETURN public.is_authenticated() AND
         auth.jwt() ->> 'app_role' = 'moderator';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_business_owner()
RETURNS boolean AS $$
BEGIN
  RETURN public.is_authenticated() AND
         auth.jwt() ->> 'app_role' = 'business_owner';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_customer()
RETURNS boolean AS $$
BEGIN
  RETURN public.is_authenticated() AND
         auth.jwt() ->> 'app_role' = 'customer';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION
  public.get_my_firebase_uid(),
  public.get_my_role(),
  public.is_authenticated(),
  public.is_admin(),
  public.is_super_admin(),
  public.is_agent(),
  public.is_moderator(),
  public.is_business_owner(),
  public.is_customer()
TO authenticated, service_role;