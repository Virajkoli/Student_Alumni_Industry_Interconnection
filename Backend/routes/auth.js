const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { Student, sequelize } = require("../config/database");
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

// @desc    Register user (any role)
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

    const {
      email,
      password,
      role,
      first_name,
      last_name,
      contact_no,
      college_name,
      interested_field,
      other_field,
      ...otherFields
    } = req.body;
    const userRole = role || "student"; // Default to student if no role specified

    console.log("Processing registration for role:", userRole, {
      email,
      first_name,
      last_name,
      college_name,
      interested_field,
    });

    // Check if user already exists in any table
    let existingUser = null;

    // Check Student table
    try {
      existingUser = await Student.findOne({ where: { email } });
      if (existingUser) {
        console.log("User already exists in Student table:", email);
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      }
    } catch (error) {
      console.error("Error checking Student table:", error.message);
    }

    // TODO: Add checks for other role tables when they are created
    // if (!existingUser) {
    //   try {
    //     existingUser = await Alumni.findOne({ where: { email } });
    //     if (existingUser) {
    //       console.log("User already exists in Alumni table:", email);
    //       return res.status(400).json({
    //         success: false,
    //         message: "User already exists with this email",
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error checking Alumni table:", error.message);
    //   }
    // }

    // Create user based on role
    let user;
    let userResponse;

    if (userRole === "student") {
      // Check if Student model is available
      if (!Student) {
        console.error("❌ Student model not available!");
        return res.status(500).json({
          success: false,
          message:
            "Student registration not available. Please contact support.",
        });
      }

      // Create student
      user = await Student.create({
        email,
        password,
        first_name,
        last_name,
        contact_no,
        college_name,
        interested_field,
        other_field: interested_field === "Other" ? other_field : null,
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
    }
    // TODO: Add other role creation logic when their models are created
    // else if (userRole === "alumni") {
    //   user = await Alumni.create({
    //     email,
    //     password,
    //     first_name,
    //     last_name,
    //     // ... other alumni-specific fields
    //   });
    //   userResponse = {
    //     // ... alumni-specific response
    //   };
    // }
    // else if (userRole === "college") {
    //   user = await College.create({
    //     email,
    //     password,
    //     college_name,
    //     // ... other college-specific fields
    //   });
    //   userResponse = {
    //     // ... college-specific response
    //   };
    // }
    else {
      // For now, only support student registration
      return res.status(400).json({
        success: false,
        message: `Registration for role '${userRole}' is not yet available. Currently only 'student' registration is supported.`,
      });
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

// @desc    Login user (any role)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Login attempt for email:", req.body.email);

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

    const { email, password } = req.body;

    // Try to find user in available role tables
    let user = null;
    let userRole = null;

    console.log("Searching for user across all role tables...");

    // Check Student table
    if (!user) {
      console.log("Checking Student table...");
      try {
        user = await Student.findOne({ where: { email } });
        if (user) {
          userRole = "student";
          console.log("User found in Student table");
        }
      } catch (studentError) {
        console.error("Error searching Student table:", studentError.message);
      }
    }

    // TODO: Add checks for other role tables when they are created
    // if (!user) {
    //   console.log("Checking Alumni table...");
    //   try {
    //     user = await Alumni.findOne({ where: { email } });
    //     if (user) {
    //       userRole = "alumni";
    //       console.log("User found in Alumni table");
    //     }
    //   } catch (alumniError) {
    //     console.error("Error searching Alumni table:", alumniError.message);
    //   }
    // }

    // if (!user) {
    //   console.log("Checking College table...");
    //   try {
    //     user = await College.findOne({ where: { email } });
    //     if (user) {
    //       userRole = "college";
    //       console.log("User found in College table");
    //     }
    //   } catch (collegeError) {
    //     console.error("Error searching College table:", collegeError.message);
    //   }
    // }

    // if (!user) {
    //   console.log("Checking Industry table...");
    //   try {
    //     user = await Industry.findOne({ where: { email } });
    //     if (user) {
    //       userRole = "industry";
    //       console.log("User found in Industry table");
    //     }
    //   } catch (industryError) {
    //     console.error("Error searching Industry table:", industryError.message);
    //   }
    // }

    // if (!user) {
    //   console.log("Checking Startup table...");
    //   try {
    //     user = await Startup.findOne({ where: { email } });
    //     if (user) {
    //       userRole = "startup";
    //       console.log("User found in Startup table");
    //     }
    //   } catch (startupError) {
    //     console.error("Error searching Startup table:", startupError.message);
    //   }
    // }

    if (!user) {
      console.log("User not found in any table for email:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log(`User found with role: ${userRole}`);

    // Check if user account is active
    if (user.isActive !== undefined && !user.isActive) {
      console.log("User account deactivated:", email);
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Check password
    console.log("Validating password...");
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update login tracking
    console.log("Updating login tracking...");
    await user.update({
      lastLogin: new Date(),
      loginCount: (user.loginCount || 0) + 1,
    });

    console.log("Login successful for:", email, "Role:", userRole);

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

    // Prepare response based on user role/table
    let userResponse;

    if (userRole === "student") {
      userResponse = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        contact_no: user.contact_no,
        college_name: user.college_name,
        interested_field: user.interested_field,
        other_field: user.other_field,
        role: userRole,
        isEmailVerified: user.isEmailVerified || false,
        profileCompletion:
          typeof user.getProfileCompletion === "function"
            ? user.getProfileCompletion()
            : 50,
        lastLogin: user.lastLogin,
        createdAt: user.created_at,
      };
    }
    // TODO: Add response formatting for other roles when their tables are created
    // else if (userRole === "college") {
    //   userResponse = {
    //     id: user.id,
    //     email: user.email,
    //     college_name: user.college_name,
    //     // ... other college-specific fields
    //     role: userRole,
    //     isEmailVerified: user.isEmailVerified || false,
    //     profileCompletion: typeof user.getProfileCompletion === 'function' ? user.getProfileCompletion() : 50,
    //     lastLogin: user.lastLogin,
    //     createdAt: user.created_at,
    //   };
    // }
    else {
      // Fallback for any other roles
      userResponse = {
        id: user.id,
        email: user.email,
        role: userRole,
        isEmailVerified: user.isEmailVerified || false,
        lastLogin: user.lastLogin,
        createdAt: user.created_at || user.createdAt,
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
    console.error("=== LOGIN ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Request email:", req.body?.email);

    res.status(500).json({
      success: false,
      message: "Server error during login",
      ...(process.env.NODE_ENV === "development" && {
        debug: {
          error: error.message,
          type: error.constructor.name,
        },
      }),
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

    // Try to find user in available tables
    let user = null;

    // Check Student table
    try {
      user = await Student.findByPk(decoded.userId);
    } catch (error) {
      console.error("Error checking Student table:", error.message);
    }

    // TODO: Add checks for other role tables when they are created
    // if (!user) {
    //   try {
    //     user = await Alumni.findByPk(decoded.userId);
    //   } catch (error) {
    //     console.error("Error checking Alumni table:", error.message);
    //   }
    // }

    // if (!user) {
    //   try {
    //     user = await College.findByPk(decoded.userId);
    //   } catch (error) {
    //     console.error("Error checking College table:", error.message);
    //   }
    // }

    if (!user || (user.isActive !== undefined && !user.isActive)) {
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
    // Try to find user in available tables
    let user = null;
    let userRole = null;

    // Check Student table
    try {
      user = await Student.findByPk(req.user.id, {
        attributes: {
          exclude: ["password"],
        },
      });
      if (user) {
        userRole = "student";
      }
    } catch (error) {
      console.error("Error checking Student table:", error.message);
    }

    // TODO: Add checks for other role tables when they are created
    // if (!user) {
    //   try {
    //     user = await Alumni.findByPk(req.user.id, {
    //       attributes: {
    //         exclude: ["password"],
    //       },
    //     });
    //     if (user) {
    //       userRole = "alumni";
    //     }
    //   } catch (error) {
    //     console.error("Error checking Alumni table:", error.message);
    //   }
    // }

    // if (!user) {
    //   try {
    //     user = await College.findByPk(req.user.id, {
    //       attributes: {
    //         exclude: ["password"],
    //       },
    //     });
    //     if (user) {
    //       userRole = "college";
    //     }
    //   } catch (error) {
    //     console.error("Error checking College table:", error.message);
    //   }
    // }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prepare response based on user role
    let userResponse;

    if (userRole === "student") {
      userResponse = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        contact_no: user.contact_no,
        college_name: user.college_name,
        interested_field: user.interested_field,
        other_field: user.other_field,
        role: userRole,
        isEmailVerified: user.isEmailVerified,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount,
        profileCompletion:
          typeof user.getProfileCompletion === "function"
            ? user.getProfileCompletion()
            : 50,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      };
    }
    // TODO: Add response formatting for other roles when their tables are created
    else {
      // Fallback for any other roles
      userResponse = {
        id: user.id,
        email: user.email,
        role: userRole,
        isEmailVerified: user.isEmailVerified,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount,
        createdAt: user.created_at || user.createdAt,
        updatedAt: user.updated_at || user.updatedAt,
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

// Validation middleware for user registration (flexible for different roles)
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
  // Student-specific fields
  body("first_name")
    .if(body("role").equals("student"))
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      "First name is required for students and must be between 1-100 characters"
    ),
  body("last_name")
    .if(body("role").equals("student"))
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      "Last name is required for students and must be between 1-100 characters"
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
  // TODO: Add validation for other role-specific fields when their tables are created
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

// Debug endpoint to check model status and database connection
router.get("/debug-models", async (req, res) => {
  try {
    console.log("=== DEBUG MODELS ===");

    // Check if Student model is loaded
    console.log("Student model available:", !!Student);

    // Check sequelize models
    console.log("Sequelize models:", Object.keys(sequelize.models || {}));

    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection: OK");

    // Check if tables exist
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    console.log("Available tables:", tableExists);

    // Test Student model if available
    let studentTest = null;
    if (Student) {
      try {
        // Try to count students (this will fail if table doesn't exist or model is broken)
        const count = await Student.count();
        studentTest = `Student model works, count: ${count}`;
      } catch (err) {
        studentTest = `Student model error: ${err.message}`;
      }
    }

    // TODO: Add tests for other role tables when they are created
    // let collegeTest = null;
    // if (College) {
    //   try {
    //     const count = await College.count();
    //     collegeTest = `College model works, count: ${count}`;
    //   } catch (err) {
    //     collegeTest = `College model error: ${err.message}`;
    //   }
    // }

    res.json({
      success: true,
      debug: {
        studentModelAvailable: !!Student,
        // collegeModelAvailable: !!College, // TODO: Add when College model is created
        sequelizeModels: Object.keys(sequelize.models || {}),
        tablesInDatabase: tableExists,
        studentModelTest: studentTest,
        // collegeModelTest: collegeTest, // TODO: Add when College model is created
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Debug models error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
});

// Debug endpoint to check what data is being sent for registration
router.post("/debug-register", (req, res) => {
  console.log("=== DEBUG REGISTRATION ===");
  console.log("Request Body:", JSON.stringify(req.body, null, 2));
  console.log("Headers Origin:", req.headers.origin);
  console.log("Content-Type:", req.headers["content-type"]);

  const { role } = req.body;
  const userRole = role || "student";

  let requiredFields = {};
  let optionalFields = {};

  if (userRole === "student") {
    requiredFields = {
      first_name: "required",
      last_name: "required",
      email: "required",
      password: "required (min 6 chars)",
    };
    optionalFields = {
      contact_no: "optional (max 15 chars)",
      college_name: "optional (max 200 chars)",
      interested_field: "optional (Computer, Electronics, Electrical, Other)",
      other_field: "optional (required if interested_field is Other)",
    };
  }
  // TODO: Add required/optional fields for other roles when their tables are created
  else {
    requiredFields = {
      email: "required",
      password: "required (min 6 chars)",
      role: "required (student, college, industry, startup)",
    };
    optionalFields = {
      note: "Other role registrations will be added when their tables are created",
    };
  }

  res.json({
    success: true,
    message: "Debug data logged to server console",
    receivedData: req.body,
    detectedRole: userRole,
    requiredFields: requiredFields,
    optionalFields: optionalFields,
    timestamp: new Date().toISOString(),
  });
});

// Database setup endpoint (for one-time setup)
router.post("/setup-database", async (req, res) => {
  try {
    console.log("🔄 Setting up database tables...");

    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: true });

    console.log("✅ Database synchronized successfully");
    console.log("📊 Available models:", Object.keys(sequelize.models));

    res.json({
      success: true,
      message: "Database setup completed successfully",
      models: Object.keys(sequelize.models),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    res.status(500).json({
      success: false,
      message: "Database setup failed",
      error: error.message,
    });
  }
});

module.exports = router;
