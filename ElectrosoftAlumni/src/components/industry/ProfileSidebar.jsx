import React, { useState } from "react";

const ProfileSidebar = ({ onNavigationChange, navigationOptions }) => {
  const [activeItem, setActiveItem] = useState(navigationOptions[0]);

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-20">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-16 bg-gradient-to-r from-green-500 to-blue-600"></div>
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
      <div className="pt-12 pb-4 px-6">
        <h2 className="text-lg font-semibold text-gray-900">Industry User</h2>
        <p className="text-sm text-gray-500">Industry Profile</p>
      </div>
      {/* Navigation Items */}
      <div className="border-t border-gray-200">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors duration-200 ${
              activeItem === item.id
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
