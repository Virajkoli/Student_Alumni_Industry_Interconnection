const express = require("express");
const {
  Student,
  StudentAbout,
  StudentExperience,
  StudentEducation,
  StudentSkills,
  StudentCourses,
  StudentCertifications,
  StudentProjects,
  StudentRecommendations,
} = require("../config/database");
const { auth } = require("../middleware/auth");
const router = express.Router();
const upload = require("../middleware/upload");
const streamifier = require("streamifier");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadProfileImage } = require("../config/cloudinary");

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Get complete student profile
// @route   GET /api/students/profile
// @access  Private
const getStudentProfile = async (req, res) => {
  try {
    console.log("Fetching complete profile for student ID:", req.user.id);

    // Get main student info
    const student = await Student.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Get all profile sections
    const [
      about,
      experience,
      education,
      skills,
      courses,
      certifications,
      projects,
      recommendations,
    ] = await Promise.all([
      StudentAbout.findOne({ where: { student_id: req.user.id } }),
      StudentExperience.findAll({
        where: { student_id: req.user.id },
        order: [["start_date", "DESC"]],
      }),
      StudentEducation.findAll({
        where: { student_id: req.user.id },
        order: [["end_year", "DESC"]],
      }),
      StudentSkills.findAll({
        where: { student_id: req.user.id },
        order: [["skill_name", "ASC"]],
      }),
      StudentCourses.findAll({
        where: { student_id: req.user.id },
        order: [["completion_date", "DESC"]],
      }),
      StudentCertifications.findAll({
        where: { student_id: req.user.id },
        order: [["issue_date", "DESC"]],
      }),
      StudentProjects.findAll({
        where: { student_id: req.user.id },
        order: [["start_date", "DESC"]],
      }),
      StudentRecommendations.findAll({
        where: { student_id: req.user.id },
        order: [["id", "DESC"]],
      }),
    ]);

    res.json({
      success: true,
      data: {
        basicInfo: {
          id: student.id,
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.email,
          contact_no: student.contact_no,
          college_name: student.college_name,
          interested_field: student.interested_field,
          other_field: student.other_field,
          profile_picture: student.profile_picture,
          cover_picture: student.cover_picture,
          created_at: student.created_at,
        },
        about: about?.summary || null,
        experience: experience || [],
        education: education || [],
        skills: skills || [],
        courses: courses || [],
        certifications: certifications || [],
        projects: projects || [],
        recommendations: recommendations || [],
      },
    });
  } catch (error) {
    console.error("Get student profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

// @desc    Update student basic info
// @route   PUT /api/students/basic-info
// @access  Private
const updateBasicInfo = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      contact_no,
      college_name,
      interested_field,
      other_field,
    } = req.body;

    const student = await Student.findByPk(req.user.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.update({
      first_name,
      last_name,
      contact_no,
      college_name,
      interested_field,
      other_field: interested_field === "Other" ? other_field : null,
    });

    res.json({
      success: true,
      message: "Basic info updated successfully",
      data: {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        contact_no: student.contact_no,
        college_name: student.college_name,
        interested_field: student.interested_field,
        other_field: student.other_field,
      },
    });
  } catch (error) {
    console.error("Update basic info error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating basic info",
    });
  }
};

// @desc    Update/Create student about section
// @route   PUT /api/students/about
// @access  Private
const updateAbout = async (req, res) => {
  try {
    const { summary } = req.body;

    let about = await StudentAbout.findOne({
      where: { student_id: req.user.id },
    });

    if (about) {
      await about.update({ summary });
    } else {
      about = await StudentAbout.create({
        student_id: req.user.id,
        summary,
      });
    }

    res.json({
      success: true,
      message: "About section updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("Update about error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating about section",
    });
  }
};

// @desc    Add student experience
// @route   POST /api/students/experience
// @access  Private
const addExperience = async (req, res) => {
  try {
    const { title, company, start_date, end_date, description } = req.body;

    const experience = await StudentExperience.create({
      student_id: req.user.id,
      title,
      company,
      start_date,
      end_date,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Add experience error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding experience",
    });
  }
};

