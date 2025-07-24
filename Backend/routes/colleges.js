const express = require("express");
const router = express.Router();
const { College, CollegeCampus } = require("../config/database");
const prisma = require("../config/prisma");
const { auth } = require("../middleware/auth");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { cloudinary } = require("../config/cloudinary");

// GET /api/colleges/me - Get current college profile (Prisma-based)
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
        location: true,
        website: true,
        established: true,
        profilePicture: true,
        logoUrl: true,
        backgroundUrl: true,
        description: true,
        accreditation: true,
        nirfRank: true,
        totalStudents: true,
        totalFaculty: true,
        universityAffiliation: true,
        naacRating: true,
        createdAt: true,
        updatedAt: true,
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

// PUT /api/colleges/me - Update current college profile (Prisma-based)
router.put("/me", authMiddleware, async (req, res) => {
  try {
    // Check if user is a college
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const {
      name,
      location,
      website,
      established,
      description,
      accreditation,
      nirfRank,
      totalStudents,
      totalFaculty,
      universityAffiliation,
      naacRating,
    } = req.body;

    const updatedCollege = await prisma.college.update({
      where: { id: req.user.id },
      data: {
        name,
        location,
        website,
        established: established ? parseInt(established) : undefined,
        description,
        accreditation,
        nirfRank: nirfRank ? parseInt(nirfRank) : undefined,
        totalStudents: totalStudents ? parseInt(totalStudents) : undefined,
        totalFaculty: totalFaculty ? parseInt(totalFaculty) : undefined,
        universityAffiliation,
        naacRating,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        location: true,
        website: true,
        established: true,
        profilePicture: true,
        logoUrl: true,
        backgroundUrl: true,
        description: true,
        accreditation: true,
        nirfRank: true,
        totalStudents: true,
        totalFaculty: true,
        universityAffiliation: true,
        naacRating: true,
        updatedAt: true,
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

// GET /api/colleges/programs - Get college programs (Prisma-based)
router.get("/programs", authMiddleware, async (req, res) => {
  try {
    // Check if user is a college
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    console.log("🔍 Fetching programs for college ID:", req.user.id);

    const programs = await prisma.college_programs.findMany({
      where: { college_id: req.user.id },
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        degree_type: true,
        eligibility: true,
        fees: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    console.log("📊 Found programs:", programs.length);

    res.json({
      success: true,
      data: programs,
    });
  } catch (error) {
    console.error("❌ Error fetching college programs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college programs",
      error: error.message,
    });
  }
});

// POST /api/colleges/programs - Create college program (Prisma-based)
router.post("/programs", authMiddleware, async (req, res) => {
  try {
    // Check if user is a college
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can create programs",
      });
    }

    const { name, description, duration, degree_type, eligibility, fees } =
      req.body;

    console.log("➕ Creating new program for college ID:", req.user.id);

    const newProgram = await prisma.college_programs.create({
      data: {
        college_id: req.user.id,
        name,
        description,
        duration,
        degree_type,
        eligibility,
        fees,
      },
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        degree_type: true,
        eligibility: true,
        fees: true,
        created_at: true,
        updated_at: true,
      },
    });

    console.log("✅ Program created successfully:", newProgram.id);

    res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: newProgram,
    });
  } catch (error) {
    console.error("❌ Error creating college program:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create program",
      error: error.message,
    });
  }
});

// POST /api/colleges/logo-image - Upload college logo (Prisma-based)
router.post(
  "/logo-image",
  authMiddleware,
  upload.single("logoImage"),
  async (req, res) => {
    try {
      // Check if user is a college
      if (req.user.role !== "college") {
        return res.status(403).json({
          success: false,
          message: "Only colleges can upload logo images",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No logo image file provided",
        });
      }

      console.log("📸 Uploading college logo for college ID:", req.user.id);

      // Upload to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "college_logos",
          public_id: `college_logo_${req.user.id}_${Date.now()}`,
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        async (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            return res.status(500).json({
              success: false,
              message: "Failed to upload logo image",
              error: error.message,
            });
          }

          try {
            // Update college with new logo URL
            const updatedCollege = await prisma.college.update({
              where: { id: req.user.id },
              data: {
                profilePicture: result.secure_url,
                logoUrl: result.secure_url, // Also update logoUrl for compatibility
                updatedAt: new Date(),
              },
              select: {
                id: true,
                profilePicture: true,
                logoUrl: true,
              },
            });

            console.log("✅ College logo updated successfully");

            res.json({
              success: true,
              message: "College logo uploaded successfully",
              data: {
                profile_picture: updatedCollege.profilePicture,
                logo_url: updatedCollege.logoUrl,
              },
            });
          } catch (dbError) {
            console.error("❌ Database error:", dbError);
            res.status(500).json({
              success: false,
              message: "Failed to update college logo in database",
              error: dbError.message,
            });
          }
        }
      );

      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error("❌ Error uploading college logo:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload college logo",
        error: error.message,
      });
    }
  }
);

