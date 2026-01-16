import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ThumbsUp, ThumbsDown, MessageCircle, Eye, Edit, Trash2, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
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
  image_url: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_email?: string;
}

interface PostCardProps {
  post: Post;
  images: PostImage[];
  isAdmin: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

export const PostCard = ({ post, images, isAdmin, onEdit, onDelete }: PostCardProps) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchReactionCounts();
    fetchCommentCount();
    if (isAuthenticated) {
      fetchUserReaction();
    }
    if (isAdmin) {
      fetchViewCount();
    }
    recordView();
  }, [post.id, isAuthenticated, isAdmin]);

  const fetchReactionCounts = async () => {
    const { data, error } = await supabase.rpc('get_post_reaction_counts', { post_uuid: post.id });
    if (!error && data && data.length > 0) {
      setLikes(Number(data[0].likes) || 0);
      setDislikes(Number(data[0].dislikes) || 0);
    }
  };

  const fetchCommentCount = async () => {
    const { data, error } = await supabase.rpc('get_post_comment_count', { post_uuid: post.id });
    if (!error && data !== null) {
      setCommentCount(Number(data));
    }
  };

  const fetchViewCount = async () => {
    const { data, error } = await supabase.rpc('get_post_view_count', { post_uuid: post.id });
    if (!error && data !== null) {
      setViewCount(Number(data));
    }
  };

  const fetchUserReaction = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('post_reactions')
      .select('reaction_type')
      .eq('post_id', post.id)
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (!error && data) {
      setUserReaction(data.reaction_type as 'like' | 'dislike');
    }
  };

  const recordView = async () => {
    await supabase.from('post_views').insert({
      post_id: post.id,
      viewer_id: user?.id || null,
    });
  };

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to react to posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (userReaction === type) {
        // Remove reaction
        await supabase
          .from('post_reactions')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user!.id);
        setUserReaction(null);
        if (type === 'like') setLikes(l => l - 1);
        else setDislikes(d => d - 1);
      } else if (userReaction) {
        // Change reaction
        await supabase
          .from('post_reactions')
          .update({ reaction_type: type })
          .eq('post_id', post.id)
          .eq('user_id', user!.id);
        setUserReaction(type);
        if (type === 'like') {
          setLikes(l => l + 1);
          setDislikes(d => d - 1);
        } else {
          setDislikes(d => d + 1);
          setLikes(l => l - 1);
        }
      } else {
        // Add new reaction
        await supabase
          .from('post_reactions')
          .insert({ post_id: post.id, user_id: user!.id, reaction_type: type });
        setUserReaction(type);
        if (type === 'like') setLikes(l => l + 1);
        else setDislikes(d => d + 1);
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };

  const fetchComments = async () => {
    setLoadingComments(true);
    const { data, error } = await supabase
      .from('post_comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    
    if (!error && data) {
      // Fetch user emails for comments
      const commentsWithEmails = await Promise.all(
        data.map(async (comment) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('user_id', comment.user_id)
            .maybeSingle();
          return {
            ...comment,
            user_email: profile?.full_name || profile?.email || 'Anonymous',
          };
        })
      );
      setComments(commentsWithEmails);
    }
    setLoadingComments(false);
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const submitComment = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to comment.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const { error } = await supabase
        .from('post_comments')
        .insert({ post_id: post.id, user_id: user!.id, content: newComment.trim() });

      if (error) throw error;

      setNewComment("");
      setCommentCount(c => c + 1);
      fetchComments();
      toast({
        title: "Comment posted",
        description: "Your comment has been added.",
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await supabase.from('post_comments').delete().eq('id', commentId);
      setComments(comments.filter(c => c.id !== commentId));
      setCommentCount(c => c - 1);
      toast({
        title: "Comment deleted",
        description: "Your comment has been removed.",
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header with admin actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary/10">
            <AvatarFallback className="text-primary font-semibold">GE</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">GetEducate</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.created_at), 'MMM d, yyyy • h:mm a')}
              {post.updated_at !== post.created_at && (
                <span className="ml-2 text-xs">(edited)</span>
              )}
            </p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit?.(post)}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete?.(post.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className={`mb-4 grid gap-2 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.image_url}
              alt="Post attachment"
              className="rounded-lg w-full object-cover max-h-96"
            />
          ))}
        </div>
      )}

      {/* Admin-only view count */}
      {isAdmin && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3 pb-3 border-b border-border">
          <Eye className="h-4 w-4" />
          <span>{viewCount} views</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleReaction('like')}
          className={`gap-2 ${userReaction === 'like' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likes}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleReaction('dislike')}
          className={`gap-2 ${userReaction === 'dislike' ? 'text-destructive bg-destructive/10' : 'text-muted-foreground'}`}
        >
          <ThumbsDown className="h-4 w-4" />
          <span>{dislikes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleComments}
          className="gap-2 text-muted-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{commentCount}</span>
          {showComments ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border space-y-4">
          {/* Comment input */}
          {isAuthenticated ? (
            <div className="flex gap-2">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px] resize-none"
              />
              <Button
                onClick={submitComment}
                disabled={submittingComment || !newComment.trim()}
                size="icon"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-muted-foreground text-sm">
                <a href="/login" className="text-primary hover:underline font-medium">Log in</a>
                {' '}to leave a comment
              </p>
            </div>
          )}

          {/* Comments list */}
          {loadingComments ? (
            <div className="text-center py-4 text-muted-foreground">Loading comments...</div>
          ) : comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-muted/30 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-foreground">{comment.user_email}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(comment.created_at), 'MMM d, yyyy • h:mm a')}
                      </p>
                    </div>
                    {(user?.id === comment.user_id || isAdmin) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteComment(comment.id)}
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-foreground">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm py-2">No comments yet</p>
          )}
        </div>
      )}
    </div>
  );
};
