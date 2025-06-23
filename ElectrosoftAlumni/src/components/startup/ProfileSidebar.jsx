import React, { useState } from "react";

const ProfileSidebar = ({ onNavigationChange }) => {
  const [activeItem, setActiveItem] = useState("posts");

  const navigationItems = [
    {
      id: "posts",
      name: "Posts",
      icon: "📝",
      description: "Your posts and activities",
    },
    {
      id: "startup-ecosystem",
      name: "Startup Ecosystem Overview",
      icon: "🏢",
      description: "Complete overview of startup ecosystem",
    },
    {
      id: "growth-marketing",
      name: "Growth & Marketing Strategies",
      icon: "📈",
      description: "Marketing and growth strategies",
    },
    {
      id: "funding-investment",
      name: "Funding and Investment",
      icon: "💰",
      description: "Investment and funding opportunities",
    },
    {
      id: "tools-resources",
      name: "Tools & Resources",
      icon: "🛠️",
      description: "Essential tools and resources",
    },
    {
      id: "faqs",
      name: "FAQs",
      icon: "❓",
      description: "Frequently asked questions",
    },
    {
      id: "government-policies",
      name: "Government Policies & Tax Benefits",
      icon: "🏛️",
      description: "Policies and tax benefits",
    },
    {
      id: "launch-steps",
      name: "Steps to Launch",
      icon: "🚀",
      description: "Step-by-step launch guide",
    },
    {
      id: "startup-quiz",
      name: "Startup Quiz",
      icon: "🎯",
      description: "Test your startup knowledge",
    },
    {
      id: "how-it-works",
      name: "How It Works",
      icon: "⚙️",
      description: "How our platform works",
    },
    {
      id: "industries",
      name: "Industries",
      icon: "🏭",
      description: "Industry sectors and trends",
    },
    {
      id: "jobs-skills",
      name: "Jobs & Trending Skills",
      icon: "💼",
      description: "Job opportunities and skills",
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onNavigationChange) {
      onNavigationChange(item.id, item.name);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-20">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 bg-white rounded-full p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/64/64"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-lg font-bold rounded-full"
                style={{ display: "none" }}
              >
                R
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-10 px-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Riya</h3>
        <p className="text-sm text-gray-600 mt-1">
          Fresher | Java full stack developer | SQL
        </p>
        <p className="text-xs text-gray-500 mt-1">Mumbai, Maharashtra</p>

        <button className="mt-3 w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
          + Experience
        </button>
      </div>

      {/* Navigation Items */}
      <div className="p-3 max-h-96 overflow-y-auto">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 group mb-1 ${
              activeItem === item.id
                ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  activeItem === item.id ? "text-blue-700" : "text-gray-900"
                }`}
              >
                {item.name}
              </p>
            </div>
            {activeItem === item.id && (
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
