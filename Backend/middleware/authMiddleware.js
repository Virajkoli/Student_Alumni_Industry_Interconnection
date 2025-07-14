const jwt = require("jsonwebtoken");
const authService = require("../services/authService");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies or headers
    let token = req.cookies.accessToken;

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token not provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user details
    try {
      const result = await authService.getUserById(
        decoded.userId,
        decoded.role
      );

      // Check if user is active
      if (!result.user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account is deactivated",
        });
      }

      // Add user to request
      req.user = {
        userId: result.user.id,
        role: decoded.role,
        email: result.user.email,
        ...result.user,
      };

      next();
    } catch (userError) {
      console.error("❌ getUserById error:", userError.message);
      return res.status(401).json({
        success: false,
        message: "Token is not valid - user not found",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// Role-based access control middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions",
      });
    }

    next();
  };
};

module.exports = { authMiddleware, authorize };
