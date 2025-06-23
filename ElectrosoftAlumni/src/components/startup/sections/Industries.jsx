import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  TrendingUp,
  Building,
  Users,
  Globe,
} from "lucide-react";

const Industries = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [content, setContent] = useState({
    title: "Industries & Sectors",
    description:
      "Explore thriving industries and discover opportunities for your startup across various sectors.",
    industries: [
      {
        name: "Technology & Software",
        icon: "💻",
        growth: "+25%",
        startups: "15,000+",
        funding: "$45B",
        description:
          "Leading innovation in AI, SaaS, mobile apps, and enterprise software solutions.",
        trends: [
          "Artificial Intelligence",
          "Machine Learning",
          "Cloud Computing",
          "Cybersecurity",
          "DevOps",
        ],
        opportunities: [
          "B2B SaaS platforms",
          "AI-powered tools",
          "Mobile applications",
          "Enterprise automation",
        ],
        challenges: [
          "High competition",
          "Talent acquisition",
          "Rapid technology changes",
          "Data privacy regulations",
        ],
        keyPlayers: ["Microsoft", "Google", "Amazon", "Meta", "Apple"],
      },
      {
        name: "Healthcare & Biotech",
        icon: "🏥",
        growth: "+18%",
        startups: "8,500+",
        funding: "$29B",
        description:
          "Revolutionizing healthcare through digital health, biotech innovations, and medical devices.",
        trends: [
          "Telemedicine",
          "Digital Therapeutics",
          "Personalized Medicine",
          "Medical AI",
          "Biomarkers",
        ],
        opportunities: [
          "Remote patient monitoring",
          "Drug discovery platforms",
          "Mental health apps",
          "Surgical robotics",
        ],
        challenges: [
          "Regulatory compliance",
          "Clinical trials",
          "Insurance coverage",
          "Data security",
        ],
        keyPlayers: [
          "Johnson & Johnson",
          "Pfizer",
          "Roche",
          "Novartis",
          "Moderna",
        ],
      },
      {
        name: "Fintech & Payments",
        icon: "💳",
        growth: "+22%",
        startups: "12,000+",
        funding: "$38B",
        description:
          "Transforming financial services with digital banking, payments, and investment platforms.",
        trends: [
          "Digital Banking",
          "Cryptocurrency",
          "Buy Now Pay Later",
          "Robo-advisors",
          "RegTech",
        ],
        opportunities: [
          "Neobanking",
          "Payment processing",
          "Investment apps",
          "Insurance tech",
        ],
        challenges: [
          "Regulatory requirements",
          "Security concerns",
          "Market saturation",
          "Customer trust",
        ],
        keyPlayers: ["PayPal", "Square", "Stripe", "Coinbase", "Robinhood"],
      },
      {
        name: "E-commerce & Retail",
        icon: "🛒",
        growth: "+15%",
        startups: "20,000+",
        funding: "$25B",
        description:
          "Reshaping retail with online marketplaces, D2C brands, and omnichannel experiences.",
        trends: [
          "Social Commerce",
          "Sustainable Products",
          "AR/VR Shopping",
          "Subscription Models",
          "Personalization",
        ],
        opportunities: [
          "Niche marketplaces",
          "Sustainable brands",
          "B2B commerce",
          "Logistics solutions",
        ],
        challenges: [
          "Customer acquisition costs",
          "Supply chain issues",
          "Market competition",
          "Inventory management",
        ],
        keyPlayers: ["Amazon", "Shopify", "Alibaba", "eBay", "Etsy"],
      },
      {
        name: "Clean Energy & Sustainability",
        icon: "🌱",
        growth: "+30%",
        startups: "6,500+",
        funding: "$32B",
        description:
          "Driving the green revolution with renewable energy, carbon capture, and sustainable solutions.",
        trends: [
          "Solar Technology",
          "Energy Storage",
          "Carbon Capture",
          "Green Hydrogen",
          "Circular Economy",
        ],
        opportunities: [
          "Renewable energy systems",
          "Carbon tracking",
          "Sustainable materials",
          "Energy efficiency",
        ],
        challenges: [
          "High capital requirements",
          "Regulatory hurdles",
          "Technology scalability",
          "Market adoption",
        ],
        keyPlayers: [
          "Tesla",
          "NextEra Energy",
          "Vestas",
          "First Solar",
          "Orsted",
        ],
      },
      {
        name: "Education & EdTech",
        icon: "🎓",
        growth: "+20%",
        startups: "9,000+",
        funding: "$16B",
        description:
          "Revolutionizing learning with online education, skill development, and educational technology.",
        trends: [
          "Online Learning",
          "Microlearning",
          "AI Tutoring",
          "VR Education",
          "Skills Assessment",
        ],
        opportunities: [
          "Corporate training",
          "K-12 platforms",
          "Language learning",
          "Professional certification",
        ],
        challenges: [
          "User engagement",
          "Content quality",
          "Pricing pressure",
          "Technology adoption",
        ],
        keyPlayers: ["Coursera", "Udemy", "Khan Academy", "Duolingo", "Chegg"],
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving industries content:", content);
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

      {/* Industry Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {content.industries.map((industry, index) => (
          <div
            key={index}
            className={`bg-white border rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedIndustry === index
                ? "border-blue-500 shadow-md"
                : "border-gray-200"
            }`}
            onClick={() =>
              setSelectedIndustry(selectedIndustry === index ? null : index)
            }
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{industry.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {industry.name}
                </h3>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                {industry.growth}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{industry.description}</p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {industry.startups}
                </p>
                <p className="text-xs text-gray-600">Startups</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {industry.funding}
                </p>
                <p className="text-xs text-gray-600">Funding</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {industry.growth}
                </p>
                <p className="text-xs text-gray-600">Growth Rate</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Industry Details */}
      {selectedIndustry !== null && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl">
              {content.industries[selectedIndustry].icon}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              {content.industries[selectedIndustry].name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Trends */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Current Trends
              </h3>
              <div className="space-y-2">
                {content.industries[selectedIndustry].trends.map(
                  (trend, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{trend}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Opportunities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-green-600" />
                Key Opportunities
              </h3>
              <div className="space-y-2">
                {content.industries[selectedIndustry].opportunities.map(
                  (opportunity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{opportunity}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Building className="w-5 h-5 mr-2 text-orange-600" />
                Major Challenges
              </h3>
              <div className="space-y-2">
                {content.industries[selectedIndustry].challenges.map(
                  (challenge, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">{challenge}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Key Players */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Key Players
              </h3>
              <div className="flex flex-wrap gap-2">
                {content.industries[selectedIndustry].keyPlayers.map(
                  (player, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                    >
                      {player}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Market Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">85%</p>
            <p className="text-sm text-gray-600">Industries showing growth</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">70K+</p>
            <p className="text-sm text-gray-600">Total active startups</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">$185B</p>
            <p className="text-sm text-gray-600">Total funding available</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!isEditing && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">
            Ready to Enter Your Industry?
          </h3>
          <p className="mb-4">
            Connect with industry experts, find co-founders, and access
            specialized resources for your sector.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Find Industry Mentors
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors">
              Explore Opportunities
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Industries;