// @desc    Update student experience
// @route   PUT /api/students/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, start_date, end_date, description } = req.body;

    const experience = await StudentExperience.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    await experience.update({
      title,
      company,
      start_date,
      end_date,
      description,
    });

    res.json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Update experience error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating experience",
    });
  }
};

// @desc    Delete student experience
// @route   DELETE /api/students/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await StudentExperience.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    await experience.destroy();

    res.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting experience",
    });
  }
};

// @desc    Add student project
// @route   POST /api/students/projects
// @access  Private
const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      start_date,
      end_date,
      project_link,
    } = req.body;

    const project = await StudentProjects.create({
      student_id: req.user.id,
      title,
      description,
      technologies,
      start_date,
      end_date,
      project_link,
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project,
    });
  } catch (error) {
    console.error("Add project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding project",
    });
  }
};

// @desc    Update student project
// @route   PUT /api/students/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      technologies,
      start_date,
      end_date,
      project_link,
    } = req.body;

    const project = await StudentProjects.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.update({
      title,
      description,
      technologies,
      start_date,
      end_date,
      project_link,
    });

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating project",
    });
  }
};

// @desc    Delete student project
// @route   DELETE /api/students/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await StudentProjects.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting project",
    });
  }
};

// @desc    Add student education
// @route   POST /api/students/education
// @access  Private
const addEducation = async (req, res) => {
  try {
    const { institution, degree, field_of_study, start_year, end_year, grade } =
      req.body;

    const education = await StudentEducation.create({
      student_id: req.user.id,
      institution,
      degree,
      field_of_study,
      start_year,
      end_year,
      grade,
    });

    res.status(201).json({
      success: true,
      message: "Education added successfully",
      data: education,
    });
  } catch (error) {
    console.error("Add education error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding education",
    });
  }
};

// @desc    Update student education
// @route   PUT /api/students/education/:id
// @access  Private
const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { institution, degree, field_of_study, start_year, end_year, grade } =
      req.body;

    const education = await StudentEducation.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    await education.update({
      institution,
      degree,
      field_of_study,
      start_year,
      end_year,
      grade,
    });

    res.json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    console.error("Update education error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating education",
    });
  }
};

// @desc    Delete student education
// @route   DELETE /api/students/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await StudentEducation.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    await education.destroy();

    res.json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Delete education error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting education",
    });
  }
};

// @desc    Add student skill
// @route   POST /api/students/skills
// @access  Private
const addSkill = async (req, res) => {
  try {
    const { skill_name, proficiency } = req.body;

    const skill = await StudentSkills.create({
      student_id: req.user.id,
      skill_name,
      proficiency,
    });

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Add skill error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding skill",
    });
  }
};

// @desc    Update student skill
// @route   PUT /api/students/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill_name, proficiency } = req.body;

    const skill = await StudentSkills.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skill.update({
      skill_name,
      proficiency,
    });

    res.json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating skill",
    });
  }
};

// @desc    Delete student skill
// @route   DELETE /api/students/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await StudentSkills.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skill.destroy();

    res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting skill",
    });
  }
};

// @desc    Add student course
// @route   POST /api/students/courses
// @access  Private
const addCourse = async (req, res) => {
  try {
    const { course_name, provider, completion_date } = req.body;

    const course = await StudentCourses.create({
      student_id: req.user.id,
      course_name,
      provider,
      completion_date,
    });

    res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: course,
    });
  } catch (error) {
    console.error("Add course error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding course",
    });
  }
};

// @desc    Delete student course
// @route   DELETE /api/students/courses/:id
// @access  Private
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await StudentCourses.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.destroy();

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting course",
    });
  }
};

