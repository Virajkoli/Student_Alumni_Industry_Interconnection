import React, { useState } from "react";
import {
  MessageCircle,
  Share2,
  Send,
  MoreHorizontal,
  ThumbsUp,
  Edit,
  Save,
  X,
} from "lucide-react";

// Move PostCard component outside to prevent re-creation on each render
const PostCard = ({
  post,
  editingPostId,
  editedContent,
  handleEditPost,
  handleSaveEdit,
  handleCancelEdit,
  handleLike,
  setEditedContent,
}) => (
  <div className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 transition-colors">
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
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
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
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
                  className="p-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
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
                className="p-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                title="Edit this post"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="mt-3">
          {editingPostId === post.id ? (
            <div className="space-y-3">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows="4"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm leading-relaxed"
                placeholder="What's on your mind?"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
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
        </div>

        {editingPostId !== post.id && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
                  post.liked
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`}
                />
                <span className="text-sm">{post.likes}</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.comments}</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">{post.shares}</span>
              </button>
            </div>

            <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Send className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Send</span>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const FeedArea = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Startup",
        title: "Startup Founder, Innovator, and Entrepreneur",
        avatar: "S",
        verified: true,
      },
      content:
        "🚀 Excited to announce our latest AI breakthrough! Our machine learning model has achieved 98% accuracy in predicting market trends. This is a game-changer for retail businesses looking to optimize their inventory. #AI #MachineLearning #StartupLife",
      timestamp: "2h",
      likes: 127,
      comments: 23,
      shares: 8,
      image: null,
      liked: false,
    },
    {
      id: 2,
      author: {
        name: "Startup",
        title: "Startup Founder, Innovator, and Entrepreneur",
        avatar: "S",
        verified: true,
      },
      content:
        "🌱 Just completed our Series A funding round! $5M raised to expand our carbon footprint tracking platform. Special thanks to all our investors who believe in our mission to make sustainability accessible to every business. The future is green! 💚",
      timestamp: "4h",
      likes: 89,
      comments: 15,
      shares: 12,
      image: "/api/placeholder/500/300",
      liked: true,
    },
    {
      id: 3,
      author: {
        name: "Startup",
        title: "Startup Founder, Innovator, and Entrepreneur",
        avatar: "S",
        verified: true,
      },
      content:
        "💡 Building the future of digital payments! Our new blockchain-based payment system reduces transaction fees by 70%. Beta testing starts next month. DM us if you're interested in early access! #FinTech #Blockchain #Innovation",
      timestamp: "6h",
      likes: 234,
      comments: 41,
      shares: 19,
      image: null,
      liked: false,
    },
  ]);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleEditPost = (postId, currentContent) => {
    setEditingPostId(postId);
    setEditedContent(currentContent);
  };

  const handleSaveEdit = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, content: editedContent } : post
      )
    );
    setEditingPostId(null);
    setEditedContent("");
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedContent("");
  };

  return (
    <div className="space-y-0">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          editingPostId={editingPostId}
          editedContent={editedContent}
          handleEditPost={handleEditPost}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          handleLike={handleLike}
          setEditedContent={setEditedContent}
        />
      ))}

      <div className="p-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Load more posts...
        </button>
      </div>
    </div>
  );
};

export default FeedArea;
