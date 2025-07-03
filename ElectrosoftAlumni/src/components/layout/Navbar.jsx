import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MessageCircle,
  Bell,
  User,
  Home,
  Users,
  Briefcase,
  PlayCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../utils/apiService";

const Navbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const handleViewProfile = () => {
    if (user?.role) {
      const profilePage = apiService.getRoleProfilePage(user.role);
      navigate(profilePage);
    }
    setShowUserDropdown(false);
  };
  return (
    <nav
      className="border-b sticky top-0 z-50"
      style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src="/Logo_Blue.png"
                alt="SCAIPS Logo"
                className="w-14 h-14 object-contain"
              />
              <span
                className="ml-2 font-semibold hidden sm:block"
                style={{ color: "#1F2D3D" }}
              >
                SCAIPS
              </span>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-lg mx-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for connections, jobs, posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none relative z-0"
              />
            </div>
          </div>

          {/* Right side - Navigation Icons */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center cursor-pointer group">
                <a href="/">
                  <Home
                    className="w-5 h-5 transition-colors"
                    style={{ color: "#6EA9CB" }}
                  />{" "}
                </a>
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Home
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <Users
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Network
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <Briefcase
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Jobs
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <MessageCircle
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Messaging
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group relative">
                <Bell
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Notifications
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div
              className="border-l pl-4 relative"
              style={{ borderColor: "#B5D3E7" }}
            >
              <div
                className="flex items-center cursor-pointer group"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <User className="w-4 h-4" style={{ color: "#1F2D3D" }} />
                </div>
                <span
                  className="ml-2 text-sm transition-colors hidden sm:block"
                  style={{ color: "#6EA9CB" }}
                >
                  {user?.name || "Me"}
                </span>
                <ChevronDown
                  className="w-3 h-3 ml-1 transition-transform"
                  style={{
                    color: "#6EA9CB",
                    transform: showUserDropdown
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </div>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName || user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-blue-600 capitalize">
                      {user?.role}
                    </p>
                  </div>
                  <button
                    onClick={handleViewProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
