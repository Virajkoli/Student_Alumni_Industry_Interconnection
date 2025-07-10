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
        throw new Error(
          "Establishment year must be a valid year between 1800 and current year"
        );
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

// Google Authentication Helper Function
const verifyGoogleToken = async (accessToken) => {
  try {
    // Verify the access token by calling Google's userinfo endpoint
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );
    if (!response.ok) {
      throw new Error("Invalid access token");
    }
    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error("Google token verification error:", error);
    throw new Error("Invalid Google token");
  }
};

// @desc    Google Login
// @route   POST /api/auth/google/login
// @access  Public
const googleLogin = async (req, res) => {
  try {
    console.log("=== GOOGLE LOGIN ===");
    console.log("Request body:", req.body);

    const {
      email,
      google_id,
      firstName,
      lastName,
      profile_picture,
      accessToken,
    } = req.body;

    // Verify Google token
    let googleUserInfo;
    if (accessToken) {
      try {
        googleUserInfo = await verifyGoogleToken(accessToken);
        if (googleUserInfo.email !== email) {
          return res.status(400).json({
            success: false,
            message: "Google token email doesn't match provided email",
          });
        }
      } catch (tokenError) {
        console.log(
          "Token verification failed, proceeding without verification:",
          tokenError.message
        );
        // Continue without token verification for now
      }
    }

    // Check if user exists in Student or College tables
    let existingUser = await Student.findOne({ where: { email } });
    let userType = "student";

    if (!existingUser) {
      existingUser = await College.findOne({ where: { email } });
      userType = "college";
    }

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Update user with Google information if not already set
    if (!existingUser.google_id) {
      existingUser.google_id = google_id;
      existingUser.profile_picture = profile_picture;
      if (!existingUser.first_name) existingUser.first_name = firstName;
      if (!existingUser.last_name) existingUser.last_name = lastName;
      await existingUser.save();
    }

    // Generate tokens
    const token = generateToken(existingUser.id);
    const refreshToken = generateRefreshToken(existingUser.id);

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log("Google login successful for:", existingUser.email);

    // Return user data based on type
    let userResponse;
    if (userType === "student") {
      userResponse = {
        id: existingUser.id,
        email: existingUser.email,
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        fullName: `${existingUser.first_name} ${existingUser.last_name}`,
        contact_no: existingUser.contact_no,
        student_college_name: existingUser.student_college_name,
        interested_field: existingUser.interested_field,
        other_field: existingUser.other_field,
        role: "student",
        google_id: existingUser.google_id,
        profile_picture: existingUser.profile_picture,
      };
    } else {
      userResponse = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: "college",
        google_id: existingUser.google_id,
        profile_picture: existingUser.profile_picture,
      };
    }

    res.json({
      success: true,
      message: "Google login successful",
      data: {
        token,
        user: userResponse,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: "Google login failed",
      error: error.message,
    });
  }
};

// @desc    Google Register
// @route   POST /api/auth/google/register
// @access  Public
const googleRegister = async (req, res) => {
  try {
    console.log("=== GOOGLE REGISTRATION ===");
    console.log("Request body:", req.body);

    const {
      email,
      firstName,
      lastName,
      google_id,
      profile_picture,
      accessToken,
      role,
      ...roleSpecificData
    } = req.body;

    // Verify Google token
    let googleUserInfo;
    if (accessToken) {
      try {
        googleUserInfo = await verifyGoogleToken(accessToken);
        if (googleUserInfo.email !== email) {
          return res.status(400).json({
            success: false,
            message: "Google token email doesn't match provided email",
          });
        }
      } catch (tokenError) {
        console.log(
          "Token verification failed, proceeding without verification:",
          tokenError.message
        );
        // Continue without token verification for now
      }
    }

    // Check if user already exists in Student or College tables
    let existingUser = await Student.findOne({ where: { email } });
    if (!existingUser) {
      existingUser = await College.findOne({ where: { email } });
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create user based on role
    let newUser;

    if (role === "student") {
      // Create student record directly
      newUser = await Student.create({
        email,
        password: `google_auth_${Date.now()}`, // Dummy password for Google users
        first_name: firstName,
        last_name: lastName,
        contact_no: roleSpecificData.contact_no,
        student_college_name: roleSpecificData.student_college_name,
        interested_field: roleSpecificData.interested_field,
        other_field: roleSpecificData.other_field,
        // Add Google-specific fields if the model supports them
        google_id: google_id,
        profile_picture: profile_picture,
      });
    } else if (role === "college") {
      // Create college record directly
      newUser = await College.create({
        email,
        password: `google_auth_${Date.now()}`, // Dummy password for Google users
        name: roleSpecificData.college_name,
        description:
          roleSpecificData.description ||
          `${roleSpecificData.college_name} - College`,
        location: roleSpecificData.college_address,
        established: roleSpecificData.establishment_year
          ? parseInt(roleSpecificData.establishment_year)
          : null,
        website: roleSpecificData.website,
        campusArea: roleSpecificData.campus_area
          ? parseFloat(roleSpecificData.campus_area)
          : null,
        nirfRank: roleSpecificData.nirf_rank
          ? parseInt(roleSpecificData.nirf_rank)
          : null,
        accreditation: roleSpecificData.accreditation,
        totalStudents: roleSpecificData.total_students
          ? parseInt(roleSpecificData.total_students)
          : null,
        totalFaculty: roleSpecificData.total_faculty
          ? parseInt(roleSpecificData.total_faculty)
          : null,
        // Add Google-specific fields if the model supports them
        google_id: google_id,
        profile_picture: profile_picture,
      });
    } else {
      // For industry and startup, create student record for now (can be changed later)
      newUser = await Student.create({
        email,
        password: `google_auth_${Date.now()}`, // Dummy password for Google users
        first_name: firstName,
        last_name: lastName,
        contact_no: roleSpecificData.contact_no || "N/A",
        student_college_name:
          roleSpecificData.company_name ||
          roleSpecificData.startup_name ||
          "N/A",
        interested_field:
          roleSpecificData.industry_type ||
          roleSpecificData.startup_stage ||
          "Other",
        other_field: `${role} - ${
          roleSpecificData.designation ||
          roleSpecificData.funding_status ||
          "N/A"
        }`,
        // Add Google-specific fields if the model supports them
        google_id: google_id,
        profile_picture: profile_picture,
      });
    }

    // Generate tokens
    const token = generateToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log("Google registration successful for:", newUser.email);

    res.status(201).json({
      success: true,
      message: "Google registration successful",
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          first_name: newUser.first_name || firstName,
          last_name: newUser.last_name || lastName,
          role: role,
          google_id: newUser.google_id || google_id,
          profile_picture: newUser.profile_picture || profile_picture,
        },
      },
    });
  } catch (error) {
    console.error("Google registration error:", error);
    res.status(500).json({
      success: false,
      message: "Google registration failed",
      error: error.message,
    });
  }
};

