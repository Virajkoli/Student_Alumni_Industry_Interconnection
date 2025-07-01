import React from "react";

const CutoffRanking = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Cutoff & Ranking</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      {/* Example: Display cutoff and ranking data if available */}
      {data.cutoffs && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Cutoff Scores</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.cutoffs.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {data.rankings && (
        <div>
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Rankings</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.rankings.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {!(data.cutoffs || data.rankings) && (
        <div className="text-gray-500">No cutoff or ranking data available.</div>
      )}
    </div>
  );
};

export default CutoffRanking;
