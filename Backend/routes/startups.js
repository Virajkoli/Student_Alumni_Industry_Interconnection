const express = require("express");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/startups/me - Get current startup profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is a startup
    if (req.user.role !== "startup") {
      return res.status(403).json({
        success: false,
        message: "Only startups can access this endpoint",
      });
    }

    const startup = await prisma.startup.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry: true,
        location: true,
        website: true,
        founded_year: true,
        logo: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup profile not found",
      });
    }

    res.json({
      success: true,
      data: startup,
    });
  } catch (error) {
    console.error("Error fetching startup profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch startup profile",
      error: error.message,
    });
  }
});

// PUT /api/startups/me - Update current startup profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is a startup
    if (req.user.role !== "startup") {
      return res.status(403).json({
        success: false,
        message: "Only startups can access this endpoint",
      });
    }

    const {
      name,
      phone,
      industry,
      location,
      website,
      founded_year,
      description,
    } = req.body;

    const updatedStartup = await prisma.startup.update({
      where: { id: req.user.id },
      data: {
        name,
        phone,
        industry,
        location,
        website,
        founded_year,
        description,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry: true,
        location: true,
        website: true,
        founded_year: true,
        logo: true,
        description: true,
        updated_at: true,
      },
    });

    res.json({
      success: true,
      message: "Startup profile updated successfully",
      data: updatedStartup,
    });
  } catch (error) {
    console.error("Error updating startup profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update startup profile",
      error: error.message,
    });
  }
});

// GET /api/startups - Get all startups (with pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const whereClause = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { industry: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const startups = await prisma.startup.findMany({
      where: whereClause,
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry: true,
        location: true,
        website: true,
        founded_year: true,
        logo: true,
        created_at: true,
      },
    });

    const total = await prisma.startup.count({ where: whereClause });

    res.json({
      success: true,
      data: startups,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch startups",
      error: error.message,
    });
  }
});

// GET /api/startups/:id - Get startup by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const startup = await prisma.startup.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry: true,
        location: true,
        website: true,
        founded_year: true,
        logo: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found",
      });
    }

    res.json({
      success: true,
      data: startup,
    });
  } catch (error) {
    console.error("Error fetching startup:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch startup",
      error: error.message,
    });
  }
});

// PUT /api/startups/:id - Update startup profile (requires authentication)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone,
      industry,
      location,
      website,
      founded_year,
      description,
    } = req.body;

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const updatedStartup = await prisma.startup.update({
      where: { id: parseInt(id) },
      data: {
        name,
        phone,
        industry,
        location,
        website,
        founded_year,
        description,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry: true,
        location: true,
        website: true,
        founded_year: true,
        logo: true,
        description: true,
        updated_at: true,
      },
    });

    res.json({
      success: true,
      message: "Startup profile updated successfully",
      data: updatedStartup,
    });
  } catch (error) {
    console.error("Error updating startup:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update startup profile",
      error: error.message,
    });
  }
});

module.exports = router;
