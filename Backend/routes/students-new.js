const express = require("express");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const { uploadProfileImage } = require("../config/cloudinary");

// ✅ GET Current Student Profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access this endpoint",
      });
    }

    const student = await prisma.student.findUnique({
      where: { id: req.user.userId },
      select: studentSelectFields(),
    });

    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student profile not found" });

    res.json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch student profile" });
  }
});

// ✅ Update Current Student Profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
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
      location,
      headline,
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
        location,
        headline,
        profilePicture,
        updatedAt: new Date(),
      },
      select: studentSelectFields(),
    });

    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update student profile" });
  }
});

// ✅ Get All Students with Pagination + Search
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

    const searchFilter = search
      ? {
          OR: [
            "firstName",
            "lastName",
            "email",
            "collegeName",
            "interestedField",
          ].map((field) => ({
            [field]: { contains: search, mode: "insensitive" },
          })),
        }
      : {};

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: { isActive: true, ...searchFilter },
        select: studentSelectFields(),
        orderBy: { [sortBy]: sortOrder },
        take: parseInt(limit),
        skip: parseInt(offset),
      }),
      prisma.student.count({ where: { isActive: true, ...searchFilter } }),
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
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch students" });
  }
});

// ✅ Get Student by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      select: studentSelectFields(),
    });

    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    res.json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch student" });
  }
});

// ✅ Admin or Self Update Student by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
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
      location,
      headline,
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
        headline: headline?.trim() || null,
        location: location?.trim() || null,
        isEmailVerified,
        updatedAt: new Date(),
      },
      select: studentSelectFields(),
    });

    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update student" });
  }
});

// ✅ Delete (Soft) Student by ID (Admin Only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can delete student accounts",
      });
    }

    await prisma.student.update({
      where: { id: parseInt(req.params.id) },
      data: { isActive: false, updatedAt: new Date() },
    });

    res.json({
      success: true,
      message: "Student account deactivated successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete student" });
  }
});

// ✅ Upload Profile Image
router.post(
  "/profile-image",
  authMiddleware,
  uploadProfileImage.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });

      const updatedStudent = await prisma.student.update({
        where: { id: req.user.userId },
        data: { profilePicture: req.file.path },
      });

      res.json({
        success: true,
        message: "Profile picture updated",
        data: updatedStudent,
      });
    } catch (error) {
      console.error("Upload profile picture error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to upload profile picture" });
    }
  }
);

// ✅ Upload Cover Image
router.post(
  "/cover-image",
  authMiddleware,
  uploadProfileImage.single("coverImage"),
  async (req, res) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });

      const updatedStudent = await prisma.student.update({
        where: { id: req.user.userId },
        data: { coverPicture: req.file.path },
      });

      res.json({
        success: true,
        message: "Cover image updated",
        data: updatedStudent,
      });
    } catch (error) {
      console.error("Upload cover image error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to upload cover image" });
    }
  }
);

// ✅ Helper: Common Prisma Select Fields
function studentSelectFields() {
  return {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    contactNo: true,
    collegeName: true,
    interestedField: true,
    location: true,
    headline: true,
    otherField: true,
    profilePicture: true,
    coverPicture: true,
    isActive: true,
    isEmailVerified: true,
    lastLogin: true,
    loginCount: true,
    createdAt: true,
    updatedAt: true,
  };
}

module.exports = router;
