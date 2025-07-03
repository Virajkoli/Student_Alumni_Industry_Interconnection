import React, { useState, useEffect } from "react";
import { Edit3, X, MapPin, Phone, Mail, Globe, Camera, Plus, Star } from "lucide-react";

const StudentProfileHeader = ({ profileData, onProfileUpdate, onNavigationChange, customNavigations, onCustomNavigationUpdate }) => {
  // Profile edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });

  // Navigation state
  const [activeItem, setActiveItem] = useState("posts");
  const [isNavEditModalOpen, setIsNavEditModalOpen] = useState(false);
  const [isNewNavModalOpen, setIsNewNavModalOpen] = useState(false);
  const [hiddenNavItems, setHiddenNavItems] = useState([]);
  const [newNavData, setNewNavData] = useState({
    name: "",
    contentType: "text",
    content: ""
  });
  const [editingCustomNav, setEditingCustomNav] = useState(null);
  const [isEditingCustomNav, setIsEditingCustomNav] = useState(false);

  // Listen for custom navigation edit events
  useEffect(() => {
    const handleEditCustomNavigation = (event) => {
      const { customNavItem } = event.detail;
      setEditingCustomNav(customNavItem);
      setNewNavData({
        name: customNavItem.name,
        contentType: customNavItem.contentType,
        content: customNavItem.content
      });
      setIsEditingCustomNav(true);
    };

    window.addEventListener('editCustomNavigation', handleEditCustomNavigation);
    
    return () => {
      window.removeEventListener('editCustomNavigation', handleEditCustomNavigation);
    };
  }, []);

  const navigationItems = [
    {
      id: "posts",
      name: "Posts",
      shortName: "Posts",
    },
    {
      id: "about",
      name: "About",
      shortName: "About",
    },
    {
      id: "experience",
      name: "Experience",
      shortName: "Experience",
    },
    {
      id: "education",
      name: "Education",
      shortName: "Education",
    },
    {
      id: "skills",
      name: "Skills",
      shortName: "Skills",
    },
    {
      id: "projects",
      name: "Projects",
      shortName: "Projects",
    },
    {
      id: "courses",
      name: "Courses",
      shortName: "Courses",
    },
    {
      id: "certifications",
      name: "Certifications",
      shortName: "Certifications",
    },
    {
      id: "recommendations",
      name: "Recommendations",
      shortName: "Recommendations",
    },
  ];

  const profilePicUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg";

  // Profile handlers
  const handleEditClick = () => {
    setEditData({ ...profileData });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = () => {
    onProfileUpdate(editData);
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigation handlers
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    onNavigationChange(item.id, item.name);
  };

  const handleCustomNavClick = (customNav) => {
    setActiveItem(customNav.id);
    onNavigationChange(customNav.id, customNav.name, customNav);
  };

  const handleToggleNavItem = (itemId) => {
    setHiddenNavItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCreateCustomNav = () => {
    if (newNavData.name.trim()) {
      const newNav = {
        id: `custom-${Date.now()}`,
        name: newNavData.name,
        contentType: newNavData.contentType,
        content: newNavData.contentType === 'text' 
          ? { title: newNavData.name, content: newNavData.content }
          : newNavData.content
      };
      
      const updatedCustomNavs = [...customNavigations, newNav];
      onCustomNavigationUpdate(updatedCustomNavs);
      
      setNewNavData({ name: "", contentType: "text", content: "" });
      setIsNewNavModalOpen(false);
      
      // Switch to the new navigation item
      setActiveItem(newNav.id);
      onNavigationChange(newNav.id, newNav.name, newNav);
    }
  };

  const handleUpdateCustomNav = () => {
    if (editingCustomNav && newNavData.name.trim()) {
      const updatedNav = {
        ...editingCustomNav,
        name: newNavData.name,
        contentType: newNavData.contentType,
        content: newNavData.contentType === 'text' 
          ? { title: newNavData.name, content: newNavData.content }
          : newNavData.content
      };
      
      const updatedCustomNavs = customNavigations.map(nav => 
        nav.id === editingCustomNav.id ? updatedNav : nav
      );
      onCustomNavigationUpdate(updatedCustomNavs);
      
      setNewNavData({ name: "", contentType: "text", content: "" });
      setEditingCustomNav(null);
      setIsEditingCustomNav(false);
      
      // Update the active content if it's currently selected
      if (activeItem === editingCustomNav.id) {
        onNavigationChange(updatedNav.id, updatedNav.name, updatedNav);
      }
    }
  };

  const handleDeleteCustomNav = (customNavId) => {
    const updatedCustomNavs = customNavigations.filter(nav => nav.id !== customNavId);
    onCustomNavigationUpdate(updatedCustomNavs);
    
    // If the deleted nav was active, switch to posts
    if (activeItem === customNavId) {
      setActiveItem("posts");
      onNavigationChange("posts", "Posts");
    }
  };

  const visibleNavigationItems = navigationItems.filter(item => !hiddenNavItems.includes(item.id));

  return (
    <>
      <div className="rounded-xl shadow-sm border overflow-hidden mb-6" style={{ backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}>
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-44 bg-gradient-to-r from-blue-400 to-indigo-500" style={{ background: 'linear-gradient(135deg, #B5D3E7 0%, #6EA9CB 100%)' }}></div>
          
          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
            title="Edit Profile"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          
          {/* Profile Image */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src={profilePicUrl}
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

        {/* Profile Info */}
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
                {profileData.city}
              </div>
              {profileData.showSchool && (
                <p className="text-sm text-gray-600 mt-1">
                  {profileData.school}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <button 
                className="py-2 px-5 text-white rounded-lg text-sm font-semibold transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: '#6EA9CB' }}
              >
                Connect
              </button>
              <button className="py-2 px-5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors duration-200">
                Message
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-x-8 mt-6 pt-4 border-t" style={{ borderColor: '#DCE8F2' }}>
            <div className="text-left">
              <span className="font-bold" style={{ color: '#1F2D3D' }}>12</span>
              <span className="text-sm ml-1.5" style={{ color: '#1F2D3D', opacity: 0.7 }}>Projects</span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: '#1F2D3D' }}>150+</span>
              <span className="text-sm ml-1.5" style={{ color: '#1F2D3D', opacity: 0.7 }}>Connections</span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: '#1F2D3D' }}>4.9</span>
              <span className="text-sm ml-1.5" style={{ color: '#1F2D3D', opacity: 0.7 }}>Rating</span>
            </div>
          </div>
        </div>

        {/* Navigation Items - Horizontal LinkedIn Style */}
        <div className="border-b" style={{ backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}>
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {/* Regular Navigation Items */}
              {visibleNavigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeItem === item.id
                      ? "border border-opacity-50 text-white"
                      : "hover:bg-opacity-70 transition-colors"
                  }`}
                  style={{
                    backgroundColor: activeItem === item.id ? '#6EA9CB' : 'transparent',
                    borderColor: activeItem === item.id ? '#B5D3E7' : 'transparent',
                    color: activeItem === item.id ? 'white' : '#1F2D3D'
                  }}
                  onMouseEnter={(e) => {
                    if (activeItem !== item.id) {
                      e.target.style.backgroundColor = '#DCE8F2';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeItem !== item.id) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.shortName}
                </button>
              ))}

              {/* Custom Navigation Items */}
              {customNavigations.map((customNav) => (
                <div key={customNav.id} className="relative group">
                  <button
                    onClick={() => handleCustomNavClick(customNav)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      activeItem === customNav.id
                        ? "border border-opacity-50 text-white"
                        : "hover:bg-opacity-70 transition-colors"
                    }`}
                    style={{
                      backgroundColor: activeItem === customNav.id ? '#6EA9CB' : 'transparent',
                      borderColor: activeItem === customNav.id ? '#B5D3E7' : 'transparent',
                      color: activeItem === customNav.id ? 'white' : '#1F2D3D'
                    }}
                    onMouseEnter={(e) => {
                      if (activeItem !== customNav.id) {
                        e.target.style.backgroundColor = '#DCE8F2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeItem !== customNav.id) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {customNav.name}
                    <Star className="w-3 h-3 inline ml-1 text-yellow-500" />
                  </button>
                  
                  {/* Delete button for custom nav (visible on hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCustomNav(customNav.id);
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                    title="Delete custom navigation"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {/* Add Custom Navigation Button */}
              <button
                onClick={() => setIsNewNavModalOpen(true)}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-70"
                style={{ color: '#1F2D3D' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DCE8F2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
                title="Add Custom Section"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Settings Button */}
              <button
                onClick={() => setIsNavEditModalOpen(true)}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-70"
                style={{ color: '#1F2D3D' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DCE8F2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
                title="Navigation Settings"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
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
                      src={profilePicUrl}
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

              {/* Location and School */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) =>
                      handleInputChange("city", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School
                  </label>
                  <input
                    type="text"
                    value={editData.school}
                    onChange={(e) => handleInputChange("school", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter school name"
                  />
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={editData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter industry"
                />
              </div>

              {/* Show School Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showSchool"
                  checked={editData.showSchool}
                  onChange={(e) =>
                    handleInputChange("showSchool", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="showSchool" className="text-sm text-gray-700">
                  Show school in profile
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl" style={{ backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: '#DCE8F2', color: '#1F2D3D' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DCE8F2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#6EA9CB' }}
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

export default StudentProfileHeader;
