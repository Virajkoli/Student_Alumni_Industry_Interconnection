import React from "react";

const Events = ({ data, onEdit }) => {
  if (!data) return null;
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
        {data.annualEvents && data.annualEvents.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.annualEvents.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No annual events listed.</div>
        )}
      </div>
      {/* Tech/Cultural Fests */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Tech & Cultural Fests</h3>
        {data.techCulture && data.techCulture.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.techCulture.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No tech/cultural fests listed.</div>
        )}
      </div>
      {/* Seminars */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Seminars</h3>
        {data.seminars && data.seminars.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.seminars.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No seminars listed.</div>
        )}
      </div>
      {/* Conferences */}
      <div>
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Conferences</h3>
        {data.conferences && data.conferences.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.conferences.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No conferences listed.</div>
        )}
      </div>
    </div>
  );
};

export default Events;
