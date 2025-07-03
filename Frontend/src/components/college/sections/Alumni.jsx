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
        {Array.isArray(data.notableAlumni) && data.notableAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.notableAlumni.map((alumni, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-1">
                  {alumni.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Batch: {alumni.batch}
                </p>
                <p className="text-gray-700">{alumni.achievement}</p>
                {alumni.currentRole && (
                  <p className="text-sm text-gray-600 mt-2">
                    Current: {alumni.currentRole}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            No notable alumni information available.
          </div>
        )}
      </div>
      {/* Alumni Testimonials */}
      {Array.isArray(data.testimonials) && data.testimonials.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">
            Alumni Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials.map((testimonial, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-blue-50">
                <p className="italic text-gray-700 mb-2">
                  “{testimonial.quote}”
                </p>
                <div className="text-sm text-gray-600 font-semibold">
                  - {testimonial.name}
                  {testimonial.batch ? `, Batch ${testimonial.batch}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Networking Opportunities */}
      {data.networking && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">
            Networking Opportunities
          </h3>
          <div className="text-gray-700 bg-yellow-50 rounded-lg p-4">
            {data.networking}
          </div>
        </div>
      )}
      {/* Alumni Association Info */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Alumni Association
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-600">{data.associationInfo}</p>
          {data.contactInfo && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700">
                Contact Information
              </h4>
              <p className="text-gray-600">{data.contactInfo}</p>
            </div>
          )}
        </div>
      </div>
      {/* Statistics */}
      {Array.isArray(data.statistics) && data.statistics.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">
            Alumni Network Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.statistics.map((stat, idx) => (
              <div
                key={idx}
                className="bg-blue-50 rounded-lg p-4 text-center"
              >
                <div className="text-2xl font-bold text-blue-700">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alumni;
