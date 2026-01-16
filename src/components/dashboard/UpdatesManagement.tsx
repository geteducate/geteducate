import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { 
  Plus, Edit, Trash2, Eye, ThumbsUp, ThumbsDown, 
  MessageCircle, Image, Loader2, X, Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

interface PostStats {
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
}

interface PostWithStats extends Post {
  stats: PostStats;
  images: PostImage[];
}

export const UpdatesManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<PostWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<PostWithStats | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [viewingPost, setViewingPost] = useState<PostWithStats | null>(null);
  
  // Form states
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      const postsWithStats: PostWithStats[] = await Promise.all(
        (postsData || []).map(async (post) => {
          // Fetch stats
          const [viewsRes, reactionsRes, commentsRes, imagesRes] = await Promise.all([
            supabase.rpc('get_post_view_count', { post_uuid: post.id }),
            supabase.rpc('get_post_reaction_counts', { post_uuid: post.id }),
            supabase.rpc('get_post_comment_count', { post_uuid: post.id }),
            supabase.from('post_images').select('*').eq('post_id', post.id),
          ]);

          const reactions = reactionsRes.data?.[0] || { likes: 0, dislikes: 0 };

          return {
            ...post,
            stats: {
              views: Number(viewsRes.data) || 0,
              likes: Number(reactions.likes) || 0,
              dislikes: Number(reactions.dislikes) || 0,
              comments: Number(commentsRes.data) || 0,
            },
            images: imagesRes.data || [],
          };
        })
      );

      setPosts(postsWithStats);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 4) {
      toast({
        title: "Too many images",
        description: "You can only attach up to 4 images per post.",
        variant: "destructive",
      });
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const uploadImages = async (postId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${postId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('post-images')
        .upload(fileName, image);

      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(data.path);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (editingPost) {
        const { error } = await supabase
          .from('posts')
          .update({ content: content.trim() })
          .eq('id', editingPost.id);

        if (error) throw error;

        toast({
          title: "Post updated",
          description: "Your post has been updated successfully.",
        });
      } else {
        const { data: post, error: postError } = await supabase
          .from('posts')
          .insert({ content: content.trim(), author_id: user.id })
          .select()
          .single();

        if (postError) throw postError;

        if (images.length > 0) {
          const imageUrls = await uploadImages(post.id);
          
          for (const url of imageUrls) {
            await supabase
              .from('post_images')
              .insert({ post_id: post.id, image_url: url });
          }
        }

        toast({
          title: "Post created",
          description: "Your post has been published successfully.",
        });
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error creating/updating post:', error);
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePostId) return;

    try {
      const post = posts.find(p => p.id === deletePostId);
      if (post) {
        for (const image of post.images) {
          const path = image.image_url.split('/post-images/')[1];
          if (path) {
            await supabase.storage.from('post-images').remove([path]);
          }
        }
      }

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

  const resetForm = () => {
    setContent("");
    setImages([]);
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviews([]);
    setShowCreateModal(false);
    setEditingPost(null);
  };

  const openEditModal = (post: PostWithStats) => {
    setEditingPost(post);
    setContent(post.content);
    setShowCreateModal(true);
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats summary
  const totalViews = posts.reduce((sum, p) => sum + p.stats.views, 0);
  const totalLikes = posts.reduce((sum, p) => sum + p.stats.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.stats.comments, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-white/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Total Views</p>
                <p className="text-2xl font-bold">{totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-white/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Total Likes</p>
                <p className="text-2xl font-bold">{totalLikes}</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-white/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-amber-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Total Comments</p>
                <p className="text-2xl font-bold">{totalComments}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-white/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Posts Table */}
      <Card className="shadow-md border-0">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg font-semibold">All Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <MessageCircle className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No posts yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Create your first post to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Content</TableHead>
                    <TableHead className="font-semibold text-center">Media</TableHead>
                    <TableHead className="font-semibold text-center">
                      <Eye className="h-4 w-4 inline mr-1" />
                      Views
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      <ThumbsUp className="h-4 w-4 inline mr-1" />
                      Likes
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      <ThumbsDown className="h-4 w-4 inline mr-1" />
                      Dislikes
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      <MessageCircle className="h-4 w-4 inline mr-1" />
                      Comments
                    </TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="hover:bg-muted/30">
                      <TableCell className="max-w-xs">
                        <p className="truncate font-medium">
                          {post.content.slice(0, 50)}
                          {post.content.length > 50 ? '...' : ''}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        {post.images.length > 0 ? (
                          <Badge variant="secondary" className="gap-1">
                            <Image className="h-3 w-3" />
                            {post.images.length}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {post.stats.views}
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-600">
                        {post.stats.likes}
                      </TableCell>
                      <TableCell className="text-center font-medium text-red-600">
                        {post.stats.dislikes}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {post.stats.comments}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewingPost(post)}
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(post)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletePostId(post.id)}
                            className="h-8 w-8 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <Dialog open={showCreateModal} onOpenChange={resetForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              placeholder="What's the latest update?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none"
            />

            {/* Image previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-border">
              {!editingPost && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= 4}
                    className="gap-2"
                  >
                    <Image className="h-4 w-4" />
                    Add Image
                  </Button>
                </div>
              )}
              
              {editingPost && <div />}

              <Button onClick={handleSubmit} disabled={submitting || !content.trim()}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingPost ? "Save Changes" : "Publish"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Post Modal */}
      {viewingPost && (
        <Dialog open={!!viewingPost} onOpenChange={() => setViewingPost(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Post Details
                <Badge variant="outline" className="ml-2">
                  {format(new Date(viewingPost.created_at), 'MMM d, yyyy • h:mm a')}
                </Badge>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Eye className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">{viewingPost.stats.views}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <ThumbsUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <p className="text-lg font-bold text-green-600">{viewingPost.stats.likes}</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <ThumbsDown className="h-5 w-5 mx-auto mb-1 text-red-600" />
                  <p className="text-lg font-bold text-red-600">{viewingPost.stats.dislikes}</p>
                  <p className="text-xs text-muted-foreground">Dislikes</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <MessageCircle className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-lg font-bold text-blue-600">{viewingPost.stats.comments}</p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>

              {/* Content */}
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{viewingPost.content}</p>
              </div>

              {/* Images */}
              {viewingPost.images.length > 0 && (
                <div className={`grid gap-2 ${viewingPost.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {viewingPost.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.image_url}
                      alt="Post attachment"
                      className="rounded-lg w-full object-cover max-h-64"
                    />
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
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
