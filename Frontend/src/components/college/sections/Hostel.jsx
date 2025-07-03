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
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Campus Amenities</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.campusAmenities && data.campusAmenities.length > 0 ? (
            data.campusAmenities.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li>No campus amenities information available.</li>
          )}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Room Types & Fees</h3>
        {data.roomTypes && data.roomTypes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-blue-200 rounded-lg text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Type</th>
                  <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Capacity</th>
                  <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Fee (₹/year)</th>
                </tr>
              </thead>
              <tbody>
                {data.roomTypes.map((room, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">{room.type}</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">{room.capacity}</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">{room.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500">No room type information available.</div>
        )}
      </div>
      <div className="mb-2">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Mess & Dining</h3>
        <div className="text-gray-700 text-base leading-7 bg-blue-50 rounded p-3">
          {data.messInfo || "No mess information available."}
        </div>
      </div>
    </div>
  );
};

export default Hostel;
