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
  async getStudentProfile() {
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

  async createPost(postData, files = []) {
    try {
      const formData = new FormData();
      formData.append("content", postData.content);
      if (postData.title) formData.append("title", postData.title);

      files.forEach((file, index) => {
        formData.append(`media`, file);
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
    if (!mediaPath) return "/api/placeholder/400/400";
    if (mediaPath.startsWith("http")) return mediaPath;
    return `${this.baseURL.replace("/api", "")}/uploads/${mediaPath}`;
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

  getStudentProfile(id) {
    return this.api.get(`/students/${id}`).then((res) => res.data);
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

  async getIndustryProfile(industryId = null) {
    try {
      const endpoint = industryId
        ? `/industries/${industryId}`
        : "/industries/me";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get industry profile"
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