// @desc    Add student certification
// @route   POST /api/students/certifications
// @access  Private
const addCertification = async (req, res) => {
  try {
    const {
      certificate_name,
      issuing_organization,
      issue_date,
      expiry_date,
      credential_id,
      credential_url,
    } = req.body;

    const certification = await StudentCertifications.create({
      student_id: req.user.id,
      certificate_name,
      issuing_organization,
      issue_date,
      expiry_date,
      credential_id,
      credential_url,
    });

    res.status(201).json({
      success: true,
      message: "Certification added successfully",
      data: certification,
    });
  } catch (error) {
    console.error("Add certification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding certification",
    });
  }
};

// @desc    Add student recommendation
// @route   POST /api/students/recommendations
// @access  Private
const addRecommendation = async (req, res) => {
  try {
    const { recommender_name, relationship, message } = req.body;

    const recommendation = await StudentRecommendations.create({
      student_id: req.user.id,
      recommender_name,
      relationship,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Recommendation added successfully",
      data: recommendation,
    });
  } catch (error) {
    console.error("Add recommendation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding recommendation",
    });
  }
};

// @desc    Update student recommendation
// @route   PUT /api/students/recommendations/:id
// @access  Private
const updateRecommendation = async (req, res) => {
  try {
    const { id } = req.params;
    const { recommender_name, relationship, message } = req.body;

    const recommendation = await StudentRecommendations.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    await recommendation.update({
      recommender_name,
      relationship,
      message,
    });

    res.json({
      success: true,
      message: "Recommendation updated successfully",
      data: recommendation,
    });
  } catch (error) {
    console.error("Update recommendation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating recommendation",
    });
  }
};

// @desc    Delete student recommendation
// @route   DELETE /api/students/recommendations/:id
// @access  Private
const deleteRecommendation = async (req, res) => {
  try {
    const { id } = req.params;

    const recommendation = await StudentRecommendations.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    await recommendation.destroy();

    res.json({
      success: true,
      message: "Recommendation deleted successfully",
    });
  } catch (error) {
    console.error("Delete recommendation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting recommendation",
    });
  }
};

// @desc    Update student course
// @route   PUT /api/students/courses/:id
// @access  Private
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_name, provider, completion_date } = req.body;

    const course = await StudentCourses.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.update({
      course_name,
      provider,
      completion_date,
    });

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating course",
    });
  }
};

// @desc    Update student certification
// @route   PUT /api/students/certifications/:id
// @access  Private
const updateCertification = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      certificate_name,
      issuing_organization,
      issue_date,
      expiry_date,
      credential_id,
      credential_url,
    } = req.body;

    const certification = await StudentCertifications.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    await certification.update({
      certificate_name,
      issuing_organization,
      issue_date,
      expiry_date,
      credential_id,
      credential_url,
    });

    res.json({
      success: true,
      message: "Certification updated successfully",
      data: certification,
    });
  } catch (error) {
    console.error("Update certification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating certification",
    });
  }
};

// @desc    Delete student certification
// @route   DELETE /api/students/certifications/:id
// @access  Private
const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    const certification = await StudentCertifications.findOne({
      where: { id, student_id: req.user.id },
    });

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    await certification.destroy();

    res.json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    console.error("Delete certification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting certification",
    });
  }
};

// @desc    Upload student profile picture
// @route   POST /api/students/profile-image
// @access  Private
const uploadStudentProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const profile_picture = uploadResult.secure_url;

    const student = await Student.findByPk(req.user.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.update({ profile_picture });

    res.json({
      success: true,
      message: "Profile image updated successfully",
      data: { profile_picture },
    });
  } catch (error) {
    console.error("Upload profile image error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while uploading profile image",
    });
  }
};

// @desc    Upload student cover picture
// @route   POST /api/students/cover-image
// @access  Private
const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "cover_pictures" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const cover_picture = uploadResult.secure_url;

    const student = await Student.findByPk(req.user.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.update({ cover_picture });

    res.json({
      success: true,
      message: "Cover image updated successfully",
      data: { cover_picture },
    });
  } catch (error) {
    console.error("Upload cover image error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while uploading cover image",
    });
  }
};

