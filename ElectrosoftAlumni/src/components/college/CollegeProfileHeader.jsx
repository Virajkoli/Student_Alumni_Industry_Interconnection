import React, { useState } from "react";

const NAV_OPTIONS_DEFAULT = [
  { id: "college-info", name: "College Info" },
  { id: "course-fees", name: "Course Fees" },
  { id: "review", name: "Review" },
  { id: "admission", name: "Admission" },
  { id: "placement", name: "Placement" },
  { id: "faculty", name: "Faculty" },
];

const QUICK_STATS_DEFAULT = [
  { label: "Projects", value: "120+" },
  { label: "Departments", value: "30" },
  { label: "Alumni", value: "10,000+" },
  { label: "Rating", value: "4.9" },
];

const CollegeProfileHeader = ({
  name = "Electrosoft College of Engineering",
  location = "Your City, State",
  logo = "/college-logo.png",
  background = "/college-bg.jpg",
  activeTab,
  setActiveTab,
}) => {
  const [editHeader, setEditHeader] = useState(false);
  const [headerData, setHeaderData] = useState({
    name,
    location,
    logo,
    background,
    quickStats: QUICK_STATS_DEFAULT,
    navOptions: NAV_OPTIONS_DEFAULT,
  });

  const handleHeaderChange = (field, value) => {
    setHeaderData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuickStatChange = (idx, key, value) => {
    setHeaderData((prev) => {
      const stats = [...prev.quickStats];
      stats[idx] = { ...stats[idx], [key]: value };
      return { ...prev, quickStats: stats };
    });
  };

  const handleNavOptionChange = (idx, value) => {
    setHeaderData((prev) => {
      const nav = [...prev.navOptions];
      nav[idx] = { ...nav[idx], name: value };
      return { ...prev, navOptions: nav };
    });
  };

  const handleHeaderSave = () => {
    setEditHeader(false);
    // Optionally, propagate changes up if needed
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      {/* Profile Header - Horizontal with custom background */}
      <div className="relative">
        {/* College photo as background */}
        {editHeader ? (
          <input
            className="h-28 w-full bg-cover bg-center text-sm border-b border-gray-200 px-4 py-2"
            value={headerData.background}
            onChange={(e) => handleHeaderChange("background", e.target.value)}
            placeholder="Background Image URL"
          />
        ) : (
          <div
            className="h-28 w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${headerData.background}')` }}
          ></div>
        )}
        {/* Edit button - top right corner */}
        {!editHeader && (
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-blue-100 transition-colors z-10"
            title="Edit College Header"
            onClick={() => setEditHeader(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h12"
              />
            </svg>
          </button>
        )}
        {/* College logo overlay */}
        <div className="absolute -bottom-8 left-6">
          <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center overflow-hidden">
              {editHeader ? (
                <input
                  className="w-full h-full rounded-full text-xs px-2 py-1 border border-gray-300"
                  value={headerData.logo}
                  onChange={(e) => handleHeaderChange("logo", e.target.value)}
                  placeholder="Logo URL"
                />
              ) : (
                <img
                  src={headerData.logo}
                  alt="College Logo"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Profile Info - Horizontal Layout */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 flex flex-col items-start gap-1">
            {editHeader ? (
              <>
                <input
                  className="text-2xl font-bold text-blue-900 bg-white border border-gray-300 rounded px-2 py-1 mb-1"
                  value={headerData.name}
                  onChange={(e) => handleHeaderChange("name", e.target.value)}
                />
                <input
                  className="text-xs text-blue-500 bg-white border border-gray-300 rounded px-2 py-1"
                  value={headerData.location}
                  onChange={(e) =>
                    handleHeaderChange("location", e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-blue-900">
                  {headerData.name}
                </h3>
                <p className="text-xs text-blue-500 mt-1">
                  📍 {headerData.location}
                </p>
              </>
            )}
          </div>
          <div className="flex gap-3">
            {editHeader && (
              <button
                className="py-2 px-6 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                onClick={handleHeaderSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 mb-4 pb-4 border-t border-blue-100">
        {headerData.quickStats.map((stat, idx) => (
          <div className="text-center" key={idx}>
            {editHeader ? (
              <>
                <input
                  className="text-lg font-semibold text-blue-900 bg-white border border-gray-300 rounded px-2 py-1 w-20 text-center mb-1"
                  value={stat.value}
                  onChange={(e) =>
                    handleQuickStatChange(idx, "value", e.target.value)
                  }
                />
                <input
                  className="text-xs text-blue-500 bg-white border border-gray-300 rounded px-2 py-1 w-24 text-center"
                  value={stat.label}
                  onChange={(e) =>
                    handleQuickStatChange(idx, "label", e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <div className="text-lg font-semibold text-blue-900">
                  {stat.value}
                </div>
                <div className="text-xs text-blue-500">{stat.label}</div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Navigation Options - LinkedIn Style Horizontal */}
      <div className="bg-white border border-gray-200">
        <div className="flex overflow-x-auto">
          {headerData.navOptions.map((item, idx) =>
            editHeader ? (
              <input
                key={item.id}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 border-transparent bg-white text-gray-700 rounded mr-2`}
                value={item.name}
                onChange={(e) => handleNavOptionChange(idx, e.target.value)}
              />
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {item.name}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeProfileHeader;
