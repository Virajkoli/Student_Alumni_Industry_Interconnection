import React, { useState } from "react";
import { Edit3, User, Calendar, Play, MessageCircle, X } from "lucide-react";

const ExpertOpinionsInterview = () => {
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      title: "The Future of AI in Healthcare",
      expert: "Dr. Sarah Johnson",
      role: "Chief Medical Officer, TechHealth Solutions",
      date: "Dec 20, 2024",
      type: "Video Interview",
      duration: "45 min",
      description:
        "Exploring how artificial intelligence is revolutionizing patient care, diagnosis, and treatment protocols in modern healthcare systems.",
      tags: ["AI", "Healthcare", "Innovation"],
      views: "12.5K",
      likes: "890",
    },
    {
      id: 2,
      title: "Sustainable Tech: Building Green Solutions",
      expert: "Mark Thompson",
      role: "Sustainability Director, EcoTech Corp",
      date: "Dec 18, 2024",
      type: "Written Interview",
      duration: "15 min read",
      description:
        "An in-depth discussion about creating environmentally conscious technology solutions and the importance of sustainable development practices.",
      tags: ["Sustainability", "GreenTech", "Environment"],
      views: "8.3K",
      likes: "645",
    },
    {
      id: 3,
      title: "Cybersecurity in the Remote Work Era",
      expert: "Jennifer Chen",
      role: "CISO, SecureNet Industries",
      date: "Dec 15, 2024",
      type: "Panel Discussion",
      duration: "60 min",
      description:
        "Panel discussion covering the latest cybersecurity challenges and solutions for distributed teams and remote work environments.",
      tags: ["Cybersecurity", "Remote Work", "Security"],
      views: "15.2K",
      likes: "1.2K",
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    expert: "",
    role: "",
    description: "",
    tags: "",
  });

  const handleEdit = (interview) => {
    setEditingId(interview.id);
    setIsEditModalOpen(true);
    setEditData({
      title: interview.title,
      expert: interview.expert,
      role: interview.role,
      description: interview.description,
      tags: interview.tags.join(", "),
    });
  };

  const handleSave = () => {
    setInterviews(
      interviews.map((interview) =>
        interview.id === editingId
          ? {
              ...interview,
              title: editData.title,
              expert: editData.expert,
              role: editData.role,
              description: editData.description,
              tags: editData.tags.split(",").map((tag) => tag.trim()),
            }
          : interview
      )
    );
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditData({ title: "", expert: "", role: "", description: "", tags: "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditData({ title: "", expert: "", role: "", description: "", tags: "" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Expert Opinions & Interviews
          </h2>
          <p className="text-gray-600 mt-1">
            Gain insights from industry leaders and experts
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Interview
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Expert Interview
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
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expert Name
                  </label>
                  <input
                    type="text"
                    value={editData.expert}
                    onChange={(e) =>
                      setEditData({ ...editData, expert: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={editData.role}
                    onChange={(e) =>
                      setEditData({ ...editData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editData.tags}
                  onChange={(e) =>
                    setEditData({ ...editData, tags: e.target.value })
                  }
                  placeholder="AI, Healthcare, Innovation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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

      <div className="space-y-6">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* View Mode */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {interview.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{interview.expert}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{interview.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="w-4 h-4" />
                      <span>{interview.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {interview.role}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(interview)}
                  className="ml-4 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Interview"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {interview.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-wrap gap-2">
                    {interview.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{interview.views} views</span>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{interview.likes} likes</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Watch Interview</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Share
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertOpinionsInterview;
