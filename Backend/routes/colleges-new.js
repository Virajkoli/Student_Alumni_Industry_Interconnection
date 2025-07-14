const express = require("express");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/colleges/me - Get current college profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is a college
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const college = await prisma.college.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College profile not found",
      });
    }

    res.json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college profile",
      error: error.message,
    });
  }
});

// PUT /api/colleges/me - Update current college profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is a college
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const { name, phone, location, website, established_year, description } =
      req.body;

    const updatedCollege = await prisma.college.update({
      where: { id: req.user.id },
      data: {
        name,
        phone,
        location,
        website,
        established_year,
        description,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        description: true,
        updated_at: true,
      },
    });

    res.json({
      success: true,
      message: "College profile updated successfully",
      data: updatedCollege,
    });
  } catch (error) {
    console.error("Error updating college profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update college profile",
      error: error.message,
    });
  }
});

// GET /api/colleges - Get all colleges (with pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const whereClause = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const colleges = await prisma.college.findMany({
      where: whereClause,
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        created_at: true,
      },
    });

    const total = await prisma.college.count({ where: whereClause });

    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges",
      error: error.message,
    });
  }
});

// GET /api/colleges/:id - Get college by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const college = await prisma.college.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college",
      error: error.message,
    });
  }
});

// PUT /api/colleges/:id - Update college profile (requires authentication)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, location, website, established_year, description } =
      req.body;

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const updatedCollege = await prisma.college.update({
      where: { id: parseInt(id) },
      data: {
        name,
        phone,
        location,
        website,
        established_year,
        description,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        description: true,
        updated_at: true,
      },
    });

    res.json({
      success: true,
      message: "College profile updated successfully",
      data: updatedCollege,
    });
  } catch (error) {
    console.error("Error updating college:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update college profile",
      error: error.message,
    });
  }
});

module.exports = router;
