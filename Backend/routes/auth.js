const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User, Student, College } = require("../config/database");
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

// @desc    Register user (student) - Legacy route for backward compatibility
// @route   POST /api/auth/register
// @access  Public
const registerStudent = async (req, res) => {
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
      student_college_name,
      interested_field,
      other_field,
      role,
    } = req.body;

    const userRole = role || "student"; // Default to student

    console.log("Processing registration for role:", userRole, {
      email,
      first_name,
      last_name,
      student_college_name,
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
      student_college_name,
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
      student_college_name: student.student_college_name,
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

// @desc    Login user (student or college)
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

    // Try to find user in both Student and College models
    let user = await Student.findOne({ where: { email } });
    let userType = "student";

    if (!user) {
      user = await College.findOne({ where: { email } });
      userType = "college";
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

    // Return user data based on type
    let userResponse;
    if (userType === "student") {
      userResponse = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        fullName: `${user.first_name} ${user.last_name}`,
        contact_no: user.contact_no,
        student_college_name: user.student_college_name,
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
    } else {
      userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        location: user.location,
        established: user.established,
        campusArea: user.campusArea,
        nirfRank: user.nirfRank,
        accreditation: user.accreditation,
        totalStudents: user.totalStudents,
        totalFaculty: user.totalFaculty,
        website: user.website,
        role: "college",
        logoUrl: user.logoUrl,
        backgroundUrl: user.backgroundUrl,
        isEmailVerified: user.isEmailVerified,
        isActive: user.isActive,
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

    // Try to find user in both Student and College models
    let user = await Student.findByPk(decoded.userId);
    if (!user) {
      user = await College.findByPk(decoded.userId);
    }

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
    // Try to find user in both Student and College models
    let user = await Student.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    let userType = "student";

    if (!user) {
      user = await College.findByPk(req.user.id, {
        attributes: {
          exclude: ["password"],
        },
      });
      userType = "college";
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data based on type
    let userResponse;
    if (userType === "student") {
      userResponse = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        fullName: `${user.first_name} ${user.last_name}`,
        contact_no: user.contact_no,
        student_college_name: user.student_college_name,
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
    } else {
      userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        location: user.location,
        established: user.established,
        campusArea: user.campusArea,
        nirfRank: user.nirfRank,
        accreditation: user.accreditation,
        totalStudents: user.totalStudents,
        totalFaculty: user.totalFaculty,
        website: user.website,
        role: "college",
        logoUrl: user.logoUrl,
        backgroundUrl: user.backgroundUrl,
        isEmailVerified: user.isEmailVerified,
        isActive: user.isActive,
        profileCompletion: user.getProfileCompletion(),
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      };
    }

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
  body("student_college_name")
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

// @desc    Register college
// @route   POST /api/auth/register/college
// @access  Public
const registerCollege = async (req, res) => {
  try {
    console.log("=== COLLEGE REGISTRATION ===");
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
      college_name,
      college_address,
      establishment_year,
      website,
      campus_area,
      nirf_rank,
      accreditation,
      total_students,
      total_faculty,
      description,
    } = req.body;

    console.log("Processing college registration:", {
      email,
      college_name,
      establishment_year,
      website,
    });

    // Check if college already exists
    const existingCollege = await College.findOne({ where: { email } });
    if (existingCollege) {
      console.log("College already exists:", email);
      return res.status(400).json({
        success: false,
        message: "College already exists with this email",
      });
    }

    // Convert string values to appropriate types
    const collegeData = {
      email,
      password,
      name: college_name,
      description:
        description ||
        `${college_name} - Established in ${establishment_year || "N/A"}`,
      location: college_address,
      established: establishment_year ? parseInt(establishment_year) : null,
      campusArea: campus_area ? parseFloat(campus_area) : null,
      nirfRank: nirf_rank ? parseInt(nirf_rank) : null,
      accreditation: accreditation || null,
      totalStudents: total_students ? parseInt(total_students) : null,
      totalFaculty: total_faculty ? parseInt(total_faculty) : null,
      website: website || null,
    };

    console.log("Converted college data:", collegeData);

    // Create college
    const college = await College.create(collegeData);

    console.log("College created successfully:", college.id, college.email);

    // Generate tokens
    const token = generateToken(college.id);
    const refreshToken = generateRefreshToken(college.id);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log("College registration successful, returning response");

    res.status(201).json({
      success: true,
      message: "College registered successfully",
      data: {
        user: {
          id: college.id,
          email: college.email,
          name: college.name,
          first_name: college.first_name,
          last_name: college.last_name,
          role: "college",
          isEmailVerified: college.isEmailVerified,
          profileCompletion: 60,
          createdAt: college.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error("College registration error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Check for specific error types
    let errorMessage = "Server error during college registration";
    if (error.name === "SequelizeConnectionError") {
      errorMessage = "Database connection error. Please try again later.";
    } else if (error.name === "SequelizeValidationError") {
      errorMessage = `Validation error: ${error.errors
        .map((e) => e.message)
        .join(", ")}`;
    } else if (error.name === "SequelizeUniqueConstraintError") {
      errorMessage = "College with this email already exists";
    } else if (error.message.includes("password")) {
      errorMessage = "Password hashing error. Please try again.";
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

// Validation middleware for college registration
const registerCollegeValidation = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      "College name is required and must be between 1-100 characters"
    ),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must be 1000 characters or less"),
  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location must be 100 characters or less"),
  body("established")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage("Establishment year must be between 1800 and current year"),
  body("campusArea")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Campus area must be a positive number"),
  body("nirfRank")
    .optional()
    .isInt({ min: 1 })
    .withMessage("NIRF rank must be a positive integer"),
  body("accreditation")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Accreditation must be 100 characters or less"),
  body("totalStudents")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Total students must be a non-negative integer"),
  body("totalFaculty")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Total faculty must be a non-negative integer"),
  body("website").optional().isURL().withMessage("Website must be a valid URL"),
];

const collegeRegistrationValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("college_name")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(
      "College name is required and must be between 1-200 characters"
    ),
  body("college_address")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("College address must be 500 characters or less"),
  body("establishment_year")
    .optional()
    .custom((value) => {
      if (value === "" || value === null || value === undefined) return true;
      const year = parseInt(value);
      if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
        throw new Error("Establishment year must be a valid year between 1800 and current year");
      }
      return true;
    }),
  body("website")
    .optional()
    .custom((value) => {
      if (!value || value.trim() === "") return true;
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error("Please provide a valid website URL");
      }
    }),
  body("campus_area")
    .optional()
    .custom((value) => {
      if (value === "" || value === null || value === undefined) return true;
      const area = parseFloat(value);
      if (isNaN(area) || area < 0) {
        throw new Error("Campus area must be a positive number");
      }
      return true;
    }),
  body("nirf_rank")
    .optional()
    .custom((value) => {
      if (value === "" || value === null || value === undefined) return true;
      const rank = parseInt(value);
      if (isNaN(rank) || rank < 1) {
        throw new Error("NIRF rank must be a positive integer");
      }
      return true;
    }),
  body("accreditation")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Accreditation must be 100 characters or less"),
  body("total_students")
    .optional()
    .custom((value) => {
      if (value === "" || value === null || value === undefined) return true;
      const students = parseInt(value);
      if (isNaN(students) || students < 0) {
        throw new Error("Total students must be a non-negative integer");
      }
      return true;
    }),
  body("total_faculty")
    .optional()
    .custom((value) => {
      if (value === "" || value === null || value === undefined) return true;
      const faculty = parseInt(value);
      if (isNaN(faculty) || faculty < 0) {
        throw new Error("Total faculty must be a non-negative integer");
      }
      return true;
    }),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must be 1000 characters or less"),
];

// Routes
router.post("/register", registerValidation, registerStudent);
router.post(
  "/register/college",
  collegeRegistrationValidation,
  registerCollege
);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/me", auth, getMe);

module.exports = router;
