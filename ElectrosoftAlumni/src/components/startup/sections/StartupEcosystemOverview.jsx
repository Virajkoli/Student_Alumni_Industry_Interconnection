import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Building,
  Users,
  TrendingUp,
  Globe,
} from "lucide-react";

const StartupEcosystemOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [content, setContent] = useState({
    title: "Startup Ecosystem Overview",
    description:
      "Navigate the dynamic world of startups with comprehensive insights into the ecosystem that drives innovation and entrepreneurship.",
    keyStats: [
      { label: "Active Startups", value: "50,000+", icon: Building },
      { label: "Total Funding", value: "$150B", icon: TrendingUp },
      { label: "Entrepreneurs", value: "200K+", icon: Users },
      { label: "Global Reach", value: "100+ Countries", icon: Globe },
    ],
    sections: [
      {
        title: "What is a Startup Ecosystem?",
        content:
          "A startup ecosystem is a network of interconnected elements that support and nurture the growth of new businesses. It includes entrepreneurs, investors, mentors, support organizations, and the regulatory environment.",
      },
      {
        title: "Key Players",
        content:
          "The ecosystem consists of startups, venture capitalists, angel investors, accelerators, incubators, government agencies, universities, and service providers working together to foster innovation.",
      },
      {
        title: "Growth Stages",
        content:
          "Startups typically progress through ideation, validation, growth, and scaling phases. Each stage requires different resources, skills, and support systems from the ecosystem.",
      },
      {
        title: "Success Factors",
        content:
          "Key success factors include market timing, product-market fit, strong team, adequate funding, strategic partnerships, and effective execution of business strategy.",
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset content to original state if needed
  };

  const handleEditSection = (index) => {
    setEditingSectionIndex(index);
  };

  const handleSaveSection = (index, updatedSection) => {
    const updatedSections = [...content.sections];
    updatedSections[index] = updatedSection;
    setContent({ ...content, sections: updatedSections });
    setEditingSectionIndex(null);
  };

  const handleCancelSectionEdit = () => {
    setEditingSectionIndex(null);
  };

  const updateSection = (index, field, value) => {
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setContent({ ...content, sections: newSections });
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

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {content.keyStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <IconComponent className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {content.sections.map((section, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {editingSectionIndex === index ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(index, "title", e.target.value)}
                      className="w-full text-xl font-semibold p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Section title"
                    />
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, "content", e.target.value)}
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Section content"
                    />
                  </div>
                ) : isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        updateSection(index, "title", e.target.value)
                      }
                      className="w-full text-xl font-semibold p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(index, "content", e.target.value)
                      }
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 ml-4">
                {editingSectionIndex === index ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveSection(index, section)}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelSectionEdit}
                      className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : !isEditing ? (
                  <button
                    onClick={() => handleEditSection(index)}
                    className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                    title="Edit this section"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {!isEditing && (
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">
            Ready to Join the Ecosystem?
          </h3>
          <p className="mb-4">
            Connect with fellow entrepreneurs, investors, and mentors to
            accelerate your startup journey.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Find Mentors
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Join Events
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupEcosystemOverview;
