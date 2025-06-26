import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  Briefcase,
  TrendingUp,
  Star,
  MapPin,
} from "lucide-react";

const JobsSkills = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("trending");

  const [content, setContent] = useState({
    title: "Jobs & Trending Skills",
    description:
      "Explore job opportunities and discover the most in-demand skills in the startup ecosystem.",
    categories: {
      trending: {
        title: "Trending Skills",
        skills: [
          {
            name: "Artificial Intelligence",
            demand: "High",
            growth: "+45%",
            avgSalary: "$120K",
            icon: "🤖",
          },
          {
            name: "Product Management",
            demand: "High",
            growth: "+32%",
            avgSalary: "$110K",
            icon: "📋",
          },
          {
            name: "Data Science",
            demand: "High",
            growth: "+28%",
            avgSalary: "$115K",
            icon: "📊",
          },
          {
            name: "UI/UX Design",
            demand: "High",
            growth: "+25%",
            avgSalary: "$85K",
            icon: "🎨",
          },
        ],
      },
      jobs: {
        title: "Available Jobs",
        jobs: [
          {
            title: "Senior Product Manager",
            company: "TechStart Inc.",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$120K - $150K",
            skills: ["Product Strategy", "Agile", "Data Analysis"],
            posted: "2 days ago",
            applicants: 45,
          },
          {
            title: "Frontend Developer",
            company: "InnovateLab",
            location: "Remote",
            type: "Full-time",
            salary: "$80K - $110K",
            skills: ["React", "TypeScript", "Tailwind CSS"],
            posted: "1 day ago",
            applicants: 32,
          },
          {
            title: "Data Scientist",
            company: "AI Solutions",
            location: "New York, NY",
            type: "Full-time",
            salary: "$110K - $140K",
            skills: ["Python", "Machine Learning", "SQL"],
            posted: "3 days ago",
            applicants: 28,
          },
        ],
      },
      learning: {
        title: "Learning Paths",
        paths: [
          {
            title: "Full-Stack Development",
            duration: "6-8 months",
            level: "Beginner to Advanced",
            modules: [
              "HTML/CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Databases",
            ],
            completion: "12,000+ students",
            rating: 4.8,
          },
          {
            title: "Data Science & AI",
            duration: "8-10 months",
            level: "Intermediate",
            modules: [
              "Python",
              "Statistics",
              "Machine Learning",
              "Deep Learning",
              "Data Visualization",
            ],
            completion: "8,500+ students",
            rating: 4.9,
          },
        ],
      },
    },
  });

  const [newItem, setNewItem] = useState({
    name: "",
    demand: "High",
    growth: "",
    avgSalary: "",
    icon: "💡",
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    skills: [],
    posted: "",
    applicants: 0,
    duration: "",
    level: "Beginner",
    modules: [],
    completion: "",
    rating: 4.5,
  });

  const [editItem, setEditItem] = useState({
    name: "",
    demand: "High",
    growth: "",
    avgSalary: "",
    icon: "💡",
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    skills: [],
    posted: "",
    applicants: 0,
    duration: "",
    level: "Beginner",
    modules: [],
    completion: "",
    rating: 4.5,
  });

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const handleSaveItem = () => {
    if (selectedCategory === "trending" && newItem.name.trim()) {
      const item = {
        name: newItem.name,
        demand: newItem.demand,
        growth: newItem.growth,
        avgSalary: newItem.avgSalary,
        icon: newItem.icon,
      };
      setContent((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          trending: {
            ...prev.categories.trending,
            skills: [...prev.categories.trending.skills, item],
          },
        },
      }));
    } else if (selectedCategory === "jobs" && newItem.title.trim()) {
      const item = {
        title: newItem.title,
        company: newItem.company,
        location: newItem.location,
        type: newItem.type,
        salary: newItem.salary,
        skills:
          typeof newItem.skills === "string"
            ? newItem.skills
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            : newItem.skills,
        posted: newItem.posted,
        applicants: newItem.applicants,
      };
      setContent((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          jobs: {
            ...prev.categories.jobs,
            jobs: [...prev.categories.jobs.jobs, item],
          },
        },
      }));
    } else if (selectedCategory === "learning" && newItem.title.trim()) {
      const item = {
        title: newItem.title,
        duration: newItem.duration,
        level: newItem.level,
        modules:
          typeof newItem.modules === "string"
            ? newItem.modules
                .split(",")
                .map((m) => m.trim())
                .filter((m) => m.length > 0)
            : newItem.modules,
        completion: newItem.completion,
        rating: newItem.rating,
      };
      setContent((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          learning: {
            ...prev.categories.learning,
            paths: [...prev.categories.learning.paths, item],
          },
        },
      }));
    }

    setNewItem({
      name: "",
      demand: "High",
      growth: "",
      avgSalary: "",
      icon: "💡",
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      skills: [],
      posted: "",
      applicants: 0,
      duration: "",
      level: "Beginner",
      modules: [],
      completion: "",
      rating: 4.5,
    });
    setShowAddModal(false);
  };

  const handleCancelAdd = () => {
    setNewItem({
      name: "",
      demand: "High",
      growth: "",
      avgSalary: "",
      icon: "💡",
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      skills: [],
      posted: "",
      applicants: 0,
      duration: "",
      level: "Beginner",
      modules: [],
      completion: "",
      rating: 4.5,
    });
    setShowAddModal(false);
  };

  const handleEditClick = (index, category) => {
    let item = {};
    if (category === "trending") {
      item = content.categories.trending.skills[index];
    } else if (category === "jobs") {
      item = content.categories.jobs.jobs[index];
    } else if (category === "learning") {
      item = content.categories.learning.paths[index];
    }
    setEditItem({ ...item });
    setEditingItemIndex({ index, category });
  };

  const handleSaveEdit = () => {
    const { index, category } = editingItemIndex;
    const newContent = { ...content };

    if (category === "trending") {
      newContent.categories.trending.skills[index] = {
        name: editItem.name,
        demand: editItem.demand,
        growth: editItem.growth,
        avgSalary: editItem.avgSalary,
        icon: editItem.icon,
      };
    } else if (category === "jobs") {
      newContent.categories.jobs.jobs[index] = {
        title: editItem.title,
        company: editItem.company,
        location: editItem.location,
        type: editItem.type,
        salary: editItem.salary,
        skills:
          typeof editItem.skills === "string"
            ? editItem.skills
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            : editItem.skills,
        posted: editItem.posted,
        applicants: editItem.applicants,
      };
    } else if (category === "learning") {
      newContent.categories.learning.paths[index] = {
        title: editItem.title,
        duration: editItem.duration,
        level: editItem.level,
        modules:
          typeof editItem.modules === "string"
            ? editItem.modules
                .split(",")
                .map((m) => m.trim())
                .filter((m) => m.length > 0)
            : editItem.modules,
        completion: editItem.completion,
        rating: editItem.rating,
      };
    }

    setContent(newContent);
    setEditingItemIndex(null);
    setEditItem({
      name: "",
      demand: "High",
      growth: "",
      avgSalary: "",
      icon: "💡",
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      skills: [],
      posted: "",
      applicants: 0,
      duration: "",
      level: "Beginner",
      modules: [],
      completion: "",
      rating: 4.5,
    });
  };

  const handleCancelEdit = () => {
    setEditingItemIndex(null);
    setEditItem({
      name: "",
      demand: "High",
      growth: "",
      avgSalary: "",
      icon: "💡",
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      skills: [],
      posted: "",
      applicants: 0,
      duration: "",
      level: "Beginner",
      modules: [],
      completion: "",
      rating: 4.5,
    });
  };

  const handleInputChange = (field, value, isEdit = false) => {
    if (isEdit) {
      setEditItem((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewItem((prev) => ({ ...prev, [field]: value }));
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            title={isEditing ? "Done editing" : "Edit Jobs & Skills"}
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

        {/* Add Item Button (when editing) */}
        {isEditing && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <button
              onClick={handleAddItem}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New{" "}
              {selectedCategory === "trending"
                ? "Skill"
                : selectedCategory === "jobs"
                ? "Job"
                : "Learning Path"}
            </button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {Object.entries(content.categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Based on Selected Category */}
        <div className="p-6">
          {/* Trending Skills */}
          {selectedCategory === "trending" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.categories.trending.skills.map((skill, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${getDemandColor(
                          skill.demand
                        )}`}
                      >
                        {skill.demand}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => handleEditClick(index, "trending")}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                          title="Edit skill"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Growth Rate</p>
                      <p className="font-semibold text-green-600">
                        {skill.growth}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Avg Salary</p>
                      <p className="font-semibold text-gray-900">
                        {skill.avgSalary}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Demand</p>
                      <p className="font-semibold text-gray-900">
                        {skill.demand}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Learn Skill
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                      View Jobs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Available Jobs */}
          {selectedCategory === "jobs" && (
            <div className="space-y-4">
              {content.categories.jobs.jobs.map((job, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.posted}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {job.salary}
                        </p>
                        <p className="text-sm text-gray-600">
                          {job.applicants} applicants
                        </p>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => handleEditClick(index, "jobs")}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                          title="Edit job"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Required Skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Save Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Learning Paths */}
          {selectedCategory === "learning" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.categories.learning.paths.map((path, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {path.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{path.duration}</span>
                        <span>•</span>
                        <span>{path.level}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {path.rating}
                        </span>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => handleEditClick(index, "learning")}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                          title="Edit learning path"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Modules:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.modules.map((module, moduleIndex) => (
                        <span
                          key={moduleIndex}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">
                      {path.completion}
                    </span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Popular</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Start Learning
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 rounded-b-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Market Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">2,500+</p>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600">Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4.8/5</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600">Cities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New{" "}
                  {selectedCategory === "trending"
                    ? "Skill"
                    : selectedCategory === "jobs"
                    ? "Job"
                    : "Learning Path"}
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
              {selectedCategory === "trending" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skill Name *
                      </label>
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter skill name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <input
                        type="text"
                        value={newItem.icon}
                        onChange={(e) =>
                          handleInputChange("icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center"
                        placeholder="🤖"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Demand Level
                      </label>
                      <select
                        value={newItem.demand}
                        onChange={(e) =>
                          handleInputChange("demand", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Growth Rate
                      </label>
                      <input
                        type="text"
                        value={newItem.growth}
                        onChange={(e) =>
                          handleInputChange("growth", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="+45%"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average Salary
                      </label>
                      <input
                        type="text"
                        value={newItem.avgSalary}
                        onChange={(e) =>
                          handleInputChange("avgSalary", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="$120K"
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedCategory === "jobs" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={newItem.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={newItem.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Company name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={newItem.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type
                      </label>
                      <select
                        value={newItem.type}
                        onChange={(e) =>
                          handleInputChange("type", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        value={newItem.salary}
                        onChange={(e) =>
                          handleInputChange("salary", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="$80K - $110K"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills (comma-separated)
                    </label>
                    <textarea
                      value={
                        Array.isArray(newItem.skills)
                          ? newItem.skills.join(", ")
                          : newItem.skills
                      }
                      onChange={(e) =>
                        handleInputChange("skills", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>
                </>
              )}

              {selectedCategory === "learning" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Path Title *
                    </label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter learning path title"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={newItem.duration}
                        onChange={(e) =>
                          handleInputChange("duration", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="6-8 months"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        value={newItem.level}
                        onChange={(e) =>
                          handleInputChange("level", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Beginner to Advanced">
                          Beginner to Advanced
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={newItem.rating}
                        onChange={(e) =>
                          handleInputChange(
                            "rating",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="4.8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modules (comma-separated)
                    </label>
                    <textarea
                      value={
                        Array.isArray(newItem.modules)
                          ? newItem.modules.join(", ")
                          : newItem.modules
                      }
                      onChange={(e) =>
                        handleInputChange("modules", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="HTML/CSS, JavaScript, React"
                    />
                  </div>
                </>
              )}
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
                onClick={handleSaveItem}
                disabled={
                  (selectedCategory === "trending" && !newItem.name.trim()) ||
                  (selectedCategory === "jobs" && !newItem.title.trim()) ||
                  (selectedCategory === "learning" && !newItem.title.trim())
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add{" "}
                {selectedCategory === "trending"
                  ? "Skill"
                  : selectedCategory === "jobs"
                  ? "Job"
                  : "Learning Path"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItemIndex && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit{" "}
                  {editingItemIndex.category === "trending"
                    ? "Skill"
                    : editingItemIndex.category === "jobs"
                    ? "Job"
                    : "Learning Path"}
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
              {editingItemIndex.category === "trending" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skill Name *
                      </label>
                      <input
                        type="text"
                        value={editItem.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter skill name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <input
                        type="text"
                        value={editItem.icon}
                        onChange={(e) =>
                          handleInputChange("icon", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center"
                        placeholder="🤖"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Demand Level
                      </label>
                      <select
                        value={editItem.demand}
                        onChange={(e) =>
                          handleInputChange("demand", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Growth Rate
                      </label>
                      <input
                        type="text"
                        value={editItem.growth}
                        onChange={(e) =>
                          handleInputChange("growth", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="+45%"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average Salary
                      </label>
                      <input
                        type="text"
                        value={editItem.avgSalary}
                        onChange={(e) =>
                          handleInputChange("avgSalary", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="$120K"
                      />
                    </div>
                  </div>
                </>
              )}

              {editingItemIndex.category === "jobs" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={editItem.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={editItem.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Company name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editItem.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type
                      </label>
                      <select
                        value={editItem.type}
                        onChange={(e) =>
                          handleInputChange("type", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        value={editItem.salary}
                        onChange={(e) =>
                          handleInputChange("salary", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="$80K - $110K"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills (comma-separated)
                    </label>
                    <textarea
                      value={
                        Array.isArray(editItem.skills)
                          ? editItem.skills.join(", ")
                          : editItem.skills
                      }
                      onChange={(e) =>
                        handleInputChange("skills", e.target.value, true)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>
                </>
              )}

              {editingItemIndex.category === "learning" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Path Title *
                    </label>
                    <input
                      type="text"
                      value={editItem.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value, true)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter learning path title"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={editItem.duration}
                        onChange={(e) =>
                          handleInputChange("duration", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="6-8 months"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        value={editItem.level}
                        onChange={(e) =>
                          handleInputChange("level", e.target.value, true)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Beginner to Advanced">
                          Beginner to Advanced
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={editItem.rating}
                        onChange={(e) =>
                          handleInputChange(
                            "rating",
                            parseFloat(e.target.value) || 0,
                            true
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="4.8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modules (comma-separated)
                    </label>
                    <textarea
                      value={
                        Array.isArray(editItem.modules)
                          ? editItem.modules.join(", ")
                          : editItem.modules
                      }
                      onChange={(e) =>
                        handleInputChange("modules", e.target.value, true)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="HTML/CSS, JavaScript, React"
                    />
                  </div>
                </>
              )}
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
                  (editingItemIndex.category === "trending" &&
                    !editItem.name.trim()) ||
                  (editingItemIndex.category === "jobs" &&
                    !editItem.title.trim()) ||
                  (editingItemIndex.category === "learning" &&
                    !editItem.title.trim())
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

export default JobsSkills;
