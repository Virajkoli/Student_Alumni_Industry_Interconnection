import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Eye } from "lucide-react";

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
            <span className="text-xs text-gray-400">{post.timestamp}</span>
          </div>
          <p className="mt-2 text-gray-800 text-sm">{post.content}</p>
          {post.image && (
            <img src={post.image} alt="Post" className="mt-3 rounded-lg w-full max-h-60 object-cover" />
          )}
          <div className="flex items-center space-x-6 mt-3 text-gray-500 text-xs">
            <button onClick={() => handleLike(post.id)} className="flex items-center space-x-1">
              <Heart className={`w-4 h-4 ${post.liked ? 'text-green-500' : ''}`} />
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

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedArea;
