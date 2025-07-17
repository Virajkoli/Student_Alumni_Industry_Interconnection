import React from "react";
import IndustryOverview from "./sections/IndustryOverview";
import SectorCategory from "./sections/SectorCategory";
import JobCareerOpportunities from "./sections/JobCareerOpportunities";
import Technology from "./sections/Technology";
import ChallengesSolutions from "./sections/ChallengesSolutions";
import SuccessStories from "./sections/SuccessStories";
import PostNewsJobs from "./sections/PostNewsJobs";
import ExpertOpinionsInterview from "./sections/ExpertOpinionsInterview";
import PollCommentSection from "./sections/PollCommentSection";
import InternshipTrainingRequests from "./sections/InternshipTrainingRequests";
import LiveProjects from "./sections/LiveProjects";
import StudentLogin from "./sections/StudentLogin";
import ProjectSuccessStories from "./sections/ProjectSuccessStories";
import UploadProject from "./sections/UploadProject";
import AddUniversityProject from "./sections/AddUniversityProject";

const ContentRenderer = ({ activeContent, activeContentName, isOwner }) => {
  const renderContent = () => {
    switch (activeContent) {
      case "industry-overview":
        return <IndustryOverview />;
      case "sector-category":
        return <SectorCategory />;
      case "job-career-opportunities":
        return <JobCareerOpportunities />;
      case "technology":
        return <Technology />;
      case "challenges-solutions":
        return <ChallengesSolutions />;
      case "success-stories":
        return <SuccessStories />;
      case "post-news-jobs":
        return isOwner ? <PostNewsJobs /> : <p>You do not have permission to post news or jobs.</p>;
      case "expert-opinions-interview":
        return <ExpertOpinionsInterview />;
      case "poll-comment-section":
        return <PollCommentSection />;
      case "internship-training-requests":
        return <InternshipTrainingRequests />;
      case "live-projects":
        return <LiveProjects />;
      case "student-login":
        return <StudentLogin />;
      case "project-success-stories":
        return <ProjectSuccessStories />;
      case "upload-project":
        return isOwner ? <UploadProject /> : <p>You do not have permission to upload projects.</p>;
      case "add-university-project":
        return isOwner ? <AddUniversityProject /> : <p>You do not have permission to add university projects.</p>;
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
