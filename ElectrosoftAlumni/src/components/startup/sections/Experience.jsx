import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  MapPin,
  Calendar,
  Building,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const Experience = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Series A Funding Round",
      company: "TechStartup Inc.",
      duration: "Jan 2024 – Present",
      location: "San Francisco, CA",
      description:
        "Successfully raised $5M Series A funding round led by Sequoia Capital to accelerate product development and market expansion.",
      highlights: [
        "Secured $5M funding from top-tier VCs",
        "Expanded team from 15 to 45 employees",
        "Launched enterprise product suite",
        "Achieved 300% YoY revenue growth",
      ],
      type: "Funding",
    },
    {
      id: 2,
      title: "Product-Market Fit Achievement",
      company: "TechStartup Inc.",
      duration: "Mar 2023 – Dec 2023",
      location: "San Francisco, CA",
      description:
        "Achieved strong product-market fit with B2B SaaS platform, leading to exponential growth in customer acquisition and retention.",
      highlights: [
        "Reached 10,000+ active users",
        "Achieved 95% customer satisfaction score",
        "Launched API platform for developers",
        "Established partnerships with 5 major enterprises",
      ],
      type: "Milestone",
    },
    {
      id: 3,
      title: "Accelerator Program Graduate",
      company: "Y Combinator",
      duration: "Jun 2022 – Sep 2022",
      location: "Mountain View, CA",
      description:
        "Completed the prestigious Y Combinator accelerator program, receiving mentorship and seed funding to launch our MVP.",
      highlights: [
        "Graduated from YC S22 batch",
        "Received $250K seed funding",
        "Built and launched MVP in 3 months",
        "Acquired first 100 paying customers",
      ],
      type: "Accelerator",
    },
    {
      id: 4,
      title: "Company Foundation",
      company: "TechStartup Inc.",
      duration: "Jan 2022 – May 2022",
      location: "Remote",
      description:
        "Co-founded the company with a vision to revolutionize how businesses manage their data and analytics workflows.",
      highlights: [
        "Incorporated the company",
        "Assembled founding team of 4 engineers",
        "Developed initial product concept",
        "Secured pre-seed funding of $100K",
      ],
      type: "Foundation",
    },
  ]);

  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: "",
    location: "",
    description: "",
    highlights: [""],
    type: "Milestone",
  });

  const experienceTypes = [
    { value: "Foundation", label: "Company Foundation", icon: "🏗️" },
    { value: "Accelerator", label: "Accelerator/Incubator", icon: "🚀" },
    { value: "Funding", label: "Funding Round", icon: "💰" },
    { value: "Milestone", label: "Key Milestone", icon: "🎯" },
    { value: "Pivot", label: "Business Pivot", icon: "🔄" },
    { value: "Launch", label: "Product Launch", icon: "📱" },
    { value: "Expansion", label: "Market Expansion", icon: "🌍" },
    { value: "Partnership", label: "Strategic Partnership", icon: "🤝" },
    { value: "Acquisition", label: "Acquisition/Exit", icon: "🏆" },
  ];

  const handleAddExperience = () => {
    setIsAddModalOpen(true);
  };

  const handleEditExperience = (index) => {
    setEditingIndex(index);
    setEditingExperience({ ...experiences[index] });
    setIsEditModalOpen(true);
  };

  const handleSaveEditExperience = () => {
    if (
      editingExperience.title.trim() &&
      editingExperience.description.trim()
    ) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editingIndex] = {
        ...editingExperience,
        highlights: editingExperience.highlights.filter((h) => h.trim() !== ""),
      };
      setExperiences(updatedExperiences);
      setIsEditModalOpen(false);
      setEditingIndex(null);
      setEditingExperience(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingIndex(null);
    setEditingExperience(null);
  };

  const handleSaveExperience = () => {
    if (newExperience.title.trim() && newExperience.description.trim()) {
      const experience = {
        id: experiences.length + 1,
        ...newExperience,
        highlights: newExperience.highlights.filter((h) => h.trim() !== ""),
      };
      setExperiences([experience, ...experiences]);
      setNewExperience({
        title: "",
        company: "",
        duration: "",
        location: "",
        description: "",
        highlights: [""],
        type: "Milestone",
      });
      setIsAddModalOpen(false);
    }
  };

  const handleCancelAdd = () => {
    setNewExperience({
      title: "",
      company: "",
      duration: "",
      location: "",
      description: "",
      highlights: [""],
      type: "Milestone",
    });
    setIsAddModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewExperience((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field, value) => {
    setEditingExperience((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditHighlightChange = (index, value) => {
    const newHighlights = [...editingExperience.highlights];
    newHighlights[index] = value;
    setEditingExperience((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addEditHighlight = () => {
    setEditingExperience((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeEditHighlight = (index) => {
    if (editingExperience.highlights.length > 1) {
      const newHighlights = editingExperience.highlights.filter(
        (_, i) => i !== index
      );
      setEditingExperience((prev) => ({ ...prev, highlights: newHighlights }));
    }
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...newExperience.highlights];
    newHighlights[index] = value;
    setNewExperience((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setNewExperience((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeHighlight = (index) => {
    if (newExperience.highlights.length > 1) {
      const newHighlights = newExperience.highlights.filter(
        (_, i) => i !== index
      );
      setNewExperience((prev) => ({ ...prev, highlights: newHighlights }));
    }
  };

  const getTypeIcon = (type) => {
    const typeObj = experienceTypes.find((t) => t.value === type);
    return typeObj ? typeObj.icon : "🎯";
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Experience
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track your startup journey, milestones, and key achievements
              </p>
            </div>
            <button
              onClick={handleAddExperience}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>

          {/* Experience Guidelines */}
          {/* <div className="p-6 bg-blue-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              ✅ What to Include in Your Experience:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  🚀 Key Stages
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Company foundation</li>
                  <li>• Accelerator programs</li>
                  <li>• Funding rounds</li>
                  <li>• Product launches</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  🎯 Milestones
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Revenue targets achieved</li>
                  <li>• User growth milestones</li>
                  <li>• Market expansion</li>
                  <li>• Strategic partnerships</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  📈 Achievements
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Awards & recognition</li>
                  <li>• Media coverage</li>
                  <li>• Team growth</li>
                  <li>• Product-market fit</li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* Experience Timeline */}
          <div className="p-6">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="space-y-8">
                {experiences.map((experience, index) => (
                  <div key={experience.id} className="relative flex gap-6">
                    {/* Timeline Icon */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-12 h-12 bg-blue-100 border-4 border-white shadow-sm rounded-full flex items-center justify-center">
                        <span className="text-lg">
                          {getTypeIcon(experience.type)}
                        </span>
                      </div>
                    </div>

                    {/* Experience Content */}
                    <div className="flex-1 min-w-0 pb-8">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                {experience.type}
                              </span>
                              <div className="flex items-center text-xs text-gray-500 gap-1">
                                <Calendar className="w-3 h-3" />
                                {experience.duration}
                              </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {experience.title}
                            </h3>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {experience.company}
                              </div>
                              {experience.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {experience.location}
                                </div>
                              )}
                            </div>

                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {experience.description}
                            </p>

                            {/* Highlights */}
                            {experience.highlights &&
                              experience.highlights.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium text-gray-800 mb-2">
                                    Key Highlights:
                                  </h4>
                                  <ul className="space-y-1">
                                    {experience.highlights.map(
                                      (highlight, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start gap-2 text-sm text-gray-600"
                                        >
                                          <span className="text-blue-500 mt-1">
                                            •
                                          </span>
                                          <span>{highlight}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditExperience(index)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-4"
                            title="Edit experience"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Experience Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add Experience
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
              {/* Experience Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Type *
                </label>
                <select
                  value={newExperience.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {experienceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title/Role *
                  </label>
                  <input
                    type="text"
                    value={newExperience.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Series A Funding Round"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Your Startup Inc."
                  />
                </div>
              </div>

              {/* Duration and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={newExperience.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Jan 2024 – Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newExperience.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newExperience.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe what happened during this stage of your startup journey..."
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Highlights
                </label>
                <div className="space-y-2">
                  {newExperience.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleHighlightChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter a key achievement or highlight"
                      />
                      {newExperience.highlights.length > 1 && (
                        <button
                          onClick={() => removeHighlight(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addHighlight}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add another highlight
                  </button>
                </div>
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
                onClick={handleSaveExperience}
                disabled={
                  !newExperience.title.trim() ||
                  !newExperience.description.trim()
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Experience Modal */}
      {isEditModalOpen && editingExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Experience
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
              {/* Experience Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Type *
                </label>
                <select
                  value={editingExperience.type}
                  onChange={(e) =>
                    handleEditInputChange("type", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {experienceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title/Role *
                  </label>
                  <input
                    type="text"
                    value={editingExperience.title}
                    onChange={(e) =>
                      handleEditInputChange("title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Series A Funding Round"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    value={editingExperience.company}
                    onChange={(e) =>
                      handleEditInputChange("company", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Your Startup Inc."
                  />
                </div>
              </div>

              {/* Duration and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={editingExperience.duration}
                    onChange={(e) =>
                      handleEditInputChange("duration", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Jan 2024 – Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExperience.location}
                    onChange={(e) =>
                      handleEditInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={editingExperience.description}
                  onChange={(e) =>
                    handleEditInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe what happened during this stage of your startup journey..."
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Highlights
                </label>
                <div className="space-y-2">
                  {editingExperience.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleEditHighlightChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter a key achievement or highlight"
                      />
                      {editingExperience.highlights.length > 1 && (
                        <button
                          onClick={() => removeEditHighlight(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addEditHighlight}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add another highlight
                  </button>
                </div>
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
                onClick={handleSaveEditExperience}
                disabled={
                  !editingExperience.title.trim() ||
                  !editingExperience.description.trim()
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

export default Experience;
