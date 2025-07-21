import React, { useState } from "react";
import {
  Edit3,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Users,
  Clock,
  X,
  Plus,
} from "lucide-react";

const ChallengesSolutions = ({ isOwner, industryData }) => {
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const [addData, setAddData] = useState({
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
    setIsEditModalOpen(true);
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
    setIsEditModalOpen(false);
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
    setIsEditModalOpen(false);
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

  const handleAdd = () => {
    const newId = Math.max(...challengeSolutions.map((item) => item.id)) + 1;
    const newChallengeSolution = {
      id: newId,
      challenge: addData.challenge,
      description: addData.description,
      impact: addData.impact,
      affectedCompanies: addData.affectedCompanies,
      solution: addData.solution,
      solutionDescription: addData.solutionDescription,
      implementedBy: addData.implementedBy
        .split(",")
        .map((company) => company.trim()),
      successRate: addData.successRate,
      timeToImplement: addData.timeToImplement,
      costSaving: addData.costSaving,
      status: addData.status,
    };

    setChallengeSolutions([...challengeSolutions, newChallengeSolution]);
    setIsAddModalOpen(false);
    setAddData({
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

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    setAddData({
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
    <div className="p-6" style={{ backgroundColor: "#F7FAFC" }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
            Industry Challenges & Solutions
          </h2>
          <p className="mt-1" style={{ color: "#1F2D3D" }}>
            Identifying key challenges and innovative solutions driving industry
            transformation
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
          style={{ backgroundColor: "#6EA9CB" }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Challenge</span>
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Challenge & Solution
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Challenge Section */}
              <div>
                <h3
                  className="text-lg font-medium mb-4"
                  style={{ color: "#1F2D3D" }}
                >
                  Challenge Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Challenge Title
                    </label>
                    <input
                      type="text"
                      value={editData.challenge}
                      onChange={(e) =>
                        setEditData({ ...editData, challenge: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
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
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
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
                </div>
              </div>

              {/* Solution Section */}
              <div>
                <h3
                  className="text-lg font-medium mb-4"
                  style={{ color: "#1F2D3D" }}
                >
                  Solution Details
                </h3>
                <div className="space-y-4">
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
                </div>
              </div>
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-90"
                style={{
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                  borderColor: "#DCE8F2",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
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
          <div
            className="rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Add New Challenge & Solution
                </h2>
                <button
                  onClick={handleAddCancel}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Challenge Title
                  </label>
                  <input
                    type="text"
                    value={addData.challenge}
                    onChange={(e) =>
                      setAddData({ ...addData, challenge: e.target.value })
                    }
                    placeholder="Enter challenge title"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Impact Level
                  </label>
                  <select
                    value={addData.impact}
                    onChange={(e) =>
                      setAddData({ ...addData, impact: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Challenge Description
                </label>
                <textarea
                  value={addData.description}
                  onChange={(e) =>
                    setAddData({ ...addData, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Describe the challenge in detail"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Solution Title
                  </label>
                  <input
                    type="text"
                    value={addData.solution}
                    onChange={(e) =>
                      setAddData({ ...addData, solution: e.target.value })
                    }
                    placeholder="Enter solution title"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Affected Companies (%)
                  </label>
                  <input
                    type="text"
                    value={addData.affectedCompanies}
                    onChange={(e) =>
                      setAddData({
                        ...addData,
                        affectedCompanies: e.target.value,
                      })
                    }
                    placeholder="e.g., 85%"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Solution Description
                </label>
                <textarea
                  value={addData.solutionDescription}
                  onChange={(e) =>
                    setAddData({
                      ...addData,
                      solutionDescription: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Describe the solution implementation"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Implemented By (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={addData.implementedBy}
                    onChange={(e) =>
                      setAddData({ ...addData, implementedBy: e.target.value })
                    }
                    placeholder="e.g., Amazon, Google, Microsoft"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Success Rate
                  </label>
                  <input
                    type="text"
                    value={addData.successRate}
                    onChange={(e) =>
                      setAddData({ ...addData, successRate: e.target.value })
                    }
                    placeholder="e.g., 78%"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Time to Implement
                  </label>
                  <input
                    type="text"
                    value={addData.timeToImplement}
                    onChange={(e) =>
                      setAddData({
                        ...addData,
                        timeToImplement: e.target.value,
                      })
                    }
                    placeholder="e.g., 6-12 months"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Cost Saving
                  </label>
                  <input
                    type="text"
                    value={addData.costSaving}
                    onChange={(e) =>
                      setAddData({ ...addData, costSaving: e.target.value })
                    }
                    placeholder="e.g., 25-40%"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Status
                  </label>
                  <select
                    value={addData.status}
                    onChange={(e) =>
                      setAddData({ ...addData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleAddCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-90"
                style={{
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                  borderColor: "#DCE8F2",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Add Challenge & Solution
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {challengeSolutions.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl shadow-sm hover:shadow-md transition-shadow"
            style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
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
                      className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                      style={{ backgroundColor: "#6EA9CB" }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                      style={{ backgroundColor: "#DCE8F2", color: "#1F2D3D" }}
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
                      <h3
                        className="text-xl font-semibold"
                        style={{ color: "#1F2D3D" }}
                      >
                        🚨 {item.challenge}
                      </h3>
                      {isOwner && (
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg transition-colors"
                          title="Edit Challenge/Solution"
                          style={{
                            color: "#6EA9CB",
                            backgroundColor: "#DCE8F2",
                          }}
                          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                          onMouseOut={(e) => (e.target.style.opacity = "1")}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
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
                      <div
                        className="flex items-center space-x-1 text-sm"
                        style={{ color: "#1F2D3D", opacity: "0.8" }}
                      >
                        <Users className="w-4 h-4" />
                        <span>{item.affectedCompanies} affected</span>
                      </div>
                    </div>
                    <p
                      className="mb-6 leading-relaxed"
                      style={{ color: "#1F2D3D" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Solution Section */}
                <div
                  className="border rounded-lg p-4 mb-4"
                  style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle
                      className="w-5 h-5"
                      style={{ color: "#6EA9CB" }}
                    />
                    <h4
                      className="text-lg font-semibold"
                      style={{ color: "#1F2D3D" }}
                    >
                      {item.solution}
                    </h4>
                  </div>
                  <p
                    className="mb-4 leading-relaxed"
                    style={{ color: "#1F2D3D" }}
                  >
                    {item.solutionDescription}
                  </p>

                  {/* Solution Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div
                      className="text-center p-3 rounded"
                      style={{ backgroundColor: "#F7FAFC" }}
                    >
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <TrendingUp
                          className="w-4 h-4"
                          style={{ color: "#6EA9CB" }}
                        />
                        <span
                          className="text-lg font-bold"
                          style={{ color: "#6EA9CB" }}
                        >
                          {item.successRate}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#1F2D3D" }}>
                        Success Rate
                      </p>
                    </div>
                    <div
                      className="text-center p-3 rounded"
                      style={{ backgroundColor: "#F7FAFC" }}
                    >
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Clock
                          className="w-4 h-4"
                          style={{ color: "#6EA9CB" }}
                        />
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#6EA9CB" }}
                        >
                          {item.timeToImplement}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#1F2D3D" }}>
                        Implementation
                      </p>
                    </div>
                    <div
                      className="text-center p-3 rounded"
                      style={{ backgroundColor: "#F7FAFC" }}
                    >
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Lightbulb
                          className="w-4 h-4"
                          style={{ color: "#6EA9CB" }}
                        />
                        <span
                          className="text-lg font-bold"
                          style={{ color: "#6EA9CB" }}
                        >
                          {item.costSaving}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#1F2D3D" }}>
                        Cost Saving
                      </p>
                    </div>
                  </div>

                  {/* Implemented By */}
                  <div>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: "#1F2D3D" }}
                    >
                      Successfully Implemented By:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.implementedBy.map((company, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm rounded-full border"
                          style={{
                            backgroundColor: "#F7FAFC",
                            color: "#1F2D3D",
                            borderColor: "#DCE8F2",
                          }}
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="flex justify-between items-center pt-4 border-t"
                  style={{ borderColor: "#DCE8F2" }}
                >
                  <button
                    className="text-sm font-medium hover:opacity-80"
                    style={{ color: "#6EA9CB" }}
                  >
                    View Implementation Guide →
                  </button>
                  <div className="flex space-x-3">
                    <button
                      className="px-4 py-2 border rounded-lg transition-colors text-sm"
                      style={{
                        borderColor: "#DCE8F2",
                        color: "#1F2D3D",
                        backgroundColor: "#F7FAFC",
                      }}
                    >
                      Case Studies
                    </button>
                    <button
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm"
                      style={{ backgroundColor: "#6EA9CB" }}
                    >
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
      <div
        className="mt-8 rounded-xl p-6"
        style={{ background: "linear-gradient(to right, #DCE8F2, #B5D3E7)" }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#1F2D3D" }}>
          Challenge Resolution Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6" style={{ color: "#6EA9CB" }} />
            <div>
              <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                {challengeSolutions.length}
              </p>
              <p className="text-sm" style={{ color: "#1F2D3D" }}>
                Active Challenges
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6" style={{ color: "#6EA9CB" }} />
            <div>
              <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                {challengeSolutions.length}
              </p>
              <p className="text-sm" style={{ color: "#1F2D3D" }}>
                Solutions Available
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6" style={{ color: "#6EA9CB" }} />
            <div>
              <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                76%
              </p>
              <p className="text-sm" style={{ color: "#1F2D3D" }}>
                Avg Success Rate
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6" style={{ color: "#6EA9CB" }} />
            <div>
              <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                35%
              </p>
              <p className="text-sm" style={{ color: "#1F2D3D" }}>
                Avg Cost Saving
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSolutions;
