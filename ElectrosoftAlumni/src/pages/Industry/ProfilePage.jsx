import React, { useState } from "react";
import Navbar from "../../components/industry/Navbar";
import ProfileSidebar from "../../components/industry/ProfileSidebar";
import PostCreator from "../../components/industry/PostCreator";
import FeedArea from "../../components/industry/FeedArea";
import NewsSidebar from "../../components/industry/NewsSidebar";
import ContentRenderer from "../../components/industry/ContentRenderer";
import NavigationOptions from "../../components/industry/NavigationOptions";

const IndustryProfilePage = () => {
  const [activeContent, setActiveContent] = useState("industry-overview");
  const [activeContentName, setActiveContentName] = useState("Industry Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Industry Overview");

  // Industry-specific navigation options
  const navigationOptions = [
    "Industry Overview",
    "Sector / Category",
    "Job Career Opportunities",
    "Technology",
    "Challenges / Solutions",
    "Success Stories",
    "Post News and Jobs",
    "Expert Opinions/Interview",
    "Poll/Comment Section",
    "Internship or Training Requests",
    "Live Projects",
    "Student Login",
    "Project Success Stories",
    "Upload Project",
    "Add University Project"
  ];

  const handleNavigationChange = (contentId, contentName) => {
    setActiveContent(contentId);
    setActiveContentName(contentName);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Search Container */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-center">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search industries, projects, opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="col-span-12 lg:col-span-3">
            <ProfileSidebar 
              onNavigationChange={handleNavigationChange}
              navigationOptions={navigationOptions}
              isIndustryProfile={true}
            />
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-6">
              {/* Navigation Options above content */}
              <NavigationOptions
                selectedOption={selectedOption}
                onOptionSelect={handleOptionSelect}
                options={navigationOptions}
                isIndustryProfile={true}
                className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              />

              {/* Post Creator - Only show when on posts view */}
              {activeContent === "posts" && <PostCreator isIndustry={true} />}

              {/* Content Area */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {activeContent === "posts" ? (
                  <FeedArea isIndustry={true} />
                ) : (
                  <ContentRenderer
                    activeContent={activeContent}
                    activeContentName={activeContentName}
                    isIndustryProfile={true}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - News */}
          <div className="col-span-12 lg:col-span-3">
            <NewsSidebar isIndustry={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryProfilePage;
