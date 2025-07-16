const studentProfileService = require('../services/studentProfileService');

// About Section Controllers
const getAbout = async (req, res) => {
  try {
    const studentId = req.user.id;
    const about = await studentProfileService.getAbout(studentId);
    
    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get about information',
      error: error.message
    });
  }
};

const updateAbout = async (req, res) => {
  try {
    const studentId = req.user.id;
    const aboutData = req.body;
    
    const about = await studentProfileService.upsertAbout(studentId, aboutData);
    
    res.json({
      success: true,
      message: 'About information updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update about information',
      error: error.message
    });
  }
};

// Experience Section Controllers
const getExperiences = async (req, res) => {
  try {
    const studentId = req.user.id;
    const experiences = await studentProfileService.getExperiences(studentId);
    
    res.json({
      success: true,
      data: experiences
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get experiences',
      error: error.message
    });
  }
};

const createExperience = async (req, res) => {
  try {
    const studentId = req.user.id;
    const experienceData = req.body;
    
    const experience = await studentProfileService.createExperience(studentId, experienceData);
    
    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create experience',
      error: error.message
    });
  }
};

const updateExperience = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const experienceData = req.body;
    
    const experience = await studentProfileService.updateExperience(id, studentId, experienceData);
    
    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update experience',
      error: error.message
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    
    await studentProfileService.deleteExperience(id, studentId);
    
    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete experience',
      error: error.message
    });
  }
};

// Education Section Controllers
const getEducation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const education = await studentProfileService.getEducation(studentId);
    
    res.json({
      success: true,
      data: education
    });
  } catch (error) {
    console.error('Get education error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get education',
      error: error.message
    });
  }
};

const createEducation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const educationData = req.body;
    
    const education = await studentProfileService.createEducation(studentId, educationData);
    
    res.status(201).json({
      success: true,
      message: 'Education created successfully',
      data: education
    });
  } catch (error) {
    console.error('Create education error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create education',
      error: error.message
    });
  }
};

const updateEducation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const educationData = req.body;
    
    const education = await studentProfileService.updateEducation(id, studentId, educationData);
    
    res.json({
      success: true,
      message: 'Education updated successfully',
      data: education
    });
  } catch (error) {
    console.error('Update education error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update education',
      error: error.message
    });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    
    await studentProfileService.deleteEducation(id, studentId);
    
    res.json({
      success: true,
      message: 'Education deleted successfully'
    });
  } catch (error) {
    console.error('Delete education error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete education',
      error: error.message
    });
  }
};

// Skills Section Controllers
const getSkills = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { proficiency } = req.query;
    
    let skills;
    if (proficiency) {
      skills = await studentProfileService.getSkillsByProficiency(studentId, proficiency);
    } else {
      skills = await studentProfileService.getSkills(studentId);
    }
    
    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get skills',
      error: error.message
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const studentId = req.user.id;
    const skillData = req.body;
    
    const skill = await studentProfileService.createSkill(studentId, skillData);
    
    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill
    });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create skill',
      error: error.message
    });
  }
};

const createSkills = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { skills } = req.body;
    
    const result = await studentProfileService.createSkills(studentId, skills);
    
    res.status(201).json({
      success: true,
      message: 'Skills created successfully',
      data: result
    });
  } catch (error) {
    console.error('Create skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create skills',
      error: error.message
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const skillData = req.body;
    
    const skill = await studentProfileService.updateSkill(id, studentId, skillData);
    
    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update skill',
      error: error.message
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    
    await studentProfileService.deleteSkill(id, studentId);
    
    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill',
      error: error.message
    });
  }
};

// Get complete profile
const getCompleteProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const completeProfile = await studentProfileService.getCompleteProfile(studentId);
    
    res.json({
      success: true,
      data: completeProfile
    });
  } catch (error) {
    console.error('Get complete profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get complete profile',
      error: error.message
    });
  }
};

// Get profile summary
const getProfileSummary = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const summary = await studentProfileService.getProfileSummary(studentId);
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Get profile summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile summary',
      error: error.message
    });
  }
};

