import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import Navbar from "../../components/startup/Navbar";
import PostCreator from "../../components/startup/PostCreator";
import FeedArea from "../../components/startup/FeedArea";
import StartupQuizSidebar from "../../components/startup/StartupQuizSidebar";
import ContentRenderer from "../../components/startup/ContentRenderer";
import StartupProfileHeader from "../../components/startup/StartupProfileHeader";

const navigationOptions = [
  "Posts",
  "Startup Ecosystem Overview",
  "Growth & Marketing Strategies",
  "Funding and Investment",
  "Tools & Resources",
  "FAQs",
  "Government Policies & Tax Benefits",
  "Steps to Launch",
  "Startup Quiz",
  "How It Works",
  "Industries",
  "Jobs & Trending Skills",
];

const StartupProfilePage = () => {
  const [activeContent, setActiveContent] = useState("posts");
  const [activeContentName, setActiveContentName] = useState("Posts");
  const [activeCustomContent, setActiveCustomContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(navigationOptions[0]);
  const [customNavigations, setCustomNavigations] = useState([]);

  const handleNavigationChange = (contentId, contentName, customNavItem = null) => {
    setActiveContent(contentId);
    setActiveContentName(contentName);
    setActiveCustomContent(customNavItem);
    setSelectedOption(contentName);
    
    // No need to add custom navigation to local state here since it's already managed by the header component
  };

  const handleCustomContentUpdate = (customNavId, newContent) => {
    // Update the custom navigation content in our local state
    setCustomNavigations(prev => 
      prev.map(nav => 
        nav.id === customNavId ? { ...nav, content: newContent } : nav
      )
    );
    
    // Also update the activeCustomContent if it's the currently active one
    if (activeCustomContent && activeCustomContent.id === customNavId) {
      setActiveCustomContent(prev => ({ ...prev, content: newContent }));
    }
  };

  const handleEditCustomContent = (customNavItem) => {
    // Find the StartupProfileHeader and trigger its edit modal
    // This will be handled by the StartupProfileHeader component
    // We can trigger a custom event or use a ref to communicate with it
    const event = new CustomEvent('editCustomNavigation', {
      detail: { customNavItem }
    });
    window.dispatchEvent(event);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Map option to contentId for ContentRenderer
    const navMap = {
      Posts: "posts",
      "Startup Ecosystem Overview": "startup-ecosystem",
      "Growth & Marketing Strategies": "growth-marketing",
      "Funding and Investment": "funding-investment",
      "Tools & Resources": "tools-resources",
      FAQs: "faqs",
      "Government Policies & Tax Benefits": "government-policies",
      "Steps to Launch": "launch-steps",
      "Startup Quiz": "startup-quiz",
      "How It Works": "how-it-works",
      Industries: "industries",
      "Jobs & Trending Skills": "jobs-skills",
    };
    setActiveContent(navMap[option] || "posts");
    setActiveContentName(option);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center my-8">
        Electrosoft Alumni Platform
      </h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        <a href="/startup-profile">Go to Startup Profile</a>
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-4">
        <a href="/industry-profile">Go to Industry Profile</a>
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded mb-4 ml-4">
        <a href="/college-profile">Go to College Profile</a>
      </button>
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
                placeholder="Search companies, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        {/* Profile Header Section with integrated navigation */}
        <div className="w-full mb-6">
          <StartupProfileHeader 
            onNavigationChange={handleNavigationChange}
            customNavigations={customNavigations}
            onCustomNavigationUpdate={setCustomNavigations}
          />
        </div>

        <div className="flex gap-6">
          {/* Main Content Area - 70% width */}
          <div className="w-full lg:w-[70%] flex flex-col">
            <div className="space-y-6 w-full">
              {/* Post Creator - Only show when on posts view */}
              {activeContent === "posts" && <PostCreator />}
              {/* Content Area */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {activeContent === "posts" ? (
                  <FeedArea />
                ) : (
                  <ContentRenderer
                    activeContent={activeContent}
                    activeContentName={activeContentName}
                    customNavItem={activeCustomContent}
                    onEditCustomContent={handleEditCustomContent}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Right Sidebar - News - 30% width */}
          <div className="hidden lg:block w-[30%]">
            <StartupQuizSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupProfilePage;
