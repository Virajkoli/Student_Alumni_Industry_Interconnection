import React, { useState, useEffect } from "react";
import StudentProfileHeader from "../../components/student/StudentProfileHeader";
import PostCreator from "../../components/student/PostCreator";
import FeedArea from "../../components/student/FeedArea";
import StudentSidebar from "../../components/student/StudentSidebar";
import ContentRenderer from "../../components/student/ContentRenderer";
import apiService from "../../utils/apiService";

const StudentProfilePage = () => {
  // Navigation state
  const [activeContent, setActiveContent] = useState("posts");
  const [activeContentName, setActiveContentName] = useState("Posts");
  const [activeCustomContent, setActiveCustomContent] = useState(null);
  const [customNavigations, setCustomNavigations] = useState([]);

  // State for search bar
  const [searchQuery, setSearchQuery] = useState("");

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for profile data - Initialize with empty structure
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    student_college_name: "",
    interested_field: "",
    other_field: "",
  });

  // State for profile sections
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [studentId, setStudentId] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching student profile data...");

      // Check if user is authenticated
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Please log in to view your profile");
        return;
      }

      console.log("Token found, making API call...");
      const response = await apiService.getStudentProfile();
      console.log("API Response:", response);

      if (response.success) {
        const { data } = response;

        // Set student ID
        setStudentId(data.basicInfo.id);

        // Map backend data to frontend structure
        setProfileData({
          firstName: data.basicInfo.first_name || "",
          lastName: data.basicInfo.last_name || "",
          student_college_name: data.basicInfo.student_college_name || "",
          interested_field: data.basicInfo.interested_field || "",
          other_field: data.basicInfo.other_field || "",
        });

        // Set other sections
        setExperiences(data.experience || []);
        setEducation(data.education || []);
        setSkills(data.skills || []);
        setProjects(data.projects || []);
        setCourses(data.courses || []);
        setCertifications(data.certifications || []);
        setRecommendations(data.recommendations || []);

        console.log("Profile data loaded successfully");
      } else {
        console.error("API returned error:", response.message);
        setError(response.message || "Failed to load profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError(
        error.message || "Failed to load profile data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedProfileData) => {
    try {
      console.log("Updating profile data:", updatedProfileData);

      // Map frontend data back to backend structure
      const basicInfoData = {
        first_name: updatedProfileData.firstName,
        last_name: updatedProfileData.lastName,
        contact_no: updatedProfileData.contact_no,
        college_name:
          updatedProfileData.college_name || updatedProfileData.school,
        interested_field:
          updatedProfileData.interested_field || updatedProfileData.headline,
        other_field: updatedProfileData.other_field,
      };

      // Update basic info
      await apiService.updateStudentBasicInfo(basicInfoData);

      // Update about section if it exists
      if (updatedProfileData.about) {
        await apiService.updateStudentAbout({
          summary: updatedProfileData.about,
        });
      }

      // Update local state
      setProfileData(updatedProfileData);

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  // Navigation handlers
  const handleNavigationChange = (
    contentId,
    contentName,
    customNavItem = null
  ) => {
    setActiveContent(contentId);
    setActiveContentName(contentName);
    setActiveCustomContent(customNavItem);
  };

  const handleCustomContentUpdate = (customNavId, newContent) => {
    // Update the custom navigation content in our local state
    setCustomNavigations((prev) =>
      prev.map((nav) =>
        nav.id === customNavId ? { ...nav, content: newContent } : nav
      )
    );

    // Also update the activeCustomContent if it's the currently active one
    if (activeCustomContent && activeCustomContent.id === customNavId) {
      setActiveCustomContent((prev) => ({ ...prev, content: newContent }));
    }
  };

  const handleEditCustomContent = (customNavItem) => {
    // Find the StudentProfileHeader and trigger its edit modal
    // This will be handled by the StudentProfileHeader component
    const event = new CustomEvent("editCustomNavigation", {
      detail: { customNavItem },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right font-bold text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="animate-pulse">
              <div className="h-44 bg-gray-300 rounded-t-xl mb-4"></div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-28 h-28 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Search Container */}
          {/* <div className="bg-white shadow-sm border-b border-gray-200">
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
                    placeholder="Search opportunities, courses, projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
            {/* Profile Header Section with integrated navigation */}
            <div className="w-full mb-6">
              <StudentProfileHeader
                profileData={profileData}
                onProfileUpdate={handleProfileUpdate}
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
                  {activeContent === "posts" ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                      <FeedArea />
                    </div>
                  ) : (
                    <ContentRenderer
                      activeContent={activeContent}
                      activeContentName={activeContentName}
                      customNavItem={activeCustomContent}
                      onEditCustomContent={handleEditCustomContent}
                      profileData={profileData}
                      onProfileUpdate={handleProfileUpdate}
                      experiences={experiences}
                      onExperienceUpdate={setExperiences}
                      education={education}
                      onEducationUpdate={setEducation}
                      skills={skills}
                      onSkillsUpdate={setSkills}
                      projects={projects}
                      onProjectsUpdate={setProjects}
                      courses={courses}
                      onCoursesUpdate={setCourses}
                      certifications={certifications}
                      onCertificationsUpdate={setCertifications}
                      recommendations={recommendations}
                      onRecommendationsUpdate={setRecommendations}
                      studentId={studentId}
                    />
                  )}
                </div>
              </div>

              {/* Right Sidebar - 30% width */}
              <div className="hidden lg:block w-[30%]">
                <StudentSidebar />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentProfilePage;
