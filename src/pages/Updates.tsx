import { useState, useEffect } from "react";
import { Plus, Loader2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useAdmin } from "@/hooks/use-admin";
import { useToast } from "@/hooks/use-toast";
import { PostCard } from "@/components/updates/PostCard";
import { CreatePostModal } from "@/components/updates/CreatePostModal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Post {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

interface PostImage {
  id: string;
  post_id: string;
  image_url: string;
}

const Updates = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { toast } = useToast();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [postImages, setPostImages] = useState<Record<string, PostImage[]>>({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      setPosts(postsData || []);

      // Fetch all images for posts
      if (postsData && postsData.length > 0) {
        const { data: imagesData, error: imagesError } = await supabase
          .from('post_images')
          .select('*')
          .in('post_id', postsData.map(p => p.id));

        if (!imagesError && imagesData) {
          const imagesByPost: Record<string, PostImage[]> = {};
          imagesData.forEach(img => {
            if (!imagesByPost[img.post_id]) {
              imagesByPost[img.post_id] = [];
            }
            imagesByPost[img.post_id].push(img);
          });
          setPostImages(imagesByPost);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load updates. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowCreateModal(true);
  };

  const handleDelete = async () => {
    if (!deletePostId) return;

    try {
      // Delete images from storage first
      const images = postImages[deletePostId] || [];
      for (const image of images) {
        const path = image.image_url.split('/post-images/')[1];
        if (path) {
          await supabase.storage.from('post-images').remove([path]);
        }
      }

      // Delete post (cascade will handle related records)
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', deletePostId);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== deletePostId));
      toast({
        title: "Post deleted",
        description: "The post has been removed.",
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletePostId(null);
    }
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setEditingPost(null);
  };

  const isLoading = loading || authLoading || adminLoading;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                Updates
              </h1>
              <p className="text-muted-foreground mt-1">
                Official announcements and news from GetEducate
              </p>
            </div>
            
            {isAdmin && (
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            )}
          </div>

          {/* Login prompt for interactions */}
          {!isAuthenticated && !authLoading && (
            <div className="bg-muted/50 border border-border rounded-xl p-4 mb-6 text-center">
              <p className="text-muted-foreground">
                <a href="/login" className="text-primary hover:underline font-medium">Log in</a>
                {' '}to like, dislike, and comment on posts
              </p>
            </div>
          )}

          {/* Posts Feed */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  images={postImages[post.id] || []}
                  isAdmin={isAdmin}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeletePostId(id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-xl border border-border">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No updates yet</h3>
              <p className="text-muted-foreground">
                Check back later for announcements and news
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Create/Edit Post Modal */}
      <CreatePostModal
        open={showCreateModal}
        onOpenChange={handleModalClose}
        onPostCreated={fetchPosts}
        editingPost={editingPost ? { id: editingPost.id, content: editingPost.content } : null}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Updates;
