import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";

const HowItWorks = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [content, setContent] = useState({
    title: "How It Works",
    description:
      "Understanding how our startup ecosystem platform connects entrepreneurs, investors, and mentors.",
    steps: [
      {
        id: 1,
        title: "Sign Up & Profile Setup",
        description:
          "Create your startup profile with your business idea, team, and goals",
        details:
          "Fill out comprehensive profile including your industry, stage, funding needs, and team information.",
        icon: "👤",
        features: [
          "Complete business profile",
          "Team member profiles",
          "Industry categorization",
          "Stage identification",
        ],
      },
      {
        id: 2,
        title: "Connect & Network",
        description:
          "Get matched with mentors, investors, and fellow entrepreneurs",
        details:
          "Our AI-powered matching system connects you with the right people based on industry and experience.",
        icon: "🤝",
        features: [
          "Smart mentor matching",
          "Investor connections",
          "Peer networking",
          "Industry events",
        ],
      },
      {
        id: 3,
        title: "Access Resources",
        description:
          "Utilize our comprehensive library of tools, templates, and guides",
        details:
          "Access curated resources including business plan templates, pitch deck examples, and legal documents.",
        icon: "📚",
        features: [
          "Business templates",
          "Legal documents",
          "Expert guides",
          "Video tutorials",
        ],
      },
      {
        id: 4,
        title: "Get Funding",
        description: "Present your startup to investors and secure funding",
        details:
          "Participate in pitch events, connect with angel investors and VCs, and access funding opportunities.",
        icon: "💰",
        features: [
          "Pitch opportunities",
          "Investor matching",
          "Funding tracking",
          "Due diligence support",
        ],
      },
      {
        id: 5,
        title: "Grow & Scale",
        description:
          "Accelerate growth with ongoing support and advanced features",
        details:
          "Access growth tools, analytics, and premium support as your startup scales.",
        icon: "🚀",
        features: [
          "Growth analytics",
          "Advanced tools",
          "Scale-up support",
          "Global opportunities",
        ],
      },
    ],
  });

  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    details: "",
    icon: "💡",
    features: [],
  });

  const [editStep, setEditStep] = useState({
    title: "",
    description: "",
    details: "",
    icon: "💡",
    features: [],
  });

  const handleAddStep = () => {
    setShowAddModal(true);
  };

  const handleSaveStep = () => {
    if (newStep.title.trim() && newStep.description.trim()) {
      const step = {
        id: content.steps.length + 1,
        ...newStep,
        features:
          typeof newStep.features === "string"
            ? newStep.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f.length > 0)
            : newStep.features,
      };
      setContent((prev) => ({
        ...prev,
        steps: [...prev.steps, step],
      }));
      setNewStep({
        title: "",
        description: "",
        details: "",
        icon: "💡",
        features: [],
      });
      setShowAddModal(false);
    }
  };

  const handleCancelAdd = () => {
    setNewStep({
      title: "",
      description: "",
      details: "",
      icon: "💡",
      features: [],
    });
    setShowAddModal(false);
  };

  const handleEditClick = (index) => {
    setEditStep({ ...content.steps[index] });
    setEditingStepIndex(index);
  };

  const handleSaveEdit = () => {
    if (editStep.title.trim() && editStep.description.trim()) {
      const updatedSteps = [...content.steps];
      updatedSteps[editingStepIndex] = {
        ...updatedSteps[editingStepIndex],
        ...editStep,
        features:
          typeof editStep.features === "string"
            ? editStep.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f.length > 0)
            : editStep.features,
      };
      setContent((prev) => ({
        ...prev,
        steps: updatedSteps,
      }));
      setEditingStepIndex(null);
      setEditStep({
        title: "",
        description: "",
        details: "",
        icon: "💡",
        features: [],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingStepIndex(null);
    setEditStep({
      title: "",
      description: "",
      details: "",
      icon: "💡",
      features: [],
    });
  };

  const handleInputChange = (field, value, isEdit = false) => {
    if (isEdit) {
      setEditStep((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewStep((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Header with Edit Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {content.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{content.description}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={isEditing ? "Done editing" : "Edit Steps"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">Done</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </>
            )}
          </button>
        </div>

        {/* Add Step Button (when editing) */}
        {isEditing && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <button
              onClick={handleAddStep}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Step
            </button>
          </div>
        )}

        {/* Process Steps */}
        <div className="divide-y divide-gray-200">
          {content.steps.map((step, index) => (
            <div key={step.id} className="group">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl text-white font-bold shadow-lg flex-shrink-0">
                    {step.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Step {index + 1}: {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {step.description}
                        </p>
                        <p className="text-sm text-gray-700">{step.details}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {index === 0
                            ? "Start Here"
                            : index === content.steps.length - 1
                            ? "Advanced"
                            : "Essential"}
                        </span>
                        {isEditing && (
                          <button
                            onClick={() => handleEditClick(index)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                            title="Edit step"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 mb-2">
                          Key Features:
                        </h4>
                        <div className="space-y-1">
                          {step.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-end justify-end">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <Play className="w-4 h-4" />
                          <span>Learn More</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-b-lg">
          <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
          <p className="mb-4">
            Join thousands of successful entrepreneurs who have launched their
            startups with our platform.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Your Journey
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors flex items-center space-x-2">
              <span>Watch Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Step Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Step
                </h2>
                <button
                  onClick={handleCancelAdd}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon *
                </label>
                <input
                  type="text"
                  value={newStep.icon}
                  onChange={(e) => handleInputChange("icon", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter emoji (e.g., 💡)"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Title *
                </label>
                <input
                  type="text"
                  value={newStep.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter step title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  value={newStep.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Brief description of the step"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={newStep.details}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Detailed explanation of what this step involves"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features *
                </label>
                <textarea
                  value={
                    Array.isArray(newStep.features)
                      ? newStep.features.join(", ")
                      : newStep.features
                  }
                  onChange={(e) =>
                    handleInputChange("features", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter features separated by commas"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelAdd}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStep}
                disabled={!newStep.title.trim() || !newStep.description.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Step
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Step Modal */}
      {editingStepIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Step
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon *
                </label>
                <input
                  type="text"
                  value={editStep.icon}
                  onChange={(e) =>
                    handleInputChange("icon", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter emoji (e.g., 💡)"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Title *
                </label>
                <input
                  type="text"
                  value={editStep.title}
                  onChange={(e) =>
                    handleInputChange("title", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter step title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  value={editStep.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value, true)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Brief description of the step"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={editStep.details}
                  onChange={(e) =>
                    handleInputChange("details", e.target.value, true)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Detailed explanation of what this step involves"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features *
                </label>
                <textarea
                  value={
                    Array.isArray(editStep.features)
                      ? editStep.features.join(", ")
                      : editStep.features
                  }
                  onChange={(e) =>
                    handleInputChange("features", e.target.value, true)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter features separated by commas"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={
                  !editStep.title.trim() || !editStep.description.trim()
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HowItWorks;
