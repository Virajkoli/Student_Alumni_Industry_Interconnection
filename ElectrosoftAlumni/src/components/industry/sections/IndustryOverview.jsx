import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Building,
  Users,
  TrendingUp,
  Globe,
  MapPin,
  Calendar,
  Shield,
  ExternalLink,
  Briefcase,
  ChartBar,
  Target,
  Award
} from "lucide-react";

const IndustryOverview = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditMarketModalOpen, setIsEditMarketModalOpen] = useState(false);
  const [aboutData, setAboutData] = useState({
    overview:
      "Our industry leads technological innovation and digital transformation across sectors. We focus on developing cutting-edge solutions that empower businesses and improve lives. Through collaborative partnerships and continuous innovation, we're shaping the future of technology and business.",
    website: "https://techindustry.org",
    verified: true,
    verifiedDate: "June 26, 2025",
    sector: "Information Technology",
    industrySize: "500+ Companies",
    activeMembers: "25,000+",
    headquarters: "Silicon Valley, CA",
    specializations: [
      "artificial intelligence",
      "cloud computing",
      "cybersecurity",
      "data analytics",
      "blockchain",
      "IoT",
      "enterprise software",
      "digital transformation",
      "machine learning",
      "automation",
    ],
    marketData: [
      {
        name: "North America",
        marketShare: "35%",
        growth: "12.5% YoY",
        keyPlayers: "150+ Companies",
      },
      {
        name: "Europe",
        marketShare: "28%",
        growth: "10.2% YoY",
        keyPlayers: "120+ Companies",
      },
      {
        name: "Asia Pacific",
        marketShare: "25%",
        growth: "15.8% YoY",
        keyPlayers: "200+ Companies",
      },
      {
        name: "Rest of World",
        marketShare: "12%",
        growth: "8.5% YoY",
        keyPlayers: "80+ Companies",
      },
    ],
  });
  const [editData, setEditData] = useState({ ...aboutData });

  const handleEditClick = () => {
    setEditData({ ...aboutData });
    setIsEditModalOpen(true);
  };

  const handleSaveAbout = () => {
    setAboutData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...aboutData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field === "specializations") {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditMarketClick = () => {
    setEditData({ ...aboutData });
    setIsEditMarketModalOpen(true);
  };

  const handleSaveMarket = () => {
    setAboutData({ ...editData });
    setIsEditMarketModalOpen(false);
  };

  const handleCancelMarketEdit = () => {
    setEditData({ ...aboutData });
    setIsEditMarketModalOpen(false);
  };

  const handleMarketChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      marketData: prev.marketData.map((market, i) =>
        i === index ? { ...market, [field]: value } : market
      ),
    }));
  };

  const handleAddMarket = () => {
    setEditData((prev) => ({
      ...prev,
      marketData: [
        ...prev.marketData,
        {
          name: "",
          marketShare: "",
          growth: "",
          keyPlayers: "",
        },
      ],
    }));
  };

  const handleRemoveMarket = (index) => {
    setEditData((prev) => ({
      ...prev,
      marketData: prev.marketData.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Industry Overview</h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit industry overview"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Overview Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{aboutData.overview}</p>

            {/* Website */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Industry Portal</h4>
              <a
                href={aboutData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
              >
                {aboutData.website}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Verified Status */}
            {aboutData.verified && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900">Verified Industry Data</h4>
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Last updated: {aboutData.verifiedDate}</p>
              </div>
            )}

            {/* Industry Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sector */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Sector</h4>
                <p className="text-sm text-gray-700">{aboutData.sector}</p>
              </div>

              {/* Industry Size */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Industry Size</h4>
                <p className="text-sm text-gray-700">{aboutData.industrySize}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  {aboutData.activeMembers} active professionals
                  <Users className="w-3 h-3" />
                </p>
              </div>

              {/* Main Hub */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Main Hub</h4>
                <p className="text-sm text-gray-700">{aboutData.headquarters}</p>
              </div>

              {/* Specializations */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Key Specializations</h4>
                <div className="flex flex-wrap gap-1">
                  {aboutData.specializations.map((specialization, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Presence Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Market Presence</h2>
            <button
              onClick={handleEditMarketClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit market data"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutData.marketData.map((market, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{market.name}</h3>
                    <span className="text-sm font-medium text-blue-600">
                      {market.marketShare} Market Share
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{market.growth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{market.keyPlayers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Overview Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Edit Industry Overview</h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overview</label>
                <textarea
                  value={editData.overview}
                  onChange={(e) => handleInputChange("overview", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter industry overview"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry Portal</label>
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter website URL"
                />
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <input
                    type="text"
                    value={editData.sector}
                    onChange={(e) => handleInputChange("sector", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter industry sector"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry Size</label>
                  <input
                    type="text"
                    value={editData.industrySize}
                    onChange={(e) => handleInputChange("industrySize", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter industry size"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Active Members</label>
                  <input
                    type="text"
                    value={editData.activeMembers}
                    onChange={(e) => handleInputChange("activeMembers", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of active members"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Hub</label>
                  <input
                    type="text"
                    value={editData.headquarters}
                    onChange={(e) => handleInputChange("headquarters", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter main hub location"
                  />
                </div>
              </div>

              {/* Specializations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Specializations (comma-separated)
                </label>
                <textarea
                  value={editData.specializations.join(", ")}
                  onChange={(e) => handleInputChange("specializations", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter specializations separated by commas"
                />
              </div>

              {/* Verified Status */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.verified}
                    onChange={(e) => handleInputChange("verified", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Verified Industry Data</span>
                </label>

                {editData.verified && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Updated Date
                    </label>
                    <input
                      type="text"
                      value={editData.verifiedDate}
                      onChange={(e) => handleInputChange("verifiedDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter verification date"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAbout}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Market Modal */}
      {isEditMarketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Edit Market Presence</h2>
                <button
                  onClick={handleCancelMarketEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {editData.marketData.map((market, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">Market Region {index + 1}</h3>
                    {editData.marketData.length > 1 && (
                      <button
                        onClick={() => handleRemoveMarket(index)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region Name *
                      </label>
                      <input
                        type="text"
                        value={market.name}
                        onChange={(e) => handleMarketChange(index, "name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., North America, Europe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Market Share *
                      </label>
                      <input
                        type="text"
                        value={market.marketShare}
                        onChange={(e) => handleMarketChange(index, "marketShare", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 35%"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Growth</label>
                      <input
                        type="text"
                        value={market.growth}
                        onChange={(e) => handleMarketChange(index, "growth", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 12.5% YoY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Players
                      </label>
                      <input
                        type="text"
                        value={market.keyPlayers}
                        onChange={(e) => handleMarketChange(index, "keyPlayers", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 150+ Companies"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Market Region Button */}
              <button
                onClick={handleAddMarket}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                Add New Market Region
              </button>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancelMarketEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMarket}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndustryOverview;
