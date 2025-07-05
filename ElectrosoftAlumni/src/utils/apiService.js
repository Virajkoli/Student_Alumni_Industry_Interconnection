// API configuration
const API_BASE_URL = "http://localhost:5000";
// API service class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get authorization headers
  getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request("/api/auth/logout", {
      method: "POST",
    });
  }

  async refreshToken() {
    return this.request("/api/auth/refresh", {
      method: "POST",
    });
  }

  async getCurrentUser() {
    return this.request("/api/auth/me");
  }

  // User endpoints
  async getUserProfile() {
    return this.request("/api/users/profile");
  }

  async updateUserProfile(profileData) {
    return this.request("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  async uploadAvatar(formData) {
    const token = localStorage.getItem("authToken");
    return fetch(`${this.baseURL}/api/users/avatar`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData, // FormData object, don't set Content-Type header
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Avatar upload failed");
      }
      return response.json();
    });
  }

  // Role-specific helpers
  getRoleHomePage(role) {
    const rolePages = {
      student: "/student/dashboard",
      alumni: "/alumni/dashboard",
      college: "/college/dashboard",
      industry: "/industry/dashboard",
      startup: "/startup/dashboard",
    };
    return rolePages[role] || "/";
  }

  getRoleProfilePage(role) {
    const profilePages = {
      student: "/student-profile",
      alumni: "/student-profile", // Alumni can use student profile for now
      college: "/college-profile",
      industry: "/industry-profile",
      startup: "/startup-profile",
    };
    return profilePages[role] || "/student-profile";
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  getRoleHomePage,
  getRoleProfilePage,
} = apiService;
