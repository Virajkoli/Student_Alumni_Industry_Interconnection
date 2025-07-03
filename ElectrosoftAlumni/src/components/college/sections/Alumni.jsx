import React from "react";

const defaultAlumniData = {
  notableAlumni: [],
  testimonials: [],
  networking: "",
  association: "",
};

const Alumni = ({ data, onEdit }) => {
  const safeData = { ...defaultAlumniData, ...(data || {}) };
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
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Notable Alumni</h3>
        {Array.isArray(safeData.notableAlumni) && safeData.notableAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeData.notableAlumni.map((alumni, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-1">{alumni.name || "-"}</h4>
                <p className="text-sm text-gray-600 mb-2">Batch: {alumni.batch || "-"}</p>
                <p className="text-gray-700">{alumni.achievement || "-"}</p>
                {alumni.currentRole && (
                  <p className="text-sm text-gray-600 mt-2">Current: {alumni.currentRole}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-1">Dr. A. P. J. Abdul Kalam</h4>
              <p className="text-sm text-gray-600 mb-2">Batch: 1960</p>
              <p className="text-gray-700">Former President of India, Aerospace Scientist</p>
              <p className="text-sm text-gray-600 mt-2">Current: Inspiration to millions</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-1">Sundar Pichai</h4>
              <p className="text-sm text-gray-600 mb-2">Batch: 1993</p>
              <p className="text-gray-700">CEO, Google & Alphabet</p>
              <p className="text-sm text-gray-600 mt-2">Current: CEO, Google</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-1">N. R. Narayana Murthy</h4>
              <p className="text-sm text-gray-600 mb-2">Batch: 1967</p>
              <p className="text-gray-700">Founder, Infosys</p>
              <p className="text-sm text-gray-600 mt-2">Current: Philanthropist</p>
            </div>
          </div>
        )}
      </div>
      {/* Alumni Testimonials */}
      {Array.isArray(safeData.testimonials) && safeData.testimonials.length > 0 ? (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Alumni Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safeData.testimonials.map((testimonial, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-blue-50">
                <p className="italic text-gray-700 mb-2">“{testimonial.quote || "-"}”</p>
                <div className="text-sm text-gray-600 font-semibold">- {testimonial.name || "-"}{testimonial.batch ? `, Batch ${testimonial.batch}` : ""}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-lg">Alumni Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-blue-50">
              <p className="italic text-gray-700 mb-2">“The campus and faculty shaped my career and values for life.”</p>
              <div className="text-sm text-gray-600 font-semibold">- Priya Sharma, Batch 2010</div>
            </div>
            <div className="border rounded-lg p-4 bg-blue-50">
              <p className="italic text-gray-700 mb-2">“The alumni network helped me land my dream job.”</p>
              <div className="text-sm text-gray-600 font-semibold">- Rahul Verma, Batch 2015</div>
            </div>
          </div>
        </div>
      )}
      {/* Networking Opportunities */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Networking Opportunities</h3>
        <div className="text-gray-700 bg-yellow-50 rounded-lg p-4">
          {safeData.networking || (
            <>
              <div>Active alumni chapters in major cities and abroad.</div>
              <div>Annual alumni meetups, webinars, and mentorship programs.</div>
              <div>Exclusive online platform for job referrals and professional networking.</div>
            </>
          )}
        </div>
      </div>
      {/* Alumni Association Info */}
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Alumni Association</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-blue-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Name</th>
                <th className="px-6 py-3 border-b border-blue-200 text-left font-semibold text-blue-900">Post</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Mr. Sajjan Singh</td>
                <td className="px-6 py-2 border-b border-blue-100 align-middle">President</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Mr. Arjun Patel</td>
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Vice President</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Ms. Kavita Rao</td>
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Secretary</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Mr. Suresh Nair</td>
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Member</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Ms. Ritu Sharma</td>
                <td className="px-6 py-2 border-b border-blue-100 align-middle">Member</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alumni;
