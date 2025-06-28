import React, { useState, useCallback } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  MoreHorizontal,
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
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">{post.timestamp}</span>
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
            <img
              src={post.image}
              alt="Post"
              className="mt-3 rounded-lg w-full max-h-60 object-cover"
            />
          )}
        </div>

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
      </div>
    </div>
  </div>
);

const FeedArea = () => {
  const [posts, setPosts] = useState([
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
    <div>
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
    </div>
  );
};

export default FeedArea;
