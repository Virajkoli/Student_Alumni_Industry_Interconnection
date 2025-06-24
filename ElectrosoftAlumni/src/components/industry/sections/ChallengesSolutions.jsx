import React, { useState } from "react";
import {
  Edit3,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

const ChallengesSolutions = () => {
  const [editingId, setEditingId] = useState(null);
  const [challengeSolutions, setChallengeSolutions] = useState([
    {
      id: 1,
      challenge: "Supply Chain Disruptions",
      description:
        "Global supply chain interruptions causing delays, increased costs, and inventory shortages affecting production schedules.",
      impact: "High",
      affectedCompanies: "85%",
      solution: "AI-Powered Supply Chain Optimization",
      solutionDescription:
        "Implementation of predictive analytics, real-time tracking, and diversified supplier networks to create resilient supply chains.",
      implementedBy: ["Amazon", "Walmart", "Unilever"],
      successRate: "78%",
      timeToImplement: "6-12 months",
      costSaving: "25-40%",
      status: "Active",
    },
    {
      id: 2,
      challenge: "Cybersecurity Threats",
      description:
        "Increasing cyber attacks, data breaches, and ransomware threats compromising business operations and customer data.",
      impact: "Critical",
      affectedCompanies: "92%",
      solution: "Zero Trust Security Framework",
      solutionDescription:
        "Comprehensive security model with multi-factor authentication, endpoint protection, and continuous monitoring systems.",
      implementedBy: ["Microsoft", "Google", "IBM"],
      successRate: "89%",
      timeToImplement: "3-8 months",
      costSaving: "60-80%",
      status: "Active",
    },
    {
      id: 3,
      challenge: "Talent Shortage & Skills Gap",
      description:
        "Difficulty in finding qualified professionals with modern technical skills, leading to project delays and increased hiring costs.",
      impact: "High",
      affectedCompanies: "76%",
      solution: "Digital Learning & Upskilling Programs",
      solutionDescription:
        "Comprehensive training platforms, partnerships with educational institutions, and internal mentorship programs.",
      implementedBy: ["Infosys", "TCS", "Accenture"],
      successRate: "72%",
      timeToImplement: "4-10 months",
      costSaving: "35-50%",
      status: "Growing",
    },
    {
      id: 4,
      challenge: "Sustainability Compliance",
      description:
        "Meeting environmental regulations, reducing carbon footprint, and implementing sustainable business practices.",
      impact: "Medium",
      affectedCompanies: "68%",
      solution: "Green Technology Integration",
      solutionDescription:
        "Adoption of renewable energy, waste reduction programs, and sustainable manufacturing processes.",
      implementedBy: ["Tesla", "Patagonia", "IKEA"],
      successRate: "65%",
      timeToImplement: "8-18 months",
      costSaving: "20-35%",
      status: "Emerging",
    },
  ]);

  const [editData, setEditData] = useState({
    challenge: "",
    description: "",
    impact: "Medium",
    affectedCompanies: "",
    solution: "",
    solutionDescription: "",
    implementedBy: "",
    successRate: "",
    timeToImplement: "",
    costSaving: "",
    status: "Active",
  });

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      challenge: item.challenge,
      description: item.description,
      impact: item.impact,
      affectedCompanies: item.affectedCompanies,
      solution: item.solution,
      solutionDescription: item.solutionDescription,
      implementedBy: item.implementedBy.join(", "),
      successRate: item.successRate,
      timeToImplement: item.timeToImplement,
      costSaving: item.costSaving,
      status: item.status,
    });
  };

  const handleSave = () => {
    setChallengeSolutions(
      challengeSolutions.map((item) =>
        item.id === editingId
          ? {
              ...item,
              challenge: editData.challenge,
              description: editData.description,
              impact: editData.impact,
              affectedCompanies: editData.affectedCompanies,
              solution: editData.solution,
              solutionDescription: editData.solutionDescription,
              implementedBy: editData.implementedBy
                .split(",")
                .map((company) => company.trim()),
              successRate: editData.successRate,
              timeToImplement: editData.timeToImplement,
              costSaving: editData.costSaving,
              status: editData.status,
            }
          : item
      )
    );
    setEditingId(null);
    setEditData({
      challenge: "",
      description: "",
      impact: "Medium",
      affectedCompanies: "",
      solution: "",
      solutionDescription: "",
      implementedBy: "",
      successRate: "",
      timeToImplement: "",
      costSaving: "",
      status: "Active",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      challenge: "",
      description: "",
      impact: "Medium",
      affectedCompanies: "",
      solution: "",
      solutionDescription: "",
      implementedBy: "",
      successRate: "",
      timeToImplement: "",
      costSaving: "",
      status: "Active",
    });
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Growing":
        return "bg-blue-100 text-blue-800";
      case "Emerging":
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
            Industry Challenges & Solutions
          </h2>
          <p className="text-gray-600 mt-1">
            Identifying key challenges and innovative solutions driving industry
            transformation
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Challenge
        </button>
      </div>

      <div className="space-y-6">
        {challengeSolutions.map((item) => (
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
                      Challenge Title
                    </label>
                    <input
                      type="text"
                      value={editData.challenge}
                      onChange={(e) =>
                        setEditData({ ...editData, challenge: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Challenge Description
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
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Impact Level
                      </label>
                      <select
                        value={editData.impact}
                        onChange={(e) =>
                          setEditData({ ...editData, impact: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Affected Companies
                      </label>
                      <input
                        type="text"
                        value={editData.affectedCompanies}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            affectedCompanies: e.target.value,
                          })
                        }
                        placeholder="e.g., 85%"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editData.status}
                        onChange={(e) =>
                          setEditData({ ...editData, status: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Growing">Growing</option>
                        <option value="Emerging">Emerging</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Solution Title
                    </label>
                    <input
                      type="text"
                      value={editData.solution}
                      onChange={(e) =>
                        setEditData({ ...editData, solution: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Solution Description
                    </label>
                    <textarea
                      value={editData.solutionDescription}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          solutionDescription: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Implemented By (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editData.implementedBy}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          implementedBy: e.target.value,
                        })
                      }
                      placeholder="Amazon, Walmart, Unilever"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Success Rate
                      </label>
                      <input
                        type="text"
                        value={editData.successRate}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            successRate: e.target.value,
                          })
                        }
                        placeholder="e.g., 78%"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time to Implement
                      </label>
                      <input
                        type="text"
                        value={editData.timeToImplement}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            timeToImplement: e.target.value,
                          })
                        }
                        placeholder="e.g., 6-12 months"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost Saving
                      </label>
                      <input
                        type="text"
                        value={editData.costSaving}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            costSaving: e.target.value,
                          })
                        }
                        placeholder="e.g., 25-40%"
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
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        🚨 {item.challenge}
                      </h3>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Challenge/Solution"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3 mb-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getImpactColor(
                          item.impact
                        )}`}
                      >
                        {item.impact} Impact
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{item.affectedCompanies} affected</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Solution Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="text-lg font-semibold text-green-800">
                      {item.solution}
                    </h4>
                  </div>
                  <p className="text-green-700 mb-4 leading-relaxed">
                    {item.solutionDescription}
                  </p>

                  {/* Solution Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center bg-white p-3 rounded">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-bold text-green-600">
                          {item.successRate}
                        </span>
                      </div>
                      <p className="text-xs text-green-700">Success Rate</p>
                    </div>
                    <div className="text-center bg-white p-3 rounded">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-600">
                          {item.timeToImplement}
                        </span>
                      </div>
                      <p className="text-xs text-blue-700">Implementation</p>
                    </div>
                    <div className="text-center bg-white p-3 rounded">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Lightbulb className="w-4 h-4 text-orange-600" />
                        <span className="text-lg font-bold text-orange-600">
                          {item.costSaving}
                        </span>
                      </div>
                      <p className="text-xs text-orange-700">Cost Saving</p>
                    </div>
                  </div>

                  {/* Implemented By */}
                  <div>
                    <p className="text-sm font-medium text-green-800 mb-2">
                      Successfully Implemented By:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.implementedBy.map((company, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white text-green-700 text-sm rounded-full border border-green-200"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Implementation Guide →
                  </button>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Case Studies
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Get Solution
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 bg-gradient-to-r from-red-50 to-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Challenge Resolution Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <p className="text-2xl font-bold text-red-600">
                {challengeSolutions.length}
              </p>
              <p className="text-sm text-gray-600">Active Challenges</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-green-600">
                {challengeSolutions.length}
              </p>
              <p className="text-sm text-gray-600">Solutions Available</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-blue-600">76%</p>
              <p className="text-sm text-gray-600">Avg Success Rate</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-orange-600">35%</p>
              <p className="text-sm text-gray-600">Avg Cost Saving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSolutions;
