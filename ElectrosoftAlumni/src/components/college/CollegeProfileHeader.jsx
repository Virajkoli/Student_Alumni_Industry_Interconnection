import React, { useState } from "react";

const NAV_OPTIONS = [
  { id: "college-info", name: "College Info", icon: "🏫" },
  { id: "course-fees", name: "Course Fees", icon: "💸" },
  { id: "review", name: "Review", icon: "⭐" },
  { id: "admission", name: "Admission", icon: "📝" },
  { id: "placement", name: "Placement", icon: "💼" },
  { id: "faculty", name: "Faculty", icon: "👨‍🏫" }
];

const CollegeProfileHeader = ({ name = "Electrosoft College of Engineering", location = "Your City, State", logo = "/college-logo.png", background = "/college-bg.jpg" }) => {
  const [activeTab, setActiveTab] = useState(NAV_OPTIONS[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case "college-info":
        return (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🏫</span> Indian Institute of Technology Kanpur (IIT Kanpur)
            </h2>
            <p className="text-gray-700 mb-4 text-lg">IIT Kanpur (IITK) is a top-ranked public technical university in Kanpur, Uttar Pradesh, India, established in 1959. It is known for its academic excellence, research, and innovation in engineering and science.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
              <div className="bg-white rounded-lg shadow p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Key Facts</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><span className="font-semibold">Location:</span> Kanpur, Uttar Pradesh, India</li>
                  <li><span className="font-semibold">Established:</span> 1959</li>
                  <li><span className="font-semibold">Campus Area:</span> 1055 acres</li>
                  <li><span className="font-semibold">NIRF 2024 Engineering Rank:</span> 4</li>
                  <li><span className="font-semibold">Accreditation:</span> AICTE, UGC, NAAC</li>
                  <li><span className="font-semibold">Students:</span> 8000+</li>
                  <li><span className="font-semibold">Faculty:</span> 450+</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Popular Programs</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>B.Tech, M.Tech, MSc, MBA, Ph.D.</li>
                  <li>Interdisciplinary and Dual Degree Programs</li>
                </ul>
                <h3 className="font-semibold text-blue-800 mt-4 mb-2 text-lg">Website</h3>
                <a href="https://www.iitk.ac.in/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.iitk.ac.in</a>
              </div>
            </div>
            <div className="mb-2 bg-white rounded-lg shadow p-4 border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Modern campus, advanced labs, and research centers</li>
                <li>Strong industry connections and placements</li>
                <li>Active student life and vibrant campus culture</li>
                <li>Global collaborations and alumni network</li>
              </ul>
            </div>
          </div>
        );
      case "course-fees":
        return <div className="p-6">Course Fees content goes here.</div>;
      case "review":
        return <div className="p-6">Review content goes here.</div>;
      case "admission":
        return <div className="p-6">Admission content goes here.</div>;
      case "placement":
        return <div className="p-6">Placement content goes here.</div>;
      case "faculty":
        return <div className="p-6">Faculty content goes here.</div>;
      default:
        return null;
    }
  };

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
      <div className="flex justify-center overflow-x-auto gap-2 px-6 py-3 bg-white scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 border-t border-blue-100 border-b border-blue-100 mt-2">
        {NAV_OPTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap border border-blue-200 hover:bg-blue-100 ${
              activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      {/* Main Content for Selected Tab */}
      <div className="bg-white rounded-b-xl shadow-inner border-t border-blue-100">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CollegeProfileHeader;
