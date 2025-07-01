import React, { useState, useCallback, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  MoreHorizontal,
  Edit,
  Save,
  X,
  Download,
  FileText,
  Video,
  Image,
} from "lucide-react";

const FeedArea = () => {
  // Default/sample posts
  const defaultPosts = [
    {
      id: 1,
      author: {
        name: "IndustryTech Ltd.",
        title: "Manufacturing Sector",
        avatar: "I",
        verified: true,
      },
      content:
        "🏭 New automation technology is revolutionizing the manufacturing sector! #Industry4.0 #Automation",
      timestamp: "1h",
      likes: 45,
      comments: 7,
      shares: 3,
      image: null,
      liked: false,
      attachments: [],
    },
    {
      id: 2,
      author: {
        name: "GreenEnergy Corp.",
        title: "Renewable Energy",
        avatar: "G",
        verified: false,
      },
      content:
        "🌱 Our solar project just went live, powering 10,000+ homes! #GreenEnergy #Sustainability",
      timestamp: "3h",
      likes: 32,
      comments: 5,
      shares: 2,
      image: null,
      liked: true,
      attachments: [],
    },
  ];

  const [posts, setPosts] = useState(defaultPosts);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [showDropdownId, setShowDropdownId] = useState(null);

  // Load posts from localStorage and combine with default posts
  const loadPosts = useCallback(() => {
    try {
      const storedPosts = JSON.parse(
        localStorage.getItem("industryFeedPosts") || "[]"
      );
      // Combine stored posts with default posts, with stored posts first
      const combinedPosts = [...storedPosts, ...defaultPosts];
      // Remove duplicates based on ID (favor stored posts)
      const uniquePosts = combinedPosts.filter(
        (post, index, self) => index === self.findIndex((p) => p.id === post.id)
      );
      setPosts(uniquePosts);
    } catch (error) {
      console.error("Error loading posts from localStorage:", error);
      setPosts(defaultPosts);
    }
  }, []);

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Listen for new post events and close dropdown on outside click
  useEffect(() => {
    const handleNewPost = () => {
      loadPosts();
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowDropdownId(null);
      }
    };

    window.addEventListener("newIndustryPost", handleNewPost);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("newIndustryPost", handleNewPost);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [loadPosts]);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        : post
    );
    setPosts(updatedPosts);

    // Update localStorage with liked posts
    try {
      const storedPosts = JSON.parse(
        localStorage.getItem("industryFeedPosts") || "[]"
      );
      const updatedStoredPosts = storedPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      );
      localStorage.setItem(
        "industryFeedPosts",
        JSON.stringify(updatedStoredPosts)
      );
    } catch (error) {
      console.error("Error updating like in localStorage:", error);
    }
  };

  const handleEditPost = (postId, currentContent) => {
    setEditingPostId(postId);
    setEditedContent(currentContent);
  };

  const handleSaveEdit = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, content: editedContent } : post
    );
    setPosts(updatedPosts);

    // Update localStorage with edited posts
    try {
      const storedPosts = JSON.parse(
        localStorage.getItem("industryFeedPosts") || "[]"
      );
      const updatedStoredPosts = storedPosts.map((post) =>
        post.id === postId ? { ...post, content: editedContent } : post
      );
      localStorage.setItem(
        "industryFeedPosts",
        JSON.stringify(updatedStoredPosts)
      );
    } catch (error) {
      console.error("Error updating post in localStorage:", error);
    }

    setEditingPostId(null);
    setEditedContent("");
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedContent("");
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // Remove from state
      setPosts(posts.filter((post) => post.id !== postId));

      // Update localStorage
      const savedPosts = JSON.parse(
        localStorage.getItem("industryFeedPosts") || "[]"
      );
      const updatedSavedPosts = savedPosts.filter((post) => post.id !== postId);
      localStorage.setItem(
        "industryFeedPosts",
        JSON.stringify(updatedSavedPosts)
      );

      setShowDropdownId(null);
    }
  };

  const handleDownload = (attachment) => {
    // Check if file is stored locally
    if (attachment.storedLocally && (attachment.fileData || attachment.url)) {
      const dataUrl = attachment.fileData || attachment.url;
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(
        `Sorry, this ${attachment.type} file is not stored locally and cannot be downloaded. This feature will be available when connected to a backend server.`
      );
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType === "photo") return <Image className="w-6 h-6" />;
    if (fileType === "video") return <Video className="w-6 h-6" />;
    if (fileType === "document") return <FileText className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const PostCard = ({ post }) => (
    <div className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {post.author.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {post.author.name}
                </h4>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600">{post.author.title}</p>
              <p className="text-xs text-gray-500">{post.timestamp} ago</p>
            </div>
            <div className="flex items-center space-x-2">
              {editingPostId === post.id ? (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleSaveEdit(post.id)}
                    className="p-1.5 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200 shadow-sm border border-green-200"
                    title="Save changes"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1.5 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 shadow-sm border border-gray-200"
                    title="Cancel editing"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditPost(post.id, post.content)}
                  className="p-1.5 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200 shadow-sm border border-green-200"
                  title="Edit this post"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <div className="relative dropdown-container">
                <button
                  onClick={() =>
                    setShowDropdownId(
                      showDropdownId === post.id ? null : post.id
                    )
                  }
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>

                {showDropdownId === post.id && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3">
            {editingPostId === post.id ? (
              <div className="space-y-3">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-sm leading-relaxed"
                  placeholder="What's happening in your industry?"
                  autoFocus
                />
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveEdit(post.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-800 leading-relaxed">
                {post.content}
              </p>
            )}

            {post.image && editingPostId !== post.id && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Display Attachments */}
            {post.attachments &&
              post.attachments.length > 0 &&
              editingPostId !== post.id && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Attachments:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {post.attachments.map((attachment, index) => (
                      <div
                        key={attachment.id || index}
                        className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        {attachment.type === "photo" && (
                          <div className="space-y-2">
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-full h-32 object-cover rounded cursor-pointer"
                              onClick={() =>
                                window.open(attachment.url, "_blank")
                              }
                            />
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs font-medium text-gray-900 truncate">
                                  {attachment.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(attachment.size)}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDownload(attachment)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {attachment.type === "video" && (
                          <div className="space-y-2">
                            {attachment.url ? (
                              <video
                                src={attachment.url}
                                controls
                                className="w-full h-32 object-cover rounded"
                              >
                                Your browser does not support video playback.
                              </video>
                            ) : (
                              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                                <div className="text-center">
                                  <Video className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                                  <p className="text-xs text-gray-600">
                                    {attachment.previewText || "Video file"}
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs font-medium text-gray-900 truncate">
                                  {attachment.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(attachment.size)}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDownload(attachment)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {attachment.type === "document" && (
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {getFileIcon(attachment.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(attachment.size)}
                              </p>
                              {attachment.previewText && (
                                <p className="text-xs text-green-500">
                                  {attachment.previewText}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-1">
                              {attachment.fileData && (
                                <button
                                  onClick={() =>
                                    window.open(attachment.fileData, "_blank")
                                  }
                                  className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                  title="Open"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </button>
                              )}
                              <button
                                onClick={() => handleDownload(attachment)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>{" "}
          {/* End .mt-3 */}
          <div className="flex items-center space-x-6 mt-3 text-gray-500 text-xs">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-1"
            >
              <Heart
                className={`w-4 h-4 ${post.liked ? "text-green-500" : ""}`}
              />
              <span>{post.likes}</span>
            </button>
            <span className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>{post.shares}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>View</span>
            </span>
          </div>
        </div>{" "}
        {/* End .flex-1 */}
      </div>{" "}
      {/* End .flex.items-start */}
    </div> /* End .border-b */
  );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedArea;
