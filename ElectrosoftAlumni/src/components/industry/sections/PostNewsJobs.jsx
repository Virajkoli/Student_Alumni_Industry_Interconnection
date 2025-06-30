import React, { useState } from "react";
import {
  Edit3,
  Calendar,
  User,
  Heart,
  MessageCircle,
  Share2,
  Briefcase,
  Newspaper,
  X,
  Plus,
} from "lucide-react";

const PostNewsJobs = () => {
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [postsData, setPostsData] = useState([
    {
      id: 1,
      type: "job",
      title: "Hiring: Senior React Developer",
      company: "TechStart Solutions",
      author: "HR Team",
      content:
        "We're looking for an experienced React developer to join our growing team. Great compensation, flexible work hours, and exciting projects await!",
      requirements: [
        "3+ years React experience",
        "TypeScript knowledge",
        "Team collaboration",
      ],
      location: "Mumbai, Maharashtra",
      salary: "₹12-18 LPA",
      date: "2 days ago",
      likes: 45,
      comments: 12,
      shares: 8,
    },
    {
      id: 2,
      type: "news",
      title: "AI Revolution in Healthcare Industry",
      company: "HealthTech News",
      author: "Dr. Priya Sharma",
      content:
        "Latest breakthrough in AI-powered diagnostics shows 95% accuracy in early disease detection. This technology could transform healthcare delivery across India.",
      tags: ["AI", "Healthcare", "Innovation"],
      date: "1 day ago",
      likes: 128,
      comments: 24,
      shares: 35,
    },
    {
      id: 3,
      type: "event",
      title: "Tech Conference 2024: Future of Innovation",
      company: "Innovation Hub",
      author: "Event Team",
      content:
        "Join us for the biggest tech conference of the year featuring industry leaders, workshops, and networking opportunities. Early bird registration now open!",
      eventDate: "March 15, 2024",
      location: "Bangalore Convention Center",
      date: "3 days ago",
      likes: 89,
      comments: 16,
      shares: 42,
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    content: "",
    company: "",
    author: "",
    location: "",
    salary: "",
    requirements: "",
  });

  const [addData, setAddData] = useState({
    type: "job",
    title: "",
    content: "",
    company: "",
    author: "",
    location: "",
    salary: "",
    requirements: "",
    tags: "",
    eventDate: "",
  });

  const handleEdit = (post) => {
    setEditingId(post.id);
    setIsModalOpen(true);
    setEditData({
      title: post.title,
      content: post.content,
      company: post.company,
      author: post.author,
      location: post.location || "",
      salary: post.salary || "",
      requirements: post.requirements ? post.requirements.join(", ") : "",
    });
  };

  const handleSave = () => {
    setPostsData(
      postsData.map((post) =>
        post.id === editingId
          ? {
              ...post,
              title: editData.title,
              content: editData.content,
              company: editData.company,
              author: editData.author,
              location: editData.location,
              salary: editData.salary,
              requirements: editData.requirements
                ? editData.requirements.split(",").map((req) => req.trim())
                : [],
            }
          : post
      )
    );
    setEditingId(null);
    setEditData({
      title: "",
      content: "",
      company: "",
      author: "",
      location: "",
      salary: "",
      requirements: "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsModalOpen(false);
    setEditData({
      title: "",
      content: "",
      company: "",
      author: "",
      location: "",
      salary: "",
      requirements: "",
    });
  };

  const handleAdd = () => {
    const newId = Math.max(...postsData.map((post) => post.id)) + 1;
    const newPost = {
      id: newId,
      type: addData.type,
      title: addData.title,
      content: addData.content,
      company: addData.company,
      author: addData.author,
      location: addData.location,
      date: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      ...(addData.type === "job" && {
        salary: addData.salary,
        requirements: addData.requirements
          ? addData.requirements.split(",").map((req) => req.trim())
          : [],
      }),
      ...(addData.type === "news" && {
        tags: addData.tags
          ? addData.tags.split(",").map((tag) => tag.trim())
          : [],
      }),
      ...(addData.type === "event" && {
        eventDate: addData.eventDate,
      }),
    };

    setPostsData([newPost, ...postsData]);
    setIsAddModalOpen(false);
    setAddData({
      type: "job",
      title: "",
      content: "",
      company: "",
      author: "",
      location: "",
      salary: "",
      requirements: "",
      tags: "",
      eventDate: "",
    });
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    setAddData({
      type: "job",
      title: "",
      content: "",
      company: "",
      author: "",
      location: "",
      salary: "",
      requirements: "",
      tags: "",
      eventDate: "",
    });
  };

  const getPostIcon = (type) => {
    switch (type) {
      case "job":
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case "news":
        return <Newspaper className="w-5 h-5 text-green-600" />;
      case "event":
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <Newspaper className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-800";
      case "news":
        return "bg-green-100 text-green-800";
      case "event":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Posts, News & Jobs
          </h2>
          <p className="text-gray-600 mt-1">
            Share updates, opportunities, and industry news
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Post</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Edit Modal */}
        {isModalOpen && editingId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit{" "}
                    {postsData
                      .find((p) => p.id === editingId)
                      ?.type.charAt(0)
                      .toUpperCase() +
                      postsData.find((p) => p.id === editingId)?.type.slice(1)}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editData.company}
                      onChange={(e) =>
                        setEditData({ ...editData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={editData.author}
                      onChange={(e) =>
                        setEditData({ ...editData, author: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter author name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter content"
                  />
                </div>

                {postsData.find((p) => p.id === editingId)?.type === "job" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              location: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter job location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Salary
                        </label>
                        <input
                          type="text"
                          value={editData.salary}
                          onChange={(e) =>
                            setEditData({ ...editData, salary: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter salary range"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Requirements (comma-separated)
                      </label>
                      <textarea
                        value={editData.requirements}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            requirements: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter requirements separated by commas"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Add New Post
                  </h2>
                  <button
                    onClick={handleAddCancel}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Post Type
                    </label>
                    <select
                      value={addData.type}
                      onChange={(e) =>
                        setAddData({ ...addData, type: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="job">Job Posting</option>
                      <option value="news">News Article</option>
                      <option value="event">Event Announcement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      value={addData.company}
                      onChange={(e) =>
                        setAddData({ ...addData, company: e.target.value })
                      }
                      placeholder="Enter company name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={addData.title}
                      onChange={(e) =>
                        setAddData({ ...addData, title: e.target.value })
                      }
                      placeholder="Enter post title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={addData.author}
                      onChange={(e) =>
                        setAddData({ ...addData, author: e.target.value })
                      }
                      placeholder="Enter author name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={addData.content}
                    onChange={(e) =>
                      setAddData({ ...addData, content: e.target.value })
                    }
                    rows={4}
                    placeholder="Write your post content here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {addData.type === "job" && (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={addData.location}
                          onChange={(e) =>
                            setAddData({ ...addData, location: e.target.value })
                          }
                          placeholder="Enter job location"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Salary
                        </label>
                        <input
                          type="text"
                          value={addData.salary}
                          onChange={(e) =>
                            setAddData({ ...addData, salary: e.target.value })
                          }
                          placeholder="e.g., ₹12-18 LPA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Requirements (comma-separated)
                      </label>
                      <textarea
                        value={addData.requirements}
                        onChange={(e) =>
                          setAddData({
                            ...addData,
                            requirements: e.target.value,
                          })
                        }
                        rows={3}
                        placeholder="e.g., 3+ years React experience, TypeScript knowledge, Team collaboration"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {addData.type === "news" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={addData.tags}
                      onChange={(e) =>
                        setAddData({ ...addData, tags: e.target.value })
                      }
                      placeholder="e.g., AI, Healthcare, Innovation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {addData.type === "event" && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date
                      </label>
                      <input
                        type="text"
                        value={addData.eventDate}
                        onChange={(e) =>
                          setAddData({ ...addData, eventDate: e.target.value })
                        }
                        placeholder="e.g., March 15, 2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={addData.location}
                        onChange={(e) =>
                          setAddData({ ...addData, location: e.target.value })
                        }
                        placeholder="Enter event location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={handleAddCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        {postsData.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {getPostIcon(post.type)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getPostTypeColor(
                          post.type
                        )}`}
                      >
                        {post.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="font-medium">{post.company}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Post"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {post.content}
              </p>

              {post.type === "job" && post.requirements && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Requirements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {post.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {req}
                      </li>
                    ))}
                  </ul>
                  {post.location && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">📍 {post.location}</span>
                      <span className="text-green-600 font-semibold">
                        {post.salary}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {post.type === "event" && post.eventDate && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">
                      📅 Event Date: {post.eventDate}
                    </span>
                    <span className="text-gray-700">📍 {post.location}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
                <div className="flex space-x-3">
                  {post.type === "job" && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Apply Now
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Active Jobs</h4>
          <p className="text-2xl font-bold">125</p>
          <p className="text-blue-100 text-sm">Posted this month</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <h4 className="text-lg font-semibold">News Articles</h4>
          <p className="text-2xl font-bold">48</p>
          <p className="text-green-100 text-sm">Published this week</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Events</h4>
          <p className="text-2xl font-bold">12</p>
          <p className="text-purple-100 text-sm">Upcoming events</p>
        </div>
      </div>
    </div>
  );
};

export default PostNewsJobs;
