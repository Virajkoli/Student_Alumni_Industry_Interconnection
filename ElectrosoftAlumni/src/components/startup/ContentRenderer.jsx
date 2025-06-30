import React from "react";
import { Edit3, TrendingUp, TrendingDown, Calendar, FileText, Link, Image, Video, File } from "lucide-react";
import StartupEcosystemOverview from "./sections/StartupEcosystemOverview";
import GrowthMarketing from "./sections/Activity";
import FundingInvestment from "./sections/Experience";
import ToolsResources from "./sections/Resources";
import FAQs from "./sections/FAQs";
import GovernmentPolicies from "./sections/GovernmentPolicies";
import LaunchSteps from "./sections/LaunchSteps";
import HowItWorks from "./sections/HowItWorks";
import Industries from "./sections/Industries";
import JobsSkills from "./sections/JobsSkills";

// Dashboard Stats Component
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

// Structured Content Component
const StructuredContent = ({ data }) => {
  if (!data || !data.sections) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title || "Structured Content"}</h2>
      <div className="space-y-6">
        {data.sections.map((section, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Form Content Component
const FormContent = ({ data }) => {
  if (!data || !data.fields) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title || "Form"}</h2>
      <form className="space-y-4 max-w-2xl">
        {data.fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                rows={3}
              />
            ) : field.type === "select" ? (
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="">{field.placeholder || "Select an option"}</option>
                {field.options && field.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// Gallery Content Component
const GalleryContent = ({ data }) => {
  if (!data || !data.items) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title || "Gallery"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Timeline Content Component
const TimelineContent = ({ data }) => {
  if (!data || !data.events) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title || "Timeline"}</h2>
      <div className="space-y-6">
        {data.events.map((event, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              {index < data.events.length - 1 && <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>}
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">{event.date}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Content Component for user-created navigation
const CustomContent = ({ contentType, content, title, onEdit = null }) => {
  // Parse JSON content if it's a string
  let parsedContent = content;
  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      // If parsing fails, treat as plain text
      parsedContent = content;
    }
  }

  const ContentWrapper = ({ children, showEditButton = false }) => (
    <div className="relative">
      {showEditButton && onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors z-10"
          title="Edit Content"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      )}
      {children}
    </div>
  );

  switch (contentType) {
    case "dashboard":
      return (
        <ContentWrapper showEditButton={true}>
          <DashboardStats data={parsedContent} />
        </ContentWrapper>
      );
    case "structured":
      return (
        <ContentWrapper showEditButton={true}>
          <StructuredContent data={parsedContent} />
        </ContentWrapper>
      );
    case "form":
      return (
        <ContentWrapper showEditButton={true}>
          <FormContent data={parsedContent} />
        </ContentWrapper>
      );
    case "gallery":
      return (
        <ContentWrapper showEditButton={true}>
          <GalleryContent data={parsedContent} />
        </ContentWrapper>
      );
    case "timeline":
      return (
        <ContentWrapper showEditButton={true}>
          <TimelineContent data={parsedContent} />
        </ContentWrapper>
      );
    case "text":
      return (
        <ContentWrapper showEditButton={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {parsedContent}
            </div>
          </div>
        </ContentWrapper>
      );
    case "html":
      return (
        <ContentWrapper showEditButton={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: parsedContent }} 
            />
          </div>
        </ContentWrapper>
      );
    case "link":
      return (
        <ContentWrapper showEditButton={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="flex items-center space-x-3">
              <Link className="w-6 h-6 text-blue-600" />
              <a
                href={parsedContent}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg"
              >
                {parsedContent}
              </a>
            </div>
          </div>
        </ContentWrapper>
      );
    case "image":
      return (
        <ContentWrapper showEditButton={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="flex justify-center">
              <img
                src={parsedContent}
                alt={title}
                className="max-w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </ContentWrapper>
      );
    case "video":
      return (
        <ContentWrapper showEditButton={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="flex items-center space-x-3">
              <Video className="w-6 h-6 text-green-600" />
              <a
                href={parsedContent}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-lg"
              >
                {parsedContent}
              </a>
            </div>
          </div>
        </ContentWrapper>
      );
    case "document":
      return (
        <ContentWrapper showEditButton={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="flex items-center space-x-3">
              <File className="w-6 h-6 text-gray-600" />
              <a
                href={parsedContent}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg"
              >
                {parsedContent}
              </a>
            </div>
          </div>
        </ContentWrapper>
      );
    default:
      return (
        <ContentWrapper showEditButton={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="text-gray-700">
              {typeof parsedContent === 'object' ? JSON.stringify(parsedContent, null, 2) : parsedContent}
            </div>
          </div>
        </ContentWrapper>
      );
  }
};

const ContentRenderer = ({ activeContent, activeContentName, customNavItem = null, onEditCustomContent = null }) => {
  const renderContent = () => {
    // If we have a custom navigation item, render it with the CustomContent component
    if (customNavItem) {
      return (
        <CustomContent 
          contentType={customNavItem.contentType}
          content={customNavItem.content}
          title={customNavItem.name}
          onEdit={onEditCustomContent ? () => onEditCustomContent(customNavItem) : null}
        />
      );
    }

    // Default content rendering for built-in navigation items
    switch (activeContent) {
      case "startup-ecosystem":
        return <StartupEcosystemOverview />;
      case "growth-marketing":
        return <GrowthMarketing />;
      case "funding-investment":
        return <FundingInvestment />;
      case "tools-resources":
        return <ToolsResources />;
      case "faqs":
        return <FAQs />;
      case "government-policies":
        return <GovernmentPolicies />;
      case "launch-steps":
        return <LaunchSteps />;
      case "how-it-works":
        return <HowItWorks />;
      case "industries":
        return <Industries />;
      case "jobs-skills":
        return <JobsSkills />;
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {activeContentName}
            </h2>
            <p className="text-gray-600">
              Content for {activeContentName} is coming soon!
            </p>
          </div>
        );
    }
  };

  return <div className="min-h-[400px]">{renderContent()}</div>;
};

export default ContentRenderer;
