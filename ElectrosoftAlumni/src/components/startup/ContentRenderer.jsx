import React from "react";
import StartupEcosystemOverview from "./sections/StartupEcosystemOverview";
import GrowthMarketing from "./sections/GrowthMarketing";
import FundingInvestment from "./sections/FundingInvestment";
import ToolsResources from "./sections/ToolsResources";
import FAQs from "./sections/FAQs";
import GovernmentPolicies from "./sections/GovernmentPolicies";
import LaunchSteps from "./sections/LaunchSteps";
import HowItWorks from "./sections/HowItWorks";
import Industries from "./sections/Industries";
import JobsSkills from "./sections/JobsSkills";

const ContentRenderer = ({ activeContent, activeContentName }) => {
  const renderContent = () => {
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
