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

    const { email, password, role, fullName, ...otherFields } = req.body;

    // Handle backward compatibility for names
    const firstName =
      otherFields.first_name || (fullName ? fullName.split(" ")[0] : "");
    const lastName =
      otherFields.last_name ||
      (fullName ? fullName.split(" ").slice(1).join(" ") : "");
    const userRole = role || "student"; // Default to student if no role specified

    console.log("Processing registration for:", {
      email,
      role: userRole,
      firstName,
      lastName,
      ...otherFields,
    });

    // Check if user already exists (check both tables)
    const existingUser = await User.findOne({ where: { email } });
    const existingStudent = await Student.findOne({ where: { email } });

    if (existingUser || existingStudent) {
      console.log("User already exists:", email);
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    let user;
    let userResponse;

    // Handle different roles
    if (userRole === "student") {
      // Create student
      user = await Student.create({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        contact_no: otherFields.contact_no,
        college_name: otherFields.college_name,
        interested_field: otherFields.interested_field,
        other_field:
          otherFields.interested_field === "Other"
            ? otherFields.other_field
            : null,
      });

      userResponse = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        contact_no: user.contact_no,
        college_name: user.college_name,
        interested_field: user.interested_field,
        other_field: user.other_field,
        role: "student",
        isEmailVerified: user.isEmailVerified,
        profileCompletion: user.getProfileCompletion(),
        createdAt: user.created_at,
      };
    } else {
      // Create user for other roles (college, industry, startup)
      user = await User.create({
        email,
        password,
        fullName: fullName || `${firstName} ${lastName}`.trim(),
        role: userRole,
        ...otherFields, // Include all other role-specific fields
      });

      userResponse = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileCompletion: user.getProfileCompletion(),
        createdAt: user.createdAt,
        ...otherFields, // Include role-specific fields in response
      };
    }

    console.log(
      "User created successfully:",
      user.id,
      user.email,
      "Role:",
      userRole
    );

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

    // Try to find user in both tables
    let user = await User.findOne({ where: { email } });
    let isStudent = false;

    if (!user) {
      user = await Student.findOne({ where: { email } });
      isStudent = true;
    }

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

    // Return user data based on table
    let userResponse;
    if (isStudent) {
      userResponse = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        contact_no: user.contact_no,
        college_name: user.college_name,
        interested_field: user.interested_field,
        other_field: user.other_field,
        role: "student",
        isEmailVerified: user.isEmailVerified,
        profileCompletion: user.getProfileCompletion(),
        lastLogin: user.lastLogin,
        createdAt: user.created_at,
      };
    } else {
      userResponse = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileCompletion: user.getProfileCompletion(),
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      };
    }

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

// Validation middleware - More flexible for backward compatibility
const registerValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(["student", "college", "industry", "startup"])
    .withMessage("Role must be one of: student, college, industry, startup"),
  body("first_name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name must be at least 1 character long"),
  body("last_name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name must be at least 1 character long"),
  // Backward compatibility - support old fullName field
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Full name must be at least 1 character long"),
  // Optional fields for different roles
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

// Debug endpoint to test if backend is working
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes are working",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Debug endpoint to check what data is being sent
router.post("/debug-register", (req, res) => {
  console.log("=== DEBUG REGISTRATION ===");
  console.log("Request Body:", JSON.stringify(req.body, null, 2));
  console.log("Headers Origin:", req.headers.origin);
  console.log("Content-Type:", req.headers["content-type"]);

  res.json({
    success: true,
    message: "Debug data logged to server console",
    receivedData: req.body,
    requiredFields: {
      role: "required - student, college, industry, startup",
      first_name: "required",
      last_name: "required",
      email: "required",
      password: "required (min 6 chars)",
    },
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
