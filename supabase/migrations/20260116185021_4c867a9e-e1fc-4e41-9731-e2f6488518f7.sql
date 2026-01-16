-- Remove the overly permissive public access policy from profiles table
DROP POLICY IF EXISTS "Public can view all profiles" ON public.profiles;