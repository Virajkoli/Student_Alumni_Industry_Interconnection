import React from "react";

const CollegeInformation = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">College Information</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <p className="text-gray-700 mb-6 text-lg leading-8">{data.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
        <div>
          <h3 className="font-semibold text-blue-800 mb-3 text-lg">Key Facts</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
            <li><span className="font-semibold">Location:</span> {data.location}</li>
            <li><span className="font-semibold">Established:</span> {data.established}</li>
            <li><span className="font-semibold">Campus Area:</span> {data.campusArea}</li>
            <li><span className="font-semibold">NIRF Rank:</span> {data.nirfRank}</li>
            <li><span className="font-semibold">Accreditation:</span> {data.accreditation}</li>
            <li><span className="font-semibold">Students:</span> {data.students}</li>
            <li><span className="font-semibold">Faculty:</span> {data.faculty}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-blue-800 mb-3 text-lg">Popular Programs</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
            <li>{data.programs}</li>
            <li>{data.dualPrograms}</li>
          </ul>
          <h3 className="font-semibold text-blue-800 mt-6 mb-3 text-lg">Website</h3>
          <a href={data.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            {data.website && data.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="font-semibold text-blue-800 mb-3 text-lg">Highlights</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
          {data.highlights && data.highlights.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollegeInformation;
