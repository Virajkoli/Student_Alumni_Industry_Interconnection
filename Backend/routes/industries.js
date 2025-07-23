const express = require("express");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

// GET /api/industries/me - Get current industry profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
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
        companyName: true,
        email: true,
        contactNo: true,
        industryType: true,
        location: true,
        website: true,
        description: true,
        logoUrl: true,
        backgroundUrl: true,
        createdAt: true,
        updatedAt: true,
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
      data: {
        ...industry,
        owner_id: industry.id // Add owner_id for frontend compatibility
      }
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
    if (req.user.role !== "industry") {
      return res.status(403).json({
        success: false,
        message: "Only industries can access this endpoint",
      });
    }

    const {
      companyName,
      contactNo,
      industryType,
      location,
      website,
      description,
      logoUrl,
      backgroundUrl,
    } = req.body;

    const updatedIndustry = await prisma.industry.update({
      where: { id: req.user.id },
      data: {
        companyName,
        contactNo,
        industryType,
        location,
        website,
        description,
        logoUrl,
        backgroundUrl,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        companyName: true,
        email: true,
        contactNo: true,
        industryType: true,
        location: true,
        website: true,
        description: true,
        logoUrl: true,
        backgroundUrl: true,
        updatedAt: true,
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
            { companyName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { industryType: { contains: search, mode: "insensitive" } },
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
        companyName: true,
        email: true,
        contactNo: true,
        industryType: true,
        location: true,
        website: true,
        logoUrl: true,
        createdAt: true,
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

// ===================================
// INDUSTRY PING/CONNECTION ROUTES
// ===================================
// NOTE: These specific routes must come BEFORE the generic /:id route!

// POST /api/industries/ping/:industryId - Send ping request to industry
router.post("/ping/:industryId", authMiddleware, async (req, res) => {
  try {
    const { industryId } = req.params;
    const senderId = req.user.id;
    const senderType = req.user.role;

    console.log(`Ping request: User ${senderId} (${senderType}) -> Industry ${industryId}`);

    // Validate industry exists
    const industry = await prisma.industry.findUnique({
      where: { id: parseInt(industryId) },
    });

    if (!industry) {
      console.log(`Industry ${industryId} not found`);
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    // Check if ping already exists
    const existingPing = await prisma.ping_networks.findFirst({
      where: {
        sender_profile_id: senderId,
        sender_profile_type: senderType,
        receiver_profile_id: parseInt(industryId),
        receiver_profile_type: "industry",
      },
    });

    if (existingPing) {
      console.log(`Ping already exists: ${existingPing.id}, status: ${existingPing.status}`);
      return res.status(400).json({
        success: false,
        message: "Connection request already exists",
      });
    }

    // Create ping request
    const ping = await prisma.ping_networks.create({
      data: {
        sender_profile_id: senderId,
        sender_profile_type: senderType,
        receiver_profile_id: parseInt(industryId),
        receiver_profile_type: "industry",
        status: "pending",
      },
    });

    console.log(`Ping created successfully: ${ping.id}`);

    res.status(201).json({
      success: true,
      message: "Ping request sent successfully",
      data: ping,
    });
  } catch (error) {
    console.error("Error sending industry ping:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send ping request",
      error: error.message,
    });
  }
});

// GET /api/industries/ping-requests - Get ping requests for current industry
router.get("/ping-requests", authMiddleware, async (req, res) => {
  try {
    console.log(`Fetching ping requests for user: ${req.user.id}, role: ${req.user.role}`);
    
    if (req.user.role !== "industry") {
      console.log(`Access denied: User role is ${req.user.role}, not industry`);
      return res.status(403).json({
        success: false,
        message: "Only industries can access this endpoint",
      });
    }

    const pingRequests = await prisma.ping_networks.findMany({
      where: {
        receiver_profile_id: req.user.id,
        receiver_profile_type: "industry",
        status: "pending",
      },
      include: {
        // We'll need to manually join based on sender_profile_type
      },
      orderBy: {
        created_at: "desc",
      },
    });

    console.log(`Found ${pingRequests.length} ping requests for industry ${req.user.id}`);

    // Manually fetch sender details based on profile type
    const enrichedRequests = await Promise.all(
      pingRequests.map(async (request) => {
        let sender = null;
        
        console.log(`Processing request ${request.id} from ${request.sender_profile_type} ${request.sender_profile_id}`);
        
        if (request.sender_profile_type === "student") {
          sender = await prisma.student.findUnique({
            where: { id: request.sender_profile_id },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profilePicture: true,
              headline: true,
              collegeName: true,
            },
          });
        } else if (request.sender_profile_type === "college") {
          sender = await prisma.college.findUnique({
            where: { id: request.sender_profile_id },
            select: {
              id: true,
              name: true,
              email: true,
              logoUrl: true,
            },
          });
          // Map college fields to match expected format
          if (sender) {
            sender.firstName = sender.name;
            sender.lastName = "";
            sender.profilePicture = sender.logoUrl;
          }
        }
        
        console.log(`Sender details for request ${request.id}:`, sender);
        
        return {
          ...request,
          sender,
        };
      })
    );

    console.log(`Returning ${enrichedRequests.length} enriched ping requests`);

    res.json({
      success: true,
      data: enrichedRequests,
    });
  } catch (error) {
    console.error("Error fetching ping requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ping requests",
      error: error.message,
    });
  }
});

// PUT /api/industries/ping/:requestId/accept - Accept ping request
router.put("/ping/:requestId/accept", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "industry") {
      return res.status(403).json({
        success: false,
        message: "Only industries can accept requests",
      });
    }

    const { requestId } = req.params;

    // Verify the request belongs to this industry
    const pingRequest = await prisma.ping_networks.findFirst({
      where: {
        id: parseInt(requestId),
        receiver_profile_id: req.user.id,
        receiver_profile_type: "industry",
        status: "pending",
      },
    });

    if (!pingRequest) {
      return res.status(404).json({
        success: false,
        message: "Ping request not found",
      });
    }

    // Update status to accepted
    const updatedPing = await prisma.ping_networks.update({
      where: { id: parseInt(requestId) },
      data: {
        status: "accepted",
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Ping request accepted",
      data: updatedPing,
    });
  } catch (error) {
    console.error("Error accepting ping request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept ping request",
      error: error.message,
    });
  }
});

