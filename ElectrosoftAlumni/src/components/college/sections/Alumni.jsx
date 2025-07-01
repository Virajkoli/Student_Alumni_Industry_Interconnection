import React from "react";

const Alumni = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Alumni</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      {/* Notable Alumni */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Notable Alumni
        </h3>
        {data.notableAlumni && data.notableAlumni.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.notableAlumni.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">
            No notable alumni information available.
          </div>
        )}
      </div>
      {/* Alumni Testimonials */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Alumni Testimonials
        </h3>
        {data.alumniTestimonials && data.alumniTestimonials.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.alumniTestimonials.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No testimonials available.</div>
        )}
      </div>
      {/* Networking Opportunities */}
      <div>
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Networking Opportunities
        </h3>
        {data.networkingOpportunities && data.networkingOpportunities.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
            {data.networkingOpportunities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No networking opportunities listed.</div>
        )}
      </div>
    </div>
  );
};

export default Alumni;
