// API configuration
console.log("🔧 Environment variables:", {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  NODE_ENV: import.meta.env.NODE_ENV,
  MODE: import.meta.env.MODE,
});

// Use localhost for development
const API_BASE_URL = "https://scaips-backend.onrender.com";
// const API_BASE_URL = "http://localhost:5000"; // Use this for local development

console.log("🚀 Using API Base URL:", API_BASE_URL);

console.log("🌐 API Base URL configured as:", API_BASE_URL);

// Debug: Show what URL we're actually using
if (API_BASE_URL.includes("localhost")) {
  console.log("🏠 Using LOCAL development backend");
} else {
  console.log("🌐 Using REMOTE production backend");
}
// API service class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    console.log("🔗 ApiService initialized with baseURL:", this.baseURL);
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
      console.log(`🌐 API Request: ${config.method || "GET"} ${url}`);
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ API Error: ${response.status}`, data);
        // Handle authentication errors specifically
        if (response.status === 401) {
          console.log("🔑 Authentication failed - clearing tokens");
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      console.log(`✅ API Success: ${config.method || "GET"} ${url}`, data);
      return data;
    } catch (error) {
      console.error("❌ API request failed:", error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    // Determine endpoint based on role
    const endpoint =
      userData.role === "college"
        ? "/api/auth/register/college"
        : "/api/auth/register";

    return this.request(endpoint, {
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

  // Google authentication endpoints
  async googleLogin(googleData) {
    return this.request("/api/auth/google/login", {
      method: "POST",
      body: JSON.stringify(googleData),
    });
  }

  async googleRegister(googleData) {
    return this.request("/api/auth/google/register", {
      method: "POST",
      body: JSON.stringify(googleData),
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

  // Student Profile endpoints
  async getStudentProfile() {
    return this.request("/api/students/profile");
  }

  async updateStudentBasicInfo(basicInfo) {
    return this.request("/api/students/basic-info", {
      method: "PUT",
      body: JSON.stringify(basicInfo),
    });
  }

  async updateStudentAbout(aboutData) {
    return this.request("/api/students/about", {
      method: "PUT",
      body: JSON.stringify(aboutData),
    });
  }

  // Experience methods
  async addStudentExperience(experienceData) {
    return this.request("/api/students/experience", {
      method: "POST",
      body: JSON.stringify(experienceData),
    });
  }

  async updateStudentExperience(experienceId, experienceData) {
    return this.request(`/api/students/experience/${experienceId}`, {
      method: "PUT",
      body: JSON.stringify(experienceData),
    });
  }

  async deleteStudentExperience(experienceId) {
    return this.request(`/api/students/experience/${experienceId}`, {
      method: "DELETE",
    });
  }

  // Education methods
  async addStudentEducation(educationData) {
    return this.request("/api/students/education", {
      method: "POST",
      body: JSON.stringify(educationData),
    });
  }

  async updateStudentEducation(educationId, educationData) {
    return this.request(`/api/students/education/${educationId}`, {
      method: "PUT",
      body: JSON.stringify(educationData),
    });
  }

  async deleteStudentEducation(educationId) {
    return this.request(`/api/students/education/${educationId}`, {
      method: "DELETE",
    });
  }

  // Skills methods
  async addStudentSkill(skillData) {
    return this.request("/api/students/skills", {
      method: "POST",
      body: JSON.stringify(skillData),
    });
  }

  async updateStudentSkill(skillId, skillData) {
    return this.request(`/api/students/skills/${skillId}`, {
      method: "PUT",
      body: JSON.stringify(skillData),
    });
  }

  async deleteStudentSkill(skillId) {
    return this.request(`/api/students/skills/${skillId}`, {
      method: "DELETE",
    });
  }

  // Projects methods
  async addStudentProject(projectData) {
    return this.request("/api/students/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  }

  async updateStudentProject(projectId, projectData) {
    return this.request(`/api/students/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    });
  }

  async deleteStudentProject(projectId) {
    return this.request(`/api/students/projects/${projectId}`, {
      method: "DELETE",
    });
  }

  // Courses methods
  async addStudentCourse(courseData) {
    return this.request("/api/students/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  }

  async updateStudentCourse(courseId, courseData) {
    return this.request(`/api/students/courses/${courseId}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    });
  }

  async deleteStudentCourse(courseId) {
    return this.request(`/api/students/courses/${courseId}`, {
      method: "DELETE",
    });
  }

  // Certifications methods
  async addStudentCertification(certificationData) {
    return this.request("/api/students/certifications", {
      method: "POST",
      body: JSON.stringify(certificationData),
    });
  }

  async updateStudentCertification(certificationId, certificationData) {
    return this.request(`/api/students/certifications/${certificationId}`, {
      method: "PUT",
      body: JSON.stringify(certificationData),
    });
  }

  async deleteStudentCertification(certificationId) {
    return this.request(`/api/students/certifications/${certificationId}`, {
      method: "DELETE",
    });
  }

  // Recommendation methods
  async addStudentRecommendation(recommendationData) {
    return this.request("/api/students/recommendations", {
      method: "POST",
      body: JSON.stringify(recommendationData),
    });
  }

  async updateStudentRecommendation(recommendationId, recommendationData) {
    return this.request(`/api/students/recommendations/${recommendationId}`, {
      method: "PUT",
      body: JSON.stringify(recommendationData),
    });
  }

  async deleteStudentRecommendation(recommendationId) {
    return this.request(`/api/students/recommendations/${recommendationId}`, {
      method: "DELETE",
    });
  }

  // Posts API methods
  async createPost(postData, mediaFiles = []) {
    const token = localStorage.getItem("authToken");
    const url = `${this.baseURL}/api/posts`;

    try {
      console.log(`🌐 API Request: POST ${url}`);
      console.log(`📝 Post data:`, postData);
      console.log(`📎 Media files:`, mediaFiles?.length || 0);

      // If there are no media files, send as JSON
      if (!mediaFiles || mediaFiles.length === 0) {
        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(postData),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(`❌ API Error: ${response.status}`, data);

          // Handle specific error cases with better messages
          if (response.status === 401) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            throw new Error("🔑 Session expired. Please login again.");
          } else if (response.status === 500) {
            throw new Error(
              "🔧 Server error. The backend service is experiencing issues. Please try again in a few moments."
            );
          } else if (response.status === 400) {
            throw new Error(
              data.message ||
                "📝 Invalid request. Please check your input and try again."
            );
          } else if (response.status === 413) {
            throw new Error("📎 File too large. Please choose smaller files.");
          } else if (response.status === 403) {
            throw new Error("🚫 Access denied. Please check your permissions.");
          }

          throw new Error(
            data.message ||
              `❌ Server error (${response.status}). Please try again.`
          );
        }

        console.log(`✅ API Success: POST ${url}`, data);
        return data;
      }

      // If there are media files, send as FormData
      const formData = new FormData();

      // Add text content
      if (postData.content) {
        formData.append("content", postData.content);
      }

      // Add poll options if present
      if (postData.pollOptions) {
        formData.append("pollOptions", JSON.stringify(postData.pollOptions));
      }

      // Add media files
      mediaFiles.forEach((file, index) => {
        formData.append("media", file);
        console.log(`📎 Adding file ${index + 1}: ${file.name} (${file.type})`);
      });

      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData, let browser set it with boundary
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ API Error: ${response.status}`, data);

        // Handle specific error cases with better messages
        if (response.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          throw new Error("🔑 Session expired. Please login again.");
        } else if (response.status === 500) {
          throw new Error(
            "🔧 Server error. The backend service is experiencing issues. Please try again in a few moments."
          );
        } else if (response.status === 400) {
          throw new Error(
            data.message ||
              "📝 Invalid request. Please check your input and try again."
          );
        } else if (response.status === 413) {
          throw new Error("📎 File too large. Please choose smaller files.");
        } else if (response.status === 403) {
          throw new Error("🚫 Access denied. Please check your permissions.");
        }

        throw new Error(
          data.message ||
            `❌ Server error (${response.status}). Please try again.`
        );
      }

      console.log(`✅ API Success: POST ${url}`, data);
      return data;
    } catch (error) {
      console.error("❌ Create post request failed:", error);
      throw error;
    }
  }

  async getPosts(params = {}) {
    const queryParams = new URLSearchParams();

    if (params.userId) queryParams.append("userId", params.userId);
    if (params.userType) queryParams.append("userType", params.userType);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.offset) queryParams.append("offset", params.offset);

    const queryString = queryParams.toString();
    const endpoint = `/api/posts${queryString ? `?${queryString}` : ""}`;

    return this.request(endpoint, {
      method: "GET",
    });
  }

  async getMyPosts(params = {}) {
    const queryParams = new URLSearchParams();

    if (params.limit) queryParams.append("limit", params.limit);
    if (params.offset) queryParams.append("offset", params.offset);

    const queryString = queryParams.toString();
    const endpoint = `/api/posts/my-posts${
      queryString ? `?${queryString}` : ""
    }`;

    return this.request(endpoint, {
      method: "GET",
    });
  }

  async reactToPost(postId, reactionType) {
    return this.request(`/api/posts/${postId}/react`, {
      method: "POST",
      body: JSON.stringify({ reactionType }),
    });
  }

  async deletePost(postId) {
    return this.request(`/api/posts/${postId}`, {
      method: "DELETE",
    });
  }

  // Helper method to get media URL
  getMediaUrl(mediaPath) {
    if (!mediaPath) return null;

    // If mediaPath already starts with http/https, return as is (Cloudinary URLs)
    if (mediaPath.startsWith("http://") || mediaPath.startsWith("https://")) {
      console.log(`🔗 Media URL (Cloudinary): ${mediaPath}`);
      return mediaPath;
    }

    // For backward compatibility with old local file paths
    // This shouldn't happen with new uploads but may exist for old data
    console.warn(`⚠️ Legacy media path detected: ${mediaPath}`);

    const mediaBaseURL = "https://scaips-backend.onrender.com";
    let cleanPath = mediaPath;
    if (mediaPath.startsWith("/uploads/")) {
      cleanPath = mediaPath.substring(9);
    } else if (mediaPath.startsWith("uploads/")) {
      cleanPath = mediaPath.substring(8);
    }

    const fullUrl = `${mediaBaseURL}/api/media/${cleanPath}`;
    console.log(`🔗 Legacy Media URL: ${mediaPath} → ${fullUrl}`);
    return fullUrl;
  }

  // Helper method to get base URL (for components that need direct access)
  getBaseUrl() {
    return this.baseURL;
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

  // Test connection method for debugging
  async testConnection() {
    try {
      console.log("🔍 Testing backend connection...");

      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();

      console.log("Backend health check:", {
        status: response.status,
        data: data,
      });

      return {
        success: response.ok,
        status: response.status,
        data: data,
      };
    } catch (error) {
      console.error("❌ Connection test failed:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Test authentication
  async testAuth() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return { success: false, error: "No auth token found" };
      }

      console.log("🔍 Testing authentication...");

      const response = await fetch(`${this.baseURL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Auth test result:", {
        status: response.status,
        data: data,
      });

      return {
        success: response.ok,
        status: response.status,
        data: data,
      };
    } catch (error) {
      console.error("❌ Auth test failed:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Create studentAPI object for easier access to student-related methods
export const studentAPI = {
  // Profile methods
  getProfile: () => apiService.getStudentProfile(),
  updateBasicInfo: (basicInfo) => apiService.updateStudentBasicInfo(basicInfo),
  updateAbout: (aboutData) => apiService.updateStudentAbout(aboutData),

  // Experience methods
  addExperience: (studentId, experienceData) =>
    apiService.addStudentExperience(experienceData),
  updateExperience: (studentId, experienceId, experienceData) =>
    apiService.updateStudentExperience(experienceId, experienceData),
  deleteExperience: (studentId, experienceId) =>
    apiService.deleteStudentExperience(experienceId),

  // Education methods
  addEducation: (studentId, educationData) =>
    apiService.addStudentEducation(educationData),
  updateEducation: (studentId, educationId, educationData) =>
    apiService.updateStudentEducation(educationId, educationData),
  deleteEducation: (studentId, educationId) =>
    apiService.deleteStudentEducation(educationId),

  // Skills methods
  addSkill: (studentId, skillData) => apiService.addStudentSkill(skillData),
  updateSkill: (studentId, skillId, skillData) =>
    apiService.updateStudentSkill(skillId, skillData),
  deleteSkill: (studentId, skillId) => apiService.deleteStudentSkill(skillId),

  // Projects methods
  addProject: (studentId, projectData) =>
    apiService.addStudentProject(projectData),
  updateProject: (studentId, projectId, projectData) =>
    apiService.updateStudentProject(projectId, projectData),
  deleteProject: (studentId, projectId) =>
    apiService.deleteStudentProject(projectId),

  // Courses methods
  addCourse: (studentId, courseData) => apiService.addStudentCourse(courseData),
  updateCourse: (studentId, courseId, courseData) =>
    apiService.updateStudentCourse(courseId, courseData),
  deleteCourse: (studentId, courseId) =>
    apiService.deleteStudentCourse(courseId),

  // Certifications methods
  addCertification: (studentId, certificationData) =>
    apiService.addStudentCertification(certificationData),
  updateCertification: (studentId, certificationId, certificationData) =>
    apiService.updateStudentCertification(certificationId, certificationData),
  deleteCertification: (studentId, certificationId) =>
    apiService.deleteStudentCertification(certificationId),

  // Recommendations methods
  addRecommendation: (studentId, recommendationData) =>
    apiService.addStudentRecommendation(recommendationData),
  updateRecommendation: (studentId, recommendationId, recommendationData) =>
    apiService.updateStudentRecommendation(
      recommendationId,
      recommendationData
    ),
  deleteRecommendation: (studentId, recommendationId) =>
    apiService.deleteStudentRecommendation(recommendationId),
};

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
