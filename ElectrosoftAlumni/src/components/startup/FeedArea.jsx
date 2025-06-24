import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  MoreHorizontal,
  ThumbsUp,
} from "lucide-react";

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

  const PostCard = ({ post }) => (
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
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="mt-3">
            <p className="text-sm text-gray-800 leading-relaxed">
              {post.content}
            </p>

            {post.image && (
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
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-0">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
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
