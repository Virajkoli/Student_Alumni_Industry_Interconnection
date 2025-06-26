import React, { useState } from 'react'
import CollegeProfileHeader from '../../components/college/CollegeProfileHeader'
import CollegeNotifications from '../../components/college/CollegeNotifications'

const NAV_OPTIONS = [
  { id: "college-info", name: "College Info", icon: "🏫" },
  { id: "course-fees", name: "Course Fees", icon: "💸" },
  { id: "review", name: "Review", icon: "⭐" },
  { id: "admission", name: "Admission", icon: "📝" },
  { id: "placement", name: "Placement", icon: "💼" },
  { id: "faculty", name: "Faculty", icon: "👨‍🏫" }
];

const CollegeProfilePage = () => {
  const [activeTab, setActiveTab] = useState(NAV_OPTIONS[0].id);

  const renderTabContent = (activeTab) => {
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Full-width header and navigation */}
        <CollegeProfileHeader
          name="IIT Kanpur"
          location="Kanpur, Uttar Pradesh"
          logo="/college-logo.png"
          background="/college-bg.jpg"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {/* 70-30 split for main content and notifications */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[70%]">
            {renderTabContent(activeTab)}
          </div>
          <div className="w-full lg:w-[30%]">
            <CollegeNotifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfilePage;
