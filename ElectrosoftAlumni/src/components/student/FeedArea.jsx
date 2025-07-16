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
  AlertCircle,
} from "lucide-react";
import apiService from "../../services/apiService";
import { useAuth } from "../../contexts/AuthContext";

const FeedArea = ({ refreshTrigger, onRefreshReady }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());
  const { isAuthenticated, user } = useAuth();

  // Helper function to parse media field
  const parseMediaField = (media) => {
    if (!media) return [];
    if (Array.isArray(media)) return media;
    if (typeof media === 'string') {
      try {
        return JSON.parse(media);
      } catch (e) {
        console.error("Failed to parse media JSON:", e);
        return [];
      }
    }
    return [];
  };

  // Component for image fallback
  const ImageFallback = ({ className, size = "large", error }) => (
    <div
      className={`${className} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}
    >
      <div className="text-center p-4">
        <AlertCircle className={`${size === "large" ? "w-12 h-12" : "w-6 h-6"} text-red-400 mx-auto mb-2`} />
        <p className="text-gray-500 text-sm">Image failed to load</p>
        {error && (
          <p className="text-red-500 text-xs mt-1 max-w-xs break-words">
            {error}
          </p>
        )}
      </div>
    </div>
  );

  // Enhanced image component with better error handling
  const MediaImage = ({ media, className, alt, onError, onLoad }) => {
    const [imageError, setImageError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = (e) => {
      const errorMsg = `Failed to load: ${e.target.src}`;
      console.error("❌ Image load error:", errorMsg);
      setImageError(errorMsg);
      setIsLoading(false);
      if (onError) onError(e);
    };

    const handleLoad = (e) => {
      console.log("✅ Image loaded successfully:", e.target.src);
      setIsLoading(false);
      if (onLoad) onLoad(e);
    };

    const imageUrl = apiService.getMediaUrl(media.media_url);
    
    if (failedImages.has(media.media_url) || imageError) {
      return <ImageFallback className={className} error={imageError} />;
    }

    return (
      <div className="relative">
        {isLoading && (
          <div className={`${className} bg-gray-200 flex items-center justify-center`}>
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={alt}
          className={`${className} ${isLoading ? 'hidden' : ''}`}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    );
  };

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
      
      const response = await apiService.getMyPosts({
        limit: 50,
      });
      
      console.log("📦 Full API Response:", response);
      console.log("📝 Posts data:", response.data);
      
      if (response.data && response.data.length > 0) {
        const firstPost = response.data[0];
        console.log("🔍 First post complete data:", firstPost);
        console.log("🖼️ Media field:", firstPost.media);
        console.log("🖼️ Media type:", typeof firstPost.media);
        console.log("🖼️ Media is array:", Array.isArray(firstPost.media));
        
        const parsedMedia = parseMediaField(firstPost.media);
        console.log("🖼️ Parsed media:", parsedMedia);
        console.log("🖼️ Parsed media length:", parsedMedia?.length);
        
        if (parsedMedia && parsedMedia.length > 0) {
          console.log("📸 First media item:", parsedMedia[0]);
          console.log("🔗 Media URL field:", parsedMedia[0].media_url);
          console.log("🔗 All media fields:", Object.keys(parsedMedia[0]));
          
          const originalUrl = parsedMedia[0].media_url;
          const constructedUrl = apiService.getMediaUrl(originalUrl);
          console.log("🔗 Original URL:", originalUrl);
          console.log("🔗 Constructed URL:", constructedUrl);
          console.log("🔗 Base URL:", apiService.baseURL);
        }
      }
      
      setPosts(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching my posts:", error);
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

  const renderPost = (post) => {
    const user = post.user || {
      full_name: "Current User",
      userType: "student",
    };
    
    // Parse media field properly
    const mediaArray = parseMediaField(post.post_media);
    const hasMedia = mediaArray && mediaArray.length > 0;
    
    console.log(`🎨 Rendering post ${post.post_id}:`, {
      originalMedia: post.media,
      parsedMedia: mediaArray,
      hasMedia,
      mediaLength: mediaArray?.length,
    });

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

          {/* Enhanced Media Display */}
          {hasMedia && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">
                Media count: {mediaArray.length} | First media type: {mediaArray[0]?.media_type}
              </p>
              
              {mediaArray.length === 1 ? (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  {mediaArray[0].media_type === "image" ? (
                    <MediaImage
                      media={mediaArray[0]}
                      className="w-full max-h-96 object-cover"
                      alt="Post media"
                      onError={(e) => {
                        setFailedImages(prev => new Set([...prev, mediaArray[0].media_url]));
                      }}
                    />
                  ) : (
                    <video
                      src={apiService.getMediaUrl(mediaArray[0].media_url)}
                      controls
                      className="w-full max-h-96"
                      onError={(e) => {
                        console.error("❌ Failed to load video:", e.target.src);
                      }}
                      onLoadedData={() => {
                        console.log("✅ Video loaded successfully");
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                  {mediaArray.slice(0, 4).map((media, index) => (
                    <div
                      key={media.media_id || index}
                      className="relative border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {media.media_type === "image" ? (
                        <MediaImage
                          media={media}
                          className="w-full h-32 object-cover"
                          alt={`Post media ${index + 1}`}
                          onError={(e) => {
                            setFailedImages(prev => new Set([...prev, media.media_url]));
                          }}
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-900 flex items-center justify-center">
                          <Video className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {index === 3 && mediaArray.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                          +{mediaArray.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
              <p><strong>Debug:</strong></p>
              <p>Media field type: {typeof post.media}</p>
              <p>Media content: {JSON.stringify(post.media)}</p>
              <p>Has media: {hasMedia ? 'Yes' : 'No'}</p>
              <p>Media count: {mediaArray.length}</p>
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