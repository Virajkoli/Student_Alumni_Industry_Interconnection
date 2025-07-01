import React from "react";

const Faculty = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Faculty</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Faculty Strength
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.strength &&
            data.strength.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Departments
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-base">
          {data.departments &&
            data.departments.map((dept, idx) => <div key={idx}>{dept}</div>)}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Achievements
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.achievements &&
            data.achievements.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Faculty;
