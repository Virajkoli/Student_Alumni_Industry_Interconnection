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

// Routes
router.get("/profile", auth, getStudentProfile);
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

module.exports = router;
