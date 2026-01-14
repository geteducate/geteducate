-- Allow public read access to applications for the creator dashboard
-- This is necessary because the creator panel uses sessionStorage auth, not Supabase auth
DROP POLICY IF EXISTS "Admins and creators can view all applications" ON public.applications;

CREATE POLICY "Public can view all applications"
ON public.applications FOR SELECT
USING (true);

-- Also allow public read for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Public can view all profiles"
ON public.profiles FOR SELECT
USING (true);

-- Allow public read for job_categories
DROP POLICY IF EXISTS "Job categories are viewable by everyone" ON public.job_categories;

CREATE POLICY "Public can view job categories"
ON public.job_categories FOR SELECT
USING (true);