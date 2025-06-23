import React, { useState } from "react";
import Navbar from "../../components/Startup/Navbar";
import ProfileSidebar from "../../components/Startup/ProfileSidebar";
import PostCreator from "../../components/startup/PostCreator";
import FeedArea from "../../components/startup/FeedArea";
import NewsSidebar from "../../components/startup/NewsSidebar";
import ContentRenderer from "../../components/startup/ContentRenderer";

const ProfilePage = () => {
  const [activeContent, setActiveContent] = useState("posts");
  const [activeContentName, setActiveContentName] = useState("Posts");

  const handleNavigationChange = (contentId, contentName) => {
    setActiveContent(contentId);
    setActiveContentName(contentName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="col-span-12 lg:col-span-3">
            <ProfileSidebar onNavigationChange={handleNavigationChange} />
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-6">
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

          {/* Right Sidebar - News */}
          <div className="col-span-12 lg:col-span-3">
            <NewsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
