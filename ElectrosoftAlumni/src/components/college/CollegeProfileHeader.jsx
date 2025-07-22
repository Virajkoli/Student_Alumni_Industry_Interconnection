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
  Building,
  Calendar,
  Award,
  Users,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";

import apiService from "../../services/apiService";

const CollegeProfileHeader = ({
  profileData,
  onProfileUpdate,
  onNavigationChange,
  customNavigations,
  onCustomNavigationUpdate,
  isOwner = false,
  sectionsData = {},
  activeTab = "college-info", // Add activeTab prop
}) => {
  // Profile edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageEditModalOpen, setIsImageEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [isEditing, setIsEditing] = useState(false);

  // Navigation state - sync with parent activeTab
  const [activeItem, setActiveItem] = useState(activeTab);
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

  // Sync activeItem with activeTab prop
  useEffect(() => {
    setActiveItem(activeTab);
  }, [activeTab]);

  // Profile picture and cover photo URLs
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPicUrl, setCoverPicUrl] = useState("");

  // College stats
  const [collegeStats, setCollegeStats] = useState({
    departments: 0,
    faculty: 0,
    students: 0,
    rating: 0,
  });

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

  // Update image URLs when profileData changes
  useEffect(() => {
    if (profileData) {
      const profilePic = profileData.profilePicture || "";
      const coverPic = profileData.backgroundUrl || "";

      console.log("Profile pic URL:", profilePic);
      console.log("Cover pic URL:", coverPic);

      setProfilePicUrl(profilePic);
      setCoverPicUrl(coverPic);

      // Update stats
      setCollegeStats({
        departments: profileData.totalDepartments || 0,
        faculty: profileData.totalFaculty || 0,
        students: profileData.totalStudents || 0,
        rating: profileData.nirfRank || 0,
      });
    }
  }, [profileData]);

  // Listen for custom navigation edit events
  useEffect(() => {
    const handleEditCustomNavigation = (event) => {
      const { customNav } = event.detail;
      setEditingCustomNav(customNav);
      setIsEditingCustomNav(true);
      setIsNavEditModalOpen(true);
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
      id: "college-info",
      name: "College Info",
      shortName: "Info",
    },
    {
      id: "course-details",
      name: "Course Details",
      shortName: "Courses",
    },
    {
      id: "course-fees",
      name: "Course Fees",
      shortName: "Fees",
    },
    {
      id: "review",
      name: "Review",
      shortName: "Reviews",
    },
    {
      id: "admission",
      name: "Admission",
      shortName: "Admission",
    },
    {
      id: "placement",
      name: "Placement",
      shortName: "Placement",
    },
    {
      id: "faculty",
      name: "Faculty",
      shortName: "Faculty",
    },
    {
      id: "hostel",
      name: "Hostel/Campus",
      shortName: "Campus",
    },
    {
      id: "alumni",
      name: "Alumni",
      shortName: "Alumni",
    },
    {
      id: "events",
      name: "Events",
      shortName: "Events",
    },
    {
      id: "downloads",
      name: "Downloads",
      shortName: "Downloads",
    },
  ];

  // Profile handlers
  const handleEditClick = () => {
    const normalizedData = {
      ...profileData,
      name: profileData.name || "",
      location: profileData.location || "",
      website: profileData.website || "",
      description: profileData.description || "",
      accreditation: profileData.accreditation || "",
      established: profileData.established || "",
    };
    setEditData(normalizedData);
    setIsEditModalOpen(true);
  };

  const handleImageEditClick = () => {
    setIsImageEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    try {
      setIsEditing(true);
      const response = await apiService.updateCollegeProfile(editData);

      if (response.success) {
        toast.success("Profile updated successfully");
        if (onProfileUpdate) {
          onProfileUpdate(response.data);
        }
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsEditing(false);
    }
  };

  const handleUploadProfilePic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await apiService.uploadCollegeProfileImage(formData);
      await fetchUserData(); // Refresh user data with new profilePicture

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
      const response = await apiService.uploadCollegeCoverImage(formData);
      await fetchUserData(); // Refresh user data with new coverPicture

      setCoverPicUrl(response.data.cover_picture);
      toast.success("Cover picture updated");
    } catch (error) {
      console.error("Failed to upload cover picture:", error);
      toast.error(error.message || "Upload failed");
    }
  };

  const handleRemoveProfilePic = () => {
    if (onProfileUpdate) {
      onProfileUpdate({ ...profileData, profilePicture: "" });
    }
  };

  const handleRemoveCoverPic = () => {
    if (onProfileUpdate) {
      onProfileUpdate({ ...profileData, backgroundUrl: "" });
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
    if (onNavigationChange) {
      onNavigationChange(item.id);
    }
  };

  const handleCustomNavClick = (customNav) => {
    setActiveItem(`custom-${customNav.id}`);
    if (onNavigationChange) {
      onNavigationChange(`custom-${customNav.id}`, customNav);
    }
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
      const customNav = {
        id: Date.now(),
        ...newNavData,
      };

      if (onCustomNavigationUpdate) {
        onCustomNavigationUpdate([...(customNavigations || []), customNav]);
      }

      setNewNavData({ name: "", contentType: "text", content: "" });
      setIsNewNavModalOpen(false);
    }
  };

  const handleUpdateCustomNav = () => {
    if (editingCustomNav && customNavigations) {
      const updatedCustomNavs = customNavigations.map((nav) =>
        nav.id === editingCustomNav.id ? { ...nav, ...editingCustomNav } : nav
      );

      if (onCustomNavigationUpdate) {
        onCustomNavigationUpdate(updatedCustomNavs);
      }

      setEditingCustomNav(null);
      setIsEditingCustomNav(false);
      setIsNavEditModalOpen(false);
    }
  };

  const handleDeleteCustomNav = (customNavId) => {
    if (customNavigations) {
      const updatedCustomNavs = customNavigations.filter(
        (nav) => nav.id !== customNavId
      );

      if (onCustomNavigationUpdate) {
        onCustomNavigationUpdate(updatedCustomNavs);
      }
    }
  };

  const visibleNavigationItems = navigationItems.filter(
    (item) => !hiddenNavItems.includes(item.id)
  );

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Cover Photo Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
        {coverPicUrl ? (
          <img
            src={coverPicUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600" />
        )}

        {isOwner && (
          <button
            onClick={handleImageEditClick}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <Camera className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profile Info Section */}
      <div className="px-6 pb-4">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="flex items-end space-x-4">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                {profilePicUrl ? (
                  <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Building className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              {isOwner && (
                <button
                  onClick={handleImageEditClick}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* College Basic Info */}
            <div className="pb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData?.name || "College Name"}
              </h1>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {profileData?.location || "Location"}
              </p>
              {profileData?.website && (
                <p className="text-blue-600 flex items-center mt-1">
                  <Globe className="w-4 h-4 mr-1" />
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {profileData.website}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pb-2">
            {isOwner ? (
              <button
                onClick={handleEditClick}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Follow</span>
              </button>
            )}
          </div>
        </div>

        {/* College Stats */}
        <div className="flex space-x-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {collegeStats.students.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {collegeStats.faculty}+
            </div>
            <div className="text-sm text-gray-600">Faculty</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {collegeStats.departments}+
            </div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
          {collegeStats.rating > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500 mr-1" />
                {collegeStats.rating}
              </div>
              <div className="text-sm text-gray-600">NIRF Rank</div>
            </div>
          )}
        </div>

        {/* College Description */}
        {profileData?.description && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {profileData.description}
            </p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex space-x-8 overflow-x-auto">
            {visibleNavigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`text-sm font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  activeItem === item.id
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Custom Navigation Items */}
            {customNavigations?.map((customNav) => (
              <button
                key={`custom-${customNav.id}`}
                onClick={() => handleCustomNavClick(customNav)}
                className={`text-sm font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  activeItem === `custom-${customNav.id}`
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                {customNav.name}
              </button>
            ))}

            {/* Navigation Management */}
            {isOwner && (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => setIsNewNavModalOpen(true)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsNavEditModalOpen(true)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit College Profile
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  value={editData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editData.location || ""}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={editData.website || ""}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Year
                </label>
                <input
                  type="number"
                  value={editData.established || ""}
                  onChange={(e) =>
                    handleInputChange("established", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accreditation
                </label>
                <input
                  type="text"
                  value={editData.accreditation || ""}
                  onChange={(e) =>
                    handleInputChange("accreditation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={editData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about your college..."
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isEditing}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isEditing ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Edit Modal */}
      {isImageEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Update Pictures
              </h2>
              <button
                onClick={() => setIsImageEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadProfilePic(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadCoverPic(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsImageEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Navigation Modal */}
      {isNewNavModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Custom Navigation
              </h2>
              <button
                onClick={() => setIsNewNavModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Navigation Name
                </label>
                <input
                  type="text"
                  value={newNavData.name}
                  onChange={(e) =>
                    setNewNavData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter navigation name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={newNavData.contentType}
                  onChange={(e) =>
                    setNewNavData((prev) => ({
                      ...prev,
                      contentType: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="html">HTML</option>
                  <option value="embed">Embed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={newNavData.content}
                  onChange={(e) =>
                    setNewNavData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter content"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsNewNavModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomNav}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Edit Modal */}
      {isNavEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Navigation
              </h2>
              <button
                onClick={() => setIsNavEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Default Navigation Items */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Default Navigation
                </h3>
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <span className="text-gray-900">{item.name}</span>
                      <button
                        onClick={() => handleToggleNavItem(item.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          hiddenNavItems.includes(item.id)
                            ? "bg-gray-200 text-gray-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {hiddenNavItems.includes(item.id)
                          ? "Hidden"
                          : "Visible"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Navigation Items */}
              {customNavigations && customNavigations.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Custom Navigation
                  </h3>
                  <div className="space-y-2">
                    {customNavigations.map((customNav) => (
                      <div
                        key={customNav.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <span className="text-gray-900">{customNav.name}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCustomNav(customNav);
                              setIsEditingCustomNav(true);
                            }}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCustomNav(customNav.id)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsNavEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              {isEditingCustomNav && (
                <button
                  onClick={handleUpdateCustomNav}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Update Navigation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeProfileHeader;
