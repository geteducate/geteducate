-- Create a function to setup the first creator account
-- This allows the first signup to become a creator automatically
CREATE OR REPLACE FUNCTION public.setup_creator_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if this is the specific creator email (set via metadata)
  IF NEW.raw_user_meta_data->>'is_creator' = 'true' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'creator');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for auto-assigning creator role
DROP TRIGGER IF EXISTS on_auth_user_created_creator ON auth.users;
CREATE TRIGGER on_auth_user_created_creator
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.setup_creator_on_signup();