const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { testConnection, syncDatabase } = require("./config/database");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const studentRoutes = require("./routes/students");
const postRoutes = require("./routes/posts");
const connectionRoutes = require("./routes/connections");
const jobRoutes = require("./routes/jobs");
const notificationRoutes = require("./routes/notifications");

// Import middleware
const { errorHandler } = require("./middleware/errorHandler");
const { notFound } = require("./middleware/notFound");

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs:
    parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "http://localhost:3000", // Alternative local port
      "https://scaipsfrontend.vercel.app", // Your main Vercel deployment
      "https://scaipsfrontend-6gcmi40xt-viraj-kolis-projects.vercel.app", // Vercel preview URLs
      "https://electrosoft-alumni.vercel.app", 
      "https://laughing-barnacle-wpvgwprrrg9fv4rw-5173.app.github.dev/", // Additional frontend URL
      /^https:\/\/.*\.vercel\.app$/, // Allow all Vercel subdomains
      process.env.FRONTEND_URL, // Environment variable for production
    ].filter(Boolean), // Remove any undefined values
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Static files (for uploaded files) with comprehensive CORS
app.use(
  "/uploads",
  cors(),
  express.static("uploads", {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    },
  })
);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SCAIPS Backend API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);

// Dedicated media serving endpoint with CORS
app.get("/api/media/*", (req, res) => {
  const filePath = req.params[0]; // Get the file path after /api/media/
  const fullPath = path.join(__dirname, "uploads", filePath);

  // Set CORS headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Check if file exists
  if (fs.existsSync(fullPath)) {
    res.sendFile(fullPath);
  } else {
    res.status(404).json({ error: "Media file not found" });
  }
});

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SCAIPS Backend API",
    version: "1.0.0",
    documentation: "/api/docs",
    health: "/health",
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    const connectionSuccess = await testConnection();
    if (!connectionSuccess) {
      throw new Error("Failed to connect to PostgreSQL database");
    }

    // Sync database in development (create tables if they don't exist)
    if (process.env.NODE_ENV === "development") {
      await syncDatabase(false);
    }

    console.log("🐘 PostgreSQL Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Connect to database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
      console.log(
        `📋 Health check available at http://localhost:${PORT}/health`
      );
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  const { sequelize } = require("./config/database");
  sequelize.close().then(() => {
    console.log("Database connection closed");
    process.exit(0);
  });
});

startServer();

module.exports = app;
