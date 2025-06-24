import React, { useState } from "react";

const HorizontalProfileNavbar = ({ onNavigationChange, navigationOptions }) => {
  const [activeItem, setActiveItem] = useState("posts");

  const navigationItems = [
    { id: "posts", name: "Posts", icon: "📝", description: "Your posts and activities" },
    { id: "startup-ecosystem", name: "Startup Ecosystem Overview", icon: "🏢", description: "Complete overview of startup ecosystem" },
    { id: "growth-marketing", name: "Growth & Marketing Strategies", icon: "📈", description: "Marketing and growth strategies" },
    { id: "funding-investment", name: "Funding and Investment", icon: "💰", description: "Investment and funding opportunities" },
    { id: "tools-resources", name: "Tools & Resources", icon: "🛠️", description: "Essential tools and resources" },
    { id: "faqs", name: "FAQs", icon: "❓", description: "Frequently asked questions" },
    { id: "government-policies", name: "Government Policies & Tax Benefits", icon: "🏛️", description: "Policies and tax benefits" },
    { id: "launch-steps", name: "Steps to Launch", icon: "🚀", description: "Step-by-step launch guide" },
    { id: "startup-quiz", name: "Startup Quiz", icon: "🎯", description: "Test your startup knowledge" },
    { id: "how-it-works", name: "How It Works", icon: "⚙️", description: "How our platform works" },
    { id: "industries", name: "Industries", icon: "🏭", description: "Industry sectors and trends" },
    { id: "jobs-skills", name: "Jobs & Trending Skills", icon: "💼", description: "Job opportunities and skills" },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onNavigationChange) {
      onNavigationChange(item.id, item.name);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      {/* Profile Header - Horizontal */}
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 bg-white rounded-full p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/64/64"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Profile Info - Horizontal Layout */}
      <div className="pt-10 px-6 pb-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">Startup</h3>
            <p className="text-sm text-gray-600 mt-1">
              Startup Founder, Innovator, and Entrepreneur
            </p>
            <p className="text-xs text-gray-500 mt-1">📍 Mumbai, Maharashtra</p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <button className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Startup Experience
            </button>
          </div>
        </div>
      </div>
      {/* Navigation Items - Horizontal */}
      <div className="flex overflow-x-auto gap-2 px-6 py-3 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeItem === item.id
                ? "bg-blue-100 text-blue-700 border border-blue-400"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorizontalProfileNavbar;
