import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(navigationOptions[0]);

  const handleNavigationChange = (contentId, contentName) => {
    setActiveContent(contentId);
    setActiveContentName(contentName);
    setSelectedOption(contentName);
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
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <div className="w-full mb-6">
          <StartupProfileHeader
            onNavigationChange={handleNavigationChange}
            navigationOptions={navigationOptions}
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
