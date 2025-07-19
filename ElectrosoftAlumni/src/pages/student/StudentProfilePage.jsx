import React, { useState, useEffect } from "react";
import StudentProfileHeader from "../../components/student/StudentProfileHeader";
import PostCreator from "../../components/student/PostCreator";
import FeedArea from "../../components/student/FeedArea";
import StudentSidebar from "../../components/student/StudentSidebar";
import ContentRenderer from "../../components/student/ContentRenderer";
import apiService, { studentAPI } from "../../services/apiService";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
const StudentProfilePage = () => {
  // Navigation state
  const [activeContent, setActiveContent] = useState("posts");
  const [activeContentName, setActiveContentName] = useState("Posts");
  const [activeCustomContent, setActiveCustomContent] = useState(null);
  const [customNavigations, setCustomNavigations] = useState([]);
  const { id: routeId } = useParams();

  const { user } = useAuth();
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for profile data - Initialize with empty structure
  const [profileData, setProfileData] = useState({
    id: null, // Added id field
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

  // State for refreshing posts
  const [postRefreshTrigger, setPostRefreshTrigger] = useState(0);

  // Function to refresh posts when a new post is created
  const handlePostCreated = (newPost) => {
    setPostRefreshTrigger((prev) => prev + 1);
  };

  // Check if current user is the owner of this profile
  const isOwner =
    !routeId || (routeId && user?.id && parseInt(routeId) === user.id);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, [routeId]); // Add routeId as dependency

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!apiService.isAuthenticated()) {
        setError("Please log in to view this profile");
        return;
      }


      let response;
      if (routeId) {
        // Fetch specific student profile by ID (now includes sections data)
        response = await apiService.getStudentProfile(routeId);
        console.log("📊 Fetched other user's profile:", response);
        
        if (response.success && response.data) {
          const data = response.data;
          setStudentId(data.id);

        // Map backend data to frontend structure - handle both old and new field names
        const mappedData = {
          ...data, // Include the full data structure
          id: data.id, // Include student ID at root level
          firstName: data.firstName || data.first_name || "",
          lastName: data.lastName || data.last_name || "",
          additionalName: data.additionalName || data.additional_name || "",
          pronouns: data.pronouns || "",
          headline: data.headline || "",
          industry: data.industry || "",
          school: data.school || "",
          showSchool: data.showSchool !== false || data.show_school !== false,
          country: data.country || "",
          city: data.city || "",
          student_college_name: data.collegeName || data.college_name || "",
          interested_field: data.interestedField || data.interested_field || "",
          other_field: data.otherField || data.other_field || "",
          about: data.about || "",
        };

          setProfileData(mappedData);
          
          // Set their sections data (now available from the API)
          setExperiences(data.experiences || []);
          setEducation(data.education || []);
          setSkills(data.skills || []);
          setProjects(data.projects || []);
          setCourses(data.courses || []);
          setCertifications(data.certifications || []);
          setRecommendations(data.recommendations || []);
        }
      } else {
        // Fetch current user's basic profile AND complete sections data
        console.log("📊 Fetching own complete profile...");
        
        // First get the basic profile data
        const basicResponse = await apiService.getProfile();
        console.log("📊 Basic profile data:", basicResponse);
        
        // Then get the complete sections data
        const sectionsResponse = await apiService.getStudentProfileComplete();
        console.log("📊 Sections data:", sectionsResponse);
        
        if (basicResponse.success && basicResponse.data) {
          const basicData = basicResponse.data;
          const sectionsData = sectionsResponse.success ? sectionsResponse.data : {};
          
          setStudentId(basicData.id);

          // Combine basic data with sections data
          const mappedData = {
            ...basicData,
            ...sectionsData, // Include sections data
            id: basicData.id,
            firstName: basicData.firstName || basicData.first_name || "",
            lastName: basicData.lastName || basicData.last_name || "",
            additionalName: basicData.additionalName || basicData.additional_name || "",
            pronouns: basicData.pronouns || "",
            headline: basicData.headline || "",
            industry: basicData.industry || "",
            school: basicData.school || "",
            showSchool: basicData.showSchool !== false || basicData.show_school !== false,
            country: basicData.country || "",
            city: basicData.city || "",
            student_college_name: basicData.collegeName || basicData.college_name || "",
            interested_field: basicData.interestedField || basicData.interested_field || "",
            other_field: basicData.otherField || basicData.other_field || "",
            about: sectionsData.about || basicData.about || "",
          };

          setProfileData(mappedData);

          // Update profile sections with data from complete profile API
          if (sectionsData.experiences) {
            setExperiences(sectionsData.experiences);
          }
          if (sectionsData.education) {
            setEducation(sectionsData.education);
          }
          if (sectionsData.skills) {
            setSkills(sectionsData.skills);
          }
          if (sectionsData.projects) {
            setProjects(sectionsData.projects);
          }
          if (sectionsData.courses) {
            setCourses(sectionsData.courses);
          }
          if (sectionsData.certifications) {
            setCertifications(sectionsData.certifications);
          }
          if (sectionsData.recommendations) {
            setRecommendations(sectionsData.recommendations);
          }
        }
        
        // Set response for the success check below
        response = basicResponse;
      }

      console.log("📊 Profile data loaded:", response);

      if (response.success) {
        console.log("✅ Profile data loaded successfully");
      } else {
        console.error("❌ API returned error:", response.message);
        setError(response.message || "Failed to load profile data");
      }
    } catch (error) {
      console.error("❌ Error fetching profile data:", error);

      // Try fallback to basic profile API
      try {
        const fallbackResponse = await studentAPI.getProfile();

        if (fallbackResponse.success) {
          const { data } = fallbackResponse;
          setStudentId(data.id);
          setProfileData({
            ...data,
            id: data.id,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            student_college_name: data.collegeName || "",
            interested_field: data.interestedField || "",
            other_field: data.otherField || "",
            about: data.about || "",
          });

          // Initialize empty arrays for sections
          setExperiences([]);
          setEducation([]);
          setSkills([]);
          setProjects([]);
          setCourses([]);
          setCertifications([]);
          setRecommendations([]);
        } else {
          throw new Error(
            fallbackResponse.message || "Fallback API also failed"
          );
        }
      } catch (fallbackError) {
        console.error("❌ Fallback also failed:", fallbackError);
        setError(
          error.message || "Failed to load profile data. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedProfileData) => {
    try {

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
      await apiService.updateStudentProfile(basicInfoData);

      // Update about section specifically if it exists
      if (updatedProfileData.about !== undefined) {
        const aboutResponse = await apiService.updateStudentAbout({
          about: updatedProfileData.about,
        });
      }

      // Update local state
      setProfileData(updatedProfileData);

      console.log("✅ Profile updated successfully");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    }
  };

  // Handler for education section updates
  const handleEducationUpdate = (updatedEducation) => {
    setProfileData((prevData) => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  // Handler for experience section updates
  const handleExperienceUpdate = (updatedExperience) => {
    setExperiences(updatedExperience);
  };

  // Handler for skills section updates
  const handleSkillsUpdate = (updatedSkills) => {
    setSkills(updatedSkills);
  };

  // Handler for certification section updates
  const handleCertificationUpdate = (updatedCertifications) => {
    setCertifications(updatedCertifications);
  };

  // Handler for project section updates
  const handleProjectUpdate = (updatedProjects) => {
    setProjects(updatedProjects);
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
                onProfileUpdate={isOwner ? handleProfileUpdate : null}
                onNavigationChange={handleNavigationChange}
                customNavigations={customNavigations}
                onCustomNavigationUpdate={isOwner ? setCustomNavigations : null}
                isOwner={isOwner}
              />
            </div>

            <div className="flex gap-6">
              {/* Main Content Area - 70% width */}
              <div className="w-full lg:w-[70%] flex flex-col">
                <div className="space-y-6 w-full">
                  {/* Post Creator - Only show when on posts view */}
                  {activeContent === "posts" && isOwner && (
                    <PostCreator onPostCreated={handlePostCreated} />
                  )}

                  {/* Content Area */}
                  {activeContent === "posts" ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                      <FeedArea
                        isOwner={isOwner}
                        userId={
                          !isOwner && profileData?.id ? profileData.id : null
                        }
                        userRole={
                          !isOwner && profileData?.id ? "student" : null
                        }
                        refreshTrigger={postRefreshTrigger}
                      />
                    </div>
                  ) : (
                    <ContentRenderer
                      activeContent={activeContent}
                      activeContentName={activeContentName}
                      customNavItem={activeCustomContent}
                      onEditCustomContent={
                        isOwner ? handleEditCustomContent : null
                      }
                      profileData={profileData}
                      onProfileUpdate={isOwner ? handleProfileUpdate : null}
                      experiences={experiences}
                      onExperienceUpdate={handleExperienceUpdate}
                      education={education}
                      onEducationUpdate={handleEducationUpdate}
                      skills={skills}
                      onSkillsUpdate={handleSkillsUpdate}
                      projects={projects}
                      onProjectsUpdate={handleProjectUpdate}
                      courses={courses}
                      onCoursesUpdate={isOwner ? setCourses : null}
                      certifications={certifications}
                      onCertificationsUpdate={handleCertificationUpdate}
                      recommendations={recommendations}
                      onRecommendationsUpdate={
                        isOwner ? setRecommendations : null
                      }
                      isOwner={isOwner}
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
