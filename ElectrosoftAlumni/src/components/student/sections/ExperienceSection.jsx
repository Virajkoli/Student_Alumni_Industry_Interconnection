import React, { useState, useEffect } from "react";
import { Edit, Plus, X, Briefcase } from "lucide-react";

const ExperienceSection = ({ experiences = [], onExperienceUpdate }) => {
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    employmentType: "Full-time",
    currentlyWorking: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    location: "",
    description: "",
    skills: [],
    achievements: [],
    customFields: [],
    notifyNetwork: true,
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperienceData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillAdd = (skill) => {
    if (
      skill &&
      skill.trim() &&
      !experienceData.skills.includes(skill.trim())
    ) {
      setExperienceData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setExperienceData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAchievementAdd = (achievement) => {
    if (achievement && achievement.trim()) {
      setExperienceData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievement.trim()],
      }));
    }
  };

  const handleAchievementRemove = (index) => {
    setExperienceData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleCustomFieldAdd = () => {
    setExperienceData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { label: "", value: "" }],
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    setExperienceData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleCustomFieldRemove = (index) => {
    setExperienceData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExperience) {
      // Update existing experience
      const updatedExperiences = experiences.map((exp) =>
        exp.id === editingExperience.id
          ? { ...experienceData, id: editingExperience.id }
          : exp
      );
      onExperienceUpdate(updatedExperiences);
    } else {
      // Add new experience
      const newExperience = {
        id: Date.now(),
        ...experienceData,
      };
      onExperienceUpdate((prev) => [...prev, newExperience]);
    }
    closeModal();
  };

  const handleEditExperience = (experience) => {
    setEditingExperience(experience);
    setExperienceData({
      ...experience,
      skills: experience.skills || [],
      achievements: experience.achievements || [],
      customFields: experience.customFields || [],
    });
    setShowExperienceModal(true);
  };

  const handleDeleteExperience = (experienceId) => {
    const updatedExperiences = experiences.filter(
      (exp) => exp.id !== experienceId
    );
    onExperienceUpdate(updatedExperiences);
  };

  const closeModal = () => {
    setShowExperienceModal(false);
    setEditingExperience(null);
    setExperienceData({
      title: "",
      company: "",
      employmentType: "Full-time",
      currentlyWorking: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      location: "",
      description: "",
      skills: [],
      achievements: [],
      customFields: [],
      notifyNetwork: true,
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
          <button
            onClick={() => setShowExperienceModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Add experience"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {experiences.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No experience added yet</p>
              <button
                onClick={() => setShowExperienceModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first experience
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={experience.id || index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600">{experience.company}</p>
                    <p className="text-sm text-gray-500">
                      {experience.employmentType} • {experience.startMonth}{" "}
                      {experience.startYear} -
                      {experience.currentlyWorking
                        ? " Present"
                        : ` ${experience.endMonth} ${experience.endYear}`}
                    </p>
                    {experience.location && (
                      <p className="text-sm text-gray-500">
                        {experience.location}
                      </p>
                    )}
                    {experience.description && (
                      <p className="text-gray-700 mt-2">
                        {experience.description}
                      </p>
                    )}
                    {experience.skills && experience.skills.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Skills:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {experience.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {experience.achievements &&
                      experience.achievements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Key Achievements:
                          </p>
                          <ul className="text-sm text-gray-700 list-disc list-inside">
                            {experience.achievements.map(
                              (achievement, index) => (
                                <li key={index}>{achievement}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {experience.achievements &&
                      experience.achievements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Key Achievements:
                          </p>
                          <ul className="text-sm text-gray-700 list-disc list-inside">
                            {experience.achievements.map(
                              (achievement, index) => (
                                <li key={index}>{achievement}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {experience.customFields &&
                      experience.customFields.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {experience.customFields.map((field, index) => (
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
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditExperience(experience)}
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit experience"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(experience.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete experience"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingExperience ? "Edit Experience" : "Add Experience"}
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
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={experienceData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={experienceData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Microsoft"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={experienceData.employmentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={experienceData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. New York, NY"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  id="currentlyWorking"
                  checked={experienceData.currentlyWorking}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="currentlyWorking"
                  className="text-sm text-gray-700"
                >
                  I am currently working in this role
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="startMonth"
                      value={experienceData.startMonth}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="startYear"
                      value={experienceData.startYear}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {!experienceData.currentlyWorking && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        name="endMonth"
                        value={experienceData.endMonth}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name="endYear"
                        value={experienceData.endYear}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={experienceData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>

              {/* Skills Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills Used
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a skill and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSkillAdd(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        handleSkillAdd(input.value);
                        input.value = "";
                      }}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {experienceData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {experienceData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Achievements Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an achievement and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAchievementAdd(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        handleAchievementAdd(input.value);
                        input.value = "";
                      }}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {experienceData.achievements.length > 0 && (
                    <div className="space-y-1">
                      {experienceData.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm text-gray-700">
                            {achievement}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAchievementRemove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
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
                {experienceData.customFields.length > 0 && (
                  <div className="space-y-2">
                    {experienceData.customFields.map((field, index) => (
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="notifyNetwork"
                  id="notifyNetwork"
                  checked={experienceData.notifyNetwork}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="notifyNetwork"
                  className="text-sm text-gray-700"
                >
                  Notify your network of key profile changes
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {editingExperience && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteExperience(editingExperience.id);
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
                  {editingExperience ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceSection;
