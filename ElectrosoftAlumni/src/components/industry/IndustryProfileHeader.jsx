import React, { useState } from "react";
import { Edit3, X, MapPin, Phone, Mail, Globe, Camera } from "lucide-react";
import { useEffect } from "react";

const styles = {
  hideScrollbar: {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};

const HorizontalProfileNavbar = ({
  onNavigationChange,
  navigationOptions,
  industryData = {},
  isOwner = false,
  onUpdate,
}) => {
  const [activeItem, setActiveItem] = useState("industry-overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [editData, setEditData] = useState({});
  const [initialized, setInitialized] = useState(false);

  // Quick Stats State - Dynamic counts
  const [projectCount, setProjectCount] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Real-time project stats from localStorage or parent component
  const [projectStats, setProjectStats] = useState({
    total: 0,
    
  });

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

  // Fetch project count from Live Projects section or localStorage
  const fetchProjectCount = async () => {
    try {
      setIsLoadingStats(true);
      
      // Try to get real project data from localStorage first (where LiveProjects stores data)
      const storedProjects = localStorage.getItem('industryProjects');
      let projects = [];
      
      if (storedProjects) {
        try {
          projects = JSON.parse(storedProjects);
        } catch (e) {
          console.warn('Failed to parse stored projects:', e);
        }
      }
      
      // If no stored data, create some sample data or use API
      if (!projects || projects.length === 0) {
        // You can replace this with actual API call
        projects = [
          { id: 1, status: "Open" },
          { id: 2, status: "In Progress" },
          { id: 3, status: "Open" },
          { id: 4, status: "Completed" },
          { id: 5, status: "Open" }
        ];
      }
      
      // Calculate stats
      const stats = {
        total: projects.length,
        open: projects.filter(p => p.status === "Open").length,
        inProgress: projects.filter(p => p.status === "In Progress").length,
        completed: projects.filter(p => p.status === "Completed").length
      };
      
      setProjectCount(stats.total);
      setProjectStats(stats);
      
    } catch (error) {
      console.error("Error fetching project count:", error);
      setProjectCount(0);
      setProjectStats({ total: 0, open: 0, inProgress: 0, completed: 0 });
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fetch connection count
  const fetchConnectionCount = async () => {
    try {
      // Simulate API call for industry connections
      const count = Math.floor(Math.random() * 1000) + 200; // Random between 200-1200
      setConnectionCount(count);
    } catch (error) {
      console.error("Error fetching connection count:", error);
      setConnectionCount(0);
    }
  };

  // Open project modal (if owner)
  const openProjectModal = () => {
    if (isOwner) {
      // Navigate to Live Projects section
      setActiveItem("live-projects");
      if (onNavigationChange) {
        onNavigationChange("live-projects", "Live Projects");
      }
    }
  };

  useEffect(() => {
    if (industryData && !initialized) {
      setProfileData(industryData);
      setEditData(industryData);
      setInitialized(true);

      // Fetch quick stats when profile loads
      fetchProjectCount();
      fetchConnectionCount();
    }

    // Listen for project updates from LiveProjects component
    const handleProjectUpdate = () => {
      fetchProjectCount();
    };

    // Add event listeners for real-time updates
    window.addEventListener('projectAdded', handleProjectUpdate);
    window.addEventListener('projectUpdated', handleProjectUpdate);
    window.addEventListener('projectDeleted', handleProjectUpdate);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('projectAdded', handleProjectUpdate);
      window.removeEventListener('projectUpdated', handleProjectUpdate);
      window.removeEventListener('projectDeleted', handleProjectUpdate);
    };
  }, [industryData, initialized]);

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
    if (onUpdate) {
      onUpdate(editData);
    }
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
      <div
        className="rounded-xl shadow-sm border overflow-hidden mb-6"
        style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
      >
        {/* Profile Header - Horizontal */}
        <div className="relative">
          {/* Increased height from h-24 to h-32 */}
          <div
            className="h-44"
            style={{
              background: "linear-gradient(135deg, #B5D3E7 0%, #6EA9CB 100%)",
            }}
          ></div>
          {/* Edit Button - Only show if user is owner */}
          {isOwner && (
            <button
              onClick={handleEditClick}
              className="absolute top-4 right-4 p-2 hover:opacity-80 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(110, 169, 203, 0.3)" }}
              title="Edit Profile"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          )}
          {/* Larger profile image, adjusted positioning */}
          <div className="absolute -bottom-14 left-8">
            <div
              className="w-28 h-28 rounded-full p-1.5 shadow-xl"
              style={{ backgroundColor: "#F7FAFC" }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to bottom right, #DCE8F2, #B5D3E7)",
                }}
              >
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
        <div
          className="pt-16 px-8 pb-6 border-b"
          style={{ borderColor: "#DCE8F2" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
                {profileData?.companyName || "Loading..."}
              </h3>
              <p
                className="text-md font-medium mt-1"
                style={{ color: "#6EA9CB" }}
              >
                {profileData?.industryType || ""}
              </p>
              <div
                className="flex items-center text-sm mt-2"
                style={{ color: "#1F2D3D", opacity: "0.7" }}
              >
                <MapPin className="w-4 h-4 mr-1.5" />
                {profileData?.location || "N/A"}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <button
                className="py-2 px-5 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-colors duration-200"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Connect
              </button>
            </div>
          </div>

          {/* Quick Stats - Dynamic with Live Project Count */}
          <div
            className="flex items-center justify-around mt-6 pt-4 border-t"
            style={{ borderColor: "#DCE8F2" }}
          >
            {/* Total Projects */}
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <button
                  onClick={isOwner ? openProjectModal : undefined}
                  className={`${
                    isOwner
                      ? "hover:bg-gray-100 cursor-pointer"
                      : "cursor-default"
                  } p-2 rounded-lg transition-colors`}
                  title={isOwner ? "View your live projects" : "Total Projects"}
                >
                  <span className="font-bold text-lg" style={{ color: "#1F2D3D" }}>
                    {isLoadingStats ? "..." : projectStats.total}
                  </span>
                </button>
                {isOwner && (
                  <button
                    onClick={fetchProjectCount}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Refresh project count"
                    disabled={isLoadingStats}
                  >
                    <svg
                      className={`w-3 h-3 text-gray-400 ${
                        isLoadingStats ? "animate-spin" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <span
                className="text-sm"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Projects
              </span>
            </div>

            {/* Connections */}
            <div className="text-center">
              <span className="font-bold text-lg" style={{ color: "#007AFF" }}>
                {connectionCount}+
              </span>
              <span
                className="block text-sm"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Connections
              </span>
            </div>

            {/* Rating */}
            <div className="text-center">
              <span
                className="block text-lg font-bold"
                style={{ color: "#1F2D3D" }}
              >
                4.9
              </span>
              <span
                className="block text-sm"
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
          <div
            className="flex overflow-x-auto px-2"
            style={styles.hideScrollbar}
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap relative group ${
                  activeItem === item.id ? "text-white" : "hover:opacity-80"
                }`}
                style={{
                  borderBottomColor:
                    activeItem === item.id ? "#6EA9CB" : "transparent",
                  backgroundColor:
                    activeItem === item.id ? "#B5D3E7" : "transparent",
                  color: activeItem === item.id ? "#1F2D3D" : "#1F2D3D",
                }}
              >
                {item.name}
                {/* Tooltip */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-12 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-normal w-48 text-center shadow-lg"
                  style={{ backgroundColor: "#1F2D3D" }}
                >
                  {item.description}
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 transform rotate-45"
                    style={{ backgroundColor: "#1F2D3D" }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Profile
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={editData.headline}
                    onChange={(e) =>
                      handleInputChange("headline", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="Your professional headline"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Phone
                  </label>
                  <div className="flex items-center">
                    <Phone
                      className="w-5 h-5 mr-2"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    />
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Email
                  </label>
                  <div className="flex items-center">
                    <Mail
                      className="w-5 h-5 mr-2"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    />
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Website
                  </label>
                  <div className="flex items-center">
                    <Globe
                      className="w-5 h-5 mr-2"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    />
                    <input
                      type="url"
                      value={editData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    About
                  </label>
                  <textarea
                    value={editData.about}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="p-6 border-t"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-90"
                  style={{
                    color: "#1F2D3D",
                    backgroundColor: "#F7FAFC",
                    borderColor: "#DCE8F2",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90"
                  style={{ backgroundColor: "#6EA9CB" }}
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
