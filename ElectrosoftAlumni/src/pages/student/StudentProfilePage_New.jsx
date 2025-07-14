import React, { useState, useEffect } from "react";
import StudentProfileHeader from "../../components/student/StudentProfileHeader";
import AboutSection from "../../components/student/sections/AboutSection";
import ExperienceSection from "../../components/student/sections/ExperienceSection";
import EducationSection from "../../components/student/sections/EducationSection";
import SkillsSection from "../../components/student/sections/SkillsSection";
import ProjectsSection from "../../components/student/sections/ProjectsSection";
import CoursesSection from "../../components/student/sections/CoursesSection";
import CertificationsSection from "../../components/student/sections/CertificationsSection";
import RecommendationsSection from "../../components/student/sections/RecommendationsSection";
import apiService from "../../services/apiService";

const StudentProfilePage = () => {
  // State for search bar
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for profile data - initialize with empty values
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    additionalName: "",
    pronouns: "",
    headline: "",
    industry: "",
    school: "",
    showSchool: true,
    country: "",
    city: "",
    about: "",
  });

  // State for other sections
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getStudentProfile();
        console.log("📊 Profile data loaded:", response);

        if (response.success && response.data) {
          const data = response.data;

          // Update profile data
          setProfileData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            additionalName: data.additional_name || "",
            pronouns: data.pronouns || "",
            headline: data.headline || "",
            industry: data.industry || "",
            school: data.school || "",
            showSchool: data.show_school !== false,
            country: data.country || "",
            city: data.city || "",
            about: data.about || "",
          });

          // Update other sections if data exists
          if (data.experiences) setExperiences(data.experiences);
          if (data.education) setEducation(data.education);
          if (data.skills) setSkills(data.skills);
          if (data.projects) setProjects(data.projects);
          if (data.courses) setCourses(data.courses);
          if (data.certifications) setCertifications(data.certifications);
          if (data.recommendations) setRecommendations(data.recommendations);
        }
      } catch (err) {
        console.error("❌ Error loading profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle profile updates
  const handleProfileUpdate = async (updatedData) => {
    try {
      console.log("💾 Updating profile data:", updatedData);

      // Update the about section specifically
      if (updatedData.about !== undefined) {
        const response = await apiService.updateStudentAbout({
          about: updatedData.about,
        });
        console.log("✅ About section updated:", response);
      }

      // Update local state
      setProfileData(updatedData);
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading profile: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <h1 className="text-3xl font-bold text-center my-8">
          Electrosoft Alumni Platform
        </h1>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <a href="/startup-profile" className="text-white no-underline">
              Go to Startup Profile
            </a>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            <a href="/industry-profile" className="text-white no-underline">
              Go to Industry Profile
            </a>
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            <a href="/college-profile" className="text-white no-underline">
              Go to College Profile
            </a>
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
            <a href="/student-profile" className="text-white no-underline">
              Go to Student Profile
            </a>
          </button>
        </div>

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

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <StudentProfileHeader
            profileData={profileData}
            onProfileUpdate={setProfileData}
          />

          {/* About Section */}
          <AboutSection
            profileData={profileData}
            onProfileUpdate={handleProfileUpdate}
          />

          {/* Experience Section */}
          <ExperienceSection
            experiences={experiences}
            onExperienceUpdate={setExperiences}
          />

          {/* Education Section */}
          <EducationSection
            education={education}
            onEducationUpdate={setEducation}
          />

          {/* Skills Section */}
          <SkillsSection skills={skills} onSkillsUpdate={setSkills} />

          {/* Projects Section */}
          <ProjectsSection projects={projects} onProjectsUpdate={setProjects} />

          {/* Courses Section */}
          <CoursesSection courses={courses} onCoursesUpdate={setCourses} />

          {/* Certifications Section */}
          <CertificationsSection
            certifications={certifications}
            onCertificationsUpdate={setCertifications}
          />

          {/* Recommendations Section */}
          <RecommendationsSection
            recommendations={recommendations}
            onRecommendationsUpdate={setRecommendations}
          />
        </div>
      </div>
    </>
  );
};

export default StudentProfilePage;
