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

// ✅ Get Ping Requests (Received)
router.get("/ping-requests", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access ping requests",
      });
    }

    const studentId = req.user.userId;

    const pingRequests = await prisma.ping_networks.findMany({
      where: {
        receiver_profile_id: studentId,
        receiver_profile_type: "student",
        status: "pending",
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // Fetch sender details for each ping request
    const pingRequestsWithSenders = await Promise.all(
      pingRequests.map(async (request) => {
        const sender = await prisma.student.findUnique({
          where: { id: request.sender_profile_id },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            headline: true,
            collegeName: true,
            location: true,
          },
        });

        return {
          ...request,
          sender,
        };
      })
    );

    res.json({
      success: true,
      data: pingRequestsWithSenders,
    });
  } catch (error) {
    console.error("Error fetching ping requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ping requests",
    });
  }
});

// ✅ Get Connections (Accepted Pings)
router.get("/connections", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access connections",
      });
    }

    const studentId = req.user.userId;

    const connections = await prisma.ping_networks.findMany({
      where: {
        OR: [
          {
            sender_profile_id: studentId,
            sender_profile_type: "student",
            status: "accepted",
          },
          {
            receiver_profile_id: studentId,
            receiver_profile_type: "student",
            status: "accepted",
          },
        ],
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    // Fetch connection details
    const connectionsWithDetails = await Promise.all(
      connections.map(async (connection) => {
        const connectionUserId = 
          connection.sender_profile_id === studentId
            ? connection.receiver_profile_id
            : connection.sender_profile_id;

        const connectionUser = await prisma.student.findUnique({
          where: { id: connectionUserId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            headline: true,
            collegeName: true,
            location: true,
          },
        });

        return {
          ...connection,
          connectionUser,
        };
      })
    );

    res.json({
      success: true,
      data: connectionsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch connections",
    });
  }
});

// ✅ Get Connection Count
router.get("/connections/count", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access connection count",
      });
    }

    const studentId = req.user.userId;

    const connectionCount = await prisma.ping_networks.count({
      where: {
        OR: [
          {
            sender_profile_id: studentId,
            sender_profile_type: "student",
            status: "accepted",
          },
          {
            receiver_profile_id: studentId,
            receiver_profile_type: "student",
            status: "accepted",
          },
        ],
      },
    });

    res.json({
      success: true,
      data: { count: connectionCount },
    });
  } catch (error) {
    console.error("Error fetching connection count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch connection count",
    });
  }
});

// ✅ Get Student by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Fetching student with ID:", id);
    console.log("🔍 Current user ID:", req.user?.id);
    console.log("🔍 Current user role:", req.user?.role);
    
    // Validate ID
    const studentId = parseInt(id);
    if (isNaN(studentId)) {
      console.log("❌ Invalid ID format:", id);
      return res.status(400).json({ 
        success: false, 
        message: "Invalid student ID format" 
      });
    }
    
    console.log("🔍 Parsed ID:", studentId);

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: studentSelectFields(),
    });

    if (!student) {
      console.log("❌ Student not found for ID:", studentId);
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    console.log("✅ Student found:", student.firstName, student.lastName);
    console.log("✅ Student data:", student);
    res.json({ success: true, data: student });
  } catch (error) {
    console.error("❌ Error fetching student:", error);
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

// ✅ Send Ping Request
router.post("/ping/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can send ping requests",
      });
    }

    const receiverId = parseInt(req.params.id);
    const senderId = req.user.userId;

    // Check if receiver exists
    const receiver = await prisma.student.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check if sender is trying to ping themselves
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a ping request to yourself",
      });
    }

    // Check if connection already exists
    const existingConnection = await prisma.ping_networks.findFirst({
      where: {
        OR: [
          {
            sender_profile_id: senderId,
            receiver_profile_id: receiverId,
            sender_profile_type: "student",
            receiver_profile_type: "student",
          },
          {
            sender_profile_id: receiverId,
            receiver_profile_id: senderId,
            sender_profile_type: "student",
            receiver_profile_type: "student",
          },
        ],
      },
    });

    if (existingConnection) {
      let message = "";
      switch (existingConnection.status) {
        case "pending":
          message = existingConnection.sender_profile_id === senderId 
            ? "Ping request already sent" 
            : "This user has already sent you a ping request";
          break;
        case "accepted":
          message = "You are already connected with this user";
          break;
        case "rejected":
          message = "Previous ping request was rejected";
          break;
        default:
          message = "Connection already exists";
      }
      return res.status(400).json({
        success: false,
        message,
      });
    }

    // Create new ping request
    const pingRequest = await prisma.ping_networks.create({
      data: {
        sender_profile_id: senderId,
        sender_profile_type: "student",
        receiver_profile_id: receiverId,
        receiver_profile_type: "student",
        status: "pending",
      },
    });

    res.json({
      success: true,
      message: "Ping request sent successfully",
      data: pingRequest,
    });
  } catch (error) {
    console.error("Error sending ping request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send ping request",
    });
  }
});

