-- Fix the permissive INSERT policy for applications
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit applications" ON public.applications;

-- Create a more specific policy - allow inserts but still validate the data
-- Since this is a public job application form, we need to allow unauthenticated inserts
-- But we'll add a constraint to ensure required fields are present
CREATE POLICY "Public can submit job applications"
ON public.applications FOR INSERT
WITH CHECK (
  full_name IS NOT NULL AND 
  email IS NOT NULL AND 
  phone IS NOT NULL AND
  why_interested IS NOT NULL AND
  relevant_experience IS NOT NULL AND
  what_stands_out IS NOT NULL
);