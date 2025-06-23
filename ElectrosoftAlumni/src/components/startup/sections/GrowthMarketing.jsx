import React, { useState } from "react";
import { Edit, Save, X, TrendingUp, Target, Users, Zap } from "lucide-react";

const GrowthMarketing = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    title: "Growth & Marketing Strategies",
    description:
      "Discover proven strategies to scale your startup and build a strong market presence.",
    strategies: [
      {
        title: "Content Marketing",
        description:
          "Create valuable content that attracts and engages your target audience.",
        tactics: ["Blog posts", "Video content", "Podcasts", "Infographics"],
        icon: "📝",
      },
      {
        title: "Social Media Marketing",
        description:
          "Build brand awareness and community through strategic social media presence.",
        tactics: [
          "LinkedIn engagement",
          "Twitter thought leadership",
          "Instagram stories",
          "YouTube channels",
        ],
        icon: "📱",
      },
      {
        title: "SEO & SEM",
        description:
          "Improve online visibility through search engine optimization and marketing.",
        tactics: ["Keyword research", "On-page SEO", "Google Ads", "Local SEO"],
        icon: "🔍",
      },
      {
        title: "Email Marketing",
        description:
          "Nurture leads and retain customers through targeted email campaigns.",
        tactics: [
          "Newsletter campaigns",
          "Drip sequences",
          "Personalization",
          "A/B testing",
        ],
        icon: "📧",
      },
    ],
    growthMetrics: [
      { label: "Customer Acquisition Cost", value: "$45", icon: Target },
      { label: "Monthly Active Users", value: "12K+", icon: Users },
      { label: "Conversion Rate", value: "3.2%", icon: TrendingUp },
      { label: "Retention Rate", value: "85%", icon: Zap },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving growth marketing content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateStrategy = (index, field, value) => {
    const newStrategies = [...content.strategies];
    newStrategies[index] = { ...newStrategies[index], [field]: value };
    setContent({ ...content, strategies: newStrategies });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
          <p className="text-gray-600 mt-2">{content.description}</p>
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {content.growthMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </div>
                <IconComponent className="w-8 h-8 text-green-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Marketing Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {content.strategies.map((strategy, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{strategy.icon}</span>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={strategy.title}
                      onChange={(e) =>
                        updateStrategy(index, "title", e.target.value)
                      }
                      className="text-lg font-semibold p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900">
                      {strategy.title}
                    </h3>
                  )}
                </div>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={strategy.description}
                onChange={(e) =>
                  updateStrategy(index, "description", e.target.value)
                }
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
              />
            ) : (
              <p className="text-gray-600 mb-4">{strategy.description}</p>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-800">
                Key Tactics:
              </h4>
              <div className="flex flex-wrap gap-2">
                {strategy.tactics.map((tactic, tacticIndex) => (
                  <span
                    key={tacticIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tactic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Framework */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white mb-8">
        <h3 className="text-xl font-semibold mb-4">
          The AARRR Growth Framework
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">A</span>
            </div>
            <h4 className="font-medium">Acquisition</h4>
            <p className="text-sm opacity-90">Get users</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">A</span>
            </div>
            <h4 className="font-medium">Activation</h4>
            <p className="text-sm opacity-90">
              Users have great first experience
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">R</span>
            </div>
            <h4 className="font-medium">Retention</h4>
            <p className="text-sm opacity-90">Users come back</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">R</span>
            </div>
            <h4 className="font-medium">Referral</h4>
            <p className="text-sm opacity-90">Users refer others</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">R</span>
            </div>
            <h4 className="font-medium">Revenue</h4>
            <p className="text-sm opacity-90">Make money</p>
          </div>
        </div>
      </div>

      {/* Action Items */}
      {!isEditing && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Next Steps
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                Define your target audience and create buyer personas
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                Set up analytics and tracking for all marketing channels
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                Create a content calendar for the next 3 months
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                Launch your first A/B test campaign
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthMarketing;
