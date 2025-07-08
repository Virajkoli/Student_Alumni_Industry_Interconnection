import React from "react";

const defaultEventsData = {
  upcomingEvents: [],
  annualEvents: [],
  techCulture: [],
  seminars: [],
  conferences: []
};

const Events = ({ data, onEdit }) => {
  const safeData = { ...defaultEventsData, ...(data || {}) };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Events</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      
      {/* Annual Events */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Annual Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safeData.annualEvents.map((event, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-50">
              <div className="font-bold text-900 text-lg mb-1">{event.name || "-"}</div>
              <div className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Month:</span> {event.month || "-"}
              </div>
              <div className="text-gray-700 text-sm">{event.description || "-"}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tech/Cultural Fests */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Tech & Cultural Fests</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {safeData.techCulture.map((item, idx) => (
            <li key={idx}>{item || "-"}</li>
          ))}
        </ul>
      </div>

      {/* Seminars */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Seminars</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {safeData.seminars.map((item, idx) => (
            <li key={idx}>{item || "-"}</li>
          ))}
        </ul>
      </div>

      {/* Conferences */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Conferences</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {safeData.conferences.map((item, idx) => (
            <li key={idx}>{item || "-"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Events;