// @desc    College Login (Email/Password)
// @route   POST /api/auth/college/login
// @access  Public
const collegeLogin = async (req, res) => {
  try {
    console.log("=== COLLEGE LOGIN ===");
    console.log("Request body:", { ...req.body, password: "[HIDDEN]" });

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

    // Find college by email
    const college = await College.findOne({ where: { email } });

    if (!college) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if college is active
    if (!college.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Check password
    const isPasswordValid = await college.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update login tracking
    await college.update({
      lastLogin: new Date(),
      loginCount: college.loginCount + 1,
    });

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

    // Return college data
    const collegeResponse = {
      id: college.id,
      name: college.name,
      email: college.email,
      description: college.description,
      location: college.location,
      established: college.established,
      campusArea: college.campusArea,
      nirfRank: college.nirfRank,
      accreditation: college.accreditation,
      totalStudents: college.totalStudents,
      totalFaculty: college.totalFaculty,
      website: college.website,
      role: "college",
      logoUrl: college.logoUrl,
      backgroundUrl: college.backgroundUrl,
      isEmailVerified: college.isEmailVerified,
      isActive: college.isActive,
      profileCompletion: college.getProfileCompletion(),
      lastLogin: college.lastLogin,
      createdAt: college.createdAt,
    };

    console.log("College login successful:", college.email);

    res.json({
      success: true,
      message: "College login successful",
      data: {
        user: collegeResponse,
        token,
      },
    });
  } catch (error) {
    console.error("College login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during college login",
    });
  }
};

