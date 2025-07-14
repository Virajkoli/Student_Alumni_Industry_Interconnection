const express = require("express");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/students/me - Get current student profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access this endpoint",
      });
    }

    const student = await prisma.student.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNo: true,
        collegeName: true,
        interestedField: true,
        otherField: true,
        profilePicture: true,
        isActive: true,
        isEmailVerified: true,
        lastLogin: true,
        loginCount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student profile",
      error: error.message,
    });
  }
});

// PUT /api/students/me - Update current student profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access this endpoint",
      });
    }

    const {
      first_name,
      last_name,
      phone,
      college,
      course,
      year,
      branch,
      bio,
      skills,
      location,
      github_url,
      linkedin_url,
      portfolio_url,
    } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id: req.user.id },
      data: {
        first_name,
        last_name,
        phone,
        college,
        course,
        year,
        branch,
        bio,
        skills,
        location,
        github_url,
        linkedin_url,
        portfolio_url,
        updated_at: new Date(),
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        college: true,
        course: true,
        year: true,
        branch: true,
        profile_picture: true,
        bio: true,
        skills: true,
        location: true,
        github_url: true,
        linkedin_url: true,
        portfolio_url: true,
        updated_at: true,
      },
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student profile",
      error: error.message,
    });
  }
});

// GET /api/students - Get all students (with pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const whereClause = search
      ? {
          OR: [
            { first_name: { contains: search, mode: "insensitive" } },
            { last_name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const students = await prisma.student.findMany({
      where: whereClause,
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        college: true,
        course: true,
        year: true,
        branch: true,
        profile_picture: true,
        created_at: true,
      },
    });

    const total = await prisma.student.count({ where: whereClause });

    res.json({
      success: true,
      data: students,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
});

// GET /api/students/:id - Get student by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        college: true,
        course: true,
        year: true,
        branch: true,
        profile_picture: true,
        bio: true,
        skills: true,
        location: true,
        github_url: true,
        linkedin_url: true,
        portfolio_url: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
});

// PUT /api/students/:id - Update student profile (requires authentication)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone,
      college,
      course,
      year,
      branch,
      bio,
      skills,
      location,
      github_url,
      linkedin_url,
      portfolio_url,
    } = req.body;

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        first_name,
        last_name,
        phone,
        college,
        course,
        year,
        branch,
        bio,
        skills,
        location,
        github_url,
        linkedin_url,
        portfolio_url,
        updated_at: new Date(),
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        college: true,
        course: true,
        year: true,
        branch: true,
        profile_picture: true,
        bio: true,
        skills: true,
        location: true,
        github_url: true,
        linkedin_url: true,
        portfolio_url: true,
        updated_at: true,
      },
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student profile",
      error: error.message,
    });
  }
});

// DELETE /api/students/:id - Delete student (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    await prisma.student.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
});

module.exports = router;
