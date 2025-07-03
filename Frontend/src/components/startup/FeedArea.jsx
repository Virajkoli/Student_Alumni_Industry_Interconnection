import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Share2,
  Send,
  MoreHorizontal,
  ThumbsUp,
  Edit,
  Save,
  X,
  Download,
  FileText,
  Video,
  Image,
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
      attachments: []
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
      attachments: []
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
      attachments: []
    },
  ]);
  
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [showDropdownId, setShowDropdownId] = useState(null);

  // Load posts from localStorage on component mount and when new posts are added
  useEffect(() => {
    const loadPosts = () => {
      const savedPosts = JSON.parse(localStorage.getItem('feedPosts') || '[]');
      setPosts(prevPosts => {
        // Merge saved posts with default posts, keeping saved posts at the top
        const defaultPosts = [
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
            attachments: []
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
            attachments: []
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
            attachments: []
          },
        ];
        return [...savedPosts, ...defaultPosts];
      });
    };

    loadPosts();

    // Listen for new post events
    const handleNewPost = () => {
      loadPosts();
    };

    window.addEventListener('newPost', handleNewPost);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdownId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('newPost', handleNewPost);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        post.id === postId
          ? { ...post, content: editedContent }
          : post
      )
    );
    setEditingPostId(null);
    setEditedContent("");
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedContent("");
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // Remove from state
      setPosts(posts.filter(post => post.id !== postId));
      
      // Update localStorage
      const savedPosts = JSON.parse(localStorage.getItem('feedPosts') || '[]');
      const updatedSavedPosts = savedPosts.filter(post => post.id !== postId);
      localStorage.setItem('feedPosts', JSON.stringify(updatedSavedPosts));
      
      setShowDropdownId(null);
    }
  };

  const handleDownload = (attachment) => {
    // Check if file is stored locally
    if (attachment.storedLocally && (attachment.fileData || attachment.url)) {
      const dataUrl = attachment.fileData || attachment.url;
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Sorry, this ${attachment.type} file is not stored locally and cannot be downloaded. This feature will be available when connected to a backend server.`);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'photo') return <Image className="w-6 h-6" style={{ color: '#1F2D3D' }} />;
    if (fileType === 'video') return <Video className="w-6 h-6" style={{ color: '#1F2D3D' }} />;
    if (fileType === 'document') return <FileText className="w-6 h-6" style={{ color: '#1F2D3D' }} />;
    return <FileText className="w-6 h-6" style={{ color: '#1F2D3D' }} />;
  };

  const PostCard = ({ post }) => (
    <div className="border-b last:border-b-0 p-4 hover:opacity-95 transition-colors" style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC' }}>
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, #6EA9CB, #B5D3E7)' }}>
          {post.author.avatar}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1">
                <h4 className="font-semibold text-sm" style={{ color: '#1F2D3D' }}>
                  {post.author.name}
                </h4>
                {post.author.verified && (
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6EA9CB' }}>
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-xs" style={{ color: '#1F2D3D', opacity: '0.7' }}>{post.author.title}</p>
              <p className="text-xs" style={{ color: '#1F2D3D', opacity: '0.5' }}>{post.timestamp} ago</p>
            </div>
            <div className="flex items-center space-x-2">
              {editingPostId === post.id ? (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleSaveEdit(post.id)}
                    className="p-1.5 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm border"
                    style={{ backgroundColor: '#6EA9CB', borderColor: '#6EA9CB' }}
                    title="Save changes"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1.5 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm border"
                    style={{ color: '#1F2D3D', backgroundColor: '#DCE8F2', borderColor: '#DCE8F2' }}
                    title="Cancel editing"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditPost(post.id, post.content)}
                  className="p-1.5 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm border"
                  style={{ backgroundColor: '#6EA9CB', borderColor: '#6EA9CB' }}
                  title="Edit this post"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setShowDropdownId(showDropdownId === post.id ? null : post.id)}
                  className="p-1 hover:opacity-75 rounded-full"
                  style={{ backgroundColor: '#DCE8F2' }}
                >
                  <MoreHorizontal className="w-4 h-4" style={{ color: '#1F2D3D' }} />
                </button>
                
                {showDropdownId === post.id && (
                  <div className="absolute right-0 top-8 border rounded-lg shadow-lg z-10 min-w-[120px]" style={{ backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="w-full px-4 py-2 text-left rounded-lg text-sm transition-colors"
                      style={{ color: '#1F2D3D' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#DCE8F2'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm leading-relaxed"
                style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D', '--tw-ring-color': '#6EA9CB' }}
                placeholder="What's on your mind?"
                autoFocus
              />
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  style={{ color: '#1F2D3D', backgroundColor: '#DCE8F2' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#B5D3E7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#DCE8F2'}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveEdit(post.id)}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                  style={{ backgroundColor: '#6EA9CB' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: '#1F2D3D' }}>
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
          {post.attachments && post.attachments.length > 0 && editingPostId !== post.id && (
            <div className="mt-3 space-y-2">
              <h4 className="text-sm font-medium" style={{ color: '#1F2D3D' }}>Attachments:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {post.attachments.map((attachment, index) => (
                  <div key={attachment.id || index} className="border rounded-lg p-3 hover:opacity-95 transition-colors" style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC' }}>
                    {attachment.type === 'photo' && (
                      <div className="space-y-2">
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="w-full h-32 object-cover rounded cursor-pointer"
                          onClick={() => window.open(attachment.url, '_blank')}
                        />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium truncate" style={{ color: '#1F2D3D' }}>{attachment.name}</p>
                            <p className="text-xs" style={{ color: '#1F2D3D', opacity: '0.6' }}>{formatFileSize(attachment.size)}</p>
                          </div>
                          <button
                            onClick={() => handleDownload(attachment)}
                            className="p-1 rounded transition-colors"
                            style={{ color: '#6EA9CB' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#DCE8F2'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {attachment.type === 'video' && (
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
                          <div className="w-full h-32 rounded flex items-center justify-center" style={{ backgroundColor: '#DCE8F2' }}>
                            <div className="text-center">
                              <Video className="w-8 h-8 mx-auto mb-2" style={{ color: '#1F2D3D' }} />
                              <p className="text-xs" style={{ color: '#1F2D3D' }}>{attachment.previewText || 'Video file'}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium truncate" style={{ color: '#1F2D3D' }}>{attachment.name}</p>
                            <p className="text-xs" style={{ color: '#1F2D3D', opacity: '0.6' }}>{formatFileSize(attachment.size)}</p>
                          </div>
                          <button
                            onClick={() => handleDownload(attachment)}
                            className="p-1 rounded transition-colors"
                            style={{ color: '#6EA9CB' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#DCE8F2'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {attachment.type === 'document' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DCE8F2' }}>
                          {getFileIcon(attachment.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: '#1F2D3D' }}>{attachment.name}</p>
                          <p className="text-xs" style={{ color: '#1F2D3D', opacity: '0.6' }}>{formatFileSize(attachment.size)}</p>
                          {attachment.previewText && (
                            <p className="text-xs" style={{ color: '#6EA9CB' }}>{attachment.previewText}</p>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          {attachment.fileData && (
                            <button
                              onClick={() => window.open(attachment.fileData, '_blank')}
                              className="p-1 rounded transition-colors"
                              style={{ color: '#6EA9CB' }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#DCE8F2'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              title="Open"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => handleDownload(attachment)}
                            className="p-1 rounded transition-colors"
                            style={{ color: '#6EA9CB' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#DCE8F2'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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
        </div> {/* End .mt-3 */}
      </div> {/* End .flex-1 */}
    </div> {/* End .flex.items-start */}
  </div> /* End .border-b */
);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedArea;
