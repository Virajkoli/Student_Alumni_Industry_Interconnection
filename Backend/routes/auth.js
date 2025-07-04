const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User } = require("../config/database");
const { auth } = require("../middleware/auth");
const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "30d",
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log("Registration attempt:", req.body);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const { email, password, fullName, role } = req.body;

    console.log("Processing registration for:", { email, fullName, role });

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      fullName,
      role: role || "student",
    });

    console.log("User created successfully:", user.id, user.email);

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return user data (excluding password)
    const userResponse = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      profileCompletion: user.getProfileCompletion(),
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update login tracking
    await user.update({
      lastLogin: new Date(),
      loginCount: user.loginCount + 1,
    });

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return user data (excluding password)
    const userResponse = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      isEmailVerified: user.isEmailVerified,
      profileCompletion: user.getProfileCompletion(),
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
    };

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = (req, res) => {
  // Clear refresh token cookie
  res.clearCookie("refreshToken");

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Generate new access token
    const newToken = generateToken(user.id);

    res.json({
      success: true,
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password", "passwordResetToken", "passwordResetExpires"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userResponse = {
      ...user.toJSON(),
      profileCompletion: user.getProfileCompletion(),
    };

    res.json({
      success: true,
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Validation middleware
const registerValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("fullName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long"),
  body("role")
    .optional()
    .isIn(["student", "alumni", "college", "industry", "startup"])
    .withMessage(
      "Role must be one of: student, alumni, college, industry, startup"
    ),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/me", auth, getMe);

// Debug endpoint to test if backend is working
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes are working",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

module.exports = router;
