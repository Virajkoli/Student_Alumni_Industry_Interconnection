const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User, Student } = require("../config/database");
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

// @desc    Register user (student)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log("=== STUDENT REGISTRATION ===");
    console.log("Request body:", { ...req.body, password: "[HIDDEN]" });

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

    const {
      email,
      password,
      first_name,
      last_name,
      contact_no,
      college_name,
      interested_field,
      other_field,
      role,
    } = req.body;

    const userRole = role || "student"; // Default to student

    console.log("Processing registration for role:", userRole, {
      email,
      first_name,
      last_name,
      college_name,
      interested_field,
    });

    // Check if student already exists
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      console.log("Student already exists:", email);
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // For now, only support student registration
    if (userRole !== "student") {
      return res.status(400).json({
        success: false,
        message: `Registration for role '${userRole}' is not yet available. Currently only 'student' registration is supported.`,
      });
    }

    // Create student
    const student = await Student.create({
      email,
      password,
      first_name,
      last_name,
      contact_no,
      college_name,
      interested_field,
      other_field: interested_field === "Other" ? other_field : null,
    });

    console.log("Student created successfully:", student.id, student.email);

    // Generate tokens
    const token = generateToken(student.id);
    const refreshToken = generateRefreshToken(student.id);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return student data (excluding password)
    const studentResponse = {
      id: student.id,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      contact_no: student.contact_no,
      college_name: student.college_name,
      interested_field: student.interested_field,
      other_field: student.other_field,
      role: "student",
      isEmailVerified: student.isEmailVerified,
      profileCompletion: student.getProfileCompletion(),
      createdAt: student.created_at,
    };

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: {
        user: studentResponse,
        token,
      },
    });
  } catch (error) {
    console.error("=== STUDENT REGISTRATION ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Check for specific error types
    let errorMessage = "Server error during student registration";
    if (error.name === "SequelizeConnectionError") {
      errorMessage = "Database connection error";
    } else if (error.name === "SequelizeValidationError") {
      errorMessage =
        "Validation error: " + error.errors.map((e) => e.message).join(", ");
    } else if (
      error.message.includes("relation") &&
      error.message.includes("does not exist")
    ) {
      errorMessage = "Database table not found. Please contact support.";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      ...(process.env.NODE_ENV === "development" && {
        debug: {
          error: error.message,
          type: error.constructor.name,
        },
      }),
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
    const user = await Student.findOne({ where: { email } });
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
      first_name: user.first_name,
      last_name: user.last_name,
      fullName: `${user.first_name} ${user.last_name}`,
      contact_no: user.contact_no,
      college_name: user.college_name,
      interested_field: user.interested_field,
      other_field: user.other_field,
      role: "student",
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      profileCompletion: user.getProfileCompletion(),
      lastLogin: user.lastLogin,
      createdAt: user.created_at,
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

    // For now, we're only supporting students, so check Student model
    const user = await Student.findByPk(decoded.userId);

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
    // For now, we're only supporting students, so check Student model
    const user = await Student.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data in consistent format
    const userResponse = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      fullName: `${user.first_name} ${user.last_name}`,
      contact_no: user.contact_no,
      college_name: user.college_name,
      interested_field: user.interested_field,
      other_field: user.other_field,
      role: "student",
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      profileCompletion: user.getProfileCompletion(),
      lastLogin: user.lastLogin,
      createdAt: user.created_at,
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

// Validation middleware for student registration
const registerValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("first_name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("First name is required and must be between 1-100 characters"),
  body("last_name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Last name is required and must be between 1-100 characters"),
  body("role")
    .optional()
    .isIn(["student", "alumni", "college", "industry", "startup"])
    .withMessage(
      "Role must be one of: student, alumni, college, industry, startup"
    ),
  body("contact_no")
    .optional()
    .trim()
    .isLength({ max: 15 })
    .withMessage("Contact number must be 15 characters or less"),
  body("college_name")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("College name must be 200 characters or less"),
  body("interested_field")
    .optional()
    .isIn(["Computer", "Electronics", "Electrical", "Other"])
    .withMessage(
      "Interested field must be one of: Computer, Electronics, Electrical, Other"
    ),
  body("other_field")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Other field must be 100 characters or less"),
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

module.exports = router;