// POST /api/colleges/cover-image - Upload college cover image (Prisma-based)
router.post(
  "/cover-image",
  authMiddleware,
  upload.single("coverImage"),
  async (req, res) => {
    try {
      // Check if user is a college
      if (req.user.role !== "college") {
        return res.status(403).json({
          success: false,
          message: "Only colleges can upload cover images",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No cover image file provided",
        });
      }

      console.log(
        "📸 Uploading college cover image for college ID:",
        req.user.id
      );

      // Upload to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "college_covers",
          public_id: `college_cover_${req.user.id}_${Date.now()}`,
          transformation: [
            { width: 1200, height: 400, crop: "fill" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        async (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            return res.status(500).json({
              success: false,
              message: "Failed to upload cover image",
              error: error.message,
            });
          }

          try {
            // Update college with new cover URL
            const updatedCollege = await prisma.college.update({
              where: { id: req.user.id },
              data: {
                backgroundUrl: result.secure_url, // Use existing backgroundUrl field
                updatedAt: new Date(),
              },
              select: {
                id: true,
                backgroundUrl: true,
              },
            });

            console.log("✅ College cover image updated successfully");

            res.json({
              success: true,
              message: "College cover image uploaded successfully",
              data: {
                background_url: updatedCollege.backgroundUrl,
              },
            });
          } catch (dbError) {
            console.error("❌ Database error:", dbError);
            res.status(500).json({
              success: false,
              message: "Failed to update college cover image in database",
              error: dbError.message,
            });
          }
        }
      );

      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error("❌ Error uploading college cover image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload college cover image",
        error: error.message,
      });
    }
  }
);

// ============= PLACEMENTS SECTION =============

// GET /api/colleges/placements - Get placement data for a college
router.get("/placements", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const placements = await prisma.college_placements_new.findMany({
      where: { college_id: req.user.id },
      orderBy: { academic_year: "desc" },
    });

    // Get the latest placement data or create empty structure
    const latestPlacement = placements[0] || {};

    const placementData = {
      highlights: latestPlacement.success_stories || [],
      internships: [], // Will be stored in JSON field
      support: [], // Will be stored in JSON field
      statistics: {
        averagePackage: latestPlacement.average_package
          ? `₹${latestPlacement.average_package} LPA`
          : "₹0 LPA",
        highestPackage: latestPlacement.highest_package
          ? `₹${latestPlacement.highest_package} LPA`
          : "₹0 LPA",
        placementRate: latestPlacement.placement_percentage
          ? `${latestPlacement.placement_percentage}%`
          : "0%",
        companiesVisited: "0+",
        internshipStipend: "₹0 - ₹0/month",
      },
      topRecruiters:
        latestPlacement.top_recruiters?.map((name) => ({ name, logo: "" })) ||
        [],
      customFields: [],
      rawData: latestPlacement,
    };

    // Parse JSON fields if they exist
    if (latestPlacement.placement_trends) {
      const trends = latestPlacement.placement_trends;
      placementData.internships = trends.internships || [];
      placementData.support = trends.support || [];
      placementData.statistics.companiesVisited =
        trends.companiesVisited || "0+";
      placementData.statistics.internshipStipend =
        trends.internshipStipend || "₹0 - ₹0/month";
    }

    res.json({
      success: true,
      data: placementData,
    });
  } catch (error) {
    console.error("Error fetching placements:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch placements",
      error: error.message,
    });
  }
});

