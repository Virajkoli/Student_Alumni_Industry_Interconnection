import React from "react";
import { Edit3, TrendingUp, TrendingDown, Calendar, FileText, Link, Image, Video, File } from "lucide-react";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import CoursesSection from "./sections/CoursesSection";
import CertificationsSection from "./sections/CertificationsSection";
import RecommendationsSection from "./sections/RecommendationsSection";

// Dashboard Stats Component for Posts view
const DashboardStats = ({ data }) => {
  if (!data || !data.stats) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title || "Dashboard"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              {stat.trend && (
                <span className={`flex items-center text-xs font-medium ${
                  stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend.startsWith('+') ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Structured Content Component for custom content
const StructuredContent = ({ data }) => {
  if (!data || !data.sections) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title || "Structured Content"}</h2>
      <div className="space-y-6">
        {data.sections.map((section, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Text Content Component for simple text content
const TextContent = ({ data }) => {
  if (!data || !data.content) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title || "Content"}</h2>
      <div className="prose max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {data.content}
        </div>
      </div>
    </div>
  );
};

// Custom Navigation Content Renderer
const CustomNavigationContent = ({ customNavItem, onEditCustomContent }) => {
  if (!customNavItem) return null;

  const handleEdit = () => {
    if (onEditCustomContent) {
      onEditCustomContent(customNavItem);
    }
  };

  return (
    <div className="relative">
      {/* Edit Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleEdit}
          className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
          title="Edit this content"
        >
          <Edit3 className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content based on type */}
      {customNavItem.contentType === 'dashboard' && (
        <DashboardStats data={customNavItem.content} />
      )}
      {customNavItem.contentType === 'structured' && (
        <StructuredContent data={customNavItem.content} />
      )}
      {customNavItem.contentType === 'text' && (
        <TextContent data={customNavItem.content} />
      )}
    </div>
  );
};

const ContentRenderer = ({ 
  activeContent, 
  activeContentName, 
  customNavItem, 
  onEditCustomContent,
  profileData,
  onProfileUpdate,
  experiences,
  onExperienceUpdate,
  education,
  onEducationUpdate,
  skills,
  onSkillsUpdate,
  projects,
  onProjectsUpdate,
  courses,
  onCoursesUpdate,
  certifications,
  onCertificationsUpdate,
  recommendations,
  onRecommendationsUpdate
}) => {
  // If it's a custom navigation item, render its content
  if (customNavItem) {
    return (
      <CustomNavigationContent 
        customNavItem={customNavItem} 
        onEditCustomContent={onEditCustomContent} 
      />
    );
  }

  // Handle regular navigation content
  const renderContent = () => {
    switch (activeContent) {
      case "posts":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts & Activities</h2>
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No posts yet. Start sharing your achievements and thoughts!</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create First Post
              </button>
            </div>
          </div>
        );

      case "about":
        return (
          <AboutSection 
            profileData={profileData} 
            onProfileUpdate={onProfileUpdate} 
          />
        );

      case "experience":
        return (
          <ExperienceSection 
            experiences={experiences} 
            onExperienceUpdate={onExperienceUpdate} 
          />
        );

      case "education":
        return (
          <EducationSection 
            education={education} 
            onEducationUpdate={onEducationUpdate} 
          />
        );

      case "skills":
        return (
          <SkillsSection 
            skills={skills} 
            onSkillsUpdate={onSkillsUpdate} 
          />
        );

      case "projects":
        return (
          <ProjectsSection 
            projects={projects} 
            onProjectsUpdate={onProjectsUpdate} 
          />
        );

      case "courses":
        return (
          <CoursesSection 
            courses={courses} 
            onCoursesUpdate={onCoursesUpdate} 
          />
        );

      case "certifications":
        return (
          <CertificationsSection 
            certifications={certifications} 
            onCertificationsUpdate={onCertificationsUpdate} 
          />
        );

      case "recommendations":
        return (
          <RecommendationsSection 
            recommendations={recommendations} 
            onRecommendationsUpdate={onRecommendationsUpdate} 
          />
        );

      default:
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{activeContentName}</h2>
            <p className="text-gray-500">Content for {activeContentName} is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {renderContent()}
    </div>
  );
};

export default ContentRenderer;
