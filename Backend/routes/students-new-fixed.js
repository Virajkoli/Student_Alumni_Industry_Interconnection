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
      firstName,
      lastName,
      contactNo,
      collegeName,
      interestedField,
      otherField,
      profilePicture,
    } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id: req.user.userId },
      data: {
        firstName,
        lastName,
        contactNo,
        collegeName,
        interestedField,
        otherField,
        profilePicture,
        updatedAt: new Date(),
      },
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

    res.json({
      success: true,
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

// GET /api/students - Get all students with pagination and search
router.get("/", authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const offset = (page - 1) * limit;

    // Build search filter
    const searchFilter = search
      ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { collegeName: { contains: search, mode: "insensitive" } },
            { interestedField: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Get students with pagination
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: {
          isActive: true,
          ...searchFilter,
        },
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
        orderBy: {
          [sortBy]: sortOrder,
        },
        take: parseInt(limit),
        skip: parseInt(offset),
      }),
      prisma.student.count({
        where: {
          isActive: true,
          ...searchFilter,
        },
      }),
    ]);

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
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
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

// PUT /api/students/:id - Update student by ID (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow admins or the student themselves to update
    if (req.user.role !== "admin" && req.user.userId !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const {
      firstName,
      lastName,
      contactNo,
      collegeName,
      interestedField,
      otherField,
      profilePicture,
      isActive,
      isEmailVerified,
    } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        contactNo,
        collegeName,
        interestedField,
        otherField,
        profilePicture,
        isActive,
        isEmailVerified,
        updatedAt: new Date(),
      },
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

    res.json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
});

// DELETE /api/students/:id - Delete student by ID (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow admins to delete
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can delete student accounts",
      });
    }

    await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Student account deactivated successfully",
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