// POST /api/colleges/placements - Create or update placement data
router.post("/placements", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const {
      highlights,
      internships,
      support,
      statistics,
      topRecruiters,
      academicYear = new Date().getFullYear().toString(),
    } = req.body;

    // Parse statistics
    const averagePackage =
      statistics.averagePackage?.replace(/[₹LPA\s]/g, "") || "0";
    const highestPackage =
      statistics.highestPackage?.replace(/[₹LPA\s]/g, "") || "0";
    const placementRate =
      statistics.placementRate?.replace(/[%\s]/g, "") || "0";

    // Prepare placement trends JSON
    const placementTrends = {
      internships: internships || [],
      support: support || [],
      companiesVisited: statistics.companiesVisited || "0+",
      internshipStipend: statistics.internshipStipend || "₹0 - ₹0/month",
    };

    // Check if placement data exists for this academic year
    const existingPlacement = await prisma.college_placements_new.findFirst({
      where: {
        college_id: req.user.id,
        academic_year: academicYear,
      },
    });

    let placementRecord;
    if (existingPlacement) {
      // Update existing record
      placementRecord = await prisma.college_placements_new.update({
        where: { id: existingPlacement.id },
        data: {
          average_package: parseFloat(averagePackage) || null,
          highest_package: parseFloat(highestPackage) || null,
          placement_percentage: parseFloat(placementRate) || null,
          top_recruiters:
            topRecruiters?.map((r) => r.name).filter(Boolean) || [],
          success_stories: highlights || [],
          placement_trends: placementTrends,
          updated_at: new Date(),
        },
      });
    } else {
      // Create new record
      placementRecord = await prisma.college_placements_new.create({
        data: {
          college_id: req.user.id,
          academic_year: academicYear,
          course_name: "All Courses", // Default value
          average_package: parseFloat(averagePackage) || null,
          highest_package: parseFloat(highestPackage) || null,
          placement_percentage: parseFloat(placementRate) || null,
          top_recruiters:
            topRecruiters?.map((r) => r.name).filter(Boolean) || [],
          success_stories: highlights || [],
          placement_trends: placementTrends,
        },
      });
    }

    res.json({
      success: true,
      data: placementRecord,
      message: "Placement data saved successfully",
    });
  } catch (error) {
    console.error("Error saving placement data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save placement data",
      error: error.message,
    });
  }
});

// POST /api/colleges/placements/upload-logo - Upload company logo
router.post(
  "/placements/upload-logo",
  authMiddleware,
  upload.single("logo"),
  async (req, res) => {
    try {
      if (req.user.role !== "college") {
        return res.status(403).json({
          success: false,
          message: "Only colleges can access this endpoint",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No logo file provided",
        });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "company-logos",
        resource_type: "image",
        transformation: [
          { width: 200, height: 200, crop: "fit" },
          { quality: "auto" },
          { format: "png" },
        ],
      });

      res.json({
        success: true,
        data: {
          logoUrl: result.secure_url,
          publicId: result.public_id,
        },
        message: "Logo uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading logo:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload logo",
        error: error.message,
      });
    }
  }
);

// ============= FACULTY SECTION =============

// GET /api/colleges/faculty - Get faculty information for a college
router.get("/faculty", authMiddleware, async (req, res) => {
  try {
    const college = await prisma.college.findUnique({
      where: { id: req.user.id },
      include: {
        college_information_new: true,
      },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    // Get faculty data from custom_fields in college_information_new or create default
    let facultyData = {
      strength: [
        "Experienced faculty members across all departments",
        "Faculty with advanced qualifications",
        "Regular faculty development programs",
        "Active research collaborations",
      ],
      departments: [
        "Computer Science & Engineering",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Civil Engineering",
      ],
      achievements: [
        "Research papers published in international journals",
        "Patents filed by faculty members",
        "Industry collaborations with leading companies",
        "Faculty recognition in conferences",
      ],
      statistics: {
        totalFaculty: college.totalFaculty
          ? college.totalFaculty.toString()
          : "0",
        phdFaculty: "70%",
        facultyStudentRatio: "1:15",
        researchGrants: "₹10 Cr",
        publications: "100+",
        patents: "25+",
      },
      customFields: [],
    };

    // If faculty data exists in custom_fields, use it
    if (college.college_information_new?.custom_fields?.faculty) {
      facultyData = college.college_information_new.custom_fields.faculty;
    }

    res.json({
      success: true,
      data: facultyData,
    });
  } catch (error) {
    console.error("Error fetching faculty data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty data",
      error: error.message,
    });
  }
});

// POST /api/colleges/faculty - Save faculty information
router.post("/faculty", authMiddleware, async (req, res) => {
  try {
    const { strength, departments, achievements, statistics, customFields } =
      req.body;

    const facultyData = {
      strength: strength || [],
      departments: departments || [],
      achievements: achievements || [],
      statistics: statistics || {},
      customFields: customFields || [],
    };

    // First, ensure college_information_new record exists
    let collegeInfo = await prisma.college_information_new.findUnique({
      where: { college_id: req.user.id },
    });

    if (!collegeInfo) {
      // Create new record
      collegeInfo = await prisma.college_information_new.create({
        data: {
          college_id: req.user.id,
          custom_fields: { faculty: facultyData },
        },
      });
    } else {
      // Update existing record
      const updatedCustomFields = {
        ...collegeInfo.custom_fields,
        faculty: facultyData,
      };

      collegeInfo = await prisma.college_information_new.update({
        where: { college_id: req.user.id },
        data: {
          custom_fields: updatedCustomFields,
        },
      });
    }

    // Also update totalFaculty in colleges table if provided in statistics
    if (statistics.totalFaculty) {
      const totalFaculty =
        parseInt(statistics.totalFaculty.replace(/\D/g, "")) || null;
      await prisma.college.update({
        where: { id: req.user.id },
        data: { totalFaculty },
      });
    }

    res.json({
      success: true,
      message: "Faculty information saved successfully",
      data: facultyData,
    });
  } catch (error) {
    console.error("Error saving faculty data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save faculty data",
      error: error.message,
    });
  }
});

