import React, { useState, useEffect } from "react";
import {
  Edit3,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Plus,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

import apiService from "../../services/apiService";

const StudentProfileHeader = ({
  profileData,
  onProfileUpdate,
  onNavigationChange,
  customNavigations,
  onCustomNavigationUpdate,
  isOwner = false,
}) => {
  // Profile edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageEditModalOpen, setIsImageEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });

  // Navigation state
  const [activeItem, setActiveItem] = useState("posts");
  const [isNavEditModalOpen, setIsNavEditModalOpen] = useState(false);
  const [isNewNavModalOpen, setIsNewNavModalOpen] = useState(false);
  const [hiddenNavItems, setHiddenNavItems] = useState([]);
  const [newNavData, setNewNavData] = useState({
    name: "",
    contentType: "text",
    content: "",
  });
  const [editingCustomNav, setEditingCustomNav] = useState(null);
  const [isEditingCustomNav, setIsEditingCustomNav] = useState(false);

  // Profile picture and cover photo URLs
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPicUrl, setCoverPicUrl] = useState("");

  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await apiService.getCurrentUser();
      setUser(response.data);
      console.log("User refreshed after upload:", response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch on mount
  }, []);
  // Fetch profile data on mount and whenever profileData changes
  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const response = await apiService.getProfile();
  //       console.log("Fetched profile data:", response);

  //       if (response.success) {
  //         // Set the complete profile data using the correct structure
  //         onProfileUpdate(response.data);

  //         // Set image URLs from the correct data structure (flat structure)
  //         const profilePic = response.data.profilePicture || "";
  //         const coverPic = response.data.coverPicture || "";

  //         console.log("Profile pic URL:", profilePic);
  //         console.log("Cover pic URL:", coverPic);

  //         setProfilePicUrl(profilePic);
  //         setCoverPicUrl(coverPic);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch profile data:", error);
  //     }
  //   };

  //   fetchProfileData();
  // }, [profileData]);

  // Update image URLs when profileData changes
  useEffect(() => {
    if (profileData) {
      const profilePic =
        profileData.profilePicture ||
        profileData.basicInfo?.profile_picture ||
        profileData.profile_picture ||
        "";
      const coverPic =
        profileData.coverPicture ||
        profileData.basicInfo?.cover_picture ||
        profileData.cover_picture ||
        "";

      console.log("Updated profile pic URL from props:", profilePic);
      console.log("Updated cover pic URL from props:", coverPic);

      setProfilePicUrl(profilePic);
      setCoverPicUrl(coverPic);
    }
  }, [profileData]);

  // Listen for custom navigation edit events
  useEffect(() => {
    const handleEditCustomNavigation = (event) => {
      const { customNavItem } = event.detail;
      setEditingCustomNav(customNavItem);
      setNewNavData({
        name: customNavItem.name,
        contentType: customNavItem.contentType,
        content: customNavItem.content,
      });
      setIsEditingCustomNav(true);
    };

    window.addEventListener("editCustomNavigation", handleEditCustomNavigation);

    return () => {
      window.removeEventListener(
        "editCustomNavigation",
        handleEditCustomNavigation
      );
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

  // Profile handlers
  const handleEditClick = () => {
    const normalizedData = {
      ...profileData,
      headline: profileData.headline || profileData.interestedField || "",
      interestedField: profileData.interestedField || "",
      location: profileData.location || profileData.city || "",
      // Don't link headline and interestedField
    };
    setEditData(normalizedData);
    setIsEditModalOpen(true);
  };

  const handleImageEditClick = () => {
    setIsImageEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        contactNo: editData.contactNo,
        collegeName: editData.collegeName,
        interestedField: editData.interestedField, // ✅ Separate field
        location: editData.location,
        headline: editData.headline, // ✅ Separate field
        otherField:
          editData.interestedField === "Other" ? editData.otherField : null,
      };

      await apiService.updateStudentProfile(payload);
      toast.success("Profile updated successfully!");
      onProfileUpdate(editData);
      setIsEditModalOpen(false);
      // Only fetch user data if needed, not always
      // fetchUserData();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    }
  };
  const handleUploadProfilePic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file); // make sure this matches backend multer field name

      const response = await apiService.uploadProfileImage(formData);
      await fetchUserData(); // ✅ Refresh user data with new coverPicture

      toast.success("Profile picture updated");
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      toast.error(error.message || "Upload failed");
    }
  };

  const handleUploadCoverPic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", file);
      const response = await apiService.uploadCoverImage(formData);
      await fetchUserData(); // ✅ Refresh user data with new coverPicture

      setCoverPicUrl(response.data.cover_picture);
      toast.success("Cover picture updated");
    } catch (error) {
      console.error("Failed to upload cover picture:", error);
      toast.error(error.message || "Upload failed");
    }
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
    setHiddenNavItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCreateCustomNav = () => {
    if (newNavData.name.trim()) {
      const newNav = {
        id: `custom-${Date.now()}`,
        name: newNavData.name,
        contentType: newNavData.contentType,
        content:
          newNavData.contentType === "text"
            ? { title: newNavData.name, content: newNavData.content }
            : newNavData.content,
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
        content:
          newNavData.contentType === "text"
            ? { title: newNavData.name, content: newNavData.content }
            : newNavData.content,
      };

      const updatedCustomNavs = customNavigations.map((nav) =>
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
    const updatedCustomNavs = customNavigations.filter(
      (nav) => nav.id !== customNavId
    );
    onCustomNavigationUpdate(updatedCustomNavs);

    // If the deleted nav was active, switch to posts
    if (activeItem === customNavId) {
      setActiveItem("posts");
      onNavigationChange("posts", "Posts");
    }
  };

  const visibleNavigationItems = navigationItems.filter(
    (item) => !hiddenNavItems.includes(item.id)
  );

  return (
    <>
      <div
        className="rounded-xl shadow-sm border overflow-hidden mb-6"
        style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
      >
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div
            className="h-44 bg-gradient-to-r from-blue-400 to-indigo-500"
            style={{
              backgroundImage: coverPicUrl ? `url(${coverPicUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Edit Background/Profile Image Button - Top right of background */}
          {isOwner && (
            <button
              // onClick={() => document.getElementById("coverPicInput").click()}
              onClick={handleImageEditClick}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
              title="Edit Background & Profile Image"
            >
              <Camera className="w-7 h-7 invert" />
            </button>
          )}
          <input
            type="file"
            id="coverPicInput"
            style={{ display: "none" }}
            onChange={(e) => handleUploadCoverPic(e.target.files[0])}
          />

          {/* Profile Image */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                {profilePicUrl ? (
                  <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-500" />
                )}
              </div>
            </div>
            {isOwner&&<button
              onClick={() => document.getElementById("profilePicInput").click()}
              className="absolute -bottom-1 -right-1 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Camera className="w-3 h-3" />
            </button>}
            <input
              type="file"
              id="profilePicInput"
              style={{ display: "none" }}
              onChange={(e) => handleUploadProfilePic(e.target.files[0])}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {editData?.firstName ||
                  editData?.basicInfo?.first_name ||
                  profileData?.firstName ||
                  profileData?.basicInfo?.first_name}{" "}
                {editData?.lastName ||
                  editData?.basicInfo?.last_name ||
                  profileData?.lastName ||
                  profileData?.basicInfo?.last_name}
              </h3>
              <p className="text-md text-gray-600 mt-1">
                {editData?.headline ||
                  editData?.interestedField ||
                  editData?.basicInfo?.interested_field ||
                  profileData?.headline ||
                  profileData?.interestedField ||
                  profileData?.basicInfo?.interested_field}
              </p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="w-4 h-4 mr-1.5" />
                {editData?.city ||
                  editData?.location ||
                  profileData?.city ||
                  profileData?.location ||
                  editData?.collegeName ||
                  profileData?.collegeName ||
                  "Location not specified"}
              </div>
              {(editData?.collegeName ||
                editData?.basicInfo?.collegeName ||
                profileData?.collegeName ||
                profileData?.basicInfo?.collegeName ||
                profileData?.showSchool) && (
                <p className="text-sm text-gray-600 mt-1">
                  {editData?.collegeName ||
                    editData?.basicInfo?.collegeName ||
                    profileData?.collegeName ||
                    profileData?.basicInfo?.collegeName ||
                    profileData?.school}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              {/* Profile Info Edit Button - Above Connect button */}
              {isOwner && (
                <button
                  onClick={handleEditClick}
                  className="py-1.5 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1.5"
                  title="Edit Profile Info"
              >
                <User className="w-4 h-4" />
                Edit Info
              </button>
              )}
              <button
                className="py-2 px-5 text-white rounded-lg text-sm font-semibold transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Connect
              </button>
              <button className="py-2 px-5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors duration-200">
                Message
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div
            className="flex items-center gap-x-8 mt-6 pt-4 border-t"
            style={{ borderColor: "#DCE8F2" }}
          >
            <div className="text-left">
              <span className="font-bold" style={{ color: "#1F2D3D" }}>
                12
              </span>
              <span
                className="text-sm ml-1.5"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Projects
              </span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: "#1F2D3D" }}>
                150+
              </span>
              <span
                className="text-sm ml-1.5"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Connections
              </span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: "#1F2D3D" }}>
                4.9
              </span>
              <span
                className="text-sm ml-1.5"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Rating
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items - Horizontal LinkedIn Style */}
        <div
          className="border-b"
          style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
        >
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
                    backgroundColor:
                      activeItem === item.id ? "#6EA9CB" : "transparent",
                    borderColor:
                      activeItem === item.id ? "#B5D3E7" : "transparent",
                    color: activeItem === item.id ? "white" : "#1F2D3D",
                  }}
                  onMouseEnter={(e) => {
                    if (activeItem !== item.id) {
                      e.target.style.backgroundColor = "#DCE8F2";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeItem !== item.id) {
                      e.target.style.backgroundColor = "transparent";
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
                      backgroundColor:
                        activeItem === customNav.id ? "#6EA9CB" : "transparent",
                      borderColor:
                        activeItem === customNav.id ? "#B5D3E7" : "transparent",
                      color: activeItem === customNav.id ? "white" : "#1F2D3D",
                    }}
                    onMouseEnter={(e) => {
                      if (activeItem !== customNav.id) {
                        e.target.style.backgroundColor = "#DCE8F2";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeItem !== customNav.id) {
                        e.target.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {customNav.name}
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
              {isOwner && (
                <button
                  onClick={() => setIsNewNavModalOpen(true)}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-70"
                  style={{ color: "#1F2D3D" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#DCE8F2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                  title="Add Custom Section"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}

              {/* Settings Button */}
              {isOwner && (
                <button
                  onClick={() => setIsNavEditModalOpen(true)}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-70"
                  style={{ color: "#1F2D3D" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#DCE8F2";
                  }}
                  onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
                title="Navigation Settings"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              )}
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
                 {isOwner&& <button className="absolute -bottom-1 -right-1 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    <Camera className="w-3 h-3" />
                  </button>}
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
                    value={editData.firstName || ""}
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
                    value={editData.lastName || ""}
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
                  value={editData.headline || ""}
                  onChange={(e) =>
                    handleInputChange("headline", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your professional headline"
                />
              </div>
              {/* Location and School */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={editData.location || editData.city || ""}
                  onChange={(e) => {
                    handleInputChange("location", e.target.value);
                    handleInputChange("city", e.target.value); // Update both fields
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  value={editData.collegeName || editData.school || ""}
                  onChange={(e) => {
                    handleInputChange("collegeName", e.target.value);
                    handleInputChange("school", e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter college name"
                />
              </div>
              {/* Contact and Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={editData.contact_no || ""}
                    onChange={(e) =>
                      handleInputChange("contact_no", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interested Field *
                  </label>
                  <input
                    type="text"
                    value={editData.interestedField || ""}
                    onChange={(e) =>
                      handleInputChange("interestedField", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter interested field"
                  />
                </div>
              </div>
              {/* Other Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Field (Optional)
                </label>
                <input
                  type="text"
                  value={editData.other_field || ""}
                  onChange={(e) =>
                    handleInputChange("other_field", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter other field of interest"
                />
              </div>
              {/* About Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  value={editData.about || ""}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
              {/* Show School Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showSchool"
                  checked={editData.showSchool || ""}
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
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#DCE8F2";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Background & Profile Image Modal */}
      {isImageEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Images
                </h2>
                <button
                  onClick={() => setIsImageEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Background Image
                </h3>
                <div className="relative">
                  <div
                    className="w-full h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg overflow-hidden"
                    style={{
                      backgroundImage: `url(${coverPicUrl})`,
                    }}
                  ></div>
                  {isOwner&&<button
                    onClick={() =>
                      document.getElementById("coverPicInputModal").click()
                    }
                    className="absolute bottom-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full transition-all duration-200"
                  >
                    <Camera className="w-4 h-4" />
                  </button>}
                  <input
                    type="file"
                    id="coverPicInputModal"
                    style={{ display: "none" }}
                    onChange={(e) => handleUploadCoverPic(e.target.files[0])}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      document.getElementById("coverPicInputModal").click()
                    }
                    className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Upload New
                  </button>
                  <button
                    onClick={() => setCoverPicUrl("")}
                    className="flex-1 py-2 px-4 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Picture
                </h3>
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
                    {isOwner&&<button
                      onClick={() =>
                        document.getElementById("profilePicInputModal").click()
                      }
                      className="absolute -bottom-1 -right-1 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <Camera className="w-3 h-3" />
                    </button>}
                    <input
                      type="file"
                      id="profilePicInputModal"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleUploadProfilePic(e.target.files[0])
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-3">
                      JPG, PNG or GIF (max. 2MB)
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          document
                            .getElementById("profilePicInputModal")
                            .click()
                        }
                        className="py-2 px-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        Upload New
                      </button>
                      <button
                        onClick={() => setProfilePicUrl("")}
                        className="py-2 px-4 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsImageEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsImageEditModalOpen(false)}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Navigation Modal */}
      {isNewNavModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Custom Section
              </h2>
              <button
                onClick={() => setIsNewNavModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Name *
                </label>
                <input
                  type="text"
                  value={newNavData.name}
                  onChange={(e) =>
                    setNewNavData({ ...newNavData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter section name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={newNavData.contentType}
                  onChange={(e) =>
                    setNewNavData({
                      ...newNavData,
                      contentType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="text">Text</option>
                  <option value="link">Link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                {newNavData.contentType === "text" ? (
                  <textarea
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter content for this section"
                  />
                ) : (
                  <input
                    type="text"
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter link URL"
                  />
                )}
              </div>
            </div>
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={() => setIsNewNavModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomNav}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Navigation Modal */}
      {isNavEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Navigation Settings
              </h2>
              <button
                onClick={() => setIsNavEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="mb-2 text-sm text-gray-700 font-medium">
                Show/Hide Sections
              </div>
              <div className="flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!hiddenNavItems.includes(item.id)}
                      onChange={() => handleToggleNavItem(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
                {/* Show custom navigation items too */}
                {customNavigations.map((customNav) => (
                  <label
                    key={customNav.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!hiddenNavItems.includes(customNav.id)}
                      onChange={() => handleToggleNavItem(customNav.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{customNav.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={() => setIsNavEditModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Custom Navigation Modal */}
      {isEditingCustomNav && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Custom Section
              </h2>
              <button
                onClick={() => {
                  setIsEditingCustomNav(false);
                  setEditingCustomNav(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Name *
                </label>
                <input
                  type="text"
                  value={newNavData.name}
                  onChange={(e) =>
                    setNewNavData({ ...newNavData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter section name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={newNavData.contentType}
                  onChange={(e) =>
                    setNewNavData({
                      ...newNavData,
                      contentType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="text">Text</option>
                  <option value="link">Link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                {newNavData.contentType === "text" ? (
                  <textarea
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter content for this section"
                  />
                ) : (
                  <input
                    type="text"
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter link URL"
                  />
                )}
              </div>
            </div>
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={() => {
                  setIsEditingCustomNav(false);
                  setEditingCustomNav(null);
                }}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCustomNav}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
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
