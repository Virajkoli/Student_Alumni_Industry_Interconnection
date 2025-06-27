import React, { useState } from "react";
import {
  Edit3,
  BarChart3,
  MessageCircle,
  Users,
  Clock,
  Plus,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react";

const PollCommentSection = () => {
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [polls, setPolls] = useState([
    {
      id: 1,
      question:
        "What's the biggest challenge facing the tech industry in 2024?",
      type: "multiple",
      options: [
        { id: 1, text: "AI Ethics & Regulation", votes: 145, percentage: 35 },
        { id: 2, text: "Talent Shortage", votes: 89, percentage: 22 },
        { id: 3, text: "Cybersecurity Threats", votes: 98, percentage: 24 },
        { id: 4, text: "Economic Uncertainty", votes: 78, percentage: 19 },
      ],
      totalVotes: 410,
      createdBy: "Industry Research Team",
      createdDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "Active",
      allowComments: true,
      category: "Technology",
    },
    {
      id: 2,
      question:
        "Should companies prioritize remote work or office-first policies?",
      type: "binary",
      options: [
        { id: 1, text: "Remote Work Priority", votes: 234, percentage: 67 },
        { id: 2, text: "Office-First Priority", votes: 115, percentage: 33 },
      ],
      totalVotes: 349,
      createdBy: "HR Leaders Group",
      createdDate: "2024-01-12",
      endDate: "2024-01-31",
      status: "Active",
      allowComments: true,
      category: "Workplace",
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      pollId: 1,
      author: "Sarah Tech Lead",
      content:
        "AI regulation is definitely crucial. We need clear guidelines to ensure responsible development while not stifling innovation.",
      timestamp: "2024-01-16 14:30",
      likes: 12,
      dislikes: 2,
      replies: [],
    },
    {
      id: 2,
      pollId: 1,
      author: "Mike Developer",
      content:
        "Talent shortage is real! We're struggling to find qualified engineers despite competitive offers.",
      timestamp: "2024-01-16 15:45",
      likes: 8,
      dislikes: 1,
      replies: [],
    },
  ]);

  const [editData, setEditData] = useState({
    question: "",
    type: "multiple",
    options: "",
    endDate: "",
    category: "",
    allowComments: true,
  });

  const handleEdit = (poll) => {
    setEditingId(poll.id);
    setIsModalOpen(true);
    setEditData({
      question: poll.question,
      type: poll.type,
      options: poll.options.map((opt) => opt.text).join("\n"),
      endDate: poll.endDate,
      category: poll.category,
      allowComments: poll.allowComments,
    });
  };

  const handleSave = () => {
    const optionsArray = editData.options
      .split("\n")
      .filter((opt) => opt.trim())
      .map((opt, index) => ({
        id: index + 1,
        text: opt.trim(),
        votes: 0,
        percentage: 0,
      }));

    setPolls(
      polls.map((poll) =>
        poll.id === editingId
          ? {
              ...poll,
              question: editData.question,
              type: editData.type,
              options: optionsArray,
              endDate: editData.endDate,
              category: editData.category,
              allowComments: editData.allowComments,
              totalVotes: 0,
            }
          : poll
      )
    );
    setEditingId(null);
    setIsModalOpen(false);
    setEditData({
      question: "",
      type: "multiple",
      options: "",
      endDate: "",
      category: "",
      allowComments: true,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsModalOpen(false);
    setEditData({
      question: "",
      type: "multiple",
      options: "",
      endDate: "",
      category: "",
      allowComments: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Ended":
        return "bg-gray-100 text-gray-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Polls & Community Discussion
          </h2>
          <p className="text-gray-600 mt-1">
            Voice your opinion and engage with industry professionals
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Poll</span>
        </button>
      </div>

      <div className="space-y-6">
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {isModalOpen && editingId === poll.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Edit Poll
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
                    {/* Poll Question */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Poll Question
                      </label>
                      <input
                        type="text"
                        value={editData.question}
                        onChange={(e) =>
                          setEditData({ ...editData, question: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your question"
                      />
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Poll Type
                        </label>
                        <select
                          value={editData.type}
                          onChange={(e) =>
                            setEditData({ ...editData, type: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="multiple">Multiple Choice</option>
                          <option value="binary">Yes/No</option>
                          <option value="rating">Rating Scale</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={editData.category}
                          onChange={(e) =>
                            setEditData({ ...editData, category: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Workplace">Workplace</option>
                          <option value="Industry">Industry</option>
                          <option value="Business">Business</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={editData.endDate}
                          onChange={(e) =>
                            setEditData({ ...editData, endDate: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Poll Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Poll Options (one per line)
                      </label>
                      <textarea
                        value={editData.options}
                        onChange={(e) =>
                          setEditData({ ...editData, options: e.target.value })
                        }
                        rows={4}
                        placeholder="Option 1&#10;Option 2&#10;Option 3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Allow Comments */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allowComments"
                        checked={editData.allowComments}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            allowComments: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="allowComments"
                        className="text-sm font-medium text-gray-700"
                      >
                        Allow comments on this poll
                      </label>
                    </div>
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

            {/* View Mode */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {poll.question}
                    </h3>
                    <button
                      onClick={() => handleEdit(poll)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Poll"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        poll.status
                      )}`}
                    >
                      {poll.status}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {poll.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{poll.totalVotes} votes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        Ends {new Date(poll.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poll Options */}
              <div className="mb-6">
                <div className="space-y-3">
                  {poll.options.map((option) => (
                    <div
                      key={option.id}
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-900">{option.text}</span>
                        <span className="text-sm font-medium text-gray-600">
                          {option.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {option.votes} votes
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Vote Now
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {poll.allowComments && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      Comments (
                      {comments.filter((c) => c.pollId === poll.id).length})
                    </span>
                  </div>

                  <div className="space-y-4">
                    {comments
                      .filter((comment) => comment.pollId === poll.id)
                      .map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{comment.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm">
                                {comment.dislikes}
                              </span>
                            </button>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="mt-4">
                    <textarea
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="mt-2 flex justify-end">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Poll Statistics */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Community Engagement
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">
                {polls.length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Active Polls</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">
                {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total Votes</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MessageCircle className="w-6 h-6 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">
                {comments.length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Comments</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-orange-600 mr-2" />
              <span className="text-2xl font-bold text-orange-600">
                {polls.filter((p) => p.status === "Active").length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Ongoing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCommentSection;