// PUT /api/colleges/faculty - Update faculty information
router.put("/faculty", authMiddleware, async (req, res) => {
  try {
    const { strength, departments, achievements, statistics, customFields } =
      req.body;

    const facultyData = {
      strength: strength || [],
      departments: departments || [],
      achievements: achievements || [],
      statistics: statistics || {},
      customFields: customFields || [],
    };

    // Ensure college_information_new record exists
    let collegeInfo = await prisma.college_information_new.findUnique({
      where: { college_id: req.user.id },
    });

    if (!collegeInfo) {
      // Create new record if it doesn't exist
      collegeInfo = await prisma.college_information_new.create({
        data: {
          college_id: req.user.id,
          custom_fields: { faculty: facultyData },
        },
      });
    } else {
      // Update existing record
      const updatedCustomFields = {
        ...collegeInfo.custom_fields,
        faculty: facultyData,
      };

      collegeInfo = await prisma.college_information_new.update({
        where: { college_id: req.user.id },
        data: {
          custom_fields: updatedCustomFields,
        },
      });
    }

    // Also update totalFaculty in colleges table if provided in statistics
    if (statistics.totalFaculty) {
      const totalFaculty =
        parseInt(statistics.totalFaculty.replace(/\D/g, "")) || null;
      await prisma.college.update({
        where: { id: req.user.id },
        data: { totalFaculty },
      });
    }

    res.json({
      success: true,
      message: "Faculty information updated successfully",
      data: facultyData,
    });
  } catch (error) {
    console.error("Error updating faculty data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update faculty data",
      error: error.message,
    });
  }
});

// ============= DOWNLOADS SECTION =============

// GET /api/colleges/downloads - Get all downloads for a college
router.get("/downloads", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const downloads = await prisma.college_downloads.findMany({
      where: { college_id: req.user.id },
      orderBy: { created_at: "desc" },
    });

    // Group downloads by category
    const groupedDownloads = downloads.reduce((acc, download) => {
      const category = download.category.toLowerCase();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        id: download.id,
        name: download.title,
        description: download.description,
        fileSize: download.file_size,
        format: download.file_type,
        url: download.file_url,
        uploadDate: download.created_at.toISOString().split("T")[0],
        downloadCount: download.download_count,
        isPublic: download.is_public,
      });
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedDownloads,
    });
  } catch (error) {
    console.error("Error fetching downloads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch downloads",
      error: error.message,
    });
  }
});

