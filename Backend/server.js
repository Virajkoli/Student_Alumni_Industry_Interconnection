const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const prisma = require("./config/prisma");
require("dotenv").config();

const app = express();

// Trust proxy - Required for deployment on Render and other proxy services
// This allows express-rate-limit to work correctly with X-Forwarded-For headers
app.set("trust proxy", 1);

// Import routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const collegeRoutes = require("./routes/colleges");
const startupRoutes = require("./routes/startups");
const industryRoutes = require("./routes/industries");
const searchRoutes = require("./routes/search");
// Temporarily commented out until migrated to Prisma
// const githubAuthRoutes = require("./routes/github-auth");
// const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");
const collegeProfileRoutes = require("./routes/collegeProfile");
const industryProfileRoutes = require("./routes/industryProfile");
const startupProfileRoutes = require("./routes/startupProfile");
// const connectionRoutes = require("./routes/connections");
// const jobRoutes = require("./routes/jobs");
// const notificationRoutes = require("./routes/notifications");

// Import middleware
const { errorHandler } = require("./middleware/errorHandler");
const { notFound } = require("./middleware/notFound");

// Security middleware
app.use(helmet());

// Handle preflight requests BEFORE rate limiting
app.options(
  "*",
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://n55tb9bt-5173.inc1.devtunnels.ms/",
      "http://localhost:3000", // Alternative local port
      "https://scaipsfrontend.vercel.app", // Your main Vercel deployment
      "https://scaipsfrontend-6gcmi40xt-viraj-kolis-projects.vercel.app", // Vercel preview URLs
      "https://electrosoft-alumni.vercel.app", // Additional frontend URL
      "https://laughing-barnacle-wpvgwprrrg9fv4rw-5173.app.github.dev",
      "https://laughing-barnacle-wpvgwprrrg9fv4rw-5174.app.github.dev",
      "https://n55tb9bt-5000.inc1.devtunnels.ms/",
      "https://n55tb9bt-5173.inc1.devtunnels.ms/",
      "http://192.168.31.202:5173",
      "http://192.168.31.202:5000",
      // Allow requests with no origin (like mobile apps or curl requests)

      // Allow requests with no origin (like mobile apps or curl requests)

      /^https:\/\/.*\.vercel\.app$/, // Allow all Vercel subdomains
      process.env.FRONTEND_URL, // Environment variable for production
    ].filter(Boolean), // Remove any undefined values
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Rate limiting (applied after CORS preflight)
const limiter = rateLimit({
  windowMs:
    parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 1000, // Increased for development
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for OPTIONS requests (CORS preflight) and in development
    return req.method === "OPTIONS" || process.env.NODE_ENV === "development";
  },
});
app.use("/api/", limiter);

// CORS configuration - Applied globally
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173", // Local development
        "https://n55tb9bt-5173.inc1.devtunnels.ms/",
        "http://localhost:3000", // Alternative local port
        "https://scaipsfrontend.vercel.app", // Your main Vercel deployment
        "https://scaipsfrontend-6gcmi40xt-viraj-kolis-projects.vercel.app", // Vercel preview URLs
        "https://electrosoft-alumni.vercel.app", // Additional frontend URL
        "https://laughing-barnacle-wpvgwprrrg9fv4rw-5173.app.github.dev",
        "https://laughing-barnacle-wpvgwprrrg9fv4rw-5174.app.github.dev",
        "https://n55tb9bt-5000.inc1.devtunnels.ms",
        "https://n55tb9bt-5173.inc1.devtunnels.ms",
        "http://192.168.31.202:5173",
        "http://192.168.31.202:5000",
        process.env.FRONTEND_URL, // Environment variable for production
      ].filter(Boolean);

      // In development, allow all origins
      if (process.env.NODE_ENV === "development") {
        return callback(null, true);
      }

      // Check if origin is in allowed list or matches Vercel pattern
      if (
        allowedOrigins.includes(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        console.log(`❌ CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Note: Static file serving removed - using Cloudinary for media storage
// Files are now stored in Cloudinary and served directly from there

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
app.use("/api/students", studentRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/search", require("./routes/search"));
// Temporarily commented out until migrated to Prisma
// Updated: GitHub auth routes now mounted at /api/auth to match the callback URL
// app.use("/api/auth", githubAuthRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes); // Student profiles
app.use("/api/college-profile", collegeProfileRoutes); // College profiles
app.use("/api/industry-profile", industryProfileRoutes); // Industry profiles
app.use("/api/startup-profile", startupProfileRoutes); // Startup profiles
// app.use("/api/connections", connectionRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/notifications", notificationRoutes);

// Note: Media serving endpoint removed - files are now served directly from Cloudinary

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Debug endpoint to show all registered routes
app.get("/api/debug/routes", (req, res) => {
  const routes = [];

  // Get registered routes
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods).join(", "),
      });
    } else if (middleware.name === "router") {
      // Routes added via router
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const routePath = handler.route.path;
          const basePath = middleware.regexp
            .toString()
            .replace("\\^", "")
            .replace("\\/?(?=\\/|$)", "")
            .replace(/\\\//g, "/")
            .replace(/\(\?:\(\[\^\\\/\]\+\?\)\)/g, ":id");

          routes.push({
            path: basePath + routePath,
            methods: Object.keys(handler.route.methods).join(", "),
          });
        }
      });
    }
  });

  res.json({
    totalRoutes: routes.length,
    routes: routes.sort((a, b) => a.path.localeCompare(b.path)),
  });
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
    await prisma.$connect();
    console.log("🐘 Prisma Connected to PostgreSQL Successfully");
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
  prisma.$disconnect().then(() => {
    console.log("Database connection closed");
    process.exit(0);
  });
});

startServer();

module.exports = app;
