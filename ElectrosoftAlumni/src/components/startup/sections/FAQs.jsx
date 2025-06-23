import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const FAQs = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [content, setContent] = useState({
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about starting and growing your startup.",
    faqs: [
      {
        question: "How do I validate my startup idea?",
        answer:
          "Start by talking to potential customers, conducting surveys, building an MVP, and testing your assumptions with real market data. Look for product-market fit indicators like customer retention and willingness to pay.",
      },
      {
        question: "When should I start looking for funding?",
        answer:
          "Consider seeking funding when you have a validated product, proven traction, and a clear plan for how the investment will accelerate growth. Most successful startups raise funding after demonstrating initial market demand.",
      },
      {
        question: "How do I find the right co-founder?",
        answer:
          "Look for someone who complements your skills, shares your vision, and has relevant experience. Consider networking events, startup communities, and professional connections. Ensure alignment on equity, roles, and long-term goals.",
      },
      {
        question: "What legal structure should I choose?",
        answer:
          "Most startups benefit from incorporating as a C-Corp or LLC, depending on growth plans and funding needs. C-Corps are preferred for venture funding, while LLCs offer more flexibility. Consult with a lawyer for your specific situation.",
      },
      {
        question: "How much equity should I give to employees?",
        answer:
          "Typically, startups allocate 10-20% of equity for employee stock options. Early employees might receive 0.5-2%, while key hires could get more. Create a vesting schedule (usually 4 years) to retain talent.",
      },
      {
        question: "When should I quit my day job?",
        answer:
          "Consider leaving when your startup generates enough income to support you, or when you've secured sufficient funding. Having 6-12 months of expenses saved is recommended. Some entrepreneurs succeed by working part-time initially.",
      },
      {
        question: "How do I protect my intellectual property?",
        answer:
          "File for patents if applicable, trademark your brand, and use non-disclosure agreements. Consider trade secrets for proprietary processes. Copyright protects creative works automatically, but registration provides additional benefits.",
      },
      {
        question: "What's the best way to find customers?",
        answer:
          "Start with your network, use social media, attend industry events, and leverage content marketing. Focus on understanding your ideal customer profile and where they spend time online and offline.",
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving FAQ content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const toggleExpanded = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const updateFAQ = (index, field, value) => {
    const newFAQs = [...content.faqs];
    newFAQs[index] = { ...newFAQs[index], [field]: value };
    setContent({ ...content, faqs: newFAQs });
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

      {/* FAQ Items */}
      <div className="space-y-4 mb-8">
        {content.faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => !isEditing && toggleExpanded(index)}
            >
              <div className="flex items-center space-x-3 flex-1">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      updateFAQ(index, "question", e.target.value)
                    }
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <h3 className="text-lg font-medium text-gray-900 flex-1">
                    {faq.question}
                  </h3>
                )}
              </div>
              {!isEditing && (
                <div className="ml-4">
                  {expandedItem === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              )}
            </div>

            {(expandedItem === index || isEditing) && (
              <div className="px-4 pb-4 border-t border-gray-100">
                {isEditing ? (
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                    rows="4"
                    className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                ) : (
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Search and Contact */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Still have questions?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Search
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      {!isEditing && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💡</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">
              Getting Started Guide
            </h4>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Read Guide →
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👥</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Community Forum</h4>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Join Discussion →
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📞</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">1-on-1 Support</h4>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Schedule Call →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;
