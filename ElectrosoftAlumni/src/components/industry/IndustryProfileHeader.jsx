import React, { useState } from "react";
import { Edit3, X, MapPin, Phone, Mail, Globe, Camera } from "lucide-react";

const styles = {
  hideScrollbar: {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};

const HorizontalProfileNavbar = ({ onNavigationChange, navigationOptions }) => {
  const [activeItem, setActiveItem] = useState("industry-overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Industry",
    lastName: "Expert",
    headline: "Industry Domain Expert, Innovator, and Mentor",
    location: "Mumbai",
    city: "Maharashtra",
    phone: "+91 98765 43210",
    email: "expert@industry.com",
    website: "www.industry.com",
    about:
      "Experienced industry leader with deep expertise in technology innovation and business transformation. Committed to mentoring and fostering industry-academia collaboration.",
  });
  const [editData, setEditData] = useState({ ...profileData });

  const navigationItems = [
    { id: "posts", name: "Posts", description: "Your posts and activities" },
    {
      id: "industry-overview",
      name: "Industry Overview",
      description: "Overview of the industry",
    },
    {
      id: "sector-category",
      name: "Sector / Category",
      description: "Industry sectors and categories",
    },
    {
      id: "live-projects",
      name: "Live Projects",
      description: "Live industry projects",
    },
    {
      id: "job-career-opportunities",
      name: "Job Career Opportunities",
      description: "Jobs and career paths",
    },
    // { id: "technology", name: "Technology",  description: "Technologies in the industry" },
    {
      id: "challenges-solutions",
      name: "Challenges / Solutions",
      description: "Industry challenges and solutions",
    },
    {
      id: "post-news-jobs",
      name: "Post News and Jobs",
      description: "Share news and job posts",
    },
    {
      id: "expert-opinions-interview",
      name: "Expert Opinions/Interview",
      description: "Expert interviews and opinions",
    },
    {
      id: "poll-comment-section",
      name: "Poll/Comment Section",
      description: "Polls and comments",
    },
    // { id: "internship-training-requests", name: "Internship or Training Requests",  description: "Request internships or training" },
    // {
    //   id: "upload-project",
    //   name: "Upload Project",
    //   description: "Upload your project",
    // },
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
          <div className="h-44 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800"></div>
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
              <p className="text-md text-blue-600 font-medium mt-1">
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
          <div
            className="flex overflow-x-auto px-2"
            style={styles.hideScrollbar}
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap relative group ${
                  activeItem === item.id
                    ? "border-blue-600 text-blue-600 bg-blue-50/50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {item.name}
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-12 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-normal w-48 text-center shadow-lg">
                  {item.description}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
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

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={editData.headline}
                    onChange={(e) =>
                      handleInputChange("headline", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your professional headline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="url"
                      value={editData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <textarea
                    value={editData.about}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HorizontalProfileNavbar;
