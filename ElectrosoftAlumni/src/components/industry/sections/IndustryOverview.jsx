import React, { useState } from "react";
import { Edit3, TrendingUp, Users, Zap, Target } from "lucide-react";

const IndustryOverview = () => {
  const [editingId, setEditingId] = useState(null);
  const [overviewData, setOverviewData] = useState([
    {
      id: 1,
      title: "Technology Sector Growth",
      description:
        "The technology sector continues to show unprecedented growth with AI, cloud computing, and cybersecurity leading the charge.",
      stats: "25% YoY Growth",
      icon: "📱",
      category: "Technology",
    },
    {
      id: 2,
      title: "Healthcare Innovation",
      description:
        "Digital health solutions, telemedicine, and biotechnology are transforming healthcare delivery and patient outcomes.",
      stats: "18% Market Share",
      icon: "🏥",
      category: "Healthcare",
    },
    {
      id: 3,
      title: "Financial Services Evolution",
      description:
        "Fintech disruption, cryptocurrency adoption, and digital banking are reshaping the financial landscape.",
      stats: "$2.3T Market Size",
      icon: "💰",
      category: "Finance",
    },
    {
      id: 4,
      title: "Sustainable Energy",
      description:
        "Renewable energy sources, smart grids, and energy storage solutions are driving the green energy revolution.",
      stats: "35% Growth Rate",
      icon: "🌱",
      category: "Energy",
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    stats: "",
    category: "",
  });

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      title: item.title,
      description: item.description,
      stats: item.stats,
      category: item.category,
    });
  };

  const handleSave = () => {
    setOverviewData(
      overviewData.map((item) =>
        item.id === editingId
          ? {
              ...item,
              title: editData.title,
              description: editData.description,
              stats: editData.stats,
              category: editData.category,
            }
          : item
      )
    );
    setEditingId(null);
    setEditData({ title: "", description: "", stats: "", category: "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ title: "", description: "", stats: "", category: "" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Industry Overview
          </h2>
          <p className="text-gray-600 mt-1">
            Explore latest trends, statistics, and insights across industries
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Industry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {overviewData.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editingId === item.id ? (
              // Edit Mode
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Statistics
                      </label>
                      <input
                        type="text"
                        value={editData.stats}
                        onChange={(e) =>
                          setEditData({ ...editData, stats: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Industry Data"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>{item.stats}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Industries</p>
              <p className="text-2xl font-bold">150+</p>
            </div>
            <Target className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Growth Rate</p>
              <p className="text-2xl font-bold">24%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Companies</p>
              <p className="text-2xl font-bold">50K+</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Innovation</p>
              <p className="text-2xl font-bold">High</p>
            </div>
            <Zap className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryOverview;