// Projects Section Controllers
const getProjects = async (req, res) => {
  try {
    const studentId = req.user.id;
    const projects = await studentProfileService.getProjects(studentId);
    
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get projects',
      error: error.message
    });
  }
};

const createProject = async (req, res) => {
  try {
    const studentId = req.user.id;
    const projectData = req.body;
    
    const project = await studentProfileService.createProject(studentId, projectData);
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const projectData = req.body;
    
    const project = await studentProfileService.updateProject(id, studentId, projectData);
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    
    await studentProfileService.deleteProject(id, studentId);
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
};

// Courses Section Controllers
const getCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courses = await studentProfileService.getCourses(studentId);
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get courses',
      error: error.message
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courseData = req.body;
    
    const course = await studentProfileService.createCourse(studentId, courseData);
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const courseData = req.body;
    
    const course = await studentProfileService.updateCourse(id, studentId, courseData);
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
      error: error.message
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    
    await studentProfileService.deleteCourse(id, studentId);
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: error.message
    });
  }
};

// Certifications Section Controllers
const getCertifications = async (req, res) => {
  try {
    const studentId = req.user.id;
    const certifications = await studentProfileService.getCertifications(studentId);
    
    res.json({
      success: true,
      data: certifications
    });
  } catch (error) {
    console.error('Get certifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get certifications',
      error: error.message
    });
  }
};

const createCertification = async (req, res) => {
  try {
    const studentId = req.user.id;
    const certificationData = req.body;
    
    const certification = await studentProfileService.createCertification(studentId, certificationData);
    
    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: certification
    });
  } catch (error) {
    console.error('Create certification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create certification',
      error: error.message
    });
  }
};

const updateCertification = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const certificationData = req.body;
    
    const certification = await studentProfileService.updateCertification(id, studentId, certificationData);
    
    res.json({
      success: true,
      message: 'Certification updated successfully',
      data: certification
    });
  } catch (error) {
    console.error('Update certification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update certification',
      error: error.message
    });
  }
};

const deleteCertification = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    
    await studentProfileService.deleteCertification(id, studentId);
    
    res.json({
      success: true,
      message: 'Certification deleted successfully'
    });
  } catch (error) {
    console.error('Delete certification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete certification',
      error: error.message
    });
  }
};

// Recommendations Section Controllers
const getRecommendations = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { status } = req.query;
    
    let recommendations;
    if (status === 'public') {
      recommendations = await studentProfileService.getPublicRecommendations(studentId);
    } else {
      recommendations = await studentProfileService.getRecommendations(studentId);
    }
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: error.message
    });
  }
};

const createRecommendation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const recommendationData = req.body;
    
    const recommendation = await studentProfileService.createRecommendation(studentId, recommendationData);
    
    res.status(201).json({
      success: true,
      message: 'Recommendation created successfully',
      data: recommendation
    });
  } catch (error) {
    console.error('Create recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create recommendation',
      error: error.message
    });
  }
};

const updateRecommendation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const recommendationData = req.body;
    
    const recommendation = await studentProfileService.updateRecommendation(id, studentId, recommendationData);
    
    res.json({
      success: true,
      message: 'Recommendation updated successfully',
      data: recommendation
    });
  } catch (error) {
    console.error('Update recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update recommendation',
      error: error.message
    });
  }
};

const deleteRecommendation = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    
    await studentProfileService.deleteRecommendation(id, studentId);
    
    res.json({
      success: true,
      message: 'Recommendation deleted successfully'
    });
  } catch (error) {
    console.error('Delete recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete recommendation',
      error: error.message
    });
  }
};

module.exports = {
  // About
  getAbout,
  updateAbout,
  
  // Experience
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  
  // Education
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  
  // Skills
  getSkills,
  createSkill,
  createSkills,
  updateSkill,
  deleteSkill,
  
  // Projects
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  
  // Courses
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  
  // Certifications
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  
  // Recommendations
  getRecommendations,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
  
  // Complete Profile
  getCompleteProfile,
  getProfileSummary
};
