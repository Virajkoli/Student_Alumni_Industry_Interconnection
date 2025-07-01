import React from "react";

const Courses = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Course Details</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left text-blue-900 font-semibold">Program</th>
              <th className="py-3 px-4 text-left text-blue-900 font-semibold">Duration</th>
              <th className="py-3 px-4 text-left text-blue-900 font-semibold">Eligibility</th>
              <th className="py-3 px-4 text-left text-blue-900 font-semibold">Branches & Seats</th>
              <th className="py-3 px-4 text-left text-blue-900 font-semibold">Annual Fees</th>
              <th className="py-3 px-4 text-left text-blue-900 font-semibold">Total Seats</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {/* B.Tech */}
            <tr>
              <td className="py-3 px-4 font-bold text-blue-800">B.Tech</td>
              <td className="py-3 px-4">{data.btechDuration}</td>
              <td className="py-3 px-4">{data.btechEligibility}</td>
              <td className="py-3 px-4">
                <ul className="list-disc list-inside space-y-1">
                  {data.btechBranches && data.btechBranches.map((branch, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{branch}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4">{data.btechFees}</td>
              <td className="py-3 px-4">{data.btechTotalSeats}</td>
            </tr>
            {/* M.Tech */}
            <tr>
              <td className="py-3 px-4 font-bold text-blue-800">M.Tech</td>
              <td className="py-3 px-4">{data.mtechDuration}</td>
              <td className="py-3 px-4">{data.mtechEligibility}</td>
              <td className="py-3 px-4">
                <ul className="list-disc list-inside space-y-1">
                  {data.mtechBranches && data.mtechBranches.map((branch, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{branch}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4">{data.mtechFees}</td>
              <td className="py-3 px-4">{data.mtechTotalSeats}</td>
            </tr>
            {/* B.Sc. */}
            <tr>
              <td className="py-3 px-4 font-bold text-blue-800">B.Sc.</td>
              <td className="py-3 px-4">{data.bscDuration}</td>
              <td className="py-3 px-4">{data.bscEligibility}</td>
              <td className="py-3 px-4">
                <ul className="list-disc list-inside space-y-1">
                  {data.bscBranches && data.bscBranches.map((branch, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{branch}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4">{data.bscFees}</td>
              <td className="py-3 px-4">{data.bscTotalSeats}</td>
            </tr>
            {/* MSc */}
            <tr>
              <td className="py-3 px-4 font-bold text-blue-800">MSc</td>
              <td className="py-3 px-4">{data.mscDuration}</td>
              <td className="py-3 px-4">{data.mscEligibility}</td>
              <td className="py-3 px-4">
                <ul className="list-disc list-inside space-y-1">
                  {data.mscBranches && data.mscBranches.map((branch, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{branch}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4">{data.mscFees}</td>
              <td className="py-3 px-4">{data.mscTotalSeats}</td>
            </tr>
            {/* MBA */}
            <tr>
              <td className="py-3 px-4 font-bold text-blue-800">MBA</td>
              <td className="py-3 px-4">{data.mbaDuration}</td>
              <td className="py-3 px-4">{data.mbaEligibility}</td>
              <td className="py-3 px-4">
                <ul className="list-disc list-inside space-y-1">
                  {data.mbaBranches && data.mbaBranches.map((branch, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{branch}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4">{data.mbaFees}</td>
              <td className="py-3 px-4">{data.mbaTotalSeats}</td>
            </tr>
            {/* Ph.D. */}
            <tr>
              <td className="py-3 px-4 font-bold text-blue-800">Ph.D.</td>
              <td className="py-3 px-4">{data.phdDuration}</td>
              <td className="py-3 px-4">{data.phdEligibility}</td>
              <td className="py-3 px-4">
                <ul className="list-disc list-inside space-y-1">
                  {data.phdBranches && data.phdBranches.map((branch, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{branch}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4">{data.phdFees}</td>
              <td className="py-3 px-4">{data.phdTotalSeats}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
