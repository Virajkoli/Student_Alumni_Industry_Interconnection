import React, { useState } from "react";
import { Edit, Save, X, Rocket, CheckCircle, Circle } from "lucide-react";

const LaunchSteps = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([0, 1, 2]);
  const [content, setContent] = useState({
    title: "Steps to Launch Your Startup",
    description:
      "A comprehensive roadmap to take your startup from idea to market launch.",
    steps: [
      {
        title: "Ideation & Market Research",
        description:
          "Validate your business idea through comprehensive market research and customer interviews.",
        tasks: [
          "Define problem statement",
          "Conduct market research",
          "Analyze competitors",
          "Interview potential customers",
        ],
        timeframe: "2-4 weeks",
        resources: [
          "Market research templates",
          "Customer interview guides",
          "Competitor analysis tools",
        ],
      },
      {
        title: "Business Planning",
        description:
          "Create a detailed business plan and define your business model.",
        tasks: [
          "Write business plan",
          "Define revenue model",
          "Financial projections",
          "Risk assessment",
        ],
        timeframe: "3-6 weeks",
        resources: [
          "Business plan template",
          "Financial modeling spreadsheet",
          "Pitch deck template",
        ],
      },
      {
        title: "Legal Foundation",
        description:
          "Establish legal structure and protect your intellectual property.",
        tasks: [
          "Choose business structure",
          "Register company",
          "Trademark/Patent filing",
          "Legal agreements",
        ],
        timeframe: "2-3 weeks",
        resources: [
          "Legal entity guide",
          "Trademark search",
          "Contract templates",
        ],
      },
      {
        title: "Product Development",
        description:
          "Build your minimum viable product (MVP) and test with early users.",
        tasks: [
          "Define MVP features",
          "Develop prototype",
          "User testing",
          "Iterate based on feedback",
        ],
        timeframe: "6-12 weeks",
        resources: [
          "Development frameworks",
          "Design tools",
          "Testing platforms",
        ],
      },
      {
        title: "Team Building",
        description: "Recruit key team members and establish company culture.",
        tasks: [
          "Define roles",
          "Recruit co-founders",
          "Hire early employees",
          "Set up equity distribution",
        ],
        timeframe: "4-8 weeks",
        resources: [
          "Job posting templates",
          "Interview guides",
          "Equity calculators",
        ],
      },
      {
        title: "Funding Preparation",
        description: "Prepare for fundraising and secure initial investment.",
        tasks: [
          "Create pitch deck",
          "Financial projections",
          "Investor outreach",
          "Due diligence prep",
        ],
        timeframe: "8-16 weeks",
        resources: [
          "Pitch deck examples",
          "Investor databases",
          "Financial templates",
        ],
      },
      {
        title: "Marketing & Launch",
        description: "Develop marketing strategy and execute product launch.",
        tasks: [
          "Marketing strategy",
          "Brand development",
          "Digital presence",
          "Launch campaign",
        ],
        timeframe: "4-6 weeks",
        resources: [
          "Marketing templates",
          "Social media guides",
          "Launch checklists",
        ],
      },
      {
        title: "Growth & Scale",
        description: "Focus on customer acquisition and business growth.",
        tasks: [
          "Customer acquisition",
          "Optimize operations",
          "Scale team",
          "Expand market",
        ],
        timeframe: "Ongoing",
        resources: [
          "Growth hacking guides",
          "Analytics tools",
          "Scaling frameworks",
        ],
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving launch steps content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const toggleStepCompletion = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((index) => index !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
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

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-8 border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Launch Progress
          </h3>
          <span className="text-sm text-gray-600">
            {completedSteps.length}/{content.steps.length} steps completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedSteps.length / content.steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Launch Steps */}
      <div className="space-y-6">
        {content.steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === completedSteps.length && !isCompleted;

          return (
            <div
              key={index}
              className={`bg-white border rounded-lg p-6 transition-all duration-200 ${
                isCompleted
                  ? "border-green-200 bg-green-50"
                  : isActive
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => !isEditing && toggleStepCompletion(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-bold text-sm">{index + 1}</span>
                    )}
                  </button>
                  {index < content.steps.length - 1 && (
                    <div
                      className={`w-0.5 h-16 mt-2 ${
                        isCompleted ? "bg-green-300" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className={`text-lg font-semibold ${
                        isCompleted ? "text-green-800" : "text-gray-900"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        isCompleted
                          ? "bg-green-100 text-green-800"
                          : isActive
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.timeframe}
                    </span>
                  </div>

                  <p
                    className={`mb-4 ${
                      isCompleted ? "text-green-700" : "text-gray-600"
                    }`}
                  >
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4
                        className={`text-sm font-medium mb-2 ${
                          isCompleted ? "text-green-800" : "text-gray-800"
                        }`}
                      >
                        Key Tasks:
                      </h4>
                      <ul className="space-y-1">
                        {step.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className={`text-sm flex items-center ${
                              isCompleted ? "text-green-700" : "text-gray-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                isCompleted ? "bg-green-500" : "bg-gray-400"
                              }`}
                            ></span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className={`text-sm font-medium mb-2 ${
                          isCompleted ? "text-green-800" : "text-gray-800"
                        }`}
                      >
                        Resources:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {step.resources.map((resource, resourceIndex) => (
                          <span
                            key={resourceIndex}
                            className={`px-2 py-1 text-xs rounded ${
                              isCompleted
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Center */}
      {!isEditing && (
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Ready to Launch?</h3>
          <p className="mb-4">
            Get personalized guidance and support throughout your startup
            journey.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get Mentor Support
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
              Download Checklist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchSteps;
