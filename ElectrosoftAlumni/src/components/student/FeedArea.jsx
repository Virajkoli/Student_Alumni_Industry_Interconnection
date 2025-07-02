import React, { useState } from "react";
import { Heart, MessageCircle, Share2, BookmarkPlus, MoreHorizontal, Clock, Users } from "lucide-react";

const FeedArea = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Priya P",
        title: "Computer Engineering Student",
        avatar: "P",
        timeAgo: "2 hours ago"
      },
      content: "Just completed my first full-stack web application! Built with React and Node.js. The project includes user authentication, data visualization, and real-time chat features. Really excited to share this milestone with everyone! 🚀",
      type: "text",
      engagement: {
        likes: 24,
        comments: 8,
        shares: 3
      },
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      author: {
        name: "Rajesh Kumar",
        title: "Senior Developer at Tech Solutions",
        avatar: "R",
        timeAgo: "5 hours ago"
      },
      content: "Looking for motivated Computer Engineering students for internship opportunities! We're working on cutting-edge AI projects. Requirements: Strong programming fundamentals, eagerness to learn, and team collaboration skills.",
      type: "opportunity",
      tags: ["Internship", "AI", "Programming"],
      engagement: {
        likes: 42,
        comments: 15,
        shares: 8
      },
      liked: true,
      bookmarked: true
    },
    {
      id: 3,
      author: {
        name: "Tech Community",
        title: "Professional Network",
        avatar: "T",
        timeAgo: "1 day ago"
      },
      content: "Poll: Which technology are you most excited to learn in 2024?",
      type: "poll",
      pollOptions: [
        { text: "Machine Learning & AI", votes: 156, percentage: 45 },
        { text: "Cloud Computing", votes: 89, percentage: 26 },
        { text: "Blockchain", votes: 67, percentage: 19 },
        { text: "IoT Development", votes: 34, percentage: 10 }
      ],
      totalVotes: 346,
      userVoted: "Machine Learning & AI",
      engagement: {
        likes: 89,
        comments: 23,
        shares: 12
      },
      liked: false,
      bookmarked: false
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            engagement: {
              ...post.engagement,
              likes: post.liked ? post.engagement.likes - 1 : post.engagement.likes + 1
            }
          }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
    ));
  };

  const handlePollVote = (postId, option) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.type === 'poll') {
        return {
          ...post,
          userVoted: option.text,
          pollOptions: post.pollOptions.map(opt => ({
            ...opt,
            votes: opt.text === option.text ? opt.votes + 1 : opt.votes
          })),
          totalVotes: post.totalVotes + 1
        };
      }
      return post;
    }));
  };

  const renderPost = (post) => {
    return (
      <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:shadow-sm transition-shadow">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {post.author.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{post.author.name}</h4>
              <p className="text-gray-600 text-xs">{post.author.title}</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <Clock className="w-3 h-3" />
                <span>{post.author.timeAgo}</span>
              </div>
            </div>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 text-sm leading-relaxed mb-3">{post.content}</p>
          
          {/* Tags for opportunity posts */}
          {post.type === 'opportunity' && post.tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Poll */}
          {post.type === 'poll' && (
            <div className="border border-gray-200 rounded-lg p-4 mt-3">
              <div className="space-y-3">
                {post.pollOptions.map((option, index) => {
                  const isVoted = post.userVoted === option.text;
                  return (
                    <div key={index} className="relative">
                      <button
                        onClick={() => !post.userVoted && handlePollVote(post.id, option)}
                        disabled={!!post.userVoted}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          isVoted 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : post.userVoted
                            ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-default'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{option.text}</span>
                          {post.userVoted && (
                            <span className="text-xs text-gray-500">
                              {option.votes} votes ({option.percentage}%)
                            </span>
                          )}
                        </div>
                        {post.userVoted && (
                          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                isVoted ? 'bg-blue-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${option.percentage}%` }}
                            />
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              {post.userVoted && (
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{post.totalVotes} people voted</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center gap-2 text-sm transition-colors ${
                post.liked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
              <span>{post.engagement.likes}</span>
            </button>
            
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{post.engagement.comments}</span>
            </button>
            
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>{post.engagement.shares}</span>
            </button>
          </div>

          <button
            onClick={() => handleBookmark(post.id)}
            className={`p-2 rounded-full transition-colors ${
              post.bookmarked 
                ? 'text-blue-500 bg-blue-50 hover:bg-blue-100' 
                : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
            }`}
            title={post.bookmarked ? "Remove bookmark" : "Bookmark post"}
          >
            <BookmarkPlus className={`w-4 h-4 ${post.bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map(renderPost)
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 text-sm">
            Start connecting with your network to see posts and updates here.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedArea;
