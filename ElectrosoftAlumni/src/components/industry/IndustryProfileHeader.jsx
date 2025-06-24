import React, { useState } from "react";

const HorizontalProfileNavbar = ({ onNavigationChange, navigationOptions }) => {
  const [activeItem, setActiveItem] = useState("industry-overview");

  const navigationItems = [
    { id: "posts", name: "Posts", icon: "📝", description: "Your posts and activities" },
    { id: "industry-overview", name: "Industry Overview", icon: "🏭", description: "Overview of the industry" },
    { id: "sector-category", name: "Sector / Category", icon: "📊", description: "Industry sectors and categories" },
    { id: "job-career-opportunities", name: "Job Career Opportunities", icon: "💼", description: "Jobs and career paths" },
    { id: "technology", name: "Technology", icon: "💡", description: "Technologies in the industry" },
    { id: "challenges-solutions", name: "Challenges / Solutions", icon: "🛠️", description: "Industry challenges and solutions" },
    { id: "success-stories", name: "Success Stories", icon: "🏆", description: "Industry success stories" },
    { id: "post-news-jobs", name: "Post News and Jobs", icon: "📰", description: "Share news and job posts" },
    { id: "expert-opinions-interview", name: "Expert Opinions/Interview", icon: "🎤", description: "Expert interviews and opinions" },
    { id: "poll-comment-section", name: "Poll/Comment Section", icon: "💬", description: "Polls and comments" },
    { id: "internship-training-requests", name: "Internship or Training Requests", icon: "📚", description: "Request internships or training" },
    { id: "live-projects", name: "Live Projects", icon: "🚀", description: "Live industry projects" },
    { id: "student-login", name: "Student Login", icon: "👨‍🎓", description: "Login for students" },
    { id: "project-success-stories", name: "Project Success Stories", icon: "📈", description: "Success stories of projects" },
    { id: "upload-project", name: "Upload Project", icon: "⬆️", description: "Upload your project" },
    { id: "add-university-project", name: "Add University Project", icon: "🏫", description: "Add a university project" },
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
        <div className="h-24 bg-gradient-to-r from-green-500 to-blue-600"></div>
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
            <h3 className="text-xl font-semibold text-gray-900">Industry User</h3>
            <p className="text-sm text-gray-600 mt-1">
              Industry Domain Expert, Innovator, and Mentor
            </p>
            <p className="text-xs text-gray-500 mt-1">📍 Mumbai, Maharashtra</p>
          </div>
          
          <div className="flex gap-3">
            <button className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Industry Experience
            </button>
            <button className="py-2 px-4 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors duration-200">
              Connect
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">250+</div>
            <div className="text-xs text-gray-500">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">15</div>
            <div className="text-xs text-gray-500">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">500+</div>
            <div className="text-xs text-gray-500">Connections</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">4.8</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>
      </div>
      
      {/* Horizontal Navigation Items */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                activeItem === item.id
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2 text-base">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalProfileNavbar;
