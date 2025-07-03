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
      {/* Upcoming Events */}
      {data.upcomingEvents && data.upcomingEvents.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.upcomingEvents.map((event, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-blue-900 text-lg">{event.title}</span>
                  {event.tags && (
                    <span className="text-xs bg-blue-200 text-blue-800 rounded px-2 py-1 ml-2">{event.tags.join(", ")}</span>
                  )}
                </div>
                <div className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Date:</span> {event.date} | <span className="font-semibold">Time:</span> {event.time}
                </div>
                <div className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Venue:</span> {event.venue}
                </div>
                <div className="text-gray-700 text-sm mb-2">{event.description}</div>
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm font-medium"
                  >
                    Register / More Info
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Annual Events */}
      {data.annualEvents && data.annualEvents.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Annual Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.annualEvents.map((event, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-yellow-50">
                <div className="font-bold text-yellow-900 text-lg mb-1">{event.name}</div>
                <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Month:</span> {event.month}</div>
                <div className="text-gray-700 text-sm">{event.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Event Calendar */}
      {data.eventCalendar && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Event Calendar</h3>
          <div className="bg-gray-100 rounded p-3 text-gray-800 text-base">{data.eventCalendar}</div>
        </div>
      )}
      {/* Tech/Cultural Fests */}
      {data.techCulture && data.techCulture.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Tech & Cultural Fests</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.techCulture.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Seminars */}
      {data.seminars && data.seminars.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Seminars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.seminars.map((seminar, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-green-50">
                <div className="font-bold text-green-900 text-lg mb-1">{seminar.title}</div>
                <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Speaker:</span> {seminar.speaker}</div>
                <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Date:</span> {seminar.date}</div>
                <div className="text-gray-700 text-sm">{seminar.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Conferences */}
      {data.conferences && data.conferences.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Conferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.conferences.map((conf, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-purple-50">
                <div className="font-bold text-purple-900 text-lg mb-1">{conf.title}</div>
                <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Date:</span> {conf.date}</div>
                <div className="text-gray-700 text-sm">{conf.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Fallback for no events */}
      {!(data.upcomingEvents && data.upcomingEvents.length > 0) &&
        !(data.annualEvents && data.annualEvents.length > 0) &&
        !(data.techCulture && data.techCulture.length > 0) &&
        !(data.seminars && data.seminars.length > 0) &&
        !(data.conferences && data.conferences.length > 0) &&
        !data.eventCalendar && (
          <div className="text-gray-500">No events information available.</div>
        )}
    </div>
  );
};

export default Events;
