import React, { useState, useEffect } from "react";
import HorizontalProfileNavbar from "../../components/industry/IndustryProfileHeader";
import PostCreator from "../../components/industry/PostCreator";
import FeedArea from "../../components/industry/FeedArea";
import NewsSidebar from "../../components/industry/NewsSidebar";
import ContentRenderer from "../../components/industry/ContentRenderer";
import NavigationOptions from "../../components/industry/NavigationOptions";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../services/apiService"; // ✅ Make sure this path is correct

const IndustryProfilePage = () => {
  const [activeContent, setActiveContent] = useState("industry-overview");
  const [activeContentName, setActiveContentName] =
    useState("Industry Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Industry Overview");

  const [industryData, setIndustryData] = useState(null); // ✅ fetched profile data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { routeId } = useParams(); // /profile/industry/:id
  const { user } = useAuth();
  const isOwner =
    !routeId || (routeId && user?.id && parseInt(routeId) === user.id);

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
    "Add University Project",
  ];

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔍 routeId in IndustryProfilePage:", routeId);
        const data = await apiService.getIndustryProfile(routeId); // can pass undefined = /me
        setIndustryData(Response.data);
      } catch (err) {
        console.error("❌ Error loading profile:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [routeId]);



  const handleNavigationChange = (contentId, contentName) => {
    setActiveContent(contentId);
    setActiveContentName(contentName);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center my-8">
        Electrosoft Alumni Platform
      </h1>

      {/* Search Container */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-center">
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
        <HorizontalProfileNavbar
          onNavigationChange={handleNavigationChange}
          navigationOptions={navigationOptions}
          isIndustryProfile={true}
           industryData={industryData}
        />

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6">
              {/* Show PostCreator only if owner and activeContent === posts */}
              {activeContent === "posts" && isOwner && (
                <PostCreator isIndustry={true} />
              )}

              {/* Content Area */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {activeContent === "posts" ? (
                  <FeedArea />
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

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <NewsSidebar isIndustry={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryProfilePage;
