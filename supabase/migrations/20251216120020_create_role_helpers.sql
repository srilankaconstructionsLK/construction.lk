-- Create helper functions for role checking
-- These functions are adapted for 'roles' text[] column and Firebase 'sub' claim

-- 1. Create Helper to get roles (Decoupled from logic checks)
CREATE OR REPLACE FUNCTION public.get_my_roles()
RETURNS text[] AS $$
DECLARE
  _roles text[];
BEGIN
  SELECT roles INTO _roles
  FROM public.profiles
  WHERE id = (auth.jwt() ->> 'sub');

  RETURN COALESCE(_roles, ARRAY[]::text[]);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER FUNCTION public.get_my_roles() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.get_my_roles() TO authenticated, service_role;


-- 2. Function: is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (auth.jwt() ->> 'sub') IS NOT NULL AND
         ARRAY['admin', 'super_admin']::text[] && public.get_my_roles();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER FUNCTION public.is_admin() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;


-- 3. Function: is_super_admin()
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (auth.jwt() ->> 'sub') IS NOT NULL AND
         ARRAY['super_admin']::text[] <@ public.get_my_roles();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER FUNCTION public.is_super_admin() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, service_role;


-- 4. Function: is_agent()
CREATE OR REPLACE FUNCTION public.is_agent()
RETURNS boolean AS $$
BEGIN
  RETURN (auth.jwt() ->> 'sub') IS NOT NULL AND
         ARRAY['agent']::text[] <@ public.get_my_roles();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER FUNCTION public.is_agent() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.is_agent() TO authenticated, service_role;


-- 5. Function: is_moderator()
CREATE OR REPLACE FUNCTION public.is_moderator()
RETURNS boolean AS $$
BEGIN
  RETURN (auth.jwt() ->> 'sub') IS NOT NULL AND
         ARRAY['moderator']::text[] <@ public.get_my_roles();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER FUNCTION public.is_moderator() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.is_moderator() TO authenticated, service_role;
