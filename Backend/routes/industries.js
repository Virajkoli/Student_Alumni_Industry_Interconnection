const express = require("express");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/industries/me - Get current industry profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is an industry
    if (req.user.role !== "industry") {
      return res.status(403).json({
        success: false,
        message: "Only industries can access this endpoint",
      });
    }

    const industry = await prisma.industry.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry_type: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry profile not found",
      });
    }

    res.json({
      success: true,
      data: industry,
    });
  } catch (error) {
    console.error("Error fetching industry profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch industry profile",
      error: error.message,
    });
  }
});

// PUT /api/industries/me - Update current industry profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is an industry
    if (req.user.role !== "industry") {
      return res.status(403).json({
        success: false,
        message: "Only industries can access this endpoint",
      });
    }

    const {
      name,
      phone,
      industry_type,
      location,
      website,
      established_year,
      description,
    } = req.body;

    const updatedIndustry = await prisma.industry.update({
      where: { id: req.user.id },
      data: {
        name,
        phone,
        industry_type,
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
        industry_type: true,
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
      message: "Industry profile updated successfully",
      data: updatedIndustry,
    });
  } catch (error) {
    console.error("Error updating industry profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update industry profile",
      error: error.message,
    });
  }
});

// GET /api/industries - Get all industries (with pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const whereClause = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { industry_type: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const industries = await prisma.industry.findMany({
      where: whereClause,
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry_type: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        created_at: true,
      },
    });

    const total = await prisma.industry.count({ where: whereClause });

    res.json({
      success: true,
      data: industries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching industries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch industries",
      error: error.message,
    });
  }
});

// GET /api/industries/:id - Get industry by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const industry = await prisma.industry.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        industry_type: true,
        location: true,
        website: true,
        established_year: true,
        logo: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    res.json({
      success: true,
      data: industry,
    });
  } catch (error) {
    console.error("Error fetching industry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch industry",
      error: error.message,
    });
  }
});

// PUT /api/industries/:id - Update industry profile (requires authentication)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone,
      industry_type,
      location,
      website,
      established_year,
      description,
    } = req.body;

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const updatedIndustry = await prisma.industry.update({
      where: { id: parseInt(id) },
      data: {
        name,
        phone,
        industry_type,
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
        industry_type: true,
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
      message: "Industry profile updated successfully",
      data: updatedIndustry,
    });
  } catch (error) {
    console.error("Error updating industry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update industry profile",
      error: error.message,
    });
  }
});

module.exports = router;
