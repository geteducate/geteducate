-- Create posts table for updates/news
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_images table for attached images
CREATE TABLE public.post_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_comments table
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_reactions table (likes/dislikes)
CREATE TABLE public.post_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'dislike')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create post_views table (admin-only visible)
CREATE TABLE public.post_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_hash TEXT -- For anonymous view tracking
);

-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_views ENABLE ROW LEVEL SECURITY;

-- POSTS POLICIES
-- Anyone can view posts
CREATE POLICY "Anyone can view posts"
  ON public.posts FOR SELECT
  USING (true);

-- Only admins can create posts
CREATE POLICY "Only admins can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update their own posts
CREATE POLICY "Only admins can update posts"
  ON public.posts FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role) AND author_id = auth.uid());

-- Only admins can delete posts
CREATE POLICY "Only admins can delete posts"
  ON public.posts FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- POST IMAGES POLICIES
-- Anyone can view post images
CREATE POLICY "Anyone can view post images"
  ON public.post_images FOR SELECT
  USING (true);

-- Only admins can add images
CREATE POLICY "Only admins can add post images"
  ON public.post_images FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete images
CREATE POLICY "Only admins can delete post images"
  ON public.post_images FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- POST COMMENTS POLICIES
-- Anyone can view comments
CREATE POLICY "Anyone can view comments"
  ON public.post_comments FOR SELECT
  USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
  ON public.post_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
  ON public.post_comments FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own comments, admins can delete any
CREATE POLICY "Users can delete own comments"
  ON public.post_comments FOR DELETE
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- POST REACTIONS POLICIES
-- Users can only see their own reactions (prevents seeing who liked/disliked)
CREATE POLICY "Users can view own reactions"
  ON public.post_reactions FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all reactions
CREATE POLICY "Admins can view all reactions"
  ON public.post_reactions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Authenticated users can create reactions
CREATE POLICY "Authenticated users can react"
  ON public.post_reactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reactions
CREATE POLICY "Users can update own reactions"
  ON public.post_reactions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own reactions
CREATE POLICY "Users can delete own reactions"
  ON public.post_reactions FOR DELETE
  USING (auth.uid() = user_id);

-- POST VIEWS POLICIES
-- Only admins can view post views
CREATE POLICY "Only admins can view post views"
  ON public.post_views FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert views (for tracking)
CREATE POLICY "Anyone can record views"
  ON public.post_views FOR INSERT
  WITH CHECK (true);

-- Create function to get reaction counts (without exposing who reacted)
CREATE OR REPLACE FUNCTION public.get_post_reaction_counts(post_uuid UUID)
RETURNS TABLE (likes BIGINT, dislikes BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(*) FILTER (WHERE reaction_type = 'like') as likes,
    COUNT(*) FILTER (WHERE reaction_type = 'dislike') as dislikes
  FROM public.post_reactions
  WHERE post_id = post_uuid;
$$;

-- Create function to get comment count
CREATE OR REPLACE FUNCTION public.get_post_comment_count(post_uuid UUID)
RETURNS BIGINT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*) FROM public.post_comments WHERE post_id = post_uuid;
$$;

-- Create function to get view count (admin only - enforced in frontend)
CREATE OR REPLACE FUNCTION public.get_post_view_count(post_uuid UUID)
RETURNS BIGINT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*) FROM public.post_views WHERE post_id = post_uuid;
$$;

-- Trigger for updated_at on posts
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for updated_at on post_comments
CREATE TRIGGER update_post_comments_updated_at
  BEFORE UPDATE ON public.post_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);

-- Storage policies for post images bucket
CREATE POLICY "Anyone can view post images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

CREATE POLICY "Only admins can upload post images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'post-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete post images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'post-images' AND has_role(auth.uid(), 'admin'::app_role));