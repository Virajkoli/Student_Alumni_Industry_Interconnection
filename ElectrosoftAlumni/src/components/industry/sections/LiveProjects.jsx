import React, { useState } from "react";
import {
  Edit3,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const LiveProjects = () => {
  const [editingId, setEditingId] = useState(null);
  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      title: "AI-Powered Customer Service Chatbot",
      company: "RetailTech Solutions",
      description:
        "Develop an intelligent chatbot that can handle customer inquiries, process orders, and provide personalized recommendations using natural language processing.",
      budget: "₹3-5 Lakhs",
      duration: "3 months",
      deadline: "2024-04-15",
      skillsRequired: ["Python", "NLP", "Machine Learning", "API Integration"],
      status: "Open",
      applicants: 24,
      type: "Development",
      priority: "High",
      postedDate: "2024-01-10",
    },
    {
      id: 2,
      title: "Supply Chain Optimization System",
      company: "LogisticsPro India",
      description:
        "Create a comprehensive system to optimize supply chain operations, reduce costs, and improve delivery efficiency using data analytics and predictive modeling.",
      budget: "₹8-12 Lakhs",
      duration: "6 months",
      deadline: "2024-06-30",
      skillsRequired: [
        "Data Analytics",
        "Python",
        "SQL",
        "Business Intelligence",
      ],
      status: "In Progress",
      applicants: 18,
      type: "Analytics",
      priority: "Medium",
      postedDate: "2024-01-05",
    },
    {
      id: 3,
      title: "IoT-Based Smart Factory Solution",
      company: "Manufacturing Plus",
      description:
        "Design and implement an IoT-based monitoring system for factory equipment to predict maintenance needs and optimize production efficiency.",
      budget: "₹15-20 Lakhs",
      duration: "8 months",
      deadline: "2024-08-31",
      skillsRequired: [
        "IoT",
        "Embedded Systems",
        "Cloud Computing",
        "Data Analytics",
      ],
      status: "Open",
      applicants: 31,
      type: "Hardware",
      priority: "High",
      postedDate: "2024-01-12",
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    company: "",
    description: "",
    budget: "",
    duration: "",
    deadline: "",
    skillsRequired: "",
    type: "",
    priority: "",
  });

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditData({
      title: project.title,
      company: project.company,
      description: project.description,
      budget: project.budget,
      duration: project.duration,
      deadline: project.deadline,
      skillsRequired: project.skillsRequired.join(", "),
      type: project.type,
      priority: project.priority,
    });
  };

  const handleSave = () => {
    setProjectsData(
      projectsData.map((project) =>
        project.id === editingId
          ? {
              ...project,
              title: editData.title,
              company: editData.company,
              description: editData.description,
              budget: editData.budget,
              duration: editData.duration,
              deadline: editData.deadline,
              skillsRequired: editData.skillsRequired
                .split(",")
                .map((skill) => skill.trim()),
              type: editData.type,
              priority: editData.priority,
            }
          : project
      )
    );
    setEditingId(null);
    setEditData({
      title: "",
      company: "",
      description: "",
      budget: "",
      duration: "",
      deadline: "",
      skillsRequired: "",
      type: "",
      priority: "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      title: "",
      company: "",
      description: "",
      budget: "",
      duration: "",
      deadline: "",
      skillsRequired: "",
      type: "",
      priority: "",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Live Projects & Industrial Problems
          </h2>
          <p className="text-gray-600 mt-1">
            Collaborate on real-world projects and solve industry challenges
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Post New Project
        </button>
      </div>

      <div className="space-y-6">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editingId === project.id ? (
              // Edit Mode
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editData.company}
                      onChange={(e) =>
                        setEditData({ ...editData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget
                      </label>
                      <input
                        type="text"
                        value={editData.budget}
                        onChange={(e) =>
                          setEditData({ ...editData, budget: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={editData.duration}
                        onChange={(e) =>
                          setEditData({ ...editData, duration: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={editData.deadline}
                        onChange={(e) =>
                          setEditData({ ...editData, deadline: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Type
                      </label>
                      <select
                        value={editData.type}
                        onChange={(e) =>
                          setEditData({ ...editData, type: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Development">Development</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Research">Research</option>
                        <option value="Consulting">Consulting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={editData.priority}
                        onChange={(e) =>
                          setEditData({ ...editData, priority: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills Required (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editData.skillsRequired}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          skillsRequired: e.target.value,
                        })
                      }
                      placeholder="Python, Machine Learning, API Integration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg text-blue-600 font-medium mb-3">
                      {project.company}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                          project.priority
                        )}`}
                      >
                        {project.priority} Priority
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {project.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Due: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{project.applicants} applicants</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Required Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Posted on{" "}
                    {new Date(project.postedDate).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Save Project
                    </button>
                    <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                      View Details
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Project Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active Projects</p>
              <p className="text-2xl font-bold">45</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Budget</p>
              <p className="text-2xl font-bold">₹2.5Cr</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Applications</p>
              <p className="text-2xl font-bold">234</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Urgent</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveProjects;
