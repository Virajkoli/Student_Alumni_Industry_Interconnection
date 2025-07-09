import React, { useState } from "react";
import { Edit, X } from "lucide-react";

const Courses = ({ data, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...data });
  const [courseData, setCourseData] = useState({ ...data });

  const handleEditClick = () => {
    setEditData({ ...courseData });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBranchChange = (key, idx, value) => {
    setEditData((prev) => {
      const arr = [...(prev[`${key}Branches`] || [])];
      arr[idx] = value;
      return { ...prev, [`${key}Branches`]: arr };
    });
  };

  const handleAddBranch = (key) => {
    setEditData((prev) => ({
      ...prev,
      [`${key}Branches`]: [...(prev[`${key}Branches`] || []), ""]
    }));
  };

  const handleRemoveBranch = (key, idx) => {
    setEditData((prev) => {
      const arr = [...(prev[`${key}Branches`] || [])];
      arr.splice(idx, 1);
      return { ...prev, [`${key}Branches`]: arr };
    });
  };

  const handleSave = () => {
    setCourseData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setEditData({ ...courseData });
    setIsEditModalOpen(false);
  };

  if (!courseData) return null;

  // Helper to render a table row for each course type
  const renderTableRow = (label, duration, eligibility, branches, fees, totalSeats) => (
    <tr className="bg-white">
      <td className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">{label}</td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{duration}</td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{eligibility}</td>
      <td className="px-4 py-3 border-b border-gray-200">
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {branches && branches.length > 0 ? branches.map((b, i) => <li key={i}>{b}</li>) : <li>N/A</li>}
        </ul>
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{fees}</td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{totalSeats}</td>
    </tr>
  );
  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg mb-8">
          <div className="flex items-center justify-between p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Course Details</h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit course details"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg text-base">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Program</th>
                    <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Duration</th>
                    <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Eligibility</th>
                    <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Branches & Seats</th>
                    <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Annual Fees</th>
                    <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Total Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRow(
                    "B.Tech",
                    courseData.btechDuration,
                    courseData.btechEligibility,
                    courseData.btechBranches,
                    courseData.btechFees,
                    courseData.btechTotalSeats
                  )}
                  {renderTableRow(
                    "M.Tech",
                    courseData.mtechDuration,
                    courseData.mtechEligibility,
                    courseData.mtechBranches,
                    courseData.mtechFees,
                    courseData.mtechTotalSeats
                  )}
                  {renderTableRow(
                    "B.Sc",
                    courseData.bscDuration,
                    courseData.bscEligibility,
                    courseData.bscBranches,
                    courseData.bscFees,
                    courseData.bscTotalSeats
                  )}
                  {renderTableRow(
                    "M.Sc",
                    courseData.mscDuration,
                    courseData.mscEligibility,
                    courseData.mscBranches,
                    courseData.mscFees,
                    courseData.mscTotalSeats
                  )}
                  {renderTableRow(
                    "MBA",
                    courseData.mbaDuration,
                    courseData.mbaEligibility,
                    courseData.mbaBranches,
                    courseData.mbaFees,
                    courseData.mbaTotalSeats
                  )}
                  {renderTableRow(
                    "Ph.D",
                    courseData.phdDuration,
                    courseData.phdEligibility,
                    courseData.phdBranches,
                    courseData.phdFees,
                    courseData.phdTotalSeats
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Course Details</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              {[
                { key: 'btech', label: 'B.Tech' },
                { key: 'mtech', label: 'M.Tech' },
                { key: 'bsc', label: 'B.Sc' },
                { key: 'msc', label: 'M.Sc' },
                { key: 'mba', label: 'MBA' },
                { key: 'phd', label: 'Ph.D' },
              ].map(({ key, label }) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 text-lg">{label}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input 
                        type="text" 
                        value={editData[`${key}Duration`] || ''} 
                        onChange={e => handleInputChange(`${key}Duration`, e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Fees</label>
                      <input 
                        type="text" 
                        value={editData[`${key}Fees`] || ''} 
                        onChange={e => handleInputChange(`${key}Fees`, e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
                      <input 
                        type="text" 
                        value={editData[`${key}TotalSeats`] || ''} 
                        onChange={e => handleInputChange(`${key}TotalSeats`, e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                      <textarea 
                        value={editData[`${key}Eligibility`] || ''} 
                        onChange={e => handleInputChange(`${key}Eligibility`, e.target.value)} 
                        rows={2} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none text-base" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Branches & Seats</label>
                      <div className="space-y-2">
                        {(editData[`${key}Branches`] && editData[`${key}Branches`].length > 0 ? editData[`${key}Branches`] : ['']).map((branch, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={branch}
                              onChange={e => handleBranchChange(key, idx, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-base"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBranch(key, idx)}
                              className="text-red-600 hover:text-red-800 px-2"
                              disabled={editData[`${key}Branches`]?.length === 1}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddBranch(key)}
                          className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                        >
                          Add Branch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 pt-4 border-t">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base"
                >
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
