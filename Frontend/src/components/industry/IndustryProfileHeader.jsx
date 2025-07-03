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
      <div className="rounded-xl shadow-sm border overflow-hidden mb-6" style={{ backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}>
        {/* Profile Header - Horizontal */}
        <div className="relative">
          {/* Increased height from h-24 to h-32 */}
          <div className="h-44" style={{ background: 'linear-gradient(135deg, #B5D3E7 0%, #6EA9CB 100%)' }}></div>
          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className="absolute top-4 right-4 p-2 hover:opacity-80 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(110, 169, 203, 0.3)' }}
            title="Edit Profile"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          {/* Larger profile image, adjusted positioning */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 rounded-full p-1.5 shadow-xl" style={{ backgroundColor: '#F7FAFC' }}>
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #DCE8F2, #B5D3E7)' }}>
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
        <div className="pt-16 px-8 pb-6 border-b" style={{ borderColor: '#DCE8F2' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold" style={{ color: '#1F2D3D' }}>
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-md font-medium mt-1" style={{ color: '#6EA9CB' }}>
                {profileData.headline}
              </p>
              <div className="flex items-center text-sm mt-2" style={{ color: '#1F2D3D', opacity: '0.7' }}>
                <MapPin className="w-4 h-4 mr-1.5" />
                {profileData.location}, {profileData.city}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <button className="py-2 px-5 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-colors duration-200" style={{ backgroundColor: '#6EA9CB' }}>
                Connect
              </button>
            </div>
          </div>

          {/* Quick Stats - Simplified Layout */}
          <div className="flex items-center gap-x-8 mt-6 pt-4 border-t" style={{ borderColor: '#DCE8F2' }}>
            <div className="text-left">
              <span className="font-bold" style={{ color: '#1F2D3D' }}>250+</span>
              <span className="text-sm ml-1.5" style={{ color: '#1F2D3D', opacity: '0.7' }}>Projects</span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: '#1F2D3D' }}>500+</span>
              <span className="text-sm ml-1.5" style={{ color: '#1F2D3D', opacity: '0.7' }}>Connections</span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: '#1F2D3D' }}>4.8</span>
              <span className="text-sm ml-1.5" style={{ color: '#1F2D3D', opacity: '0.7' }}>Rating</span>
            </div>
          </div>
        </div>

        {/* Navigation Items - Horizontal LinkedIn Style */}
        <div className="border-b" style={{ backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}>
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
                    ? "text-white"
                    : "hover:opacity-80"
                }`}
                style={{
                  borderBottomColor: activeItem === item.id ? '#6EA9CB' : 'transparent',
                  backgroundColor: activeItem === item.id ? '#B5D3E7' : 'transparent',
                  color: activeItem === item.id ? '#1F2D3D' : '#1F2D3D'
                }}
              >
                {item.name}
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-12 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-normal w-48 text-center shadow-lg" style={{ backgroundColor: '#1F2D3D' }}>
                  {item.description}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 transform rotate-45" style={{ backgroundColor: '#1F2D3D' }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#F7FAFC' }}>
            <div className="p-6 border-b" style={{ borderColor: '#DCE8F2' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold" style={{ color: '#1F2D3D' }}>
                  Edit Profile
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: '#DCE8F2' }}
                >
                  <X className="w-5 h-5" style={{ color: '#1F2D3D' }} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={editData.headline}
                    onChange={(e) =>
                      handleInputChange("headline", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                    placeholder="Your professional headline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Phone
                  </label>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" style={{ color: '#1F2D3D', opacity: '0.6' }} />
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Email
                  </label>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" style={{ color: '#1F2D3D', opacity: '0.6' }} />
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Website
                  </label>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" style={{ color: '#1F2D3D', opacity: '0.6' }} />
                    <input
                      type="url"
                      value={editData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    About
                  </label>
                  <textarea
                    value={editData.about}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{ borderColor: '#DCE8F2', backgroundColor: '#F7FAFC', color: '#1F2D3D' }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t" style={{ backgroundColor: '#DCE8F2', borderColor: '#B5D3E7' }}>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-90"
                  style={{ color: '#1F2D3D', backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90"
                  style={{ backgroundColor: '#6EA9CB' }}
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