// POST /api/colleges/downloads - Add a new download
router.post(
  "/downloads",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (req.user.role !== "college") {
        return res.status(403).json({
          success: false,
          message: "Only colleges can access this endpoint",
        });
      }

      const {
        title,
        description,
        category,
        fileType,
        fileSize,
        fileUrl,
        isPublic,
      } = req.body;
      let uploadedFileUrl = fileUrl;

      // If a file was uploaded, use Cloudinary URL
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "college-downloads",
          resource_type: "auto",
        });
        uploadedFileUrl = result.secure_url;
      }

      const newDownload = await prisma.college_downloads.create({
        data: {
          college_id: req.user.id,
          title,
          description,
          file_type: fileType || "PDF",
          category,
          file_url: uploadedFileUrl,
          file_size: fileSize,
          is_public: isPublic !== undefined ? isPublic : true,
        },
      });

      res.json({
        success: true,
        data: {
          id: newDownload.id,
          name: newDownload.title,
          description: newDownload.description,
          fileSize: newDownload.file_size,
          format: newDownload.file_type,
          url: newDownload.file_url,
          uploadDate: newDownload.created_at.toISOString().split("T")[0],
          downloadCount: newDownload.download_count,
          isPublic: newDownload.is_public,
        },
      });
    } catch (error) {
      console.error("Error creating download:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create download",
        error: error.message,
      });
    }
  }
);

// PUT /api/colleges/downloads/:id - Update a download
router.put("/downloads/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const downloadId = parseInt(req.params.id);
    const {
      title,
      description,
      category,
      fileType,
      fileSize,
      fileUrl,
      isPublic,
    } = req.body;

    // Check if download belongs to the college
    const existingDownload = await prisma.college_downloads.findFirst({
      where: {
        id: downloadId,
        college_id: req.user.id,
      },
    });

    if (!existingDownload) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    const updatedDownload = await prisma.college_downloads.update({
      where: { id: downloadId },
      data: {
        title,
        description,
        file_type: fileType,
        category,
        file_url: fileUrl,
        file_size: fileSize,
        is_public: isPublic,
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      data: {
        id: updatedDownload.id,
        name: updatedDownload.title,
        description: updatedDownload.description,
        fileSize: updatedDownload.file_size,
        format: updatedDownload.file_type,
        url: updatedDownload.file_url,
        uploadDate: updatedDownload.created_at.toISOString().split("T")[0],
        downloadCount: updatedDownload.download_count,
        isPublic: updatedDownload.is_public,
      },
    });
  } catch (error) {
    console.error("Error updating download:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update download",
      error: error.message,
    });
  }
});

// DELETE /api/colleges/downloads/:id - Delete a download
router.delete("/downloads/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "college") {
      return res.status(403).json({
        success: false,
        message: "Only colleges can access this endpoint",
      });
    }

    const downloadId = parseInt(req.params.id);

    // Check if download belongs to the college
    const existingDownload = await prisma.college_downloads.findFirst({
      where: {
        id: downloadId,
        college_id: req.user.id,
      },
    });

    if (!existingDownload) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    await prisma.college_downloads.delete({
      where: { id: downloadId },
    });

    res.json({
      success: true,
      message: "Download deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting download:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete download",
      error: error.message,
    });
  }
});

// POST /api/colleges/downloads/:id/increment - Increment download count
router.post("/downloads/:id/increment", async (req, res) => {
  try {
    const downloadId = parseInt(req.params.id);

    const updatedDownload = await prisma.college_downloads.update({
      where: { id: downloadId },
      data: {
        download_count: {
          increment: 1,
        },
      },
    });

    res.json({
      success: true,
      data: {
        downloadCount: updatedDownload.download_count,
      },
    });
  } catch (error) {
    console.error("Error incrementing download count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to increment download count",
      error: error.message,
    });
  }
});

