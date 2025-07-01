import React, { useState } from "react";
import { Edit, X } from "lucide-react";

const Courses = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [coursesData, setCoursesData] = useState({
    btechDuration: "4 years",
    btechEligibility: "12th with PCM, JEE Main/Advanced",
    btechBranches: [
      "Computer Science - 60 seats",
      "Electronics - 60 seats",
      "Mechanical - 60 seats",
      "Civil - 60 seats",
    ],
    btechFees: "₹1,50,000",
    btechTotalSeats: "240",
    mtechDuration: "2 years",
    mtechEligibility: "B.Tech/B.E. with GATE",
    mtechBranches: [
      "Computer Science - 30 seats",
      "Electronics - 30 seats",
      "Mechanical - 30 seats",
    ],
    mtechFees: "₹1,00,000",
    mtechTotalSeats: "90",
    bscDuration: "3 years",
    bscEligibility: "12th with Science",
    bscBranches: [
      "Physics - 40 seats",
      "Chemistry - 40 seats",
      "Mathematics - 40 seats",
    ],
    bscFees: "₹50,000",
    bscTotalSeats: "120",
    mscDuration: "2 years",
    mscEligibility: "B.Sc. in relevant field",
    mscBranches: [
      "Physics - 20 seats",
      "Chemistry - 20 seats",
      "Mathematics - 20 seats",
    ],
    mscFees: "₹60,000",
    mscTotalSeats: "60",
    mbaDuration: "2 years",
    mbaEligibility: "Bachelor's degree with CAT/MAT",
    mbaBranches: [
      "Finance - 40 seats",
      "Marketing - 40 seats",
      "HR - 40 seats",
    ],
    mbaFees: "₹2,00,000",
    mbaTotalSeats: "120",
    phdDuration: "3-5 years",
    phdEligibility: "Master's degree with NET/SET",
    phdBranches: [
      "Engineering - 15 seats",
      "Science - 10 seats",
      "Management - 5 seats",
    ],
    phdFees: "₹30,000",
    phdTotalSeats: "30",
    customFields: [],
    customCourses: [], // Array for user-added courses
  });

  const [editData, setEditData] = useState({ ...coursesData });

  const handleEditClick = () => {
    setEditData({ ...coursesData });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setCoursesData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...coursesData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes("Branches")) {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddCustomField = () => {
    const newField = {
      id: Date.now(),
      label: "",
      value: "",
    };
    setEditData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, newField],
    }));
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId ? { ...field, [property]: value } : field
      ),
    }));
  };

  const handleRemoveCustomField = (fieldId) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== fieldId),
    }));
  };

  // Handlers for custom courses
  const handleAddCustomCourse = () => {
    const newCourse = {
      id: Date.now(),
      name: "",
      duration: "",
      eligibility: "",
      branches: [],
      fees: "",
      totalSeats: "",
    };
    setEditData((prev) => ({
      ...prev,
      customCourses: [...prev.customCourses, newCourse],
    }));
  };

  const handleCustomCourseChange = (courseId, field, value) => {
    setEditData((prev) => ({
      ...prev,
      customCourses: prev.customCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              [field]:
                field === "branches"
                  ? value.split(",").map((s) => s.trim())
                  : value,
            }
          : course
      ),
    }));
  };

  const handleRemoveCustomCourse = (courseId) => {
    setEditData((prev) => ({
      ...prev,
      customCourses: prev.customCourses.filter(
        (course) => course.id !== courseId
      ),
    }));
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Courses Section */}
        <div className="bg-white rounded-lg mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Course Details
            </h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit courses"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                      Program
                    </th>
                    <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                      Duration
                    </th>
                    <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                      Eligibility
                    </th>
                    <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                      Branches & Seats
                    </th>
                    <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                      Annual Fees
                    </th>
                    <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                      Total Seats
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* B.Tech */}
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">
                      B.Tech
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.btechDuration}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.btechEligibility}
                    </td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {coursesData.btechBranches &&
                          coursesData.btechBranches.map((branch, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center gap-1"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                              {branch}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.btechFees}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.btechTotalSeats}
                    </td>
                  </tr>
                  {/* M.Tech */}
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">
                      M.Tech
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mtechDuration}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mtechEligibility}
                    </td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {coursesData.mtechBranches &&
                          coursesData.mtechBranches.map((branch, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center gap-1"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                              {branch}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mtechFees}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mtechTotalSeats}
                    </td>
                  </tr>
                  {/* B.Sc. */}
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">
                      B.Sc.
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.bscDuration}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.bscEligibility}
                    </td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {coursesData.bscBranches &&
                          coursesData.bscBranches.map((branch, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center gap-1"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                              {branch}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.bscFees}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.bscTotalSeats}
                    </td>
                  </tr>
                  {/* MSc */}
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">MSc</td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mscDuration}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mscEligibility}
                    </td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {coursesData.mscBranches &&
                          coursesData.mscBranches.map((branch, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center gap-1"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                              {branch}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mscFees}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mscTotalSeats}
                    </td>
                  </tr>
                  {/* MBA */}
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">MBA</td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mbaDuration}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mbaEligibility}
                    </td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {coursesData.mbaBranches &&
                          coursesData.mbaBranches.map((branch, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center gap-1"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                              {branch}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mbaFees}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.mbaTotalSeats}
                    </td>
                  </tr>
                  {/* Ph.D. */}
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Ph.D.
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.phdDuration}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.phdEligibility}
                    </td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {coursesData.phdBranches &&
                          coursesData.phdBranches.map((branch, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center gap-1"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                              {branch}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.phdFees}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {coursesData.phdTotalSeats}
                    </td>
                  </tr>
                  {/* Custom Courses */}
                  {coursesData.customCourses &&
                    coursesData.customCourses.map((course, index) => (
                      <tr key={course.id || index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {course.name}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {course.duration}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {course.eligibility}
                        </td>
                        <td className="py-3 px-4">
                          <ul className="space-y-1">
                            {course.branches &&
                              course.branches.map((branch, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-gray-600 flex items-center gap-1"
                                >
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                                  {branch}
                                </li>
                              ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {course.fees}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {course.totalSeats}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Custom Fields Display */}
            {coursesData.customFields &&
              coursesData.customFields.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Additional Course Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coursesData.customFields.map((field, index) => (
                      <div key={field.id || index}>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">
                          {field.label}
                        </h5>
                        <p className="text-sm text-gray-700">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Course Details
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* B.Tech Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  B.Tech Program
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editData.btechDuration}
                      onChange={(e) =>
                        handleInputChange("btechDuration", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.btechFees}
                      onChange={(e) =>
                        handleInputChange("btechFees", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats
                    </label>
                    <input
                      type="text"
                      value={editData.btechTotalSeats}
                      onChange={(e) =>
                        handleInputChange("btechTotalSeats", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility
                    </label>
                    <textarea
                      value={editData.btechEligibility}
                      onChange={(e) =>
                        handleInputChange("btechEligibility", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branches & Seats (comma-separated)
                    </label>
                    <textarea
                      value={editData.btechBranches.join(", ")}
                      onChange={(e) =>
                        handleInputChange("btechBranches", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* M.Tech Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  M.Tech Program
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editData.mtechDuration}
                      onChange={(e) =>
                        handleInputChange("mtechDuration", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.mtechFees}
                      onChange={(e) =>
                        handleInputChange("mtechFees", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats
                    </label>
                    <input
                      type="text"
                      value={editData.mtechTotalSeats}
                      onChange={(e) =>
                        handleInputChange("mtechTotalSeats", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility
                    </label>
                    <textarea
                      value={editData.mtechEligibility}
                      onChange={(e) =>
                        handleInputChange("mtechEligibility", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branches & Seats (comma-separated)
                    </label>
                    <textarea
                      value={editData.mtechBranches.join(", ")}
                      onChange={(e) =>
                        handleInputChange("mtechBranches", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* B.Sc Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  B.Sc Program
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editData.bscDuration}
                      onChange={(e) =>
                        handleInputChange("bscDuration", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.bscFees}
                      onChange={(e) =>
                        handleInputChange("bscFees", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats
                    </label>
                    <input
                      type="text"
                      value={editData.bscTotalSeats}
                      onChange={(e) =>
                        handleInputChange("bscTotalSeats", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility
                    </label>
                    <textarea
                      value={editData.bscEligibility}
                      onChange={(e) =>
                        handleInputChange("bscEligibility", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branches & Seats (comma-separated)
                    </label>
                    <textarea
                      value={editData.bscBranches.join(", ")}
                      onChange={(e) =>
                        handleInputChange("bscBranches", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* MSc Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  MSc Program
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editData.mscDuration}
                      onChange={(e) =>
                        handleInputChange("mscDuration", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.mscFees}
                      onChange={(e) =>
                        handleInputChange("mscFees", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats
                    </label>
                    <input
                      type="text"
                      value={editData.mscTotalSeats}
                      onChange={(e) =>
                        handleInputChange("mscTotalSeats", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility
                    </label>
                    <textarea
                      value={editData.mscEligibility}
                      onChange={(e) =>
                        handleInputChange("mscEligibility", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branches & Seats (comma-separated)
                    </label>
                    <textarea
                      value={editData.mscBranches.join(", ")}
                      onChange={(e) =>
                        handleInputChange("mscBranches", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* MBA Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  MBA Program
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editData.mbaDuration}
                      onChange={(e) =>
                        handleInputChange("mbaDuration", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.mbaFees}
                      onChange={(e) =>
                        handleInputChange("mbaFees", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats
                    </label>
                    <input
                      type="text"
                      value={editData.mbaTotalSeats}
                      onChange={(e) =>
                        handleInputChange("mbaTotalSeats", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility
                    </label>
                    <textarea
                      value={editData.mbaEligibility}
                      onChange={(e) =>
                        handleInputChange("mbaEligibility", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branches & Seats (comma-separated)
                    </label>
                    <textarea
                      value={editData.mbaBranches.join(", ")}
                      onChange={(e) =>
                        handleInputChange("mbaBranches", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Ph.D Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Ph.D Program
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editData.phdDuration}
                      onChange={(e) =>
                        handleInputChange("phdDuration", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.phdFees}
                      onChange={(e) =>
                        handleInputChange("phdFees", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats
                    </label>
                    <input
                      type="text"
                      value={editData.phdTotalSeats}
                      onChange={(e) =>
                        handleInputChange("phdTotalSeats", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility
                    </label>
                    <textarea
                      value={editData.phdEligibility}
                      onChange={(e) =>
                        handleInputChange("phdEligibility", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branches & Seats (comma-separated)
                    </label>
                    <textarea
                      value={editData.phdBranches.join(", ")}
                      onChange={(e) =>
                        handleInputChange("phdBranches", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Courses Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-lg font-medium text-gray-900">
                    Custom Courses
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomCourse}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add New Course
                  </button>
                </div>

                {editData.customCourses &&
                  editData.customCourses.length > 0 && (
                    <div className="space-y-6">
                      {editData.customCourses.map((course, index) => (
                        <div
                          key={course.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              Custom Course {index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveCustomCourse(course.id)
                              }
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                              title="Remove course"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Name *
                              </label>
                              <input
                                type="text"
                                value={course.name}
                                onChange={(e) =>
                                  handleCustomCourseChange(
                                    course.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., B.Des, BCA, MCA"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration
                              </label>
                              <input
                                type="text"
                                value={course.duration}
                                onChange={(e) =>
                                  handleCustomCourseChange(
                                    course.id,
                                    "duration",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., 3 years, 4 years"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Annual Fees
                              </label>
                              <input
                                type="text"
                                value={course.fees}
                                onChange={(e) =>
                                  handleCustomCourseChange(
                                    course.id,
                                    "fees",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., ₹75,000"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Seats
                              </label>
                              <input
                                type="text"
                                value={course.totalSeats}
                                onChange={(e) =>
                                  handleCustomCourseChange(
                                    course.id,
                                    "totalSeats",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., 60"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Eligibility Criteria
                              </label>
                              <textarea
                                value={course.eligibility}
                                onChange={(e) =>
                                  handleCustomCourseChange(
                                    course.id,
                                    "eligibility",
                                    e.target.value
                                  )
                                }
                                rows={2}
                                placeholder="e.g., 12th with Arts/Science/Commerce"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specializations & Seats (comma-separated)
                              </label>
                              <textarea
                                value={
                                  course.branches
                                    ? course.branches.join(", ")
                                    : ""
                                }
                                onChange={(e) =>
                                  handleCustomCourseChange(
                                    course.id,
                                    "branches",
                                    e.target.value
                                  )
                                }
                                rows={2}
                                placeholder="e.g., Graphic Design - 30 seats, Web Design - 30 seats"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {(!editData.customCourses ||
                  editData.customCourses.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-2">No custom courses added yet.</p>
                    <p className="text-sm">
                      Click "Add New Course" to create additional course
                      programs.
                    </p>
                  </div>
                )}
              </div>

              {/* Custom Fields Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Custom Field
                  </button>
                </div>

                {editData.customFields && editData.customFields.length > 0 && (
                  <div className="space-y-3">
                    {editData.customFields.map((field) => (
                      <div key={field.id} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) =>
                              handleCustomFieldChange(
                                field.id,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="Field Label (e.g., Entrance Exam, Scholarship)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              handleCustomFieldChange(
                                field.id,
                                "value",
                                e.target.value
                              )
                            }
                            placeholder="Field Value (e.g., JEE Main, Available)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomField(field.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove field"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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

export default Courses;
