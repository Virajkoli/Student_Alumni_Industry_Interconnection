import React from "react";
import {
  Search,
  MessageCircle,
  Bell,
  User,
  Home,
  Users,
  Briefcase,
  PlayCircle,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Logo and Search */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-sm">
                S
              </div>
              <span className="ml-2 font-semibold text-gray-900 hidden sm:block">
                StartupConnect
              </span>
            </div>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-64 pl-10 pr-4 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - Navigation Icons */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center cursor-pointer group">
                <Home className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">
                  Home
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <Users className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">
                  Network
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <Briefcase className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">
                  Jobs
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">
                  Messaging
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group relative">
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">
                  Notifications
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="border-l border-gray-200 pl-4">
              <div className="flex items-center cursor-pointer group">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600 hidden sm:block">
                  Me
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