// @desc    College Google Login
// @route   POST /api/auth/college/google/login
// @access  Public
const collegeGoogleLogin = async (req, res) => {
  try {
    console.log("=== COLLEGE GOOGLE LOGIN ===");
    console.log("Request body:", req.body);

    const {
      email,
      google_id,
      firstName,
      lastName,
      profile_picture,
      accessToken,
    } = req.body;

    // Verify Google token
    let googleUserInfo;
    if (accessToken) {
      try {
        googleUserInfo = await verifyGoogleToken(accessToken);
        if (googleUserInfo.email !== email) {
          return res.status(400).json({
            success: false,
            message: "Google token email doesn't match provided email",
          });
        }
      } catch (tokenError) {
        console.log(
          "Token verification failed, proceeding without verification:",
          tokenError.message
        );
      }
    }

    // Find college by email
    const existingCollege = await College.findOne({ where: { email } });

    if (!existingCollege) {
      return res.status(404).json({
        success: false,
        message: "College not found. Please register first.",
      });
    }

    // Check if college is active
    if (!existingCollege.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Update college with Google information if not already set
    if (!existingCollege.google_id) {
      existingCollege.google_id = google_id;
      existingCollege.profile_picture = profile_picture;
      await existingCollege.save();
    }

    // Update login tracking
    await existingCollege.update({
      lastLogin: new Date(),
      loginCount: existingCollege.loginCount + 1,
    });

    // Generate tokens
    const token = generateToken(existingCollege.id);
    const refreshToken = generateRefreshToken(existingCollege.id);

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log("College Google login successful for:", existingCollege.email);

    const collegeResponse = {
      id: existingCollege.id,
      name: existingCollege.name,
      email: existingCollege.email,
      description: existingCollege.description,
      location: existingCollege.location,
      established: existingCollege.established,
      campusArea: existingCollege.campusArea,
      nirfRank: existingCollege.nirfRank,
      accreditation: existingCollege.accreditation,
      totalStudents: existingCollege.totalStudents,
      totalFaculty: existingCollege.totalFaculty,
      website: existingCollege.website,
      role: "college",
      logoUrl: existingCollege.logoUrl,
      backgroundUrl: existingCollege.backgroundUrl,
      google_id: existingCollege.google_id,
      profile_picture: existingCollege.profile_picture,
      isEmailVerified: existingCollege.isEmailVerified,
      isActive: existingCollege.isActive,
      profileCompletion: existingCollege.getProfileCompletion(),
      lastLogin: existingCollege.lastLogin,
      createdAt: existingCollege.createdAt,
    };

    res.json({
      success: true,
      message: "College Google login successful",
      data: {
        token,
        user: collegeResponse,
      },
    });
  } catch (error) {
    console.error("College Google login error:", error);
    res.status(500).json({
      success: false,
      message: "College Google login failed",
      error: error.message,
    });
  }
};

// @desc    College Google Register
// @route   POST /api/auth/college/google/register
// @access  Public
const collegeGoogleRegister = async (req, res) => {
  try {
    console.log("=== COLLEGE GOOGLE REGISTRATION ===");
    console.log("Request body:", req.body);

    const {
      email,
      firstName,
      lastName,
      google_id,
      profile_picture,
      accessToken,
      college_name,
      description,
      college_address,
      establishment_year,
      website,
      campus_area,
      nirf_rank,
      accreditation,
      total_students,
      total_faculty,
    } = req.body;

    // Verify Google token
    let googleUserInfo;
    if (accessToken) {
      try {
        googleUserInfo = await verifyGoogleToken(accessToken);
        if (googleUserInfo.email !== email) {
          return res.status(400).json({
            success: false,
            message: "Google token email doesn't match provided email",
          });
        }
      } catch (tokenError) {
        console.log(
          "Token verification failed, proceeding without verification:",
          tokenError.message
        );
      }
    }

    // Check if college already exists
    const existingCollege = await College.findOne({ where: { email } });

    if (existingCollege) {
      return res.status(409).json({
        success: false,
        message: "College already exists with this email",
      });
    }

    // Create college record
    const collegeData = {
      email,
      password: `google_auth_${Date.now()}`, // Dummy password for Google users
      name: college_name,
      description: description || `${college_name} - College`,
      location: college_address,
      established: establishment_year ? parseInt(establishment_year) : null,
      website: website || null,
      campusArea: campus_area ? parseFloat(campus_area) : null,
      nirfRank: nirf_rank ? parseInt(nirf_rank) : null,
      accreditation: accreditation || null,
      totalStudents: total_students ? parseInt(total_students) : null,
      totalFaculty: total_faculty ? parseInt(total_faculty) : null,
      google_id: google_id,
      profile_picture: profile_picture,
    };

    console.log("Creating college with Google data:", collegeData);

    const newCollege = await College.create(collegeData);

    // Generate tokens
    const token = generateToken(newCollege.id);
    const refreshToken = generateRefreshToken(newCollege.id);

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log(
      "College Google registration successful for:",
      newCollege.email
    );

    const collegeResponse = {
      id: newCollege.id,
      name: newCollege.name,
      email: newCollege.email,
      description: newCollege.description,
      location: newCollege.location,
      established: newCollege.established,
      campusArea: newCollege.campusArea,
      nirfRank: newCollege.nirfRank,
      accreditation: newCollege.accreditation,
      totalStudents: newCollege.totalStudents,
      totalFaculty: newCollege.totalFaculty,
      website: newCollege.website,
      role: "college",
      logoUrl: newCollege.logoUrl,
      backgroundUrl: newCollege.backgroundUrl,
      google_id: newCollege.google_id,
      profile_picture: newCollege.profile_picture,
      isEmailVerified: newCollege.isEmailVerified,
      isActive: newCollege.isActive,
      profileCompletion: newCollege.getProfileCompletion(),
      createdAt: newCollege.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "College Google registration successful",
      data: {
        token,
        user: collegeResponse,
      },
    });
  } catch (error) {
    console.error("College Google registration error:", error);
    res.status(500).json({
      success: false,
      message: "College Google registration failed",
      error: error.message,
    });
  }
};

// Routes
router.post("/register", registerValidation, registerStudent);
router.post(
  "/register/college",
  collegeRegistrationValidation,
  registerCollege
);
router.post("/login", loginValidation, login);
router.post("/college/login", loginValidation, collegeLogin);
router.post("/college/google/login", collegeGoogleLogin);
router.post("/college/google/register", collegeGoogleRegister);
router.post("/google/login", googleLogin);
router.post("/google/register", googleRegister);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/me", auth, getMe);

module.exports = router;
