import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  DollarSign,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const FundingInvestment = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStageIndex, setEditingStageIndex] = useState(null);
  const [content, setContent] = useState({
    title: "Funding and Investment",
    description:
      "Explore funding options and investment opportunities to fuel your startup's growth.",
    fundingStages: [
      {
        stage: "Pre-Seed",
        amount: "$10K - $250K",
        description: "Initial funding from founders, friends, and family",
        focus: "MVP development, market validation",
        investors: "Personal network, Angel investors",
      },
      {
        stage: "Seed",
        amount: "$250K - $2M",
        description: "First official funding round to prove product-market fit",
        focus: "Team building, product development",
        investors: "Angel investors, Seed VCs",
      },
      {
        stage: "Series A",
        amount: "$2M - $15M",
        description: "Scaling the business model and expanding operations",
        focus: "Revenue growth, market expansion",
        investors: "Venture Capital firms",
      },
      {
        stage: "Series B+",
        amount: "$15M+",
        description: "Scaling to new markets and product lines",
        focus: "Market leadership, international expansion",
        investors: "Growth equity, Late-stage VCs",
      },
    ],
    fundingMetrics: [
      { label: "Total Funding Raised", value: "$2.5M", icon: DollarSign },
      { label: "Valuation", value: "$12M", icon: TrendingUp },
      { label: "Active Investors", value: "8", icon: Users },
      { label: "Funding Rounds", value: "3", icon: Award },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving funding content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditStage = (index) => {
    setEditingStageIndex(index);
  };

  const handleSaveStage = (index, updatedStage) => {
    const updatedStages = [...content.fundingStages];
    updatedStages[index] = updatedStage;
    setContent({ ...content, fundingStages: updatedStages });
    setEditingStageIndex(null);
  };

  const handleCancelStageEdit = () => {
    setEditingStageIndex(null);
  };

  const updateStage = (index, field, value) => {
    const newStages = [...content.fundingStages];
    newStages[index] = { ...newStages[index], [field]: value };
    setContent({ ...content, fundingStages: newStages });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
          <p className="text-gray-600 mt-2">{content.description}</p>
        </div>

        
      </div>

      {/* Funding Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {content.fundingMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </div>
                <IconComponent className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Funding Stages */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Funding Stages
        </h2>
        <div className="space-y-6">
          {content.fundingStages.map((stage, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    {editingStageIndex === index ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={stage.stage}
                          onChange={(e) =>
                            updateStage(index, "stage", e.target.value)
                          }
                          className="text-lg font-semibold p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                          placeholder="Stage name"
                        />
                        <input
                          type="text"
                          value={stage.amount}
                          onChange={(e) =>
                            updateStage(index, "amount", e.target.value)
                          }
                          className="text-sm font-medium p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-600 w-full"
                          placeholder="Amount range"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {stage.stage}
                        </h3>
                        <p className="text-sm text-emerald-600 font-medium">
                          {stage.amount}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {editingStageIndex === index ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveStage(index, stage)}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelStageEdit}
                        className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditStage(index)}
                      className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                      title="Edit this funding stage"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">
                    Description
                  </h4>
                  {editingStageIndex === index ? (
                    <textarea
                      value={stage.description}
                      onChange={(e) =>
                        updateStage(index, "description", e.target.value)
                      }
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">
                    Focus Areas
                  </h4>
                  {editingStageIndex === index ? (
                    <input
                      type="text"
                      value={stage.focus}
                      onChange={(e) =>
                        updateStage(index, "focus", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{stage.focus}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">
                    Typical Investors
                  </h4>
                  {editingStageIndex === index ? (
                    <input
                      type="text"
                      value={stage.investors}
                      onChange={(e) =>
                        updateStage(index, "investors", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{stage.investors}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Readiness Checklist */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Investment Readiness Checklist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Solid business plan and financial projections
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Proven market demand and traction
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Strong founding team with relevant experience
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Clear competitive advantage
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Legal structure and IP protection
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Scalable business model
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Clear use of funds and milestones
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Exit strategy considerations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Investor Network */}
      {!isEditing && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Connect with Investors</h3>
          <p className="mb-4">
            Access our network of angel investors and venture capital firms.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Find Investors
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
              Pitch Deck Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingInvestment;
