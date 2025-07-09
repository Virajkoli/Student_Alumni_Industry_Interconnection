import React from "react";
import { Edit } from "lucide-react";

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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Hostel Section */}
      <div className="bg-white rounded-lg mb-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Hostel & Campus Life</h2>
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit hostel information"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Facilities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
            <div className="space-y-3">
              {safeData.facilities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <p className="text-gray-700 leading-relaxed">{item || "-"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {safeData.rooms.map((room, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 text-lg mb-2">{room.type || "-"}</div>
                  <div className="text-gray-700 text-sm mb-2">{room.description || "-"}</div>
                  <div className="text-gray-700 text-sm mb-1">
                    <span className="font-medium">Amenities:</span> {room.amenities || "-"}
                  </div>
                  <div className="text-gray-700 text-sm">
                    <span className="font-medium">Fees:</span> {room.fees || "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mess Facilities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mess Facilities</h3>
            <div className="space-y-3">
              {safeData.mess.facilities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                  <p className="text-gray-700 leading-relaxed">{item || "-"}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-base font-medium text-gray-900 mb-3">Meal Timings</h4>
              <div className="space-y-2">
                {safeData.mess.mealTimings.map((timing, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">{timing || "-"}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Mess Fees:</span> {safeData.mess.fees || "-"}
              </p>
            </div>
          </div>

          {/* Rules & Regulations */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rules & Regulations</h3>
            <div className="space-y-3">
              {safeData.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                  <p className="text-gray-700 leading-relaxed">{rule || "-"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hostel;
