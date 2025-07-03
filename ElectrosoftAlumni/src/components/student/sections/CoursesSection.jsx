import React, { useState } from "react";
import { Edit, Plus, X, BookOpen } from "lucide-react";

const CoursesSection = ({ courses = [], onCoursesUpdate }) => {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseData, setCourseData] = useState({
    name: "",
    institution: "",
    completionDate: "",
    skills: [],
    customFields: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillAdd = (skill) => {
    if (skill && skill.trim() && !courseData.skills.includes(skill.trim())) {
      setCourseData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setCourseData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleCustomFieldAdd = () => {
    setCourseData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { label: "", value: "" }],
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    setCourseData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleCustomFieldRemove = (index) => {
    setCourseData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCourse) {
      // Update existing course
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id
          ? { ...courseData, id: editingCourse.id }
          : course
      );
      onCoursesUpdate(updatedCourses);
    } else {
      // Add new course
      const newCourse = {
        id: Date.now(),
        ...courseData,
      };
      onCoursesUpdate((prev) => [...prev, newCourse]);
    }
    closeModal();
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseData({
      ...course,
      skills: course.skills || [],
      customFields: course.customFields || [],
    });
    setShowCourseModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    onCoursesUpdate(updatedCourses);
  };

  const closeModal = () => {
    setShowCourseModal(false);
    setEditingCourse(null);
    setCourseData({
      name: "",
      institution: "",
      completionDate: "",
      skills: [],
      customFields: [],
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Courses</h2>
          <button
            onClick={() => setShowCourseModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Add course"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No courses added yet</p>
              <button
                onClick={() => setShowCourseModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first course
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div
                  key={course.id || index}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {course.name}
                    </h3>
                    <p className="text-gray-600">{course.institution}</p>
                    <p className="text-sm text-gray-500">
                      Completed: {course.completionDate}
                    </p>

                    {course.skills && course.skills.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Skills Learned:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {course.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {course.customFields && course.customFields.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {course.customFields.map((field, index) => (
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
                      onClick={() => handleEditCourse(course)}
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit course"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete course"
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

      {/* Add Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingCourse ? "Edit Course" : "Add Course"}
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
                  Course Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={courseData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Advanced React"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={courseData.institution}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Udemy, Coursera, edX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Completion Date
                </label>
                <input
                  type="text"
                  name="completionDate"
                  value={courseData.completionDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. April 2024"
                />
              </div>

              {/* Skills Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills Learned
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
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {courseData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {courseData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="text-purple-500 hover:text-purple-700"
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
                {courseData.customFields.length > 0 && (
                  <div className="space-y-2">
                    {courseData.customFields.map((field, index) => (
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
                {editingCourse && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteCourse(editingCourse.id);
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
                  {editingCourse ? "Update Course" : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesSection;
