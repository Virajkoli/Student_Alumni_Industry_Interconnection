import axios from "axios";
import api from "./axiosInstance"; // Make sure this is correct path

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL
      ? `${import.meta.env.VITE_API_BASE_URL}/api`
      : "http://localhost:5000/api";
    this.api = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await this.api.post("/auth/refresh-token");
            const { accessToken } = response.data.tokens;

            localStorage.setItem("accessToken", accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return this.api(originalRequest);
          } catch (refreshError) {
            // Redirect to login if refresh fails
            localStorage.removeItem("accessToken");
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async searchUsers(query) {
    try {
      const response = await this.api.get(
        `/search/users?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Search error:", error);
      throw new Error(error.response?.data?.message || "Search failed");
    }
  }

  // Authentication methods
  async register(userData) {
    try {
      const response = await this.api.post("/auth/register", userData);
      if (response.data.tokens?.accessToken) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }

  async login(credentials) {
    try {
      const response = await this.api.post("/auth/login", credentials);
      if (response.data.tokens?.accessToken) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  async registerWithGoogle(userData) {
    try {
      // Extract role from userData and send in the format backend expects
      const { role, ...googleUserData } = userData;

      // Validate required fields before sending to backend
      if (!googleUserData.email) {
        throw new Error("Email is required for Google registration");
      }

      if (!googleUserData.id && !googleUserData.googleId) {
        throw new Error("Google ID is required for Google registration");
      }

      // Ensure googleId is set if missing
      if (!googleUserData.googleId && googleUserData.id) {
        googleUserData.googleId = googleUserData.id;
      }

      console.log("🔍 Google registration data:", {
        userData: googleUserData,
        role,
      });

      const requestData = {
        userData: googleUserData,
        role: role,
      };

      const response = await this.api.post(
        "/auth/google/register",
        requestData
      );
      if (response.data.tokens?.accessToken) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("❌ Google registration error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Google registration failed"
      );
    }
  }

  async loginWithGoogle(userData) {
    try {
      // Extract role from userData and send in the format backend expects
      const { role, ...googleUserData } = userData;

      // Validate required fields before sending to backend
      if (!googleUserData.email) {
        throw new Error("Email is required for Google login");
      }

      if (!googleUserData.id && !googleUserData.googleId) {
        throw new Error("Google ID is required for Google login");
      }

      // Ensure googleId is set if missing
      if (!googleUserData.googleId && googleUserData.id) {
        googleUserData.googleId = googleUserData.id;
      }

      console.log("🔍 Google login data:", { userData: googleUserData, role });

      const requestData = {
        userData: googleUserData,
        role: role,
      };

      const response = await this.api.post("/auth/google/login", requestData);
      if (response.data.tokens) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("❌ Google login error:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Google login failed"
      );
    }
  }

  async checkGoogleAccount(email, role) {
    try {
      const response = await this.api.post("/auth/check-google-account", {
        email,
        role,
      });
      return response.data;
    } catch (error) {
      console.error("Check Google account error:", error);
      return {
        success: false,
        isGoogleAccount: false,
        message: "Could not check account type",
      };
    }
  }

  async logout() {
    try {
      await this.api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      return { success: true };
    } catch (error) {
      // Even if logout fails on server, clear local token
      localStorage.removeItem("accessToken");
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  }

  // Profile API methods using the new consolidated backend
  async getStudentProfileComplete() {
    try {
      const response = await this.api.get("/profile/complete");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get student profile"
      );
    }
  }

  async getStudentProfileSummary() {
    try {
      const response = await this.api.get("/profile/summary");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get profile summary"
      );
    }
  }

  // About section
  async getStudentAbout() {
    try {
      const response = await this.api.get("/profile/about");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get about section"
      );
    }
  }

  async updateStudentAbout(aboutData) {
    try {
      const response = await this.api.put("/profile/about", aboutData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update about section"
      );
    }
  }

  // Experience section
  async getStudentExperiences() {
    try {
      const response = await this.api.get("/profile/experience");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get experiences"
      );
    }
  }

  async createStudentExperience(experienceData) {
    try {
      const response = await this.api.post(
        "/profile/experience",
        experienceData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create experience"
      );
    }
  }

  async updateStudentExperience(experienceId, experienceData) {
    try {
      const response = await this.api.put(
        `/profile/experience/${experienceId}`,
        experienceData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update experience"
      );
    }
  }

  async deleteStudentExperience(experienceId) {
    try {
      const response = await this.api.delete(
        `/profile/experience/${experienceId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete experience"
      );
    }
  }

  // Education section
  async getStudentEducation() {
    try {
      const response = await this.api.get("/profile/education");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get education"
      );
    }
  }

  async createStudentEducation(educationData) {
    try {
      const response = await this.api.post("/profile/education", educationData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create education"
      );
    }
  }

  async updateStudentEducation(educationId, educationData) {
    try {
      const response = await this.api.put(
        `/profile/education/${educationId}`,
        educationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update education"
      );
    }
  }

  async deleteStudentEducation(educationId) {
    try {
      const response = await this.api.delete(
        `/profile/education/${educationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete education"
      );
    }
  }

  // Skills section
  async getStudentSkills() {
    try {
      const response = await this.api.get("/profile/skills");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get skills");
    }
  }

  async createStudentSkill(skillData) {
    try {
      const response = await this.api.post("/profile/skills", skillData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create skill"
      );
    }
  }

  async createStudentSkills(skillsData) {
    try {
      const response = await this.api.post("/profile/skills/batch", skillsData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create skills"
      );
    }
  }

  async updateStudentSkill(skillId, skillData) {
    try {
      const response = await this.api.put(
        `/profile/skills/${skillId}`,
        skillData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update skill"
      );
    }
  }

  async deleteStudentSkill(skillId) {
    try {
      const response = await this.api.delete(`/profile/skills/${skillId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete skill"
      );
    }
  }

  // Projects section
  async getStudentProjects() {
    try {
      const response = await this.api.get("/profile/projects");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get projects"
      );
    }
  }

  async createStudentProject(projectData) {
    try {
      const response = await this.api.post("/profile/projects", projectData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }

  async updateStudentProject(projectId, projectData) {
    try {
      const response = await this.api.put(
        `/profile/projects/${projectId}`,
        projectData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }

  async deleteStudentProject(projectId) {
    try {
      const response = await this.api.delete(`/profile/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }

  // Courses section
  async getStudentCourses() {
    try {
      const response = await this.api.get("/profile/courses");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get courses");
    }
  }

  async createStudentCourse(courseData) {
    try {
      const response = await this.api.post("/profile/courses", courseData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }

  async updateStudentCourse(courseId, courseData) {
    try {
      const response = await this.api.put(
        `/profile/courses/${courseId}`,
        courseData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update course"
      );
    }
  }

  async deleteStudentCourse(courseId) {
    try {
      const response = await this.api.delete(`/profile/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete course"
      );
    }
  }

  // Certifications section
  async getStudentCertifications() {
    try {
      const response = await this.api.get("/profile/certifications");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get certifications"
      );
    }
  }

  async createStudentCertification(certificationData) {
    try {
      const response = await this.api.post(
        "/profile/certifications",
        certificationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create certification"
      );
    }
  }

  async updateStudentCertification(certificationId, certificationData) {
    try {
      const response = await this.api.put(
        `/profile/certifications/${certificationId}`,
        certificationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update certification"
      );
    }
  }

  async deleteStudentCertification(certificationId) {
    try {
      const response = await this.api.delete(
        `/profile/certifications/${certificationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete certification"
      );
    }
  }

  // Recommendations section
  async getStudentRecommendations() {
    try {
      const response = await this.api.get("/profile/recommendations");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get recommendations"
      );
    }
  }

  async createStudentRecommendation(recommendationData) {
    try {
      const response = await this.api.post(
        "/profile/recommendations",
        recommendationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create recommendation"
      );
    }
  }

  async updateStudentRecommendation(recommendationId, recommendationData) {
    try {
      const response = await this.api.put(
        `/profile/recommendations/${recommendationId}`,
        recommendationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update recommendation"
      );
    }
  }

  async deleteStudentRecommendation(recommendationId) {
    try {
      const response = await this.api.delete(
        `/profile/recommendations/${recommendationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete recommendation"
      );
    }
  }

  // Legacy method for basic info update (for backward compatibility)
  async updateStudentBasicInfo(basicInfoData) {
    try {
      // For basic info, we'll update the about section
      const response = await this.api.put("/profile/about", basicInfoData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update basic info"
      );
    }
  }

  async logout() {
    try {
      await this.api.post("/auth/logout");
    } catch (error) {
      // Log the error but don't throw it - logout should always succeed from frontend perspective
      console.warn("Logout request failed:", error.message);
    } finally {
      // Always clear local storage regardless of server response
      localStorage.removeItem("accessToken");
      return { success: true };
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get user data"
      );
    }
  }

  async updateProfile(userData) {
    try {
      const response = await this.api.put("/auth/profile", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Profile update failed");
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await this.api.put(
        "/auth/change-password",
        passwordData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Password change failed"
      );
    }
  }

  // Role-based methods
  async getStudents() {
    try {
      const response = await this.api.get("/auth/students");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get students"
      );
    }
  }

  async getColleges() {
    try {
      const response = await this.api.get("/auth/colleges");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get colleges"
      );
    }
  }

  async getStartups() {
    try {
      const response = await this.api.get("/auth/startups");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get startups"
      );
    }
  }

  async getIndustries() {
    try {
      const response = await this.api.get("/auth/industries");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get industries"
      );
    }
  }

  // Utility methods
  getRoleHomePage(role) {
    const rolePages = {
      student: "/student/dashboard",
      college: "/college/dashboard",
      startup: "/startup/dashboard",
      industry: "/industry/dashboard",
    };
    return rolePages[role] || "/dashboard";
  }

  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }

  // Clear authentication (for debugging/fixing token issues)
  clearAuth() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // Clear any old token names
    console.log("🧹 Cleared all authentication data");
  }

  // Force refresh authentication
  async refreshAuth() {
    try {
      this.clearAuth();
      return {
        success: true,
        message: "Authentication cleared. Please log in again.",
      };
    } catch (error) {
      console.error("Refresh auth error:", error);
      return { success: false, message: "Failed to refresh authentication" };
    }
  }

  // File upload helper
  async uploadFile(file, endpoint) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "File upload failed");
    }
  }

  // Posts methods
  async getPosts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(`/posts?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get posts");
    }
  }

  async getMyPosts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(`/posts/my?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get my posts"
      );
    }
  }

  async getUserPosts(userId, role, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(
        `/posts/user/${userId}/${role}?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get user posts"
      );
    }
  }

  async createPost(postData, files = []) {
    try {
      const formData = new FormData();
      formData.append("content", postData.content);
      if (postData.title) formData.append("title", postData.title);

      files.forEach((file, index) => {
        formData.append("media", file);
      });

      const response = await this.api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create post");
    }
  }

  async reactToPost(postId, reactionData) {
    try {
      const response = await this.api.post(
        `/posts/${postId}/react`,
        reactionData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to react to post"
      );
    }
  }

  async getPostReactions(postId) {
    try {
      const response = await this.api.get(`/posts/${postId}/reactions`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get post reactions"
      );
    }
  }

  async deletePost(postId) {
    try {
      const response = await this.api.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete post");
    }
  }

  async getPost(postId) {
    try {
      const response = await this.api.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get post");
    }
  }

  async updatePost(postId, postData) {
    try {
      const response = await this.api.put(`/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update post");
    }
  }

  async addComment(postId, commentData) {
    try {
      const response = await this.api.post(
        `/posts/${postId}/comments`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add comment");
    }
  }

  async getPostComments(postId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(
        `/posts/${postId}/comments?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get post comments"
      );
    }
  }

  async deleteComment(postId, commentId) {
    try {
      const response = await this.api.delete(
        `/posts/${postId}/comments/${commentId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }

  // Media URL helper
  getMediaUrl(mediaPath) {
    console.log("🔧 getMediaUrl called with:", mediaPath);

    // Handle null/undefined
    if (!mediaPath) {
      console.log("🔧 No media path provided, returning placeholder");
      return "/api/placeholder/400/400";
    }

    // Handle full URLs (already complete)
    if (mediaPath.startsWith("http://") || mediaPath.startsWith("https://")) {
      console.log("🔧 Media path is already a full URL:", mediaPath);
      return mediaPath;
    }

    // Handle data URLs (base64 encoded images)
    if (mediaPath.startsWith("data:")) {
      console.log("🔧 Media path is a data URL");
      return mediaPath;
    }

    // Handle relative paths
    let cleanPath = mediaPath;

    // Remove leading slash if present to avoid double slashes
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.slice(1);
    }

    // Get base URL without /api
    const baseUrl = this.baseURL.replace("/api", "");

    return `https://res.cloudinary.com/<your-cloud-name>/image/upload/${mediaPath}`;
  }

  // Alternative version if your backend serves files differently
  getMediaUrlAlternative(mediaPath) {
    console.log("🔧 getMediaUrl (alternative) called with:", mediaPath);

    if (!mediaPath) {
      return "/api/placeholder/400/400";
    }

    if (mediaPath.startsWith("http")) {
      return mediaPath;
    }

    // If your backend serves files at a different endpoint
    // Example: if files are served at /api/files/ instead of /uploads/
    const baseUrl = this.baseURL; // Keep /api in the URL
    const cleanPath = mediaPath.startsWith("/")
      ? mediaPath.slice(1)
      : mediaPath;

    return `${baseUrl}/files/${cleanPath}`;
  }

  // Profile methods for different roles
  // async getStudentProfile(studentId = null) {
  //   try {
  //     const endpoint = studentId ? `/students/${studentId}` : "/students/me";
  //     const response = await this.api.get(endpoint);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(
  //       error.response?.data?.message || "Failed to get student profile"
  //     );
  //   }
  // }

  async getStudentProfile(id = null) {
    try {
      let endpoint;
      if (id) {
        // Fetch specific student profile by ID
        endpoint = `/students/${id}`;
      } else {
        // Fetch current user's profile
        endpoint = "/profile/complete";
      }

      console.log("🔍 Fetching student profile from:", endpoint);
      const response = await this.api.get(endpoint);
      console.log("✅ Student profile response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching student profile:", error);
      throw new Error(
        error.response?.data?.message || "Failed to get student profile"
      );
    }
  }

  async updateStudentProfile(studentData) {
    try {
      const response = await this.api.put("/students/me", studentData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update student profile"
      );
    }
  }

  async getProfile() {
    try {
      const response = await this.api.get("/students/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile data"
      );
    }
  }

  async getCollegeProfile(collegeId = null) {
    try {
      const endpoint = collegeId ? `/colleges/${collegeId}` : "/colleges/me";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college profile"
      );
    }
  }

  async updateCollegeProfile(collegeData) {
    try {
      const response = await this.api.put("/colleges/me", collegeData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college profile"
      );
    }
  }

  // College Information methods
  async getCollegeInformation(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/information/${collegeId}` 
        : "/college-profile/information";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college information"
      );
    }
  }

  async updateCollegeInformation(collegeId, informationData) {
    try {
      console.log('🔄 API: Updating college information...');
      console.log('Arguments length:', arguments.length);
      
      // If only one parameter is passed, treat it as informationData
      if (arguments.length === 1) {
        informationData = collegeId;
        console.log('📤 Sending data:', informationData);
        const response = await this.api.put("/college-profile/information", informationData);
        console.log('✅ API Response:', response.status, response.data);
        return response.data;
      } else {
        // If two parameters, include collegeId in the data or use appropriate endpoint
        console.log('📤 Sending data for college', collegeId, ':', informationData);
        const response = await this.api.put("/college-profile/information", informationData);
        console.log('✅ API Response:', response.status, response.data);
        return response.data;
      }
    } catch (error) {
      console.error('❌ API Error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Try to get a meaningful error message
      let errorMessage = "Failed to update college information";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.statusText) {
        errorMessage = `${error.response.status}: ${error.response.statusText}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  // College Sections methods
  async getCollegeAbout(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/about/${collegeId}` 
        : "/college-profile/about";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college about"
      );
    }
  }

  async updateCollegeAbout(aboutData) {
    try {
      const response = await this.api.put("/college-profile/about", aboutData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college about"
      );
    }
  }

  async getCollegeDepartments(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/departments/${collegeId}` 
        : "/college-profile/departments";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college departments"
      );
    }
  }

  async getCollegeFaculty(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/faculty/${collegeId}` 
        : "/college-profile/faculty";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college faculty"
      );
    }
  }

  async getCollegePrograms(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/programs/${collegeId}` 
        : "/college-profile/programs";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college programs"
      );
    }
  }

  async getCollegeAlumni(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/alumni/${collegeId}` 
        : "/college-profile/alumni";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college alumni"
      );
    }
  }

  async getCollegeEvents(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/events/${collegeId}` 
        : "/college-profile/events";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college events"
      );
    }
  }

  async getCollegeFacilities(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/facilities/${collegeId}` 
        : "/college-profile/facilities";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college facilities"
      );
    }
  }

  async getCollegePlacements(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/placements/${collegeId}` 
        : "/college-profile/placements";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college placements"
      );
    }
  }

  async getCollegeRankings(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/rankings/${collegeId}` 
        : "/college-profile/rankings";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college rankings"
      );
    }
  }

  async getCollegeAdmissions(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/admissions/${collegeId}` 
        : "/college-profile/admissions";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college admissions"
      );
    }
  }

  // College Campuses methods
  async getCollegeCampuses(collegeId = null) {
    try {
      const endpoint = collegeId 
        ? `/college-profile/campuses/${collegeId}` 
        : "/college-profile/campuses";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college campuses"
      );
    }
  }

  async createCollegeCampus(campusData) {
    try {
      const response = await this.api.post("/college-profile/campuses", campusData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create campus"
      );
    }
  }

  async updateCollegeCampus(campusId, campusData) {
    try {
      const response = await this.api.put(`/college-profile/campuses/${campusId}`, campusData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update campus"
      );
    }
  }

  async updateCollegeCampuses(campusesData) {
    try {
      // If it's an array of campuses, handle bulk update
      if (Array.isArray(campusesData)) {
        const promises = campusesData.map(campus => {
          if (campus.id) {
            return this.updateCollegeCampus(campus.id, campus);
          } else {
            return this.createCollegeCampus(campus);
          }
        });
        const results = await Promise.all(promises);
        return { success: true, data: results };
      } else {
        // Single campus update
        const response = await this.api.put("/college-profile/campuses", campusesData);
        return response.data;
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update campuses"
      );
    }
  }

  async deleteCollegeCampus(campusId) {
    try {
      const response = await this.api.delete(`/college-profile/campuses/${campusId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete campus"
      );
    }
  }

  // Campus Map Location methods
  async updateCampusLocation(campusId, locationData) {
    try {
      const response = await this.api.put(`/college-profile/campuses/${campusId}/location`, locationData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update campus location"
      );
    }
  }

  async getCampusesWithLocations() {
    try {
      const response = await this.api.get("/college-profile/campuses/locations");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get campuses with locations"
      );
    }
  }

  async getCampusesMap(collegeId) {
    try {
      const response = await this.api.get(`/college-profile/campuses/map/${collegeId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get campuses map"
      );
    }
  }

  // =============================================
  // NEW COLLEGE PROFILE SECTIONS
  // =============================================
  
  // College Information (New)
  async getCollegeInformationNew() {
    try {
      const response = await this.api.get("/college-profile/information-new");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college information"
      );
    }
  }

  async updateCollegeInformationNew(informationData) {
    try {
      const response = await this.api.put("/college-profile/information-new", informationData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college information"
      );
    }
  }

  // College Admissions (New)
  async getCollegeAdmissionsNew() {
    try {
      const response = await this.api.get("/college-profile/admissions-new");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college admissions"
      );
    }
  }

  async createCollegeAdmission(admissionData) {
    try {
      const response = await this.api.post("/college-profile/admissions-new", admissionData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create admission record"
      );
    }
  }

  // College Infrastructure (New)
  async getCollegeInfrastructureNew() {
    try {
      const response = await this.api.get("/college-profile/infrastructure-new");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college infrastructure"
      );
    }
  }

  async updateCollegeInfrastructure(infrastructureData) {
    try {
      const response = await this.api.put("/college-profile/infrastructure-new", infrastructureData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college infrastructure"
      );
    }
  }

  // College Contact (New)
  async getCollegeContactNew() {
    try {
      const response = await this.api.get("/college-profile/contact-new");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college contact"
      );
    }
  }

  async updateCollegeContact(contactData) {
    try {
      const response = await this.api.put("/college-profile/contact-new", contactData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college contact"
      );
    }
  }

  // =============================================
  // COLLEGE ACADEMICS/COURSES SECTION
  // =============================================

  async getCollegeAcademics() {
    try {
      const response = await this.api.get("/college-profile/academics");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college academics"
      );
    }
  }

  async createCollegeAcademic(academicData) {
    try {
      const response = await this.api.post("/college-profile/academics", academicData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college academic"
      );
    }
  }

  async updateCollegeAcademics(academicsData) {
    try {
      const response = await this.api.put("/college-profile/academics", academicsData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college academics"
      );
    }
  }

  async deleteCollegeAcademic(academicId) {
    try {
      const response = await this.api.delete(`/college-profile/academics/${academicId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete college academic"
      );
    }
  }

  async getStartupProfile(startupId = null) {
    try {
      const endpoint = startupId ? `/startups/${startupId}` : "/startups/me";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get startup profile"
      );
    }
  }

  async updateStartupProfile(startupData) {
    try {
      const response = await this.api.put("/startups/me", startupData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update startup profile"
      );
    }
  }

  async getIndustryProfile(industryId) {
    try {
      const endpoint = industryId
        ? `/industries/${industryId}`
        : "/industries/me";
      const response = await this.api.get(endpoint); // ✅ Use `this.api` properly
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get industry profile"
      );
    }
  }

  async getIndustryById(industryId) {
    try {
      const response = await this.api.get(`/industries/${industryId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch specific industry"
      );
    }
  }

  async updateIndustryProfile(industryData) {
    try {
      const response = await this.api.put("/industries/me", industryData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update industry profile"
      );
    }
  }
  async updateStudentAdditionalInfo(studentId, data) {
    try {
      const response = await apiService.api.put(`/students/${studentId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update student info"
      );
    }
  }

  // File upload methods
  async uploadProfileImage(formData) {
    if (!formData || !formData.has("profileImage")) {
      throw new Error("No file uploaded");
    }
    return this.api.post("/students/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadCoverImage(formData) {
    if (!formData || !formData.has("coverImage")) {
      throw new Error("No file uploaded");
    }
    return this.api.post("/students/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // Ping/Connection methods
  async sendPingRequest(studentId) {
    try {
      const response = await this.api.post(`/students/ping/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to send ping request"
      );
    }
  }

  async getPingRequests() {
    try {
      const response = await this.api.get("/students/ping-requests");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch ping requests"
      );
    }
  }

  async acceptPingRequest(requestId) {
    try {
      const response = await this.api.put(`/students/ping/${requestId}/accept`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to accept ping request"
      );
    }
  }

  async rejectPingRequest(requestId) {
    try {
      const response = await this.api.put(`/students/ping/${requestId}/reject`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to reject ping request"
      );
    }
  }

  async getConnections() {
    try {
      const response = await this.api.get("/students/connections");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch connections"
      );
    }
  }

  async getConnectionCount() {
    try {
      const response = await this.api.get("/students/connections/count");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch connection count"
      );
    }
  }

  async checkPingStatus(studentId) {
    try {
      const response = await this.api.get(`/students/ping-status/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check ping status"
      );
    }
  }

  // Role-based page helpers
  getRoleProfilePage(role) {
    const rolePages = {
      student: "/student/profile",
      college: "/college/profile",
      startup: "/startup/profile",
      industry: "/industry/profile",
    };
    return rolePages[role] || "/profile";
  }

  // ==================== COLLEGE API METHODS ====================
  // Following the same pattern as student methods

  // College File upload methods
  async uploadCollegeLogo(formData) {
    if (!formData || !formData.has("logoImage")) {
      throw new Error("No logo file uploaded");
    }
    return this.api.post("/colleges/logo-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadCollegeCover(formData) {
    if (!formData || !formData.has("coverImage")) {
      throw new Error("No cover file uploaded");
    }
    return this.api.post("/colleges/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // College Ping/Connection methods
  async sendCollegePingRequest(collegeId) {
    try {
      const response = await this.api.post(`/colleges/ping/${collegeId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to send ping request to college"
      );
    }
  }

  async getCollegePingRequests() {
    try {
      const response = await this.api.get("/colleges/ping-requests");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college ping requests"
      );
    }
  }

  async acceptCollegePingRequest(requestId) {
    try {
      const response = await this.api.put(`/colleges/ping/${requestId}/accept`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to accept college ping request"
      );
    }
  }

  async rejectCollegePingRequest(requestId) {
    try {
      const response = await this.api.put(`/colleges/ping/${requestId}/reject`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to reject college ping request"
      );
    }
  }

  async getCollegeConnections() {
    try {
      const response = await this.api.get("/colleges/connections");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college connections"
      );
    }
  }

  async getCollegeConnectionCount() {
    try {
      const response = await this.api.get("/colleges/connections/count");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college connection count"
      );
    }
  }

  async checkCollegePingStatus(collegeId) {
    try {
      const response = await this.api.get(`/colleges/ping-status/${collegeId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check college ping status"
      );
    }
  }

  // College Programs methods (equivalent to student projects)
  async getCollegePrograms() {
    try {
      console.log("🔍 API: Fetching college programs...");
      const response = await this.api.get("/colleges/programs");
      console.log("📊 API: College programs response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ API: Error fetching college programs:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch college programs"
      );
    }
  }

  async createCollegeProgram(programData) {
    try {
      const response = await this.api.post("/colleges/programs", programData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college program"
      );
    }
  }

  async updateCollegeProgram(programId, programData) {
    try {
      const response = await this.api.put(`/colleges/programs/${programId}`, programData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college program"
      );
    }
  }

  async deleteCollegeProgram(programId) {
    try {
      const response = await this.api.delete(`/colleges/programs/${programId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete college program"
      );
    }
  }

  // College Events methods
  async getCollegeEvents() {
    try {
      const response = await this.api.get("/colleges/events");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college events"
      );
    }
  }

  async createCollegeEvent(eventData) {
    try {
      const response = await this.api.post("/colleges/events", eventData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college event"
      );
    }
  }

  // College Faculty methods
  async getCollegeFaculty() {
    try {
      const response = await this.api.get("/colleges/faculty");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college faculty"
      );
    }
  }

  async addCollegeFaculty(facultyData) {
    try {
      const response = await this.api.post("/colleges/faculty", facultyData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add college faculty"
      );
    }
  }

  // College Alumni methods
  async getCollegeAlumni() {
    try {
      const response = await this.api.get("/colleges/alumni");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college alumni"
      );
    }
  }

  // College Placement methods
  async getCollegePlacements() {
    try {
      const response = await this.api.get("/colleges/placements");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college placements"
      );
    }
  }

  async addCollegePlacement(placementData) {
    try {
      const response = await this.api.post("/colleges/placements", placementData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add college placement"
      );
    }
  }

  // College Reviews methods
  async getCollegeReviews() {
    try {
      const response = await this.api.get("/colleges/reviews");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college reviews"
      );
    }
  }

  async addCollegeReview(reviewData) {
    try {
      const response = await this.api.post("/colleges/reviews", reviewData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add college review"
      );
    }
  }
}

