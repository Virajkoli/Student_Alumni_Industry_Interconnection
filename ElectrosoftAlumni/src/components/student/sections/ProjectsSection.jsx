import React, { useState } from "react";
import { Edit, Plus, X, Folder, ExternalLink } from "lucide-react";
import { studentAPI } from "../../../services/apiService";

const ProjectsSection = ({ projects = [], onProjectsUpdate, studentId }) => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    date: "",
    url: "",
    technologies: [],
    customFields: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnologyAdd = (technology) => {
    if (
      technology &&
      technology.trim() &&
      !projectData.technologies.includes(technology.trim())
    ) {
      setProjectData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, technology.trim()],
      }));
    }
  };

  const handleTechnologyRemove = (technologyToRemove) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (tech) => tech !== technologyToRemove
      ),
    }));
  };

  const handleCustomFieldAdd = () => {
    setProjectData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { label: "", value: "" }],
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    setProjectData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleCustomFieldRemove = (index) => {
    setProjectData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const projectPayload = {
        title: projectData.title,
        description: projectData.description,
        technologies: projectData.technologies.join(", "),
        project_link: projectData.url,
        start_date: projectData.date ? projectData.date : null,
        end_date: null, // You might want to add an end date field
      };

      if (editingProject) {
        // Update existing project
        await studentAPI.updateProject(
          studentId,
          editingProject.id,
          projectPayload
        );
      } else {
        // Add new project
        await studentAPI.addProject(studentId, projectPayload);
      }
      closeModal();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectData({
      title: project.title || "",
      description: project.description || "",
      date: project.start_date || "",
      url: project.project_link || "",
      technologies: project.technologies
        ? project.technologies.split(", ")
        : [],
      customFields: project.customFields || [],
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await studentAPI.deleteProject(studentId, projectId);
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const closeModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
    setProjectData({
      title: "",
      description: "",
      date: "",
      url: "",
      technologies: [],
      customFields: [],
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
          <button
            onClick={() => setShowProjectModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Add project"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No projects added yet</p>
              <button
                onClick={() => setShowProjectModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first project
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {(project.project_link || project.url) && (
                        <a
                          href={project.project_link || project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="View project"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete project"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-500">
                    {project.start_date
                      ? new Date(project.start_date).toLocaleDateString()
                      : project.date}
                  </p>

                  {project.technologies && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Technologies:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(typeof project.technologies === "string"
                          ? project.technologies.split(", ")
                          : project.technologies || []
                        ).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.customFields && project.customFields.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {project.customFields.map((field, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium text-gray-600">
                            {field.label}:
                          </span>
                          <span className="text-gray-700 ml-1">
                            {field.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingProject ? "Edit Project" : "Add Project"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={projectData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. E-commerce Website"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe what the project does, technologies used, and your role..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={projectData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. May 2024, Spring 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={projectData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="https://github.com/username/project or live demo URL"
                />
              </div>

              {/* Technologies Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a technology and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleTechnologyAdd(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        handleTechnologyAdd(input.value);
                        input.value = "";
                      }}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {projectData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {projectData.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center gap-2"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleTechnologyRemove(tech)}
                            className="text-green-500 hover:text-green-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Fields Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleCustomFieldAdd}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Field
                  </button>
                </div>
                {projectData.customFields.length > 0 && (
                  <div className="space-y-2">
                    {projectData.customFields.map((field, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Field name"
                          value={field.label}
                          onChange={(e) =>
                            handleCustomFieldChange(
                              index,
                              "label",
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Field value"
                          value={field.value}
                          onChange={(e) =>
                            handleCustomFieldChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleCustomFieldRemove(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteProject(editingProject.id);
                      closeModal();
                    }}
                    className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
