import React from "react";

const Admission = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Admission</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Eligibility & Entrance Exams</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.eligibility && data.eligibility.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Application Steps</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.steps && data.steps.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Important Dates</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.dates && data.dates.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admission;