// PUT /api/industries/ping/:requestId/reject - Reject ping request
router.put("/ping/:requestId/reject", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "industry") {
      return res.status(403).json({
        success: false,
        message: "Only industries can reject requests",
      });
    }

    const { requestId } = req.params;

    // Verify the request belongs to this industry
    const pingRequest = await prisma.ping_networks.findFirst({
      where: {
        id: parseInt(requestId),
        receiver_profile_id: req.user.id,
        receiver_profile_type: "industry",
        status: "pending",
      },
    });

    if (!pingRequest) {
      return res.status(404).json({
        success: false,
        message: "Ping request not found",
      });
    }

    // Update status to rejected
    const updatedPing = await prisma.ping_networks.update({
      where: { id: parseInt(requestId) },
      data: {
        status: "rejected",
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Ping request rejected",
      data: updatedPing,
    });
  } catch (error) {
    console.error("Error rejecting ping request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject ping request",
      error: error.message,
    });
  }
});

// GET /api/industries/connections - Get industry connections
router.get("/connections", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "industry") {
      return res.status(403).json({
        success: false,
        message: "Only industries can access this endpoint",
      });
    }

    // Get accepted connections where industry is either sender or receiver
    const connections = await prisma.ping_networks.findMany({
      where: {
        status: "accepted",
        OR: [
          {
            sender_profile_id: req.user.id,
            sender_profile_type: "industry",
          },
          {
            receiver_profile_id: req.user.id,
            receiver_profile_type: "industry",
          },
        ],
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    // Enrich with connection user details
    const enrichedConnections = await Promise.all(
      connections.map(async (connection) => {
        let connectionUser = null;
        let connectionId = null;
        let connectionType = null;

        // Determine if current industry is sender or receiver
        if (connection.sender_profile_id === req.user.id) {
          // Industry is sender, get receiver details
          connectionId = connection.receiver_profile_id;
          connectionType = connection.receiver_profile_type;
        } else {
          // Industry is receiver, get sender details
          connectionId = connection.sender_profile_id;
          connectionType = connection.sender_profile_type;
        }

        // Fetch connection user details based on type
        if (connectionType === "student") {
          connectionUser = await prisma.student.findUnique({
            where: { id: connectionId },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profilePicture: true,
              headline: true,
              collegeName: true,
            },
          });
        } else if (connectionType === "college") {
          connectionUser = await prisma.college.findUnique({
            where: { id: connectionId },
            select: {
              id: true,
              name: true,
              email: true,
              logoUrl: true,
            },
          });
          // Map college fields
          if (connectionUser) {
            connectionUser.firstName = connectionUser.name;
            connectionUser.lastName = "";
            connectionUser.profilePicture = connectionUser.logoUrl;
          }
        }

        return {
          ...connection,
          connectionUser,
        };
      })
    );

    res.json({
      success: true,
      data: enrichedConnections,
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch connections",
      error: error.message,
    });
  }
});

