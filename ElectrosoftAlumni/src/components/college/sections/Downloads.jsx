import React from "react";

const Downloads = ({ data, onEdit }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Downloads</h2>
        <button
          className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      {/* Forms Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-blue-800 mb-4 text-lg">Forms</h3>
        <div className="grid gap-4">
          {data.forms &&
            data.forms.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-600">{doc.description}</div>
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    <span>{doc.fileSize}</span>
                    <span>{doc.format}</span>
                    <a
                      href={doc.url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Brochures Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-blue-800 mb-4 text-lg">
          Brochures & Catalogs
        </h3>
        <div className="grid gap-4">
          {data.brochures &&
            data.brochures.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-600">{doc.description}</div>
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    <span>{doc.fileSize}</span>
                    <span>{doc.format}</span>
                    <a
                      href={doc.url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Syllabus Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-blue-800 mb-4 text-lg">
          Course Syllabus
        </h3>
        <div className="grid gap-4">
          {data.syllabus &&
            data.syllabus.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-600">{doc.description}</div>
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    <span>{doc.fileSize}</span>
                    <span>{doc.format}</span>
                    <a
                      href={doc.url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Other Documents */}
      <div>
        <h3 className="font-semibold text-blue-800 mb-4 text-lg">
          Other Documents
        </h3>
        <div className="grid gap-4">
          {data.other &&
            data.other.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-600">{doc.description}</div>
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    <span>{doc.fileSize}</span>
                    <span>{doc.format}</span>
                    <a
                      href={doc.url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Downloads;
