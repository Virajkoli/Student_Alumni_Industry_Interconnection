import React from "react";

const CollegeProfileHeader = ({ name = "Electrosoft College of Engineering", location = "Your City, State", logo = "/college-logo.png", background = "/college-bg.jpg" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      {/* Profile Header - Horizontal with custom background */}
      <div className="relative">
        {/* College photo as background */}
        <div
          className="h-28 w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${background}')` }}
        ></div>
        {/* College logo overlay */}
        <div className="absolute -bottom-8 left-6">
          <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="College Logo"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Profile Info - Horizontal Layout */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-blue-900">{name}</h3>
            <p className="text-xs text-blue-500 mt-1">📍 {location}</p>
          </div>
          <div className="flex gap-3">
            <button className="py-2 px-6 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
              Save
            </button>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-blue-100">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">120+</div>
          <div className="text-xs text-blue-500">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">30</div>
          <div className="text-xs text-blue-500">Departments</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">10,000+</div>
          <div className="text-xs text-blue-500">Alumni</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">4.9</div>
          <div className="text-xs text-blue-500">Rating</div>
        </div>
      </div>
      {/* Navigation Options - Consistent with Industry/Startup, below quick stats */}
      <div className="flex overflow-x-auto gap-2 px-6 py-3 bg-white scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 border-t border-blue-100 border-b border-blue-100 mt-2">
        { [
            {
              id: "college-info",
              name: "College Info",
              icon: "🏫"
            },
            {
              id: "course-fees",
              name: "Course Fees",
              icon: "💸"
            },
            {
              id: "review",
              name: "Review",
              icon: "⭐"
            },
            {
              id: "admission",
              name: "Admission",
              icon: "📝"
            },
            {
              id: "placement",
              name: "Placement",
              icon: "💼"
            },
            {
              id: "faculty",
              name: "Faculty",
              icon: "👨‍🏫"
            }
          ].map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default CollegeProfileHeader;
