import React from "react";

const defaultAlumniData = {
  notableAlumni: [],
  initiatives: [],
  networks: [],
  contributions: []
};

const Alumni = ({ data, onEdit }) => {
  const safeData = { ...defaultAlumniData, ...(data || {}) };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Alumni Network</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>

      {/* Notable Alumni */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Notable Alumni</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safeData.notableAlumni.map((alumni, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="font-bold text-lg mb-1">{alumni.name || "-"}</div>
              <div className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Batch:</span> {alumni.batch || "-"}
              </div>
              <div className="text-gray-700 text-sm mb-1">{alumni.achievement || "-"}</div>
              <div className="text-gray-700 text-sm italic">{alumni.contribution || "-"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Initiatives */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Alumni Initiatives</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {safeData.initiatives.map((item, idx) => (
            <li key={idx}>{item || "-"}</li>
          ))}
        </ul>
      </div>

      {/* Networks */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Alumni Networks</h3>
        <div className="bg-blue-50 rounded-lg p-4">
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {safeData.networks.map((item, idx) => (
              <li key={idx}>{item || "-"}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contributions */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Alumni Contributions</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {safeData.contributions.map((item, idx) => (
            <li key={idx}>{item || "-"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Alumni;