// @desc    Get specific student profile by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get main student info
    const student = await Student.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Get all profile sections
    const [
      about,
      experience,
      education,
      skills,
      courses,
      certifications,
      projects,
      recommendations,
    ] = await Promise.all([
      StudentAbout.findOne({ where: { student_id: id } }),
      StudentExperience.findAll({
        where: { student_id: id },
        order: [["created_at", "DESC"]],
      }),
      StudentEducation.findAll({
        where: { student_id: id },
        order: [["created_at", "DESC"]],
      }),
      StudentSkills.findAll({
        where: { student_id: id },
        order: [["created_at", "DESC"]],
      }),
      StudentCourses.findAll({
        where: { student_id: id },
        order: [["created_at", "DESC"]],
      }),
      StudentCertifications.findAll({
        where: { student_id: id },
        order: [["created_at", "DESC"]],
      }),
      StudentProjects.findAll({
        where: { student_id: id },
        order: [["created_at", "DESC"]],
      }),
      StudentRecommendations.findAll({
        where: { student_id: id },
        order: [["created_at", "DESC"]],
      }),
    ]);

    res.json({
      success: true,
      data: {
        id: student.id,
        firstName: student.first_name,
        lastName: student.last_name,
        email: student.email,
        contactNo: student.contact_no,
        collegeName: student.college_name,
        interestedField: student.interested_field,
        otherField: student.other_field,
        profilePicture: student.profile_picture,
        coverPicture: student.cover_picture,
        about: about?.summary || "",
        experience: experience || [],
        education: education || [],
        skills: skills || [],
        courses: courses || [],
        certifications: certifications || [],
        projects: projects || [],
        recommendations: recommendations || [],
        createdAt: student.created_at,
      },
    });
  } catch (error) {
    console.error("Get student by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching student profile",
    });
  }
};

// @desc    Get student additional information
// @route   GET /api/students/:id/additional-info
// @access  Private
const getStudentAdditionalInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure the student can only access their own data
    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only view your own profile.",
      });
    }

    const student = await Student.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        contact_no: student.contact_no,
        college_name: student.college_name,
        interested_field: student.interested_field,
        other_field: student.other_field,
        profile_picture: student.profile_picture,
        cover_picture: student.cover_picture,
        created_at: student.created_at,
      },
    });
  } catch (error) {
    console.error("Get student additional info error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching additional information",
    });
  }
};

// @desc    Update student additional information
// @route   PUT /api/students/:id/additional-info
// @access  Private
const updateStudentAdditionalInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure the student can only update their own data
    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own profile.",
      });
    }

    const {
      first_name,
      last_name,
      contact_no,
      college_name,
      interested_field,
      other_field,
    } = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.update({
      first_name,
      last_name,
      contact_no,
      college_name,
      interested_field,
      other_field: interested_field === "Other" ? other_field : null,
    });

    res.json({
      success: true,
      message: "Additional info updated successfully",
      data: {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        contact_no: student.contact_no,
        college_name: student.college_name,
        interested_field: student.interested_field,
        other_field: student.other_field,
      },
    });
  } catch (error) {
    console.error("Update student additional info error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating additional information",
    });
  }
};

// ===== NEW PRISMA-BASED ROUTES =====

// Helper function for student select fields
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

// GET Current Student Profile
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

// Update Current Student Profile
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

// Get All Students with Pagination + Search
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

// Get Ping Requests (Received)
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

// Get Connections (Accepted Pings)
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

    // Fetch connected user details
    const connectionsWithUsers = await Promise.all(
      connections.map(async (connection) => {
        const isCurrentUserSender = connection.sender_profile_id === studentId;
        const connectedUserId = isCurrentUserSender
          ? connection.receiver_profile_id
          : connection.sender_profile_id;

        const connectedUser = await prisma.student.findUnique({
          where: { id: connectedUserId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            headline: true,
            collegeName: true,
            location: true,
            interestedField: true,
          },
        });

        return {
          ...connection,
          connectedUser,
        };
      })
    );

    res.json({
      success: true,
      data: connectionsWithUsers,
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch connections",
    });
  }
});

