import React from "react";

const defaultHostelData = {
  facilities: [],
  rooms: [],
  mess: {
    facilities: [],
    mealTimings: [],
    fees: ""
  },
  rules: []
};

const Hostel = ({ data, onEdit }) => {
  const safeData = { ...defaultHostelData, ...(data || {}) };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Hostel/Campus</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>

      {/* Facilities */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Facilities</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {safeData.facilities.map((item, idx) => (
            <li key={idx}>{item || "-"}</li>
          ))}
        </ul>
      </div>

      {/* Room Types */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Room Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safeData.rooms.map((room, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="font-bold text-lg mb-1">{room.type || "-"}</div>
              <div className="text-gray-700 text-sm mb-1">{room.description || "-"}</div>
              <div className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Amenities:</span> {room.amenities || "-"}
              </div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Fees:</span> {room.fees || "-"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mess Facilities */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Mess Facilities</h3>
        <div className="bg-yellow-50 rounded-lg p-4">
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7 mb-4">
            {safeData.mess.facilities.map((item, idx) => (
              <li key={idx}>{item || "-"}</li>
            ))}
          </ul>
          <div className="border-t pt-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Meal Timings</h4>
            <ul className="list-none space-y-1 text-gray-700">
              {safeData.mess.mealTimings.map((timing, idx) => (
                <li key={idx}>{timing || "-"}</li>
              ))}
            </ul>
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="text-yellow-900">
              <span className="font-semibold">Mess Fees:</span> {safeData.mess.fees || "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Rules & Regulations</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {safeData.rules.map((rule, idx) => (
            <li key={idx}>{rule || "-"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hostel;
