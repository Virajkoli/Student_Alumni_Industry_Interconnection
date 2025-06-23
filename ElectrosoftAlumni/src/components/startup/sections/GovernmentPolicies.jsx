import React, { useState } from "react";
import { Edit, Save, X, Building, FileText, TrendingUp } from "lucide-react";

const GovernmentPolicies = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    title: "Government Policies & Tax Benefits",
    description:
      "Explore government initiatives, policies, and tax benefits designed to support startups and entrepreneurs.",
    policies: [
      {
        title: "Startup India Initiative",
        description:
          "Government program to build a strong startup ecosystem with funding support, tax benefits, and simplified compliance.",
        benefits: [
          "3-year tax holiday",
          "Fast-track patent filing",
          "Self-certification compliance",
          "Fund of funds support",
        ],
        eligibility:
          "Incorporated as private limited company, not older than 10 years, annual turnover not exceeding ₹100 crore",
      },
      {
        title: "Angel Tax Exemption",
        description:
          "Exemption from angel tax for startups receiving funding from angel investors or venture capital funds.",
        benefits: [
          "No tax on angel investment",
          "SEBI registered funds exempt",
          "Simplified valuation process",
        ],
        eligibility:
          "DPIIT recognized startup, investment from eligible investors, proper documentation",
      },
      {
        title: "Digital India Land Records",
        description:
          "Digitization of land records and property registration to enable faster business setup.",
        benefits: [
          "Online property verification",
          "Reduced compliance burden",
          "Faster approvals",
        ],
        eligibility: "All businesses requiring land/property documentation",
      },
    ],
    taxBenefits: [
      {
        benefit: "Tax Holiday",
        description: "3 years of income tax exemption",
        value: "100%",
      },
      {
        benefit: "Patent Filing",
        description: "80% reduction in patent filing fees",
        value: "80%",
      },
      {
        benefit: "Capital Gains",
        description: "Exemption on capital gains investment",
        value: "100%",
      },
      {
        benefit: "Carry Forward",
        description: "Loss carry forward for 8 years",
        value: "8 years",
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving government policies content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
          <p className="text-gray-600 mt-2">{content.description}</p>
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Tax Benefits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {content.taxBenefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-100"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {benefit.value}
              </p>
              <p className="text-sm font-medium text-gray-800">
                {benefit.benefit}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Government Policies */}
      <div className="space-y-6">
        {content.policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {policy.title}
                </h3>
                <p className="text-gray-600 mb-4">{policy.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-1">
                      {policy.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">
                      Eligibility:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {policy.eligibility}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Process */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Application Process
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              1
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Register</h4>
            <p className="text-sm text-gray-600">
              Create account on startup portal
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              2
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Document</h4>
            <p className="text-sm text-gray-600">Upload required documents</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              3
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Review</h4>
            <p className="text-sm text-gray-600">Application review process</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              4
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Approval</h4>
            <p className="text-sm text-gray-600">Receive certification</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!isEditing && (
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Ready to Apply?</h3>
          <p className="mb-4">
            Start your application for government benefits and tax exemptions
            today.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Application
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
              Download Guidelines
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentPolicies;
