const authService = require("../services/authService");

class AuthController {
  // Register endpoint
  async register(req, res) {
    try {
      const { role } = req.body;

      if (!role) {
        return res.status(400).json({
          success: false,
          message: "Role is required",
        });
      }

      const result = await authService.register(req.body, role);

      // Set cookies
      res.cookie("accessToken", result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.cookie("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        success: true,
        message: "Registration successful",
        user: result.user,
        tokens: result.tokens,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Registration failed",
      });
    }
  }

  // Login endpoint
  async login(req, res) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: "Email, password, and role are required",
        });
      }

      const result = await authService.login(email, password, role);

      // Set cookies
      res.cookie("accessToken", result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.cookie("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result.user,
        tokens: result.tokens,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({
        success: false,
        message: error.message || "Login failed",
      });
    }
  }

  // Google OAuth registration
  async registerWithGoogle(req, res) {
    try {
      const { role } = req.body;

      if (!role) {
        return res.status(400).json({
          success: false,
          message: "Role is required",
        });
      }

      const result = await authService.registerWithGoogle(req.body, role);

      // Set cookies
      res.cookie("accessToken", result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.cookie("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        success: true,
        message: "Google registration successful",
        user: result.user,
        tokens: result.tokens,
      });
    } catch (error) {
      console.error("Google registration error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Google registration failed",
      });
    }
  }

  // Google OAuth login
  async loginWithGoogle(req, res) {
    try {
      const result = await authService.loginWithGoogle(req.body);

      // Set cookies
      res.cookie("accessToken", result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.cookie("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({
        success: true,
        message: "Google login successful",
        user: result.user,
        tokens: result.tokens,
      });
    } catch (error) {
      console.error("Google login error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Google login failed",
      });
    }
  }

  // Get current user
  async getCurrentUser(req, res) {
    try {
      const { userId, role } = req.user;
      const result = await authService.getUserById(userId, role);

      res.status(200).json({
        success: true,
        user: result.user,
      });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(404).json({
        success: false,
        message: error.message || "User not found",
      });
    }
  }

  // Update profile
  async updateProfile(req, res) {
    try {
      const { userId, role } = req.user;
      const result = await authService.updateProfile(userId, role, req.body);

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: result.user,
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Profile update failed",
      });
    }
  }

  // Change password
  async changePassword(req, res) {
    try {
      const { userId, role } = req.user;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password and new password are required",
        });
      }

      const result = await authService.changePassword(
        userId,
        role,
        currentPassword,
        newPassword
      );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Password change failed",
      });
    }
  }

  // Logout
  async logout(req, res) {
    try {
      // Clear cookies regardless of token validity
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Always return success for logout to ensure frontend can clear state
      res.status(200).json({
        success: true,
        message: "Logout completed",
      });
    }
  }

  // Refresh token
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token not provided",
        });
      }

      const jwt = require("jsonwebtoken");
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const result = await authService.getUserById(
        decoded.userId,
        decoded.role
      );
      const tokens = authService.generateTokens(decoded.userId, decoded.role);

      // Set new cookies
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        user: result.user,
        tokens,
      });
    } catch (error) {
      console.error("Refresh token error:", error);
      res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
  }

  // Check if email is associated with Google account
  async checkGoogleAccount(req, res) {
    try {
      const { email, role } = req.body;

      if (!email || !role) {
        return res.status(400).json({
          success: false,
          message: "Email and role are required",
        });
      }

      const isGoogleAccount = await authService.isGoogleAccount(email, role);

      res.status(200).json({
        success: true,
        isGoogleAccount,
        message: isGoogleAccount
          ? "This account was created with Google. Please use 'Sign in with Google' to login."
          : "Regular email/password login available",
      });
    } catch (error) {
      console.error("Check Google account error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check account type",
      });
    }
  }
}

module.exports = new AuthController();
