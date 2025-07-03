import React, { useState } from "react";
import { Edit, X } from "lucide-react";

const Courses = ({ data, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...data });

  const handleEditClick = () => {
    setEditData({ ...data });
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
    if (onEdit) onEdit(editData);
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setEditData({ ...data });
    setIsEditModalOpen(false);
  };

  if (!data) return null;

  // Helper to render a table row for each course type
  const renderTableRow = (label, duration, eligibility, branches, fees, totalSeats) => (
    <tr className="bg-white">
      <td className="px-4 py-3 border-b border-blue-100 font-semibold text-blue-900">{label}</td>
      <td className="px-4 py-3 border-b border-blue-100">{duration}</td>
      <td className="px-4 py-3 border-b border-blue-100">{eligibility}</td>
      <td className="px-4 py-3 border-b border-blue-100">
        <ul className="list-disc list-inside space-y-1">
          {branches && branches.length > 0 ? branches.map((b, i) => <li key={i}>{b}</li>) : <li>N/A</li>}
        </ul>
      </td>
      <td className="px-4 py-3 border-b border-blue-100">{fees}</td>
      <td className="px-4 py-3 border-b border-blue-100">{totalSeats}</td>
    </tr>
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-blue-900">Course Details</h2>
        </div>
        <button
          onClick={handleEditClick}
          className="p-2 hover:bg-opacity-10 rounded-full transition-colors"
          style={{ color: '#6EA9C8' }}
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-4 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Program</th>
              <th className="px-4 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Duration</th>
              <th className="px-4 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Eligibility</th>
              <th className="px-4 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Branches & Seats</th>
              <th className="px-4 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Annual Fees</th>
              <th className="px-4 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Total Seats</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRow(
              "B.Tech",
              data.btechDuration,
              data.btechEligibility,
              data.btechBranches,
              data.btechFees,
              data.btechTotalSeats
            )}
            {renderTableRow(
              "M.Tech",
              data.mtechDuration,
              data.mtechEligibility,
              data.mtechBranches,
              data.mtechFees,
              data.mtechTotalSeats
            )}
            {renderTableRow(
              "B.Sc",
              data.bscDuration,
              data.bscEligibility,
              data.bscBranches,
              data.bscFees,
              data.bscTotalSeats
            )}
            {renderTableRow(
              "M.Sc",
              data.mscDuration,
              data.mscEligibility,
              data.mscBranches,
              data.mscFees,
              data.mscTotalSeats
            )}
            {renderTableRow(
              "MBA",
              data.mbaDuration,
              data.mbaEligibility,
              data.mbaBranches,
              data.mbaFees,
              data.mbaTotalSeats
            )}
            {renderTableRow(
              "Ph.D",
              data.phdDuration,
              data.phdEligibility,
              data.phdBranches,
              data.phdFees,
              data.phdTotalSeats
            )}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-900">Edit Course Details</h3>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            <form className="space-y-6 flex-1 overflow-y-auto pr-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              {[
                { key: 'btech', label: 'B.Tech' },
                { key: 'mtech', label: 'M.Tech' },
                { key: 'bsc', label: 'B.Sc' },
                { key: 'msc', label: 'M.Sc' },
                { key: 'mba', label: 'MBA' },
                { key: 'phd', label: 'Ph.D' },
              ].map(({ key, label }) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2 text-blue-900">{label}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input type="text" value={editData[`${key}Duration`] || ''} onChange={e => handleInputChange(`${key}Duration`, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Fees</label>
                      <input type="text" value={editData[`${key}Fees`] || ''} onChange={e => handleInputChange(`${key}Fees`, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
                      <input type="text" value={editData[`${key}TotalSeats`] || ''} onChange={e => handleInputChange(`${key}TotalSeats`, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                      <textarea value={editData[`${key}Eligibility`] || ''} onChange={e => handleInputChange(`${key}Eligibility`, e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none" />
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
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBranch(key, idx)}
                              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                              disabled={editData[`${key}Branches`]?.length === 1}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddBranch(key)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 mt-1"
                        >
                          Add Branch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
