import React, { useState, useEffect } from "react";
import { Edit, Plus, X, GraduationCap } from "lucide-react";
import apiService from "../../../services/apiService";

const EducationSection = ({ education = [], onEducationUpdate, studentId }) => {
  // Debug logging for props changes
  useEffect(() => {
    console.log('🎓 EducationSection received education data:', education);
    console.log('📊 Education count:', education.length);
  }, [education]);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('📝 Submitting education data:', educationData);
      
      const educationPayload = {
        institution: educationData.school,
        degree: educationData.degree,
        field_of_study: educationData.field,
        start_year: educationData.startYear
          ? parseInt(educationData.startYear)
          : null,
        end_year: educationData.endYear
          ? parseInt(educationData.endYear)
          : null,
        grade: educationData.grade,
      };

      console.log('📤 Education payload:', educationPayload);

      let response;
      if (editingEducation) {
        // Update existing education
        console.log('✏️ Updating education with ID:', editingEducation.id);
        response = await apiService.updateStudentEducation(
          editingEducation.id,
          educationPayload
        );
      } else {
        // Add new education
        console.log('➕ Creating new education entry');
        response = await apiService.createStudentEducation(educationPayload);
      }
      
      console.log('✅ API response:', response);
      
      // Close modal first
      closeModal();
      
      // Add a small delay to ensure backend operation completes
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the parent component's state
      if (onEducationUpdate) {
        console.log('🔄 Fetching updated education data...');
        try {
          const updatedEducation = await apiService.getStudentEducation();
          console.log('📚 Fresh education data:', updatedEducation);
          
          // Handle different response formats
          const educationArray = updatedEducation.data || updatedEducation;
          if (Array.isArray(educationArray)) {
            onEducationUpdate(educationArray);
            console.log('✅ State updated with', educationArray.length, 'education entries');
          } else {
            console.error('❌ Unexpected education data format:', educationArray);
          }
        } catch (fetchError) {
          console.error('❌ Error fetching updated education:', fetchError);
          // Show user-friendly message
          alert('Education saved successfully, but unable to refresh the list. Please refresh the page to see changes.');
        }
      }
    } catch (error) {
      console.error("❌ Error saving education:", error);
      alert(`Error saving education: ${error.message}. Please try again.`);
    }
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education);
    setEducationData({
      school: education.institution || "",
      degree: education.degree || "",
      field: education.field_of_study || "",
      grade: education.grade || "",
      activities: "",
      description: "",
      startMonth: "",
      startYear: education.start_year ? education.start_year.toString() : "",
      endMonth: "",
      endYear: education.end_year ? education.end_year.toString() : "",
      customFields: education.customFields || [],
      notifyNetwork: true,
    });
    setShowEducationModal(true);
  };

  const handleDeleteEducation = async (educationId) => {
    if (!confirm('Are you sure you want to delete this education entry?')) {
      return;
    }
    
    try {
      console.log('🗑️ Deleting education with ID:', educationId);
      const response = await apiService.deleteStudentEducation(educationId);
      console.log('✅ Delete response:', response);
      
      // Add a small delay to ensure backend operation completes
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the parent component's state
      if (onEducationUpdate) {
        console.log('🔄 Fetching updated education data after delete...');
        try {
          const updatedEducation = await apiService.getStudentEducation();
          console.log('📚 Fresh education data after delete:', updatedEducation);
          
          // Handle different response formats
          const educationArray = updatedEducation.data || updatedEducation;
          if (Array.isArray(educationArray)) {
            onEducationUpdate(educationArray);
            console.log('✅ State updated with', educationArray.length, 'education entries after delete');
          } else {
            console.error('❌ Unexpected education data format:', educationArray);
          }
        } catch (fetchError) {
          console.error('❌ Error fetching updated education:', fetchError);
          // Show user-friendly message
          alert('Education deleted successfully, but unable to refresh the list. Please refresh the page to see changes.');
        }
      }
    } catch (error) {
      console.error("❌ Error deleting education:", error);
      alert(`Error deleting education: ${error.message}. Please try again.`);
    }
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
                      {edu.institution || edu.school}
                    </h3>
                    <p className="text-gray-600">
                      {edu.degree}
                      {(edu.field_of_study || edu.field) &&
                        `, ${edu.field_of_study || edu.field}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {edu.start_year || edu.startYear} -{" "}
                      {edu.end_year || edu.endYear || "Present"}
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