// GET /api/colleges/:id - Get college information (main endpoint)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("📋 Fetching college information for ID:", id);

    // Find college with campuses
    const college = await College.findByPk(id, {
      include: [
        {
          model: CollegeCampus,
          as: "campuses",
        },
      ],
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    // Transform data for frontend
    const responseData = {
      overview: college.about || "",
      website: college.website || "",
      verified: college.verified || false,
      verifiedDate: college.verifiedDate || null,
      establishmentYear: college.established
        ? college.established.toString()
        : "",
      location: college.location || "",
      collegeType: college.collegeType || "Public University",
      totalStudents: college.totalStudents
        ? college.totalStudents.toString()
        : "",
      faculty: college.totalFaculty ? college.totalFaculty.toString() : "",
      accreditation: college.accreditation || "",
      nirfRank: college.nirfRank ? college.nirfRank.toString() : "",
      specialties: college.specialties || [],
      customFields: college.customFields || [],
      campuses:
        college.campuses?.map((campus) => ({
          name: campus.name,
          address: campus.address,
          type: campus.type,
          students: campus.students,
          coordinates: campus.coordinates,
          dean: campus.dean,
          contact: campus.contact,
          image: campus.image,
          customFields: campus.customFields || {},
        })) || [],
    };

    console.log("✅ College information fetched successfully");

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("❌ Error fetching college information:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET /api/colleges/:id/information - Get college information with campuses
router.get("/:id/information", async (req, res) => {
  try {
    const { id } = req.params;

    // Find college with all campuses
    const college = await College.findByPk(id, {
      include: [
        {
          model: CollegeCampus,
          as: "campuses",
          attributes: [
            "id",
            "name",
            "type",
            "address",
            "student_count",
            "latitude",
            "longitude",
            "dean",
            "image_url",
            "contact_number",
            "email",
            "custom_fields",
          ],
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "location",
        "established",
        "campusArea",
        "nirfRank",
        "accreditation",
        "totalStudents",
        "totalFaculty",
        "website",
        "logoUrl",
        "backgroundUrl",
        "about",
        "verified",
        "verifiedDate",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    // Format the response data
    const collegeData = {
      id: college.id,
      name: college.name,
      overview: college.about || college.description || "",
      website: college.website || "",
      verified: college.verified || false,
      verifiedDate: college.verifiedDate
        ? college.verifiedDate instanceof Date
          ? college.verifiedDate.toISOString().split("T")[0]
          : college.verifiedDate
        : null,
      establishmentYear: college.established?.toString() || "",
      location: college.location || "",
      collegeType: college.collegeType || "Public University", // Default if not set
      totalStudents: college.totalStudents
        ? `${college.totalStudents}+ students`
        : "",
      faculty: college.totalFaculty
        ? `${college.totalFaculty}+ faculty members`
        : "",
      accreditation: college.accreditation || "",
      nirfRank: college.nirfRank ? `National Ranking: ${college.nirfRank}` : "",
      campusArea: college.campusArea || null,
      logoUrl: college.logoUrl || "",
      backgroundUrl: college.backgroundUrl || "",
      specialties: [], // Will be populated from separate table if exists
      customFields: [], // Will be populated from college metadata if exists
      campuses: (college.campuses || []).map((campus) => ({
        name: campus.name || "",
        address: campus.address || "",
        type: campus.type || "Campus",
        students: campus.student_count || "",
        coordinates:
          campus.latitude && campus.longitude
            ? [parseFloat(campus.latitude), parseFloat(campus.longitude)]
            : [0, 0],
        dean: campus.dean || "",
        contact: {
          phone: campus.contact_number || "",
          email: campus.email || "",
        },
        image:
          campus.image_url ||
          "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=150&fit=crop",
        customFields: campus.custom_fields || {},
      })),
    };

    res.status(200).json({
      success: true,
      data: collegeData,
    });
  } catch (error) {
    console.error("Error fetching college information:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// PUT /api/colleges/:id - Update college information (main endpoint)
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    console.log("🔄 Updating college information for ID:", id);
    console.log("📝 Update data:", updateData);

    // Verify college exists and user has permission
    const college = await College.findByPk(id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    // Check if user is authorized (either the college owner or admin)
    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this college",
      });
    }

    // Parse numbers with validation
    const parseNumber = (value, fieldName) => {
      if (!value || value === "") return null;
      const parsed = parseInt(value);
      if (isNaN(parsed)) {
        throw new Error(`${fieldName} must be a valid number`);
      }
      if (parsed < 0) {
        throw new Error(`${fieldName} must be non-negative`);
      }
      return parsed;
    };

    // Prepare update data
    const fieldsToUpdate = {};

    if (updateData.overview !== undefined)
      fieldsToUpdate.about = updateData.overview;
    if (updateData.website !== undefined)
      fieldsToUpdate.website = updateData.website;
    if (updateData.verified !== undefined)
      fieldsToUpdate.verified = updateData.verified;
    if (updateData.verifiedDate !== undefined)
      fieldsToUpdate.verifiedDate = updateData.verifiedDate;
    if (updateData.establishmentYear !== undefined) {
      fieldsToUpdate.established = parseNumber(
        updateData.establishmentYear,
        "Establishment year"
      );
    }
    if (updateData.location !== undefined)
      fieldsToUpdate.location = updateData.location;
    if (updateData.totalStudents !== undefined) {
      fieldsToUpdate.totalStudents = parseNumber(
        updateData.totalStudents,
        "Total students"
      );
    }
    if (updateData.faculty !== undefined) {
      fieldsToUpdate.totalFaculty = parseNumber(
        updateData.faculty,
        "Total faculty"
      );
    }
    if (updateData.accreditation !== undefined)
      fieldsToUpdate.accreditation = updateData.accreditation;
    if (updateData.nirfRank !== undefined) {
      fieldsToUpdate.nirfRank = parseNumber(updateData.nirfRank, "NIRF rank");
    }
    if (updateData.collegeType !== undefined)
      fieldsToUpdate.collegeType = updateData.collegeType;
    if (updateData.specialties !== undefined)
      fieldsToUpdate.specialties = updateData.specialties;
    if (updateData.customFields !== undefined)
      fieldsToUpdate.customFields = updateData.customFields;

    console.log("📊 Fields to update:", fieldsToUpdate);

    // Update college
    await college.update(fieldsToUpdate);

    // Fetch updated college with campuses
    const updatedCollege = await College.findByPk(id, {
      include: [
        {
          model: CollegeCampus,
          as: "campuses",
        },
      ],
    });

    // Transform data for frontend
    const responseData = {
      overview: updatedCollege.about || "",
      website: updatedCollege.website || "",
      verified: updatedCollege.verified || false,
      verifiedDate: updatedCollege.verifiedDate || null,
      establishmentYear: updatedCollege.established
        ? updatedCollege.established.toString()
        : "",
      location: updatedCollege.location || "",
      collegeType: updatedCollege.collegeType || "Public University",
      totalStudents: updatedCollege.totalStudents
        ? updatedCollege.totalStudents.toString()
        : "",
      faculty: updatedCollege.totalFaculty
        ? updatedCollege.totalFaculty.toString()
        : "",
      accreditation: updatedCollege.accreditation || "",
      nirfRank: updatedCollege.nirfRank
        ? updatedCollege.nirfRank.toString()
        : "",
      specialties: updatedCollege.specialties || [],
      customFields: updatedCollege.customFields || [],
      campuses:
        updatedCollege.campuses?.map((campus) => ({
          name: campus.name,
          address: campus.address,
          type: campus.type,
          students: campus.students,
          coordinates: campus.coordinates,
          dean: campus.dean,
          contact: campus.contact,
          image: campus.image,
          customFields: campus.customFields || {},
        })) || [],
    };

    console.log("✅ College information updated successfully");

    res.json({
      success: true,
      message: "College information updated successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("❌ Error updating college information:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update college information",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// PUT /api/colleges/:id/information - Update college information
router.put("/:id/information", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      overview,
      website,
      verified,
      verifiedDate,
      establishmentYear,
      location,
      collegeType,
      totalStudents,
      faculty,
      accreditation,
      nirfRank,
      specialties,
      customFields,
    } = req.body;

    console.log("🔧 Received update request for college:", id);
    console.log("🔧 Request body:", req.body);

    // Find the college
    const college = await College.findByPk(id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    // Update college data
    const updateData = {};
    if (overview !== undefined) updateData.about = overview;
    if (website !== undefined) updateData.website = website;
    if (verified !== undefined) updateData.verified = verified;
    if (verifiedDate !== undefined)
      updateData.verifiedDate = verifiedDate ? new Date(verifiedDate) : null;
    if (establishmentYear !== undefined)
      updateData.established = establishmentYear
        ? parseInt(establishmentYear)
        : null;
    if (location !== undefined) updateData.location = location;
    if (totalStudents !== undefined) {
      // Handle both string and number inputs
      let studentCount;
      if (typeof totalStudents === "string") {
        // Extract number from string like "15,000+ students"
        studentCount = totalStudents.replace(/[^\d]/g, "");
      } else {
        studentCount = totalStudents;
      }
      updateData.totalStudents =
        studentCount && !isNaN(studentCount) ? parseInt(studentCount) : null;
    }
    if (faculty !== undefined) {
      // Handle both string and number inputs
      let facultyCount;
      if (typeof faculty === "string") {
        // Extract number from string like "800+ faculty members"
        facultyCount = faculty.replace(/[^\d]/g, "");
      } else {
        facultyCount = faculty;
      }
      updateData.totalFaculty =
        facultyCount && !isNaN(facultyCount) ? parseInt(facultyCount) : null;
    }
    if (accreditation !== undefined) updateData.accreditation = accreditation;
    if (nirfRank !== undefined) {
      // Handle both string and number inputs
      let rank;
      if (typeof nirfRank === "string") {
        // Extract number from string like "National Ranking: 45"
        rank = nirfRank.replace(/[^\d]/g, "");
      } else {
        rank = nirfRank;
      }
      updateData.nirfRank = rank && !isNaN(rank) ? parseInt(rank) : null;
    }

    console.log("🔧 Update data being processed:", updateData);

    await college.update(updateData);

    res.status(200).json({
      success: true,
      message: "College information updated successfully",
      data: college,
    });
  } catch (error) {
    console.error("Error updating college information:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET /api/colleges/:id/campuses - Get all campuses for a college
router.get("/:id/campuses", async (req, res) => {
  try {
    const { id } = req.params;

    const campuses = await CollegeCampus.findAll({
      where: { college_id: id },
      attributes: [
        "id",
        "name",
        "type",
        "address",
        "student_count",
        "latitude",
        "longitude",
        "dean",
        "image_url",
        "contact_number",
        "email",
        "custom_fields",
      ],
    });

    const formattedCampuses = campuses.map((campus) => ({
      id: campus.id,
      name: campus.name,
      address: campus.address,
      type: campus.type,
      students: campus.student_count,
      coordinates:
        campus.latitude && campus.longitude
          ? [parseFloat(campus.latitude), parseFloat(campus.longitude)]
          : [0, 0],
      dean: campus.dean,
      contact: {
        phone: campus.contact_number,
        email: campus.email,
      },
      image:
        campus.image_url ||
        "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=150&fit=crop",
      customFields: campus.custom_fields || {},
    }));

    res.status(200).json({
      success: true,
      data: formattedCampuses,
    });
  } catch (error) {
    console.error("Error fetching campuses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// PUT /api/colleges/:id/campuses - Update all campuses for a college
router.put("/:id/campuses", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { campuses } = req.body;

    // Verify college exists
    const college = await College.findByPk(id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    // Delete existing campuses for this college
    await CollegeCampus.destroy({
      where: { college_id: id },
    });

    // Create new campuses
    const campusPromises = campuses.map((campus) => {
      const campusData = {
        college_id: id,
        name: campus.name,
        type: campus.type,
        address: campus.address,
        student_count: campus.students,
        latitude:
          campus.coordinates && campus.coordinates[0]
            ? campus.coordinates[0]
            : null,
        longitude:
          campus.coordinates && campus.coordinates[1]
            ? campus.coordinates[1]
            : null,
        dean: campus.dean,
        image_url: campus.image,
        contact_number: campus.contact?.phone,
        email: campus.contact?.email,
        custom_fields: campus.customFields || {},
      };

      return CollegeCampus.create(campusData);
    });

    const createdCampuses = await Promise.all(campusPromises);

    res.status(200).json({
      success: true,
      message: "Campuses updated successfully",
      data: createdCampuses,
    });
  } catch (error) {
    console.error("Error updating campuses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST /api/colleges/:id/campuses - Add a new campus
router.post("/:id/campuses", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const campusData = req.body;

    // Verify college exists
    const college = await College.findByPk(id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    const newCampusData = {
      college_id: id,
      name: campusData.name,
      type: campusData.type,
      address: campusData.address,
      student_count: campusData.students,
      latitude:
        campusData.coordinates && campusData.coordinates[0]
          ? campusData.coordinates[0]
          : null,
      longitude:
        campusData.coordinates && campusData.coordinates[1]
          ? campusData.coordinates[1]
          : null,
      dean: campusData.dean,
      image_url: campusData.image,
      contact_number: campusData.contact?.phone,
      email: campusData.contact?.email,
      custom_fields: campusData.customFields || {},
    };

    const newCampus = await CollegeCampus.create(newCampusData);

    res.status(201).json({
      success: true,
      message: "Campus created successfully",
      data: newCampus,
    });
  } catch (error) {
    console.error("Error creating campus:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// DELETE /api/colleges/:id/campuses/:campusId - Delete a specific campus
router.delete("/:id/campuses/:campusId", auth, async (req, res) => {
  try {
    const { id, campusId } = req.params;

    // Verify the campus belongs to the college
    const campus = await CollegeCampus.findOne({
      where: {
        id: campusId,
        college_id: id,
      },
    });

    if (!campus) {
      return res.status(404).json({
        success: false,
        message: "Campus not found",
      });
    }

    await campus.destroy();

    res.status(200).json({
      success: true,
      message: "Campus deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting campus:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
