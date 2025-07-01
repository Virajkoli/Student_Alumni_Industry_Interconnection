import React from "react";

const Admission = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Admission</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Eligibility & Entrance Exams</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.eligibility && data.eligibility.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Application Steps</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.steps && data.steps.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Important Dates</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
          {data.dates && data.dates.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-blue-800 mb-2 text-lg">Cut Off</h3>
        
        {/* CAP Rounds Table with Download Links */}
        {data.cutoffTable && data.cutoffTable.length > 0 && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-2 px-4 border-b text-blue-900 font-semibold text-center">Year</th>
                  <th className="py-2 px-4 border-b text-blue-900 font-semibold text-center">CAP Round 1</th>
                  <th className="py-2 px-4 border-b text-blue-900 font-semibold text-center">CAP Round 2</th>
                  <th className="py-2 px-4 border-b text-blue-900 font-semibold text-center">CAP Round 3</th>
                </tr>
              </thead>
              <tbody>
                {data.cutoffTable.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-4 font-medium text-blue-800 text-center">{row.year}</td>
                    <td className="py-2 px-4 text-center">{row.round1 ? <a href={row.round1} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download PDF</a> : "-"}</td>
                    <td className="py-2 px-4 text-center">{row.round2 ? <a href={row.round2} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download PDF</a> : "-"}</td>
                    <td className="py-2 px-4 text-center">{row.round3 ? <a href={row.round3} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download PDF</a> : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admission;
