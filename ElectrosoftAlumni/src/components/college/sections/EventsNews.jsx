import React from "react";

const EventsNews = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Events & News</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      {data.events && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Events</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.events.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {data.news && (
        <div>
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">News</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.news.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {!(data.events || data.news) && (
        <div className="text-gray-500">No events or news available.</div>
      )}
    </div>
  );
};

export default EventsNews;
