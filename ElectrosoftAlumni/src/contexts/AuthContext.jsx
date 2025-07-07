import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "../utils/apiService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token in localStorage on app startup
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      console.log("🔍 Checking auth status...", {
        hasToken: !!token,
        hasUserData: !!userData,
        tokenLength: token?.length,
      });

      if (token && userData) {
        // Verify token with backend
        try {
          console.log("🔄 Verifying token with backend...");
          const response = await apiService.getCurrentUser();
          console.log("✅ Backend verification response:", response);

          if (response.success) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            // Update stored user data
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
            console.log(
              "✅ User authenticated successfully",
              response.data.user
            );
          } else {
            throw new Error("Invalid token");
          }
        } catch (apiError) {
          console.error("❌ Token verification failed:", apiError);
          // Token is invalid, clear storage
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        console.log("❌ No token or user data found");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Error checking auth status:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData, token) => {
    // Store token and user data in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Call backend logout to clear refresh token cookie
      await apiService.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear token and user data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);

      // Determine the registration endpoint based on role
      const response = await apiService.register(userData);

      if (response.success) {
        // Auto-login after successful registration
        login(response.data.user, response.data.token);
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await apiService.login(credentials);

      if (response.success) {
        login(response.data.user, response.data.token);
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    register,
    loginUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
