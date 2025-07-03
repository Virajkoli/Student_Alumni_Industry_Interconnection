import React, { useState } from "react";
import StudentProfileHeader from "../../components/student/StudentProfileHeader";
import AboutSection from "../../components/student/sections/AboutSection";
import ExperienceSection from "../../components/student/sections/ExperienceSection";
import EducationSection from "../../components/student/sections/EducationSection";
import SkillsSection from "../../components/student/sections/SkillsSection";
import ProjectsSection from "../../components/student/sections/ProjectsSection";
import CoursesSection from "../../components/student/sections/CoursesSection";
import CertificationsSection from "../../components/student/sections/CertificationsSection";
import RecommendationsSection from "../../components/student/sections/RecommendationsSection";

const StudentProfilePage = () => {
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
            onProfileUpdate={setProfileData}
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
