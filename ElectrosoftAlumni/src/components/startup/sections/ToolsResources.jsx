import React, { useState } from "react";
import { Edit, Save, X, Wrench, Code, BarChart, Users } from "lucide-react";

const ToolsResources = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [content, setContent] = useState({
    title: "Tools & Resources",
    description:
      "Essential tools and resources to help you build, grow, and scale your startup effectively.",
    categories: [
      {
        name: "Development & Design",
        icon: Code,
        tools: [
          {
            name: "GitHub",
            description: "Code repository and collaboration",
            price: "Free",
            link: "#",
          },
          {
            name: "Figma",
            description: "UI/UX design and prototyping",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "Vercel",
            description: "Frontend deployment platform",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "AWS",
            description: "Cloud computing services",
            price: "Pay-as-you-go",
            link: "#",
          },
        ],
      },
      {
        name: "Marketing & Analytics",
        icon: BarChart,
        tools: [
          {
            name: "Google Analytics",
            description: "Web analytics and insights",
            price: "Free",
            link: "#",
          },
          {
            name: "Mailchimp",
            description: "Email marketing automation",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "Canva",
            description: "Graphic design and content creation",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "Hootsuite",
            description: "Social media management",
            price: "Paid",
            link: "#",
          },
        ],
      },
      {
        name: "Productivity & Management",
        icon: Wrench,
        tools: [
          {
            name: "Notion",
            description: "All-in-one workspace",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "Slack",
            description: "Team communication",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "Trello",
            description: "Project management",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "Zoom",
            description: "Video conferencing",
            price: "Free/Paid",
            link: "#",
          },
        ],
      },
      {
        name: "Customer & Support",
        icon: Users,
        tools: [
          {
            name: "Intercom",
            description: "Customer messaging platform",
            price: "Paid",
            link: "#",
          },
          {
            name: "Zendesk",
            description: "Customer support ticketing",
            price: "Paid",
            link: "#",
          },
          {
            name: "Typeform",
            description: "Online forms and surveys",
            price: "Free/Paid",
            link: "#",
          },
          {
            name: "Calendly",
            description: "Appointment scheduling",
            price: "Free/Paid",
            link: "#",
          },
        ],
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving tools content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditTool = (categoryIndex, toolIndex) => {
    setEditingTool({ categoryIndex, toolIndex });
  };

  const handleSaveTool = (categoryIndex, toolIndex, updatedTool) => {
    const newContent = { ...content };
    newContent.categories[categoryIndex].tools[toolIndex] = updatedTool;
    setContent(newContent);
    setEditingTool(null);
  };

  const handleCancelToolEdit = () => {
    setEditingTool(null);
  };

  const updateTool = (categoryIndex, toolIndex, field, value) => {
    const newContent = { ...content };
    newContent.categories[categoryIndex].tools[toolIndex][field] = value;
    setContent(newContent);
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

      {/* Tool Categories */}
      <div className="space-y-8">
        {content.categories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <div
              key={categoryIndex}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.tools.map((tool, toolIndex) => {
                  const isEditingThis = editingTool?.categoryIndex === categoryIndex && editingTool?.toolIndex === toolIndex;
                  
                  return (
                    <div
                      key={toolIndex}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      {isEditingThis ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={tool.name}
                            onChange={(e) => updateTool(categoryIndex, toolIndex, "name", e.target.value)}
                            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium"
                            placeholder="Tool name"
                          />
                          <textarea
                            value={tool.description}
                            onChange={(e) => updateTool(categoryIndex, toolIndex, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            rows="2"
                            placeholder="Description"
                          />
                          <select
                            value={tool.price}
                            onChange={(e) => updateTool(categoryIndex, toolIndex, "price", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
                          >
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                            <option value="Free/Paid">Free/Paid</option>
                            <option value="Pay-as-you-go">Pay-as-you-go</option>
                          </select>
                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => handleSaveTool(categoryIndex, toolIndex, tool)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancelToolEdit}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <X className="w-3 h-3" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium text-gray-900">
                                {tool.name}
                              </h3>
                              <button
                                onClick={() => handleEditTool(categoryIndex, toolIndex)}
                                className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                                title="Edit tool"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                tool.price === "Free"
                                  ? "bg-green-100 text-green-800"
                                  : tool.price === "Paid"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {tool.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {tool.description}
                          </p>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                              Learn More
                            </button>
                            <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors">
                              Try Free
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resource Library */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resource Library
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">
              📚 Startup Guides
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Comprehensive guides covering all aspects of startup development
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Download →
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">📊 Templates</h4>
            <p className="text-sm text-gray-600 mb-3">
              Business plan, pitch deck, and financial modeling templates
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Access →
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">🎓 Courses</h4>
            <p className="text-sm text-gray-600 mb-3">
              Online courses on entrepreneurship and business skills
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Enroll →
            </button>
          </div>
        </div>
      </div>

      {/* Community Tools */}
      {!isEditing && (
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">
            Join Our Tool Community
          </h3>
          <p className="mb-4">
            Connect with other entrepreneurs, share tool recommendations, and
            get expert advice.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Join Community
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
              Suggest a Tool
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsResources;