// ✅ Accept Ping Request
router.put("/ping/:requestId/accept", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can accept ping requests",
      });
    }

    const requestId = parseInt(req.params.requestId);
    const studentId = req.user.userId;

    const pingRequest = await prisma.ping_networks.findUnique({
      where: { id: requestId },
    });

    if (!pingRequest) {
      return res.status(404).json({
        success: false,
        message: "Ping request not found",
      });
    }

    // Check if the current user is the receiver
    if (pingRequest.receiver_profile_id !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only accept ping requests sent to you",
      });
    }

    // Check if request is still pending
    if (pingRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This ping request has already been processed",
      });
    }

    // Update ping request status to accepted
    const updatedRequest = await prisma.ping_networks.update({
      where: { id: requestId },
      data: {
        status: "accepted",
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Ping request accepted successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error accepting ping request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept ping request",
    });
  }
});

// ✅ Reject Ping Request
router.put("/ping/:requestId/reject", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can reject ping requests",
      });
    }

    const requestId = parseInt(req.params.requestId);
    const studentId = req.user.userId;

    const pingRequest = await prisma.ping_networks.findUnique({
      where: { id: requestId },
    });

    if (!pingRequest) {
      return res.status(404).json({
        success: false,
        message: "Ping request not found",
      });
    }

    // Check if the current user is the receiver
    if (pingRequest.receiver_profile_id !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only reject ping requests sent to you",
      });
    }

    // Check if request is still pending
    if (pingRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This ping request has already been processed",
      });
    }

    // Update ping request status to rejected
    const updatedRequest = await prisma.ping_networks.update({
      where: { id: requestId },
      data: {
        status: "rejected",
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Ping request rejected successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error rejecting ping request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject ping request",
    });
  }
});

// ✅ Check Connection Status
router.get("/ping-status/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can check ping status",
      });
    }

    const otherUserId = parseInt(req.params.id);
    const currentUserId = req.user.userId;

    if (currentUserId === otherUserId) {
      return res.json({
        success: true,
        data: { status: "self" },
      });
    }

    const connection = await prisma.ping_networks.findFirst({
      where: {
        OR: [
          {
            sender_profile_id: currentUserId,
            receiver_profile_id: otherUserId,
            sender_profile_type: "student",
            receiver_profile_type: "student",
          },
          {
            sender_profile_id: otherUserId,
            receiver_profile_id: currentUserId,
            sender_profile_type: "student",
            receiver_profile_type: "student",
          },
        ],
      },
    });

    if (!connection) {
      return res.json({
        success: true,
        data: { status: "none" },
      });
    }

    let status = connection.status;
    if (connection.status === "pending") {
      status = connection.sender_profile_id === currentUserId ? "sent" : "received";
    }

    res.json({
      success: true,
      data: { 
        status,
        connectionId: connection.id,
        createdAt: connection.created_at,
      },
    });
  } catch (error) {
    console.error("Error checking ping status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check ping status",
    });
  }
});

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