// Get Connection Count
router.get("/connections/count", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access connection count",
      });
    }

    const studentId = req.user.userId;

    const count = await prisma.ping_networks.count({
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
      data: { count },
    });
  } catch (error) {
    console.error("Error fetching connection count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch connection count",
    });
  }
});

// Send Ping Request
router.post("/ping/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can send ping requests",
      });
    }

    const senderId = req.user.userId;
    const receiverId = parseInt(req.params.id);

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a ping request to yourself",
      });
    }

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

    // Check if a ping request already exists
    const existingPing = await prisma.ping_networks.findFirst({
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

    if (existingPing) {
      return res.status(400).json({
        success: false,
        message: "A ping request already exists between you and this student",
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

// Accept Ping Request
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

// Reject Ping Request
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

// Check Connection Status
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

// Get Student by ID (New Prisma Version)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = parseInt(id);

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNo: true,
        collegeName: true,
        interestedField: true,
        location: true,
        headline: true,
        profilePicture: true,
        coverPicture: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (!student.isActive) {
      return res.status(404).json({
        success: false,
        message: "Student profile is not active",
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
});

// Update Student by ID (Admin/Self)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = parseInt(id);

    // Check if user is updating their own profile or is admin
    if (req.user.userId !== studentId && req.user.role !== "admin") {
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
      location,
      headline,
      profilePicture,
    } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
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

    res.json({
      success: true,
      message: "Student profile updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student profile",
    });
  }
});

// Delete/Deactivate Student by ID (Admin/Self)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = parseInt(id);

    // Check if user is deleting their own profile or is admin
    if (req.user.userId !== studentId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own profile",
      });
    }

    // Soft delete by setting isActive to false
    await prisma.student.update({
      where: { id: studentId },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Student profile deactivated successfully",
    });
  } catch (error) {
    console.error("Error deactivating student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to deactivate student profile",
    });
  }
});

// ===== LEGACY ROUTES (EXISTING FUNCTIONS) =====

// Routes
router.get("/profile", auth, getStudentProfile);
router.get("/:id", auth, getStudentById);
router.get("/:id/additional-info", auth, getStudentAdditionalInfo);
router.put("/:id/additional-info", auth, updateStudentAdditionalInfo);
router.put("/basic-info", auth, updateBasicInfo);
router.put("/about", auth, updateAbout);
router.post("/experience", auth, addExperience);
router.put("/experience/:id", auth, updateExperience);
router.delete("/experience/:id", auth, deleteExperience);
router.post("/projects", auth, addProject);
router.put("/projects/:id", auth, updateProject);
router.delete("/projects/:id", auth, deleteProject);
router.post("/education", auth, addEducation);
router.put("/education/:id", auth, updateEducation);
router.delete("/education/:id", auth, deleteEducation);
router.post("/skills", auth, addSkill);
router.put("/skills/:id", auth, updateSkill);
router.delete("/skills/:id", auth, deleteSkill);
router.post("/courses", auth, addCourse);
router.put("/courses/:id", auth, updateCourse);
router.delete("/courses/:id", auth, deleteCourse);
router.post("/certifications", auth, addCertification);
router.put("/certifications/:id", auth, updateCertification);
router.delete("/certifications/:id", auth, deleteCertification);
router.post("/recommendations", auth, addRecommendation);
router.put("/recommendations/:id", auth, updateRecommendation);
router.delete("/recommendations/:id", auth, deleteRecommendation);
router.post(
  "/profile-image",
  auth,
  upload.single("profile_picture"),
  uploadStudentProfileImage
);
router.post(
  "/cover-image",
  auth,
  upload.single("cover_picture"),
  uploadCoverImage
);

module.exports = router;
