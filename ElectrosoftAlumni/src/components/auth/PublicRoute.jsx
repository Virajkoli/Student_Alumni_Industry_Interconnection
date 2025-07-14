import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to home if already authenticated
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // Render auth pages if not authenticated
  return children;
};

export default PublicRoute;
