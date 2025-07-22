const express = require("express");
const router = express.Router();
const { College, CollegeCampus } = require("../config/database");
const prisma = require("../config/prisma");
const { auth } = require("../middleware/auth");
const { authMiddleware } = require("../middleware/authMiddleware");

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
          as: 'campuses',
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
      overview: college.about || '',
      website: college.website || '',
      verified: college.verified || false,
      verifiedDate: college.verifiedDate || null,
      establishmentYear: college.established ? college.established.toString() : '',
      location: college.location || '',
      collegeType: college.collegeType || 'Public University',
      totalStudents: college.totalStudents ? college.totalStudents.toString() : '',
      faculty: college.totalFaculty ? college.totalFaculty.toString() : '',
      accreditation: college.accreditation || '',
      nirfRank: college.nirfRank ? college.nirfRank.toString() : '',
      specialties: college.specialties || [],
      customFields: college.customFields || [],
      campuses: college.campuses?.map(campus => ({
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
      verifiedDate: college.verifiedDate ? 
        (college.verifiedDate instanceof Date ? 
          college.verifiedDate.toISOString().split('T')[0] : 
          college.verifiedDate) : null,
      establishmentYear: college.established?.toString() || "",
      location: college.location || "",
      collegeType: college.collegeType || "Public University", // Default if not set
      totalStudents: college.totalStudents ? `${college.totalStudents}+ students` : "",
      faculty: college.totalFaculty ? `${college.totalFaculty}+ faculty members` : "",
      accreditation: college.accreditation || "",
      nirfRank: college.nirfRank ? `National Ranking: ${college.nirfRank}` : "",
      campusArea: college.campusArea || null,
      logoUrl: college.logoUrl || "",
      backgroundUrl: college.backgroundUrl || "",
      specialties: [], // Will be populated from separate table if exists
      customFields: [], // Will be populated from college metadata if exists
      campuses: (college.campuses || []).map(campus => ({
        name: campus.name || "",
        address: campus.address || "",
        type: campus.type || "Campus",
        students: campus.student_count || "",
        coordinates: campus.latitude && campus.longitude ? 
          [parseFloat(campus.latitude), parseFloat(campus.longitude)] : [0, 0],
        dean: campus.dean || "",
        contact: {
          phone: campus.contact_number || "",
          email: campus.email || "",
        },
        image: campus.image_url || "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=150&fit=crop",
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
    if (req.user.id !== parseInt(id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this college",
      });
    }

    // Parse numbers with validation
    const parseNumber = (value, fieldName) => {
      if (!value || value === '') return null;
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
    
    if (updateData.overview !== undefined) fieldsToUpdate.about = updateData.overview;
    if (updateData.website !== undefined) fieldsToUpdate.website = updateData.website;
    if (updateData.verified !== undefined) fieldsToUpdate.verified = updateData.verified;
    if (updateData.verifiedDate !== undefined) fieldsToUpdate.verifiedDate = updateData.verifiedDate;
    if (updateData.establishmentYear !== undefined) {
      fieldsToUpdate.established = parseNumber(updateData.establishmentYear, "Establishment year");
    }
    if (updateData.location !== undefined) fieldsToUpdate.location = updateData.location;
    if (updateData.totalStudents !== undefined) {
      fieldsToUpdate.totalStudents = parseNumber(updateData.totalStudents, "Total students");
    }
    if (updateData.faculty !== undefined) {
      fieldsToUpdate.totalFaculty = parseNumber(updateData.faculty, "Total faculty");
    }
    if (updateData.accreditation !== undefined) fieldsToUpdate.accreditation = updateData.accreditation;
    if (updateData.nirfRank !== undefined) {
      fieldsToUpdate.nirfRank = parseNumber(updateData.nirfRank, "NIRF rank");
    }
    if (updateData.collegeType !== undefined) fieldsToUpdate.collegeType = updateData.collegeType;
    if (updateData.specialties !== undefined) fieldsToUpdate.specialties = updateData.specialties;
    if (updateData.customFields !== undefined) fieldsToUpdate.customFields = updateData.customFields;

    console.log("📊 Fields to update:", fieldsToUpdate);

    // Update college
    await college.update(fieldsToUpdate);

    // Fetch updated college with campuses
    const updatedCollege = await College.findByPk(id, {
      include: [
        {
          model: CollegeCampus,
          as: 'campuses',
        },
      ],
    });

    // Transform data for frontend
    const responseData = {
      overview: updatedCollege.about || '',
      website: updatedCollege.website || '',
      verified: updatedCollege.verified || false,
      verifiedDate: updatedCollege.verifiedDate || null,
      establishmentYear: updatedCollege.established ? updatedCollege.established.toString() : '',
      location: updatedCollege.location || '',
      collegeType: updatedCollege.collegeType || 'Public University',
      totalStudents: updatedCollege.totalStudents ? updatedCollege.totalStudents.toString() : '',
      faculty: updatedCollege.totalFaculty ? updatedCollege.totalFaculty.toString() : '',
      accreditation: updatedCollege.accreditation || '',
      nirfRank: updatedCollege.nirfRank ? updatedCollege.nirfRank.toString() : '',
      specialties: updatedCollege.specialties || [],
      customFields: updatedCollege.customFields || [],
      campuses: updatedCollege.campuses?.map(campus => ({
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

    console.log('🔧 Received update request for college:', id);
    console.log('🔧 Request body:', req.body);

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
    if (verifiedDate !== undefined) updateData.verifiedDate = verifiedDate ? new Date(verifiedDate) : null;
    if (establishmentYear !== undefined) updateData.established = establishmentYear ? parseInt(establishmentYear) : null;
    if (location !== undefined) updateData.location = location;
    if (totalStudents !== undefined) {
      // Handle both string and number inputs
      let studentCount;
      if (typeof totalStudents === 'string') {
        // Extract number from string like "15,000+ students"
        studentCount = totalStudents.replace(/[^\d]/g, '');
      } else {
        studentCount = totalStudents;
      }
      updateData.totalStudents = studentCount && !isNaN(studentCount) ? parseInt(studentCount) : null;
    }
    if (faculty !== undefined) {
      // Handle both string and number inputs
      let facultyCount;
      if (typeof faculty === 'string') {
        // Extract number from string like "800+ faculty members"
        facultyCount = faculty.replace(/[^\d]/g, '');
      } else {
        facultyCount = faculty;
      }
      updateData.totalFaculty = facultyCount && !isNaN(facultyCount) ? parseInt(facultyCount) : null;
    }
    if (accreditation !== undefined) updateData.accreditation = accreditation;
    if (nirfRank !== undefined) {
      // Handle both string and number inputs
      let rank;
      if (typeof nirfRank === 'string') {
        // Extract number from string like "National Ranking: 45"
        rank = nirfRank.replace(/[^\d]/g, '');
      } else {
        rank = nirfRank;
      }
      updateData.nirfRank = rank && !isNaN(rank) ? parseInt(rank) : null;
    }

    console.log('🔧 Update data being processed:', updateData);

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

    const formattedCampuses = campuses.map(campus => ({
      id: campus.id,
      name: campus.name,
      address: campus.address,
      type: campus.type,
      students: campus.student_count,
      coordinates: campus.latitude && campus.longitude ? [parseFloat(campus.latitude), parseFloat(campus.longitude)] : [0, 0],
      dean: campus.dean,
      contact: {
        phone: campus.contact_number,
        email: campus.email,
      },
      image: campus.image_url || "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=150&fit=crop",
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
    const campusPromises = campuses.map(campus => {
      const campusData = {
        college_id: id,
        name: campus.name,
        type: campus.type,
        address: campus.address,
        student_count: campus.students,
        latitude: campus.coordinates && campus.coordinates[0] ? campus.coordinates[0] : null,
        longitude: campus.coordinates && campus.coordinates[1] ? campus.coordinates[1] : null,
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
      latitude: campusData.coordinates && campusData.coordinates[0] ? campusData.coordinates[0] : null,
      longitude: campusData.coordinates && campusData.coordinates[1] ? campusData.coordinates[1] : null,
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
