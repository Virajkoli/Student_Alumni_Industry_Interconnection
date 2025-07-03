import React, { useState } from "react";
import { Edit, Plus, X, GraduationCap } from "lucide-react";

const EducationSection = ({ education = [], onEducationUpdate }) => {
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [educationData, setEducationData] = useState({
    school: "",
    degree: "",
    field: "",
    grade: "",
    activities: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
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
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i + 10);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEducationData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomFieldAdd = () => {
    setEducationData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { label: "", value: "" }],
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    setEducationData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleCustomFieldRemove = (index) => {
    setEducationData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingEducation) {
      // Update existing education
      const updatedEducation = education.map((edu) =>
        edu.id === editingEducation.id
          ? { ...educationData, id: editingEducation.id }
          : edu
      );
      onEducationUpdate(updatedEducation);
    } else {
      // Add new education
      const newEducation = {
        id: Date.now(),
        ...educationData,
      };
      onEducationUpdate((prev) => [...prev, newEducation]);
    }
    closeModal();
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education);
    setEducationData({
      ...education,
      customFields: education.customFields || [],
    });
    setShowEducationModal(true);
  };

  const handleDeleteEducation = (educationId) => {
    const updatedEducation = education.filter((edu) => edu.id !== educationId);
    onEducationUpdate(updatedEducation);
  };

  const closeModal = () => {
    setShowEducationModal(false);
    setEditingEducation(null);
    setEducationData({
      school: "",
      degree: "",
      field: "",
      grade: "",
      activities: "",
      description: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      customFields: [],
      notifyNetwork: true,
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          <button
            onClick={() => setShowEducationModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Add education"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {education.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No education added yet</p>
              <button
                onClick={() => setShowEducationModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your education
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {edu.school}
                    </h3>
                    <p className="text-gray-600">
                      {edu.degree}
                      {edu.field && `, ${edu.field}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {edu.startYear} - {edu.endYear || "Present"}
                    </p>
                    {edu.grade && (
                      <p className="text-sm text-gray-500">
                        Grade: {edu.grade}
                      </p>
                    )}
                    {edu.activities && (
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium">Activities:</span>{" "}
                        {edu.activities}
                      </p>
                    )}
                    {edu.description && (
                      <p className="text-gray-700 mt-2">{edu.description}</p>
                    )}
                    {edu.customFields && edu.customFields.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {edu.customFields.map((field, index) => (
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
                      onClick={() => handleEditEducation(edu)}
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit education"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete education"
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

      {/* Add Education Modal */}
      {showEducationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingEducation ? "Edit Education" : "Add Education"}
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
                  School *
                </label>
                <input
                  type="text"
                  name="school"
                  value={educationData.school}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Government Polytechnic"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={educationData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Diploma, Bachelor's, Master's"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field"
                  value={educationData.field}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Computer Engineering"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="startMonth"
                      value={educationData.startMonth}
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
                      value={educationData.startYear}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (or expected)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="endMonth"
                      value={educationData.endMonth}
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
                      value={educationData.endYear}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={educationData.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. 8.5 CGPA, First Class"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities and Societies
                </label>
                <input
                  type="text"
                  name="activities"
                  value={educationData.activities}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Student Council, Coding Club"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={educationData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe your achievements, projects, or notable experiences..."
                />
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
                {educationData.customFields.length > 0 && (
                  <div className="space-y-2">
                    {educationData.customFields.map((field, index) => (
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
                  checked={educationData.notifyNetwork}
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
                {editingEducation && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteEducation(editingEducation.id);
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
                  {editingEducation ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationSection;
