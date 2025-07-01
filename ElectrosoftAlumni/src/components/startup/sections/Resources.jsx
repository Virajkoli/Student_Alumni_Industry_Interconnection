import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  ExternalLink,
  Trash2,
} from "lucide-react";

const Resources = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [resourceCategories, setResourceCategories] = useState([
    {
      id: 1,
      category: "E-books & PDFs",
      description: "Downloadable digital books and PDF guides for startup development",
      resources: [
        {
          id: 1,
          title: "The Lean Startup Methodology",
          description: "Complete guide on building sustainable businesses through validated learning",
          type: "E-book",
          format: "PDF",
          link: "https://example.com/lean-startup.pdf",
          isDownloadable: true,
          customFields: [],
        },
        {
          id: 2,
          title: "Business Model Canvas Guide",
          description: "Step-by-step guide to creating effective business models",
          type: "E-book",
          format: "PDF",
          link: "https://example.com/business-model-canvas.pdf",
          isDownloadable: true,
        },
        {
          id: 3,
          title: "Startup Financial Planning",
          description: "Financial modeling and planning for early-stage startups",
          type: "E-book",
          format: "PDF",
          link: "https://example.com/financial-planning.pdf",
          isDownloadable: true,
        },
      ],
    },
    {
      id: 2,
      category: "Video Tutorials",
      description: "Educational video content covering startup concepts and practical skills",
      resources: [
        {
          id: 4,
          title: "Startup Pitch Deck Fundamentals",
          description: "How to create compelling pitch decks that attract investors",
          type: "Video",
          format: "MP4",
          link: "https://example.com/pitch-deck-tutorial",
          duration: "45 minutes",
        },
        {
          id: 5,
          title: "Digital Marketing for Startups",
          description: "Complete course on digital marketing strategies for new businesses",
          type: "Video",
          format: "Streaming",
          link: "https://example.com/digital-marketing-course",
          duration: "3 hours",
        },
        {
          id: 6,
          title: "Legal Basics for Entrepreneurs",
          description: "Understanding legal requirements and structures for startups",
          type: "Video",
          format: "MP4",
          link: "https://example.com/legal-basics",
          duration: "30 minutes",
        },
      ],
    },
    {
      id: 3,
      category: "GitHub Links",
      description: "Open-source projects and code repositories for startup development",
      resources: [
        {
          id: 7,
          title: "Startup Dashboard Template",
          description: "React-based dashboard template for startup metrics tracking",
          type: "Repository",
          format: "React",
          link: "https://github.com/example/startup-dashboard",
          language: "JavaScript",
        },
        {
          id: 8,
          title: "Business Plan Generator",
          description: "Automated business plan generator with customizable templates",
          type: "Repository",
          format: "Python",
          link: "https://github.com/example/business-plan-generator",
          language: "Python",
        },
        {
          id: 9,
          title: "Startup Analytics Tools",
          description: "Collection of analytics tools for tracking startup KPIs",
          type: "Repository",
          format: "Node.js",
          link: "https://github.com/example/startup-analytics",
          language: "JavaScript",
        },
      ],
    },
    {
      id: 4,
      category: "Study Notes",
      description: "Curated study materials and notes on entrepreneurship topics",
      resources: [
        {
          id: 10,
          title: "Venture Capital Basics",
          description: "Comprehensive notes on VC funding processes and term sheets",
          type: "Notes",
          format: "PDF",
          link: "https://example.com/vc-basics-notes.pdf",
          author: "Industry Expert",
        },
        {
          id: 11,
          title: "Market Research Methods",
          description: "Detailed study guide on conducting effective market research",
          type: "Notes",
          format: "PDF",
          link: "https://example.com/market-research-notes.pdf",
          author: "Marketing Professional",
        },
        {
          id: 12,
          title: "Startup Growth Strategies",
          description: "Strategic notes on scaling startups and growth hacking",
          type: "Notes",
          format: "PDF",
          link: "https://example.com/growth-strategies-notes.pdf",
          author: "Growth Expert",
        },
      ],
    },
    {
      id: 5,
      category: "Practice Platforms",
      description: "Interactive platforms for practicing entrepreneurial skills",
      resources: [
        {
          id: 13,
          title: "Startup Simulator",
          description: "Interactive platform for simulating startup scenarios and decisions",
          type: "Platform",
          format: "Web App",
          link: "https://example.com/startup-simulator",
          features: "Real-time simulation",
        },
        {
          id: 14,
          title: "Pitch Practice Tool",
          description: "AI-powered platform for practicing and improving pitch presentations",
          type: "Platform",
          format: "Web App",
          link: "https://example.com/pitch-practice",
          features: "AI feedback",
        },
        {
          id: 15,
          title: "Business Model Tester",
          description: "Tool for testing and validating business model assumptions",
          type: "Platform",
          format: "Web App",
          link: "https://example.com/business-model-tester",
          features: "Validation framework",
        },
      ],
    },
  ]);

  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    link: "",
    categoryId: 1,
    type: "",
    format: "",
    duration: "",
    author: "",
    language: "",
    features: "",
    isDownloadable: false,
    customFields: [],
  });

  const resourceTypes = [
    { value: "Template", label: "Template", icon: "📄" },
    { value: "Guide", label: "Guide", icon: "📋" },
    { value: "Course", label: "Course", icon: "🎓" },
    { value: "Video Course", label: "Video Course", icon: "🎥" },
    { value: "Book", label: "Book", icon: "📚" },
    { value: "Podcast", label: "Podcast", icon: "🎧" },
    { value: "Newsletter", label: "Newsletter", icon: "📧" },
    { value: "Tool", label: "Tool", icon: "🛠️" },
    { value: "Checklist", label: "Checklist", icon: "✅" },
    { value: "Government Guide", label: "Government Guide", icon: "🏛️" },
  ];

  const categories = [
    "Templates & Docs",
    "Learning & Guides",
    "Legal & Compliance",
    "Recommended Reads",
  ];

  const handleAddResource = () => {
    if (newResource.title && newResource.description && newResource.link) {
      const categoryIndex = resourceCategories.findIndex(
        cat => cat.id === newResource.categoryId
      );
      
      if (categoryIndex !== -1) {
        const updatedCategories = [...resourceCategories];
        const newId = Math.max(...updatedCategories.flatMap(cat => cat.resources.map(r => r.id))) + 1;
        
        // Build the resource object with all fields including custom fields
        const resourceData = {
          id: newId,
          title: newResource.title,
          description: newResource.description,
          type: newResource.type || getCategoryName(newResource.categoryId).split(' ')[0],
          format: newResource.format || "External Link",
          link: newResource.link,
          duration: newResource.duration,
          author: newResource.author,
          language: newResource.language,
          features: newResource.features,
          isDownloadable: newResource.isDownloadable,
          isFree: newResource.isFree,
          isInteractive: newResource.isInteractive,
        };

        // Add custom fields to the resource
        newResource.customFields.forEach(field => {
          resourceData[field.key] = field.value;
        });
        
        updatedCategories[categoryIndex].resources.push(resourceData);
        
        setResourceCategories(updatedCategories);
      }

      setNewResource({
        title: "",
        description: "",
        type: "Template",
        format: "",
        link: "",
        category: "Templates & Docs",
        isDownloadable: false,
        customFields: [],
      });
      setIsAddModalOpen(false);
    }
  };

  const handleCancelAdd = () => {
    setNewResource({
      title: "",
      description: "",
      type: "Template",
      format: "",
      link: "",
      category: "Templates & Docs",
      isDownloadable: false,
      customFields: [],
    });
    setIsAddModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewResource((prev) => ({ ...prev, [field]: value }));
  };

  // Custom fields handlers
  const handleAddCustomField = () => {
    const newField = { label: "", value: "" };
    setNewResource((prev) => ({
      ...prev,
      customFields: [...(prev.customFields || []), newField],
    }));
  };

  const handleRemoveCustomField = (index) => {
    setNewResource((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    setNewResource((prev) => ({
      ...prev,
      customFields: prev.customFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const getTypeIcon = (type) => {
    const typeObj = resourceTypes.find((t) => t.value === type);
    return typeObj ? typeObj.icon : "📄";
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Startup Resources</h1>
          <p className="text-gray-600">Access curated educational materials and tools for your entrepreneurial journey</p>
        </div>

        {/* Add Resource Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Resource
          </button>
        </div>

        {/* Resource Categories */}
        <div className="space-y-8">
          {resourceCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-gray-900 mb-2">{category.category}</h2>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.resources.map((resource) => (
                  <div key={resource.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">{resource.title}</h3>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => handleEditResource(category.id, resource.id)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteResource(category.id, resource.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">{resource.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">{resource.type}</span>
                        {resource.format && <span> • {resource.format}</span>}
                        {resource.duration && <span> • {resource.duration}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        {resource.isDownloadable && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Download
                          </span>
                          <div>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                              {resource.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {resource.isDownloadable && (
                            <Download
                              className="w-4 h-4 text-green-600"
                              title="Downloadable"
                            />
                          )}
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      <h4 className="font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {resource.description}
                      </p>

                      {/* Custom Fields Display */}
                      {resource.customFields &&
                        resource.customFields.length > 0 && (
                          <div className="mb-3 pt-2 border-t border-gray-100">
                            <h5 className="text-xs font-medium text-gray-700 mb-1">
                              Additional Information:
                            </h5>
                            <div className="space-y-1">
                              {resource.customFields.map(
                                (field, fieldIndex) => (
                                  <div
                                    key={fieldIndex}
                                    className="text-xs text-gray-600 flex items-start"
                                  >
                                    <span className="font-medium text-gray-700 min-w-0 mr-1">
                                      {field.label}:
                                    </span>
                                    <span className="text-gray-600">
                                      {field.value}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Format:</span>{" "}
                          {resource.format}
                        </div>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                    
                    {(resource.author || resource.language || resource.features || hasCustomFields(resource)) && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        {resource.author && (
                          <div className="text-xs text-gray-500 mb-1">
                            <span className="font-medium">Author:</span> {resource.author}
                          </div>
                        )}
                        {resource.language && (
                          <div className="text-xs text-gray-500 mb-1">
                            <span className="font-medium">Language/Tech:</span> {resource.language}
                          </div>
                        )}
                        {resource.features && (
                          <div className="text-xs text-gray-500 mb-1">
                            <span className="font-medium">Features:</span> {resource.features}
                          </div>
                        )}
                        {renderCustomFields(resource)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Links */}
        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Quick Access Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccessLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-300 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {link.name}
                  </h3>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-xs text-gray-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Resource</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newResource.categoryId}
                  onChange={(e) => setNewResource({...newResource, categoryId: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {resourceCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.category}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter resource title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <input
                    type="text"
                    value={newResource.type}
                    onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., E-book, Video, Repository"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows="3"
                  placeholder="Enter resource description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <input
                    type="text"
                    value={newResource.format}
                    onChange={(e) => setNewResource({...newResource, format: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., PDF, MP4, Web App"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration/Size</label>
                  <input
                    type="text"
                    value={newResource.duration}
                    onChange={(e) => setNewResource({...newResource, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., 45 minutes, 10MB"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="url"
                  value={newResource.link}
                  onChange={(e) => setNewResource({...newResource, link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author/Creator</label>
                  <input
                    type="text"
                    value={newResource.author}
                    onChange={(e) => setNewResource({...newResource, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., John Doe, MIT"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language/Tech</label>
                  <input
                    type="text"
                    value={newResource.language}
                    onChange={(e) => setNewResource({...newResource, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., JavaScript, English"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features/Tags</label>
                <input
                  type="text"
                  value={newResource.features}
                  onChange={(e) => setNewResource({...newResource, features: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="e.g., Real-time simulation, Interactive"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newResource.isDownloadable}
                    onChange={(e) => setNewResource({...newResource, isDownloadable: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Downloadable</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newResource.isFree}
                    onChange={(e) => setNewResource({...newResource, isFree: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Free</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newResource.isInteractive}
                    onChange={(e) => setNewResource({...newResource, isInteractive: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Interactive</span>
                </label>
              </div>

              {/* Custom Fields */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Add Field
                  </button>
                </div>
                {newResource.customFields.map((field, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleCustomFieldChange(index, "label", e.target.value)
                      }
                      placeholder="Field name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleCustomFieldChange(index, "value", e.target.value)
                      }
                      placeholder="Field value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomField(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddResource}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Add Resource
              </button>
              <button
                onClick={() => {
                  setNewResource({ 
                    title: "", 
                    description: "", 
                    link: "", 
                    categoryId: 1,
                    type: "",
                    format: "",
                    duration: "",
                    author: "",
                    language: "",
                    features: "",
                    isDownloadable: false,
                    isFree: true,
                    isInteractive: false,
                    customFields: [],
                  });
                  setIsAddModalOpen(false);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Resource Modal */}
      {isEditModalOpen && editingResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Resource</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingResource.title}
                    onChange={(e) => setEditingResource({...editingResource, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter resource title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <input
                    type="text"
                    value={editingResource.type || ""}
                    onChange={(e) => setEditingResource({...editingResource, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., E-book, Video, Repository"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingResource.description}
                  onChange={(e) => setEditingResource({...editingResource, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows="3"
                  placeholder="Describe what this resource provides..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <input
                    type="text"
                    value={editingResource.format || ""}
                    onChange={(e) => setEditingResource({...editingResource, format: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., PDF, MP4, Web App"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration/Size</label>
                  <input
                    type="text"
                    value={editingResource.duration || editingResource.size || ""}
                    onChange={(e) => setEditingResource({...editingResource, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., 45 minutes, 10MB"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Link</label>
                <input
                  type="url"
                  value={editingResource.link}
                  onChange={(e) => setEditingResource({...editingResource, link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="https://example.com/resource"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author/Creator</label>
                  <input
                    type="text"
                    value={editingResource.author || editingResource.creator || ""}
                    onChange={(e) => setEditingResource({...editingResource, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., John Doe, MIT"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language/Tech</label>
                  <input
                    type="text"
                    value={editingResource.language || editingResource.technology || ""}
                    onChange={(e) => setEditingResource({...editingResource, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., JavaScript, English"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features/Tags</label>
                <input
                  type="text"
                  value={editingResource.features || editingResource.tags || ""}
                  onChange={(e) => setEditingResource({...editingResource, features: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="e.g., Real-time simulation, Interactive"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingResource.isDownloadable || false}
                    onChange={(e) => setEditingResource({...editingResource, isDownloadable: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Downloadable</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingResource.isFree || false}
                    onChange={(e) => setEditingResource({...editingResource, isFree: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Free</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingResource.isInteractive || false}
                    onChange={(e) => setEditingResource({...editingResource, isInteractive: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Interactive</span>
                </label>
              </div>

              {/* Custom Fields Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Custom Fields</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newCustomField = { 
                        id: Date.now(), 
                        key: '', 
                        value: '' 
                      };
                      setEditingResource({
                        ...editingResource, 
                        customFields: [...(editingResource.customFields || []), newCustomField]
                      });
                    }}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    + Add Custom Field
                  </button>
                </div>
                
                {editingResource.customFields?.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Field Name (e.g., Price)"
                      value={field.key}
                      onChange={(e) => {
                        const updatedFields = [...(editingResource.customFields || [])];
                        updatedFields[index].key = e.target.value;
                        setEditingResource({...editingResource, customFields: updatedFields});
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Field Value (e.g., $99)"
                      value={field.value}
                      onChange={(e) => {
                        const updatedFields = [...(editingResource.customFields || [])];
                        updatedFields[index].value = e.target.value;
                        setEditingResource({...editingResource, customFields: updatedFields});
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedFields = (editingResource.customFields || []).filter((_, i) => i !== index);
                        setEditingResource({...editingResource, customFields: updatedFields});
                      }}
                      className="px-2 py-2 text-red-600 hover:bg-red-50 rounded transition-colors text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                {(!editingResource.customFields || editingResource.customFields.length === 0) && (
                  <p className="text-xs text-gray-500 italic">No custom fields added. Click "Add Custom Field" to create one.</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Resources;
