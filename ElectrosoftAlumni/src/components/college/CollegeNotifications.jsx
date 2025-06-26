import React from "react";

const CollegeNotifications = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-blue-100 mb-6">
      <h3 className="font-semibold text-blue-800 mb-2 text-lg">Notifications</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li><span className="font-semibold">Admissions 2025:</span> Applications for B.Tech, M.Tech, and Ph.D. are open. <a href="https://www.iitk.ac.in/admissions" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Apply Now</a></li>
        <li><span className="font-semibold">Convocation 2025:</span> The 57th Convocation will be held on July 15, 2025.</li>
        <li><span className="font-semibold">Placement Drive:</span> Phase 1 placements start from December 1, 2025.</li>
        <li><span className="font-semibold">Techkriti 2025:</span> Annual technical festival scheduled for March 2025.</li>
        <li><span className="font-semibold">New Research Grants:</span> Faculty and students awarded major national and international research grants.</li>
      </ul>
    </div>
  );
};

export default CollegeNotifications;