// Create API objects for backward compatibility
const studentAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/students/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get student profile"
      );
    }
  },

  async updateProfile(studentData) {
    try {
      const response = await apiService.api.put("/students/me", studentData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update student profile"
      );
    }
  },

  // About section methods (for AboutSection.jsx)
  async getStudentAbout() {
    return apiService.getStudentAbout();
  },
  async updateStudentAbout(aboutData) {
    return apiService.updateStudentAbout(aboutData);
  },

  // Note: These detailed student profile features are not implemented in the simplified Prisma backend
  // For now, they will return placeholder responses or errors
  async addSkill(studentId, skillData) {
    throw new Error(
      "Skills feature not implemented in current Prisma backend. Please update your student profile through the main profile update."
    );
  },

  async deleteSkill(studentId, skillId) {
    throw new Error(
      "Skills feature not implemented in current Prisma backend."
    );
  },

  async addCertification(studentId, certData) {
    throw new Error(
      "Certifications feature not implemented in current Prisma backend."
    );
  },

  async updateCertification(studentId, certId, certData) {
    throw new Error(
      "Certifications feature not implemented in current Prisma backend."
    );
  },

  async deleteCertification(studentId, certId) {
    throw new Error(
      "Certifications feature not implemented in current Prisma backend."
    );
  },

  async addCourse(studentId, courseData) {
    throw new Error(
      "Courses feature not implemented in current Prisma backend."
    );
  },

  async updateCourse(studentId, courseId, courseData) {
    throw new Error(
      "Courses feature not implemented in current Prisma backend."
    );
  },

  async deleteCourse(studentId, courseId) {
    throw new Error(
      "Courses feature not implemented in current Prisma backend."
    );
  },

  async addEducation(studentId, educationData) {
    throw new Error(
      "Education feature not implemented in current Prisma backend."
    );
  },

  async updateEducation(studentId, educationId, educationData) {
    throw new Error(
      "Education feature not implemented in current Prisma backend."
    );
  },

  async deleteEducation(studentId, educationId) {
    throw new Error(
      "Education feature not implemented in current Prisma backend."
    );
  },

  async addExperience(studentId, experienceData) {
    throw new Error(
      "Experience feature not implemented in current Prisma backend."
    );
  },

  async updateExperience(studentId, experienceId, experienceData) {
    throw new Error(
      "Experience feature not implemented in current Prisma backend."
    );
  },

  async deleteExperience(studentId, experienceId) {
    throw new Error(
      "Experience feature not implemented in current Prisma backend."
    );
  },

  async addProject(studentId, projectData) {
    throw new Error(
      "Projects feature not implemented in current Prisma backend."
    );
  },

  async updateProject(studentId, projectId, projectData) {
    throw new Error(
      "Projects feature not implemented in current Prisma backend."
    );
  },

  async deleteProject(studentId, projectId) {
    throw new Error(
      "Projects feature not implemented in current Prisma backend."
    );
  },

  async addRecommendation(studentId, recommendationData) {
    throw new Error(
      "Recommendations feature not implemented in current Prisma backend."
    );
  },

  async updateRecommendation(studentId, recommendationId, recommendationData) {
    throw new Error(
      "Recommendations feature not implemented in current Prisma backend."
    );
  },

  async deleteRecommendation(studentId, recommendationId) {
    throw new Error(
      "Recommendations feature not implemented in current Prisma backend."
    );
  },
};

const collegeAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/colleges/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college profile"
      );
    }
  },

  async updateProfile(collegeData) {
    try {
      const response = await apiService.api.put("/colleges/me", collegeData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college profile"
      );
    }
  },

  // College Information methods
  async getInformation() {
    return apiService.getCollegeInformation();
  },

  async updateInformation(informationData) {
    return apiService.updateCollegeInformation(informationData);
  },

  // College Sections
  async getAbout() {
    return apiService.getCollegeAbout();
  },

  async updateAbout(aboutData) {
    return apiService.updateCollegeAbout(aboutData);
  },

  async getDepartments() {
    return apiService.getCollegeDepartments();
  },

  async getFaculty() {
    return apiService.getCollegeFaculty();
  },

  async getPrograms() {
    return apiService.getCollegePrograms();
  },

  async getAlumni() {
    return apiService.getCollegeAlumni();
  },

  async getEvents() {
    return apiService.getCollegeEvents();
  },

  async getFacilities() {
    return apiService.getCollegeFacilities();
  },

  async getPlacements() {
    return apiService.getCollegePlacements();
  },

  async getRankings() {
    return apiService.getCollegeRankings();
  },

  async getAdmissions() {
    return apiService.getCollegeAdmissions();
  }
};

const startupAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/startups/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get startup profile"
      );
    }
  },

  async updateProfile(startupData) {
    try {
      const response = await apiService.api.put("/startups/me", startupData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update startup profile"
      );
    }
  },
};

const industryAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/industries/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get industry profile"
      );
    }
  },

  async updateProfile(industryData) {
    try {
      const response = await apiService.api.put("/industries/me", industryData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update industry profile"
      );
    }
  },
};

const apiService = new ApiService();

export default apiService;
export { studentAPI, collegeAPI, startupAPI, industryAPI };
