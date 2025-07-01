import React from "react";

const Hostel = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Hostel & Campus</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Hostel Facilities</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.hostelFacilities && data.hostelFacilities.length > 0 ? (
            data.hostelFacilities.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li>No hostel facility information available.</li>
          )}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Campus Infrastructure</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.campusInfrastructure && data.campusInfrastructure.length > 0 ? (
            data.campusInfrastructure.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li>No campus infrastructure information available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Hostel;
