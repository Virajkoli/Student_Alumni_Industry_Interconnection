import React, { useState } from "react";
import StudentProfileHeader from "../../components/student/StudentProfileHeader";
import PostCreator from "../../components/student/PostCreator";
import FeedArea from "../../components/student/FeedArea";
import StudentSidebar from "../../components/student/StudentSidebar";
import ContentRenderer from "../../components/student/ContentRenderer";

const StudentProfilePage = () => {
  // Navigation state
  const [activeContent, setActiveContent] = useState("posts");
  const [activeContentName, setActiveContentName] = useState("Posts");
  const [activeCustomContent, setActiveCustomContent] = useState(null);
  const [customNavigations, setCustomNavigations] = useState([]);

  // State for search bar
  const [searchQuery, setSearchQuery] = useState("");

  // State for profile data
  const [profileData, setProfileData] = useState({
    firstName: "Priya",
    lastName: "P",
    additionalName: "",
    pronouns: "",
    headline: "Computer Engineering Student",
    industry: "IT Services and IT Consulting",
    school: "Government Polytechnic",
    showSchool: true,
    country: "India",
    city: "Jalgaon, Maharashtra",
    about:
      "Passionate computer engineering student with a strong foundation in web development and software engineering. Eager to apply theoretical knowledge in real-world projects and contribute to innovative solutions.",
  });

  // State for experiences
  const [experiences, setExperiences] = useState([]);

  // State for education
  const [education, setEducation] = useState([
    {
      id: 1,
      school: "Government Polytechnic",
      degree: "Diploma",
      field: "Computer Engineering",
      startYear: "2022",
      endYear: "2025",
      grade: "8.5 CGPA",
      activities: "Programming Club, Technical Events",
      description:
        "Focused on software development, data structures, and web technologies.",
    },
  ]);

  // State for skills
  const [skills, setSkills] = useState([
    "Web Development",
    "JavaScript",
    "React",
    "HTML/CSS",
  ]);

  // State for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      description:
        "Developed a full-stack e-commerce platform with React and Node.js",
      date: "May 2024",
      url: "https://github.com/username/ecommerce",
    },
  ]);

  // State for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Advanced React",
      institution: "Udemy",
      completionDate: "April 2024",
    },
  ]);

  // State for certifications
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "March 2024",
      credentialId: "AWS123456",
    },
  ]);

  // State for recommendations
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      text: "Priya is an excellent developer with strong problem-solving skills.",
      name: "Rajesh Kumar",
      position: "Senior Developer at Tech Solutions",
      relation: "Worked together on multiple projects",
      date: "June 2024",
    },
  ]);

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
                placeholder="Search opportunities, courses, projects..."
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
          <StudentProfileHeader
            profileData={profileData}
            onProfileUpdate={setProfileData}
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
                  onProfileUpdate={setProfileData}
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
    </div>
  );
};

export default StudentProfilePage;
