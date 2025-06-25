import React, { useState } from "react";
import { Edit, Save, X, Play, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [content, setContent] = useState({
    title: "How It Works",
    description:
      "Understanding how our startup ecosystem platform connects entrepreneurs, investors, and mentors.",
    steps: [
      {
        title: "Sign Up & Profile Setup",
        description:
          "Create your startup profile with your business idea, team, and goals",
        details:
          "Fill out comprehensive profile including your industry, stage, funding needs, and team information. Our smart matching algorithm uses this data to connect you with relevant opportunities.",
        icon: "👤",
        features: [
          "Complete business profile",
          "Team member profiles",
          "Industry categorization",
          "Stage identification",
        ],
      },
      {
        title: "Connect & Network",
        description:
          "Get matched with mentors, investors, and fellow entrepreneurs",
        details:
          "Our AI-powered matching system connects you with the right people based on industry, experience, location, and specific needs. Build meaningful relationships that drive growth.",
        icon: "🤝",
        features: [
          "Smart mentor matching",
          "Investor connections",
          "Peer networking",
          "Industry events",
        ],
      },
      {
        title: "Access Resources",
        description:
          "Utilize our comprehensive library of tools, templates, and guides",
        details:
          "Access curated resources including business plan templates, pitch deck examples, legal documents, and expert-created content tailored to your startup stage.",
        icon: "📚",
        features: [
          "Business templates",
          "Legal documents",
          "Expert guides",
          "Video tutorials",
        ],
      },
      {
        title: "Get Funding",
        description: "Present your startup to investors and secure funding",
        details:
          "Participate in pitch events, connect with angel investors and VCs, and access funding opportunities. Track your fundraising progress and manage investor communications.",
        icon: "💰",
        features: [
          "Pitch opportunities",
          "Investor matching",
          "Funding tracking",
          "Due diligence support",
        ],
      },
      {
        title: "Grow & Scale",
        description:
          "Accelerate growth with ongoing support and advanced features",
        details:
          "Access growth tools, analytics, advanced networking features, and premium support as your startup scales. Connect with later-stage investors and expansion opportunities.",
        icon: "🚀",
        features: [
          "Growth analytics",
          "Advanced tools",
          "Scale-up support",
          "Global opportunities",
        ],
      },
    ],
    benefits: [
      {
        title: "Time Savings",
        description: "Reduce months of research and networking to weeks",
        value: "70%",
      },
      {
        title: "Success Rate",
        description: "Higher success rate for funded startups",
        value: "3x",
      },
      {
        title: "Network Growth",
        description: "Average connections made per startup",
        value: "150+",
      },
      {
        title: "Resource Access",
        description: "Comprehensive startup resources available",
        value: "500+",
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving how it works content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditStep = (index) => {
    setEditingStepIndex(index);
  };

  const handleSaveStep = (index, updatedStep) => {
    const updatedSteps = [...content.steps];
    updatedSteps[index] = updatedStep;
    setContent({ ...content, steps: updatedSteps });
    setEditingStepIndex(null);
  };

  const handleCancelStepEdit = () => {
    setEditingStepIndex(null);
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...content.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setContent({ ...content, steps: newSteps });
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

      {/* Benefits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {content.benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100 text-center"
          >
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {benefit.value}
            </p>
            <p className="text-sm font-medium text-gray-800 mb-1">
              {benefit.title}
            </p>
            <p className="text-xs text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Process Steps */}
      <div className="space-y-8 mb-8">
        {content.steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-start space-x-6">
              {/* Step Icon */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white font-bold shadow-lg">
                  {step.icon}
                </div>
                {index < content.steps.length - 1 && (
                  <div className="w-1 h-20 bg-gradient-to-b from-blue-300 to-purple-300 rounded-full mt-4"></div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    {editingStepIndex === index ? (
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => updateStep(index, "title", e.target.value)}
                        className="text-xl font-semibold p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Step title"
                      />
                    ) : (
                      <h3 className="text-xl font-semibold text-gray-900">
                        Step {index + 1}: {step.title}
                      </h3>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                      {index === 0
                        ? "Start Here"
                        : index === content.steps.length - 1
                        ? "Advanced"
                        : "Essential"}
                    </span>
                    
                    {editingStepIndex === index ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveStep(index, step)}
                          className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancelStepEdit}
                          className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditStep(index)}
                        className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                        title="Edit this step"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {editingStepIndex === index ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={step.description}
                        onChange={(e) => updateStep(index, "description", e.target.value)}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Details
                      </label>
                      <textarea
                        value={step.details}
                        onChange={(e) => updateStep(index, "details", e.target.value)}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <p className="text-sm text-gray-700 mb-4">{step.details}</p>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {step.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-end">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Play className="w-4 h-4" />
                      <span>Learn More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Features */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Platform Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">
              🤖 AI-Powered Matching
            </h4>
            <p className="text-sm text-gray-600">
              Smart algorithms connect you with the right mentors, investors,
              and opportunities
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">
              📊 Analytics Dashboard
            </h4>
            <p className="text-sm text-gray-600">
              Track your progress, funding status, and network growth with
              detailed insights
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">
              🔒 Secure Platform
            </h4>
            <p className="text-sm text-gray-600">
              Enterprise-grade security protecting your sensitive business
              information
            </p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-green-500 pl-4">
            <blockquote className="text-gray-700 italic mb-2">
              "The platform connected me with the perfect investor within 2
              weeks. Raised $500K Series A!"
            </blockquote>
            <p className="text-sm text-gray-600">- Sarah Chen, TechStart AI</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <blockquote className="text-gray-700 italic mb-2">
              "Found an amazing co-founder and mentor through the network. Now
              we're scaling rapidly!"
            </blockquote>
            <p className="text-sm text-gray-600">
              - Mike Rodriguez, GreenTech Solutions
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!isEditing && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white text-center">
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
      )}
    </div>
  );
};

export default HowItWorks;
