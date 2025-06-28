import React, { useState } from "react";
import { Edit3, X, MapPin, Phone, Mail, Globe, Camera } from "lucide-react";

const HorizontalProfileNavbar = ({ onNavigationChange, navigationOptions }) => {
  const [activeItem, setActiveItem] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    headline: "Startup Founder, Innovator, and Entrepreneur",
    location: "Mumbai",
    city: "Maharashtra",
    phone: "+91 98765 43210",
    email: "john.doe@startup.com",
    website: "www.startup.com",
    about:
      "Passionate entrepreneur with 15+ years of experience in building innovative tech solutions. Founded multiple successful startups and helped scale businesses from idea to IPO.",
  });
  const [editData, setEditData] = useState({ ...profileData });

const navigationItems = [
  {
    id: "posts",
    name: "Posts",
    shortName: "Posts",
  },
  {
    id: "startup-ecosystem",
    name: "Startup Ecosystem Overview",
    shortName: "Overview",
  },
  // {
  //   id: "growth-marketing",
  //   name: "Growth & Marketing Strategies",
  //   shortName: "Growth",
  // },
  // {
  //   id: "funding-investment",
  //   name: "Funding and Investment",
  //   shortName: "Funding",
  // },
  {
    id: "tools-resources",
    name: "Tools & Resources",
    shortName: "Resources",
  },
  // {
  //   id: "faqs",
  //   name: "FAQs",
  //   shortName: "FAQs",
  // },
  // {
  //   id: "government-policies",
  //   name: "Government Policies & Tax Benefits",
  //   shortName: "Policies",
  // },
  {
    id: "launch-steps",
    name: "Steps to Launch",
    shortName: "Launch",
  },
  // {
  //   id: "startup-quiz",
  //   name: "Startup Quiz",
  //   shortName: "Quiz",
  // },
  {
    id: "how-it-works",
    name: "How It Works",
    shortName: "How-To",
  },
  // {
  //   id: "industries",
  //   name: "Industries",
  //   shortName: "Sectors",
  // },
  {
    id: "jobs-skills",
    name: "Jobs & Trending Skills",
    shortName: "Jobs",
  },
];


  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onNavigationChange) {
      onNavigationChange(item.id, item.name);
    }
  };

  const handleEditClick = () => {
    setEditData({ ...profileData });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = () => {
    setProfileData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        {/* Profile Header - Horizontal */}
        <div className="relative">
          {/* Increased height from h-24 to h-32 */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
            title="Edit Profile"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          {/* Larger profile image, adjusted positioning */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src="/api/placeholder/112/112"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Profile Info - Horizontal Layout */}
        {/* Increased top padding from pt-10 to pt-16 to accommodate larger image */}
        <div className="pt-16 px-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-md text-gray-600 mt-1">
                {profileData.headline}
              </p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="w-4 h-4 mr-1.5" />
                {profileData.location}, {profileData.city}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <button className="py-2 px-5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200">
                Connect
              </button>
            </div>
          </div>

          {/* Quick Stats - Simplified Layout */}
          <div className="flex items-center gap-x-8 mt-6 pt-4 border-t border-gray-200">
            <div className="text-left">
              <span className="font-bold text-gray-800">250+</span>
              <span className="text-sm text-gray-600 ml-1.5">Projects</span>
            </div>
            <div className="text-left">
              <span className="font-bold text-gray-800">500+</span>
              <span className="text-sm text-gray-600 ml-1.5">Connections</span>
            </div>
            <div className="text-left">
              <span className="font-bold text-gray-800">4.8</span>
              <span className="text-sm text-gray-600 ml-1.5">Rating</span>
            </div>
          </div>
        </div>

        {/* Navigation Items - Horizontal LinkedIn Style */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeItem === item.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {item.shortName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Profile
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/api/placeholder/80/80"
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Profile Photo
                  </h3>
                  <p className="text-xs text-gray-500">
                    JPG, PNG or GIF (max. 2MB)
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline *
                </label>
                <input
                  type="text"
                  value={editData.headline}
                  onChange={(e) =>
                    handleInputChange("headline", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your professional headline"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Region *
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter state or region"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={editData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter website URL"
                  />
                </div>
              </div>

              {/* About Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  value={editData.about || ""}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Write a brief description about yourself and your startup journey..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {editData.about ? editData.about.length : 0}/2000 characters
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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

export default HorizontalProfileNavbar;
