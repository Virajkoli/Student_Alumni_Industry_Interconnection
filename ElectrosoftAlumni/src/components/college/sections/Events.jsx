import React from "react";

const defaultEventsData = {
  upcomingEvents: [],
  annualEvents: [],
  eventCalendar: "",
  techCulture: [],
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
      {Array.isArray(safeData.annualEvents) && safeData.annualEvents.length > 0 ? (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Annual Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {safeData.annualEvents.map((event, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-yellow-50">
                <div className="font-bold text-yellow-900 text-lg mb-1">{event.name || "-"}</div>
                <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Month:</span> {event.month || "-"}</div>
                <div className="text-gray-700 text-sm">{event.description || "-"}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Annual Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="font-bold text-lg mb-1">Alumni Meet</div>
              <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Month:</span> January</div>
              <div className="text-gray-700 text-sm">A grand gathering of alumni, students, and faculty for networking and celebration.</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="font-bold text-lg mb-1">Techno-Cultural Fest</div>
              <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Month:</span> March</div>
              <div className="text-gray-700 text-sm">A week-long festival featuring technical competitions, cultural nights, and celebrity performances.</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="font-bold text-lg mb-1">Foundation Day</div>
              <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Month:</span> August</div>
              <div className="text-gray-700 text-sm">Commemorating the establishment of the college with cultural programs and awards.</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tech/Cultural Fests */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Tech & Cultural Fests</h3>
        {Array.isArray(safeData.techCulture) && safeData.techCulture.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {safeData.techCulture.map((item, idx) => (
              <li key={idx}>{item || "-"}</li>
            ))}
          </ul>
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            <li>Innovision: National-level technical symposium</li>
            <li>Renaissance: Annual cultural extravaganza</li>
            <li>Sports Fiesta: Inter-college sports competition</li>
          </ul>
        )}
      </div>
      {/* Seminars */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Seminars</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          <li>Industry-Academia Conclave: Talks by industry leaders and researchers</li>
          <li>Entrepreneurship Summit: Workshops and panel discussions for startups</li>
          <li>Research Symposium: Student and faculty research presentations</li>
        </ul>
      </div>
      {/* Conferences */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Conferences</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          <li>International Conference on Emerging Technologies</li>
          <li>National Conference on Sustainable Development</li>
          <li>Annual Management Conference</li>
        </ul>
      </div>
    </div>
  );
};

export default Events;
