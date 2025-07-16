const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find user in students or colleges tables using Prisma
      let user = null;
      let userRole = null;

      // Check students table first
      try {
        user = await prisma.student.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profilePicture: true,
            isActive: true,
            // Exclude password for security
          },
        });
        if (user) {
          userRole = "student";
        }
      } catch (error) {
        console.error(
          "Error checking students table in auth middleware:",
          error.message
        );
      }

      // Check colleges table if not found in students
      if (!user) {
        try {
          user = await prisma.college.findUnique({
            where: { id: decoded.userId },
            select: {
              id: true,
              name: true,
              email: true,
              logoUrl: true,
              isActive: true,
              // Exclude password for security
            },
          });
          if (user) {
            userRole = "college";
          }
        } catch (error) {
          console.error(
            "Error checking colleges table in auth middleware:",
            error.message
          );
        }
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token is not valid - user not found",
        });
      }

      if (user.isActive !== undefined && !user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account is deactivated",
        });
      }

      // Add user to request object with role
      req.user = {
        ...user,
        userId: user.id,
        role: userRole,
      };
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Server error in authentication",
    });
  }
};

// Middleware to check if user has specific role (supports role-based authorization)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied - no user found",
      });
    }

    // Check if user's role is in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied - role '${req.user.role}' not authorized for this resource`,
        allowedRoles: roles,
      });
    }

    next();
  };
};

// Optional auth middleware (doesn't fail if no token, supports role-based auth)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.substring(7);

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find user in students or colleges tables using Prisma
      let user = null;
      let userRole = null;

      // Check students table first
      try {
        user = await prisma.student.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profilePicture: true,
            isActive: true,
            // Exclude password for security
          },
        });
        if (user) {
          userRole = "student";
        }
      } catch (error) {
        console.error(
          "Error checking students table in optional auth:",
          error.message
        );
      }

      // Check colleges table if not found in students
      if (!user) {
        try {
          user = await prisma.college.findUnique({
            where: { id: decoded.userId },
            select: {
              id: true,
              name: true,
              email: true,
              logoUrl: true,
              isActive: true,
              // Exclude password for security
            },
          });
          if (user) {
            userRole = "college";
          }
        } catch (error) {
          console.error(
            "Error checking colleges table in optional auth:",
            error.message
          );
        }
      }

      if (user && (user.isActive === undefined || user.isActive)) {
        req.user = {
          ...user,
          userId: user.id,
          role: userRole,
        };
      } else {
        req.user = null;
      }
    } catch (jwtError) {
      req.user = null;
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    req.user = null;
    next();
  }
};

module.exports = {
  auth,
  authorize,
  optionalAuth,
};
