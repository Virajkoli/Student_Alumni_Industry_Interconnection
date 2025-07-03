import React from "react";

const defaultHostelData = {
  hostelFacilities: [],
  campusAmenities: [],
  roomTypes: [],
  messInfo: ""
};

const Hostel = ({ data, onEdit }) => {
  // Merge incoming data with defaults to ensure all fields exist
  const safeData = { ...defaultHostelData, ...(data || {}) };
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
          {Array.isArray(safeData.hostelFacilities) && safeData.hostelFacilities.length > 0 ? (
            safeData.hostelFacilities.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <>
              <li>Separate hostels for boys and girls with 24/7 security</li>
              <li>Wi-Fi enabled rooms, study areas, and recreation rooms</li>
              <li>Common rooms with TV, indoor games, and reading corners</li>
              <li>On-campus medical facilities and emergency care</li>
              <li>Laundry, housekeeping, and maintenance services</li>
              
            </>
          )}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Campus Infrastructure</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {Array.isArray(safeData.campusAmenities) && safeData.campusAmenities.length > 0 ? (
            safeData.campusAmenities.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <>
              <li>Modern academic buildings and lecture halls</li>
              <li>Central library with digital resources and study zones</li>
              <li>Sports complex, gymnasium, and outdoor playgrounds</li>
              <li>Auditorium, seminar halls, and conference facilities</li>
              <li>On-campus banking, post office, and shopping complex</li>
              
            </>
          )}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Room Types & Fees</h3>
        {Array.isArray(safeData.roomTypes) && safeData.roomTypes.length > 0 ? (
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
                {safeData.roomTypes.map((room, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">{room.type || "-"}</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">{room.capacity || "-"}</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">{room.fee || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto mb-2">
              <table className="min-w-full border border-blue-200 rounded-lg text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Type</th>
                    <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Capacity</th>
                    <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Fee (₹/year)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">Single Room</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">1</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">₹30,000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">Double Sharing</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">2</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">₹25,000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">Triple Sharing</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">3</td>
                    <td className="px-6 py-2 border-b border-blue-100 align-middle">₹20,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        )}
      </div>
      <div className="mb-2">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Mess & Dining</h3>
        <div className="text-gray-700 text-base leading-7 rounded p-3">
          {safeData.messInfo || (
            <>
              <div>Spacious dining halls with hygienic and nutritious meals served daily.</div>
              <div>Vegetarian and non-vegetarian options available.</div>
              <div>Special meals for festivals and health needs.</div>
              <div>Modern kitchen facilities and RO purified drinking water.</div>
             
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hostel;
