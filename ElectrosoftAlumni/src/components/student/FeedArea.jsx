import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  BookmarkPlus,
  MoreHorizontal,
  Clock,
  Users,
  Image as ImageIcon,
  Video,
  Loader2,
} from "lucide-react";
import apiService from "../../utils/apiService";
import { useAuth } from "../../contexts/AuthContext";

const FeedArea = ({ refreshTrigger, onRefreshReady }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());
  const { isAuthenticated, user } = useAuth();

  // Component for image fallback
  const ImageFallback = ({ className, size = "large" }) => (
    <div
      className={`${className} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}
    >
      <div className="text-center">
        <ImageIcon
          className={`${
            size === "large" ? "w-12 h-12" : "w-6 h-6"
          } text-gray-400 mx-auto mb-2`}
        />
        <p className="text-gray-500 text-sm">Image not available</p>
      </div>
    </div>
  );

  // Fetch posts from backend
  useEffect(() => {
    if (isAuthenticated) {
      fetchMyPosts();
    } else {
      setLoading(false);
      setError("Please log in to view posts");
    }
  }, [isAuthenticated, refreshTrigger]);

  // Expose refresh function to parent component
  useEffect(() => {
    if (onRefreshReady) {
      onRefreshReady(fetchMyPosts);
    }
  }, [onRefreshReady]);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching my posts...");
      console.log("🔐 Auth status:", { isAuthenticated, user: user?.id });
      console.log(
        "🔑 Token:",
        localStorage.getItem("authToken")?.substring(0, 20) + "..."
      );

      // Fetch only posts by the current user
      const response = await apiService.getMyPosts({
        limit: 50,
      });
      console.log("📦 API Response:", response);
      console.log("📝 Posts data:", response.data);
      if (response.data && response.data.length > 0) {
        console.log("🖼️ First post media:", response.data[0].media);
        console.log("🖼️ Media type:", typeof response.data[0].media);
        console.log("🖼️ Media length:", response.data[0].media?.length);
        console.log("👤 First post user:", response.data[0].user);
        console.log("🔗 First post userType:", response.data[0].userType);
        if (response.data[0].media && response.data[0].media.length > 0) {
          console.log(
            "🔗 First media URL:",
            response.data[0].media[0].media_url
          );
          console.log(
            "🔗 Constructed media URL:",
            apiService.getMediaUrl(response.data[0].media[0].media_url)
          );
        }
      }
      setPosts(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching my posts:", error);
      console.error("❌ Error message:", error.message);
      console.error("❌ Error stack:", error.stack);
      setError(`Failed to load posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }
  };

  const handleLike = async (postId) => {
    try {
      await apiService.reactToPost(postId, { reactionType: "like" });
      // Update local state
      setPosts(
        posts.map((post) =>
          post.post_id === postId
            ? {
                ...post,
                liked: !post.liked,
                reaction_count: post.liked
                  ? parseInt(post.reaction_count) - 1
                  : parseInt(post.reaction_count) + 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleBookmark = (postId) => {
    setPosts(
      posts.map((post) =>
        post.post_id === postId
          ? { ...post, bookmarked: !post.bookmarked }
          : post
      )
    );
  };

  const handlePollVote = (postId, option) => {
    // Poll voting logic (to be implemented when poll feature is added)
    console.log("Poll vote:", postId, option);
  };

  const renderPost = (post) => {
    const user = post.user || {
      full_name: "Current User",
      userType: "student",
    }; // Fallback user data
    const hasMedia = post.media && post.media.length > 0;

    // console.log(`🎨 Rendering post ${post.post_id}:`, {
    //   media: post.media,
    //   hasMedia,
    //   mediaLength: post.media?.length,
    //   mediaType: typeof post.media,
    //   user: user,
    //   userType: post.userType,
    // });

    return (
      <div
        key={post.post_id}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:shadow-sm transition-shadow"
      >
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
              {user?.profile_pic ? (
                <img
                  src={apiService.getMediaUrl(user.profile_pic)}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.full_name?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {user?.full_name || "Current User"}
              </h4>
              <p className="text-gray-600 text-xs">
                {post.userType
                  ? post.userType === "student"
                    ? "Student"
                    : post.userType
                  : "Student"}
              </p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(post.created_at)}</span>
              </div>
            </div>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          {post.content && (
            <p className="text-gray-800 text-sm leading-relaxed mb-3">
              {post.content}
            </p>
          )}

          {/* Media Display */}
          {hasMedia && (
            <div className="mt-3">
              {post.media.length === 1 ? (
                // Single media item
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  {post.media[0].media_type === "image" ? (
                    failedImages.has(post.media[0].media_url) ? (
                      <ImageFallback className="w-full h-48" size="large" />
                    ) : (
                      <img
                        src={apiService.getMediaUrl(post.media[0].media_url)}
                        alt="Post media"
                        className="w-full max-h-96 object-cover"
                        onError={(e) => {
                          console.error("Failed to load image:", e.target.src);
                          setFailedImages(
                            (prev) =>
                              new Set([...prev, post.media[0].media_url])
                          );
                        }}
                        onLoad={() => {
                          console.log(
                            "Successfully loaded image:",
                            apiService.getMediaUrl(post.media[0].media_url)
                          );
                        }}
                      />
                    )
                  ) : (
                    <video
                      src={apiService.getMediaUrl(post.media[0].media_url)}
                      controls
                      className="w-full max-h-96"
                    />
                  )}
                </div>
              ) : (
                // Multiple media items
                <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                  {post.media.slice(0, 4).map((media, index) => (
                    <div
                      key={media.media_id}
                      className="relative border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {media.media_type === "image" ? (
                        failedImages.has(media.media_url) ? (
                          <ImageFallback className="w-full h-32" size="small" />
                        ) : (
                          <img
                            src={apiService.getMediaUrl(media.media_url)}
                            alt={`Post media ${index + 1}`}
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              console.error(
                                "Failed to load image:",
                                e.target.src
                              );
                              setFailedImages(
                                (prev) => new Set([...prev, media.media_url])
                              );
                            }}
                          />
                        )
                      ) : (
                        <div className="w-full h-32 bg-gray-900 flex items-center justify-center">
                          <Video className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {index === 3 && post.media.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                          +{post.media.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLike(post.post_id)}
              className={`flex items-center gap-2 text-sm transition-colors ${
                post.liked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-500 hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`}
              />
              <span>{post.reaction_count || 0}</span>
            </button>

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comment_count || 0}</span>
            </button>

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>{post.share_count || 0}</span>
            </button>
          </div>

          <button
            onClick={() => handleBookmark(post.post_id)}
            className={`p-2 rounded-full transition-colors ${
              post.bookmarked
                ? "text-blue-500 bg-blue-50 hover:bg-blue-100"
                : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
            }`}
            title={post.bookmarked ? "Remove bookmark" : "Bookmark post"}
          >
            <BookmarkPlus
              className={`w-4 h-4 ${post.bookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading posts...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Posts
          </h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={fetchMyPosts}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : posts.length > 0 ? (
        posts.map(renderPost)
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 text-sm">
            Start connecting with your network to see posts and updates here.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedArea;
