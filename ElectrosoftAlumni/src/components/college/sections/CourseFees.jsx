import React from "react";

const FeesReview = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Course Fees & Scholarships
        </h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="mb-6">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-4">Program</th>
              <th className="py-2 px-4">Annual Fees (INR)</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="py-2 px-4">B.Tech</td>
              <td className="py-2 px-4">{data.btech}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">M.Tech</td>
              <td className="py-2 px-4">{data.mtech}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">MSc</td>
              <td className="py-2 px-4">{data.msc}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">MBA</td>
              <td className="py-2 px-4">{data.mba}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Ph.D.</td>
              <td className="py-2 px-4">{data.phd}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Scholarships & Financial Aid
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.scholarships &&
            data.scholarships.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">
          Hostel & Other Charges
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          <li>Hostel Fees: {data.hostel}</li>
          <li>Mess Charges: {data.mess}</li>
          <li>Other Charges: {data.other}</li>
        </ul>
      </div>
    </div>
  );
};

export default FeesReview;