// GET /api/industries/connections/count - Get connection count
router.get("/connections/count", authMiddleware, async (req, res) => {
  try {
    // Allow access if user is an industry OR if industryId is provided in query
    const { industryId } = req.query;
    
    let targetIndustryId;
    
    if (industryId) {
      // External user checking another industry's connection count
      targetIndustryId = parseInt(industryId);
    } else if (req.user.role === "industry") {
      // Industry user checking their own connection count
      targetIndustryId = req.user.id;
    } else {
      return res.status(403).json({
        success: false,
        message: "Please specify an industryId parameter or login as an industry",
      });
    }

    const count = await prisma.ping_networks.count({
      where: {
        status: "accepted",
        OR: [
          {
            sender_profile_id: targetIndustryId,
            sender_profile_type: "industry",
          },
          {
            receiver_profile_id: targetIndustryId,
            receiver_profile_type: "industry",
          },
        ],
      },
    });

    res.json({
      success: true,
      data: { count },
    });
  } catch (error) {
    console.error("Error fetching connection count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch connection count",
      error: error.message,
    });
  }
});

// GET /api/industries/ping-status/:industryId - Check ping status with specific industry
router.get("/ping-status/:industryId", authMiddleware, async (req, res) => {
  try {
    const { industryId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Check if there's an existing ping between user and industry
    const ping = await prisma.ping_networks.findFirst({
      where: {
        OR: [
          {
            sender_profile_id: userId,
            sender_profile_type: userRole,
            receiver_profile_id: parseInt(industryId),
            receiver_profile_type: "industry",
          },
          {
            sender_profile_id: parseInt(industryId),
            sender_profile_type: "industry",
            receiver_profile_id: userId,
            receiver_profile_type: userRole,
          },
        ],
      },
    });

    let status = "none";
    if (ping) {
      if (ping.status === "accepted") {
        status = "accepted";
      } else if (ping.status === "pending") {
        // Check if current user sent or received the request
        if (ping.sender_profile_id === userId) {
          status = "sent";
        } else {
          status = "received";
        }
      }
    }

    res.json({
      success: true,
      data: { status },
    });
  } catch (error) {
    console.error("Error checking ping status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check ping status",
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
        companyName: true,
        email: true,
        contactNo: true,
        industryType: true,
        location: true,
        website: true,
        description: true,
        logoUrl: true,
        backgroundUrl: true,
        createdAt: true,
        updatedAt: true,
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
      data: {
        ...industry,
        owner_id: industry.id // Add owner_id for frontend compatibility
      },
    });
  } catch (error) {
    console.error("Error fetching industry by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch industry",
      error: error.message,
    });
  }
});

// PUT /api/industries/:id - Update specific industry (admin or self)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      contactNo,
      industryType,
      location,
      website,
      description,
      logoUrl,
      backgroundUrl,
    } = req.body;

    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const updatedIndustry = await prisma.industry.update({
      where: { id: parseInt(id) },
      data: {
        companyName,
        contactNo,
        industryType,
        location,
        website,
        description,
        logoUrl,
        backgroundUrl,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        companyName: true,
        email: true,
        contactNo: true,
        industryType: true,
        location: true,
        website: true,
        description: true,
        logoUrl: true,
        backgroundUrl: true,
        updatedAt: true,
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
      message: "Failed to update industry",
      error: error.message,
    });
  }
});

// @desc    Upload industry cover picture
// @route   POST /api/industries/cover-image
// @access  Private
router.post(
  "/cover-image",
  authMiddleware,
  upload.single("coverImage"),
  async (req, res) => {
    try {
      if (req.user.role !== "industry") {
        return res.status(403).json({
          success: false,
          message: "Only industries can access this endpoint",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "industry_cover_pictures" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      const backgroundUrl = uploadResult.secure_url;

      const updatedIndustry = await prisma.industry.update({
        where: { id: req.user.id },
        data: { backgroundUrl },
        select: {
          id: true,
          companyName: true,
          backgroundUrl: true,
        },
      });

      res.json({
        success: true,
        message: "Cover image updated successfully",
        data: { 
          cover_picture: backgroundUrl,
          backgroundUrl: backgroundUrl 
        },
      });
    } catch (error) {
      console.error("Upload cover image error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while uploading cover image",
        error: error.message,
      });
    }
  }
);

// @desc    Upload industry profile picture
// @route   POST /api/industries/profile-image
// @access  Private
router.post(
  "/profile-image",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (req.user.role !== "industry") {
        return res.status(403).json({
          success: false,
          message: "Only industries can access this endpoint",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "industry_profile_pictures" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      const logoUrl = uploadResult.secure_url;

      const updatedIndustry = await prisma.industry.update({
        where: { id: req.user.id },
        data: { logoUrl },
        select: {
          id: true,
          companyName: true,
          logoUrl: true,
        },
      });

      res.json({
        success: true,
        message: "Profile image updated successfully",
        data: { 
          profile_picture: logoUrl,
          logoUrl: logoUrl 
        },
      });
    } catch (error) {
      console.error("Upload profile image error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while uploading profile image",
        error: error.message,
      });
    }
  }
);

module.exports = router;
