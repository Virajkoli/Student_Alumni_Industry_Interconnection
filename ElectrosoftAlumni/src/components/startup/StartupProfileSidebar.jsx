import React, { useState } from "react";

const ProfileSidebar = ({ onNavigationChange }) => {
  const [activeItem, setActiveItem] = useState("posts");

  const navigationItems = [
    {
      id: "posts",
      name: "Posts",
      shortName: "Posts",
    },
    {
      id: "startup-ecosystem",
      name: "Startup Ecosystem Overview",
      shortName: "About",
    },
    {
      id: "growth-marketing",
      name: "Growth & Marketing Strategies",
      shortName: "Activity",
    },
    {
      id: "funding-investment",
      name: "Funding and Investment",
      shortName: "Experience",
    },
    {
      id: "tools-resources",
      name: "Tools & Resources",
      shortName: "Education",
    },
    {
      id: "faqs",
      name: "FAQs",
      shortName: "Skills",
    },
    {
      id: "government-policies",
      name: "Government Policies & Tax Benefits",
      shortName: "Recommendations",
    },
    {
      id: "launch-steps",
      name: "Steps to Launch",
      shortName: "Launch Steps",
    },
    {
      id: "startup-quiz",
      name: "Startup Quiz",
      shortName: "Quiz",
    },
    {
      id: "how-it-works",
      name: "How It Works",
      shortName: "How It Works",
    },
    {
      id: "industries",
      name: "Industries",
      shortName: "Industries",
    },
    {
      id: "jobs-skills",
      name: "Jobs & Trending Skills",
      shortName: "Jobs & Skills",
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onNavigationChange) {
      onNavigationChange(item.id, item.name);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Horizontal Navigation Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
              activeItem === item.id
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
            }`}
          >
            {item.shortName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
