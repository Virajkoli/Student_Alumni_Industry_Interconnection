import React, { useState } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";

const Admission = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [admissionData, setAdmissionData] = useState({
    eligibility: [
      "JEE Main score required for B.Tech admission",
      "GATE score required for M.Tech admission",
      "Minimum 60% in 12th standard for undergraduate programs",
      "Bachelor's degree with 50% marks for postgraduate programs",
      "Valid entrance exam scores as per university guidelines",
    ],
    steps: [
      "Register on the official admission portal",
      "Fill the online application form with required details",
      "Upload necessary documents (mark sheets, certificates)",
      "Pay the application fee through online payment gateway",
      "Submit the application before the deadline",
      "Attend counseling sessions as per merit list",
      "Complete document verification process",
      "Pay admission fees to confirm seat",
    ],
    dates: [
      "Application Start Date: March 15, 2024",
      "Application End Date: May 30, 2024",
      "Entrance Exam Date: June 15-20, 2024",
      "Result Declaration: July 10, 2024",
      "Counseling Rounds: July 25 - August 15, 2024",
      "Classes Commence: September 1, 2024",
    ],
    cutoffTable: [
      {
        year: "2023",
        round1: "#",
        round2: "#",
        round3: "#",
      },
      {
        year: "2022",
        round1: "#",
        round2: "#",
        round3: "#",
      },
    ],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...admissionData });

  const handleEditClick = () => {
    setEditData({ ...admissionData });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setAdmissionData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...admissionData });
    setIsEditModalOpen(false);
  };

  // Eligibility handlers
  const handleAddEligibility = () => {
    setEditData((prev) => ({
      ...prev,
      eligibility: [...prev.eligibility, ""],
    }));
  };

  const handleEligibilityChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      eligibility: prev.eligibility.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const handleRemoveEligibility = (index) => {
    setEditData((prev) => ({
      ...prev,
      eligibility: prev.eligibility.filter((_, i) => i !== index),
    }));
  };

  // Steps handlers
  const handleAddStep = () => {
    setEditData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }));
  };

  const handleStepChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      steps: prev.steps.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleRemoveStep = (index) => {
    setEditData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  // Dates handlers
  const handleAddDate = () => {
    setEditData((prev) => ({
      ...prev,
      dates: [...prev.dates, ""],
    }));
  };

  const handleDateChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      dates: prev.dates.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleRemoveDate = (index) => {
    setEditData((prev) => ({
      ...prev,
      dates: prev.dates.filter((_, i) => i !== index),
    }));
  };

  // Cutoff table handlers
  const handleAddCutoffRow = () => {
    const newRow = {
      id: Date.now(),
      year: "",
      round1: "",
      round2: "",
      round3: "",
    };
    setEditData((prev) => ({
      ...prev,
      cutoffTable: [...prev.cutoffTable, newRow],
    }));
  };

  const handleCutoffChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      cutoffTable: prev.cutoffTable.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      ),
    }));
  };

  const handleRemoveCutoffRow = (index) => {
    setEditData((prev) => ({
      ...prev,
      cutoffTable: prev.cutoffTable.filter((_, i) => i !== index),
    }));
  };

  // Custom fields handlers
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

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Admission Section */}
        <div className="bg-white rounded-lg mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Admission</h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit admission information"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Eligibility & Entrance Exams */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Eligibility & Entrance Exams
              </h3>
              <div className="space-y-3">
                {admissionData.eligibility &&
                  admissionData.eligibility.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Application Steps */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Steps
              </h3>
              <div className="space-y-3">
                {admissionData.steps &&
                  admissionData.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Important Dates */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Important Dates
              </h3>
              <div className="space-y-3">
                {admissionData.dates &&
                  admissionData.dates.map((date, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{date}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Cut Off Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cut Off
              </h3>
              {admissionData.cutoffTable &&
                admissionData.cutoffTable.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                            Year
                          </th>
                          <th className="py-3 px-4 text-center text-gray-900 font-semibold border-b border-gray-200">
                            CAP Round 1
                          </th>
                          <th className="py-3 px-4 text-center text-gray-900 font-semibold border-b border-gray-200">
                            CAP Round 2
                          </th>
                          <th className="py-3 px-4 text-center text-gray-900 font-semibold border-b border-gray-200">
                            CAP Round 3
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {admissionData.cutoffTable.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">
                              {row.year}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {row.round1 && row.round1 !== "#" ? (
                                <a
                                  href={row.round1}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  Download PDF
                                </a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {row.round2 && row.round2 !== "#" ? (
                                <a
                                  href={row.round2}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  Download PDF
                                </a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {row.round3 && row.round3 !== "#" ? (
                                <a
                                  href={row.round3}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  Download PDF
                                </a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </div>

            {/* Custom Fields Display */}
            {admissionData.customFields &&
              admissionData.customFields.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Additional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {admissionData.customFields.map((field, index) => (
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Admission Information
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
              {/* Eligibility Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Eligibility & Entrance Exams
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddEligibility}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Eligibility
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.eligibility &&
                    editData.eligibility.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              handleEligibilityChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter eligibility criteria..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveEligibility(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove eligibility"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Application Steps */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Application Steps
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Step
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.steps &&
                    editData.steps.map((step, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium mt-1">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={step}
                            onChange={(e) =>
                              handleStepChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter application step..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove step"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Important Dates */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Important Dates
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddDate}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Date
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.dates &&
                    editData.dates.map((date, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={date}
                            onChange={(e) =>
                              handleDateChange(index, e.target.value)
                            }
                            placeholder="Enter important date..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDate(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove date"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Cutoff Table */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cut Off Table
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddCutoffRow}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Year
                  </button>
                </div>

                <div className="space-y-4">
                  {editData.cutoffTable &&
                    editData.cutoffTable.map((row, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-700">
                            Year {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveCutoffRow(index)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            title="Remove year"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Year
                            </label>
                            <input
                              type="text"
                              value={row.year}
                              onChange={(e) =>
                                handleCutoffChange(
                                  index,
                                  "year",
                                  e.target.value
                                )
                              }
                              placeholder="2024"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Round 1 PDF URL
                            </label>
                            <input
                              type="text"
                              value={row.round1}
                              onChange={(e) =>
                                handleCutoffChange(
                                  index,
                                  "round1",
                                  e.target.value
                                )
                              }
                              placeholder="PDF link or #"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Round 2 PDF URL
                            </label>
                            <input
                              type="text"
                              value={row.round2}
                              onChange={(e) =>
                                handleCutoffChange(
                                  index,
                                  "round2",
                                  e.target.value
                                )
                              }
                              placeholder="PDF link or #"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Round 3 PDF URL
                            </label>
                            <input
                              type="text"
                              value={row.round3}
                              onChange={(e) =>
                                handleCutoffChange(
                                  index,
                                  "round3",
                                  e.target.value
                                )
                              }
                              placeholder="PDF link or #"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
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
                            placeholder="Field Label (e.g., Special Requirements, Contact Info)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                            placeholder="Field Value"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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

export default Admission;
