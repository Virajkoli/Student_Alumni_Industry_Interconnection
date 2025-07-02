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

  const openEditModal = () => {
    setEditData({ ...admissionData });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEligibilityChange = (index, value) => {
    const updatedEligibility = [...editData.eligibility];
    updatedEligibility[index] = value;
    setEditData({ ...editData, eligibility: updatedEligibility });
  };

  const addEligibility = () => {
    setEditData({
      ...editData,
      eligibility: [...editData.eligibility, ""],
    });
  };

  const removeEligibility = (index) => {
    const updatedEligibility = [...editData.eligibility];
    updatedEligibility.splice(index, 1);
    setEditData({ ...editData, eligibility: updatedEligibility });
  };

  const handleStepsChange = (index, value) => {
    const updatedSteps = [...editData.steps];
    updatedSteps[index] = value;
    setEditData({ ...editData, steps: updatedSteps });
  };

  const addStep = () => {
    setEditData({
      ...editData,
      steps: [...editData.steps, ""],
    });
  };

  const removeStep = (index) => {
    const updatedSteps = [...editData.steps];
    updatedSteps.splice(index, 1);
    setEditData({ ...editData, steps: updatedSteps });
  };

  const handleDatesChange = (index, value) => {
    const updatedDates = [...editData.dates];
    updatedDates[index] = value;
    setEditData({ ...editData, dates: updatedDates });
  };

  const addDate = () => {
    setEditData({
      ...editData,
      dates: [...editData.dates, ""],
    });
  };

  const removeDate = (index) => {
    const updatedDates = [...editData.dates];
    updatedDates.splice(index, 1);
    setEditData({ ...editData, dates: updatedDates });
  };

  const handleCutoffChange = (index, field, value) => {
    const updatedCutoff = [...editData.cutoffTable];
    updatedCutoff[index] = { ...updatedCutoff[index], [field]: value };
    setEditData({ ...editData, cutoffTable: updatedCutoff });
  };

  const addCutoffRow = () => {
    setEditData({
      ...editData,
      cutoffTable: [
        ...editData.cutoffTable,
        { year: "", round1: "", round2: "", round3: "" },
      ],
    });
  };

  const removeCutoffRow = (index) => {
    const updatedCutoff = [...editData.cutoffTable];
    updatedCutoff.splice(index, 1);
    setEditData({ ...editData, cutoffTable: updatedCutoff });
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updatedCustomFields = [...editData.customFields];
    updatedCustomFields[index] = {
      ...updatedCustomFields[index],
      [field]: value,
    };
    setEditData({ ...editData, customFields: updatedCustomFields });
  };

  const addCustomField = () => {
    setEditData({
      ...editData,
      customFields: [...editData.customFields, { label: "", value: "" }],
    });
  };

  const removeCustomField = (index) => {
    const updatedCustomFields = [...editData.customFields];
    updatedCustomFields.splice(index, 1);
    setEditData({ ...editData, customFields: updatedCustomFields });
  };

  const saveChanges = () => {
    setAdmissionData({ ...editData });
    closeEditModal();
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6 p-6 max-w-4xl mx-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Admission Details
          </h2>
          <button
            onClick={openEditModal}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <Edit size={16} /> Edit
          </button>
        </div>

        <div className="space-y-6">
          {/* Eligibility Criteria */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Eligibility Criteria
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {admissionData.eligibility.map((criterion, index) => (
                <li key={index} className="text-gray-600">
                  {criterion}
                </li>
              ))}
            </ul>
          </div>

          {/* Admission Steps */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Admission Process
            </h3>
            <ol className="list-decimal pl-5 space-y-1">
              {admissionData.steps.map((step, index) => (
                <li key={index} className="text-gray-600">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Important Dates */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Important Dates
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {admissionData.dates.map((date, index) => (
                <li key={index} className="text-gray-600">
                  {date}
                </li>
              ))}
            </ul>
          </div>

          {/* Previous Year Cutoffs */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Previous Year Cutoffs
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b border-r">Year</th>
                    <th className="py-2 px-4 border-b border-r">Round 1</th>
                    <th className="py-2 px-4 border-b border-r">Round 2</th>
                    <th className="py-2 px-4 border-b">Round 3</th>
                  </tr>
                </thead>
                <tbody>
                  {admissionData.cutoffTable.map((row, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-r">
                        {row.year}
                      </td>
                      <td className="py-2 px-4 border-b border-r">
                        {row.round1}
                      </td>
                      <td className="py-2 px-4 border-b border-r">
                        {row.round2}
                      </td>
                      <td className="py-2 px-4 border-b">{row.round3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom Fields */}
          {admissionData.customFields.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {admissionData.customFields.map((field, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">
                      {field.label}:{" "}
                    </span>
                    <span className="text-gray-600">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit Admission Details
              </h2>
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Eligibility Criteria */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Eligibility Criteria
                </h3>
                {editData.eligibility.map((criterion, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={criterion}
                      onChange={(e) =>
                        handleEligibilityChange(index, e.target.value)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => removeEligibility(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addEligibility}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={16} /> Add Eligibility Criterion
                </button>
              </div>

              {/* Admission Steps */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Admission Process
                </h3>
                {editData.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => handleStepsChange(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => removeStep(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addStep}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={16} /> Add Step
                </button>
              </div>

              {/* Important Dates */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Important Dates
                </h3>
                {editData.dates.map((date, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => handleDatesChange(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => removeDate(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addDate}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={16} /> Add Date
                </button>
              </div>

              {/* Previous Year Cutoffs */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Previous Year Cutoffs
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b border-r">Year</th>
                        <th className="py-2 px-4 border-b border-r">Round 1</th>
                        <th className="py-2 px-4 border-b border-r">Round 2</th>
                        <th className="py-2 px-4 border-b border-r">Round 3</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editData.cutoffTable.map((row, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b border-r">
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
                              className="w-full p-1 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b border-r">
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
                              className="w-full p-1 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b border-r">
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
                              className="w-full p-1 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b border-r">
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
                              className="w-full p-1 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <button
                              onClick={() => removeCutoffRow(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Minus size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={addCutoffRow}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={16} /> Add Cutoff Row
                </button>
              </div>

              {/* Custom Fields */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Additional Information
                </h3>
                {editData.customFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleCustomFieldChange(index, "label", e.target.value)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="Field Label"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleCustomFieldChange(index, "value", e.target.value)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="Field Value"
                    />
                    <button
                      onClick={() => removeCustomField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addCustomField}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={16} /> Add Custom Field
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
