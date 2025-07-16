const prisma = require('../config/prisma');

/**
 * Student Profile Service
 * Consolidated service for all student profile sections:
 * - About, Experience, Education, Skills, Projects, Courses, Certifications, Recommendations
 */

class StudentProfileService {
  
  // =============================================
  // ABOUT SECTION
  // =============================================
  
  async getAbout(studentId) {
    try {
      const about = await prisma.student_about.findFirst({
        where: { student_id: studentId }
      });
      return about;
    } catch (error) {
      throw new Error(`Failed to get about information: ${error.message}`);
    }
  }

  async upsertAbout(studentId, aboutData) {
    try {
      const { summary } = aboutData;
      
      const existingAbout = await prisma.student_about.findFirst({
        where: { student_id: studentId }
      });

      if (existingAbout) {
        const about = await prisma.student_about.update({
          where: { id: existingAbout.id },
          data: { summary }
        });
        return about;
      } else {
        const about = await prisma.student_about.create({
          data: { student_id: studentId, summary }
        });
        return about;
      }
    } catch (error) {
      throw new Error(`Failed to upsert about information: ${error.message}`);
    }
  }

  async deleteAbout(studentId) {
    try {
      await prisma.student_about.deleteMany({
        where: { student_id: studentId }
      });
      return { message: 'About information deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete about information: ${error.message}`);
    }
  }

  // =============================================
  // EXPERIENCE SECTION
  // =============================================
  
  async getExperiences(studentId) {
    try {
      const experiences = await prisma.student_experience.findMany({
        where: { student_id: studentId },
        orderBy: { start_date: 'desc' }
      });
      return experiences;
    } catch (error) {
      throw new Error(`Failed to get experiences: ${error.message}`);
    }
  }

  async createExperience(studentId, experienceData) {
    try {
      const {
        title, company, start_date, end_date, description,
        location, employment_type, currently_working
      } = experienceData;
      
      const experience = await prisma.student_experience.create({
        data: {
          student_id: studentId,
          title,
          company,
          start_date: start_date ? new Date(start_date) : null,
          end_date: end_date ? new Date(end_date) : null,
          description,
          location,
          employment_type,
          currently_working
        }
      });
      return experience;
    } catch (error) {
      throw new Error(`Failed to create experience: ${error.message}`);
    }
  }

  async updateExperience(experienceId, studentId, experienceData) {
    try {
      const {
        title, company, start_date, end_date, description,
        location, employment_type, currently_working
      } = experienceData;
      
      const experience = await prisma.student_experience.updateMany({
        where: { id: parseInt(experienceId), student_id: studentId },
        data: {
          title,
          company,
          start_date: start_date ? new Date(start_date) : null,
          end_date: end_date ? new Date(end_date) : null,
          description,
          location,
          employment_type,
          currently_working
        }
      });
      
      if (experience.count === 0) {
        throw new Error('Experience not found or unauthorized');
      }
      return experience;
    } catch (error) {
      throw new Error(`Failed to update experience: ${error.message}`);
    }
  }

  async deleteExperience(experienceId, studentId) {
    try {
      const experience = await prisma.student_experience.deleteMany({
        where: { id: parseInt(experienceId), student_id: studentId }
      });
      
      if (experience.count === 0) {
        throw new Error('Experience not found or unauthorized');
      }
      return { message: 'Experience deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete experience: ${error.message}`);
    }
  }

  // =============================================
  // EDUCATION SECTION
  // =============================================
  
  async getEducation(studentId) {
    try {
      const education = await prisma.student_education.findMany({
        where: { student_id: studentId },
        orderBy: { start_year: 'desc' }
      });
      return education;
    } catch (error) {
      throw new Error(`Failed to get education: ${error.message}`);
    }
  }

  async createEducation(studentId, educationData) {
    try {
      const { institution, degree, field_of_study, start_year, end_year, grade } = educationData;
      
      const education = await prisma.student_education.create({
        data: {
          student_id: studentId,
          institution,
          degree,
          field_of_study,
          start_year: start_year ? parseInt(start_year) : null,
          end_year: end_year ? parseInt(end_year) : null,
          grade
        }
      });
      return education;
    } catch (error) {
      throw new Error(`Failed to create education: ${error.message}`);
    }
  }

  async updateEducation(educationId, studentId, educationData) {
    try {
      const { institution, degree, field_of_study, start_year, end_year, grade } = educationData;
      
      const education = await prisma.student_education.updateMany({
        where: { id: parseInt(educationId), student_id: studentId },
        data: {
          institution,
          degree,
          field_of_study,
          start_year: start_year ? parseInt(start_year) : null,
          end_year: end_year ? parseInt(end_year) : null,
          grade
        }
      });
      
      if (education.count === 0) {
        throw new Error('Education not found or unauthorized');
      }
      return education;
    } catch (error) {
      throw new Error(`Failed to update education: ${error.message}`);
    }
  }

  async deleteEducation(educationId, studentId) {
    try {
      const education = await prisma.student_education.deleteMany({
        where: { id: parseInt(educationId), student_id: studentId }
      });
      
      if (education.count === 0) {
        throw new Error('Education not found or unauthorized');
      }
      return { message: 'Education deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete education: ${error.message}`);
    }
  }

  // =============================================
  // SKILLS SECTION
  // =============================================
  
  async getSkills(studentId) {
    try {
      const skills = await prisma.student_skills.findMany({
        where: { student_id: studentId },
        orderBy: { skill_name: 'asc' }
      });
      return skills;
    } catch (error) {
      throw new Error(`Failed to get skills: ${error.message}`);
    }
  }

  async getSkillsByProficiency(studentId, proficiency) {
    try {
      const skills = await prisma.student_skills.findMany({
        where: { student_id: studentId, proficiency: proficiency },
        orderBy: { skill_name: 'asc' }
      });
      return skills;
    } catch (error) {
      throw new Error(`Failed to get skills by proficiency: ${error.message}`);
    }
  }

  async createSkill(studentId, skillData) {
    try {
      const { skill_name, proficiency } = skillData;
      
      const skill = await prisma.student_skills.create({
        data: { student_id: studentId, skill_name, proficiency }
      });
      return skill;
    } catch (error) {
      throw new Error(`Failed to create skill: ${error.message}`);
    }
  }

  async createSkills(studentId, skillsData) {
    try {
      const skillsToCreate = skillsData.map(skill => ({
        student_id: studentId,
        skill_name: skill.skill_name,
        proficiency: skill.proficiency
      }));
      
      const skills = await prisma.student_skills.createMany({
        data: skillsToCreate,
        skipDuplicates: true
      });
      return skills;
    } catch (error) {
      throw new Error(`Failed to create skills: ${error.message}`);
    }
  }

  async updateSkill(skillId, studentId, skillData) {
    try {
      const { skill_name, proficiency } = skillData;
      
      const skill = await prisma.student_skills.updateMany({
        where: { id: parseInt(skillId), student_id: studentId },
        data: { skill_name, proficiency }
      });
      
      if (skill.count === 0) {
        throw new Error('Skill not found or unauthorized');
      }
      return skill;
    } catch (error) {
      throw new Error(`Failed to update skill: ${error.message}`);
    }
  }

  async deleteSkill(skillId, studentId) {
    try {
      const skill = await prisma.student_skills.deleteMany({
        where: { id: parseInt(skillId), student_id: studentId }
      });
      
      if (skill.count === 0) {
        throw new Error('Skill not found or unauthorized');
      }
      return { message: 'Skill deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete skill: ${error.message}`);
    }
  }

  // =============================================
  // PROJECTS SECTION
  // =============================================
  
  async getProjects(studentId) {
    try {
      const projects = await prisma.student_projects.findMany({
        where: { student_id: studentId },
        orderBy: { start_date: 'desc' }
      });
      return projects;
    } catch (error) {
      throw new Error(`Failed to get projects: ${error.message}`);
    }
  }

  async createProject(studentId, projectData) {
    try {
      const { title, description, technologies, start_date, end_date, project_link } = projectData;
      
      const project = await prisma.student_projects.create({
        data: {
          student_id: studentId,
          title,
          description,
          technologies,
          start_date: start_date ? new Date(start_date) : null,
          end_date: end_date ? new Date(end_date) : null,
          project_link
        }
      });
      return project;
    } catch (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }
  }

  async updateProject(projectId, studentId, projectData) {
    try {
      const { title, description, technologies, start_date, end_date, project_link } = projectData;
      
      const project = await prisma.student_projects.updateMany({
        where: { id: parseInt(projectId), student_id: studentId },
        data: {
          title,
          description,
          technologies,
          start_date: start_date ? new Date(start_date) : null,
          end_date: end_date ? new Date(end_date) : null,
          project_link
        }
      });
      
      if (project.count === 0) {
        throw new Error('Project not found or unauthorized');
      }
      return project;
    } catch (error) {
      throw new Error(`Failed to update project: ${error.message}`);
    }
  }

  async deleteProject(projectId, studentId) {
    try {
      const project = await prisma.student_projects.deleteMany({
        where: { id: parseInt(projectId), student_id: studentId }
      });
      
      if (project.count === 0) {
        throw new Error('Project not found or unauthorized');
      }
      return { message: 'Project deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  }

  // =============================================
  // COURSES SECTION
  // =============================================
  
  async getCourses(studentId) {
    try {
      const courses = await prisma.student_courses.findMany({
        where: { student_id: studentId },
        orderBy: { completion_date: 'desc' }
      });
      return courses;
    } catch (error) {
      throw new Error(`Failed to get courses: ${error.message}`);
    }
  }

  async createCourse(studentId, courseData) {
    try {
      const { course_name, provider, completion_date } = courseData;
      
      const course = await prisma.student_courses.create({
        data: {
          student_id: studentId,
          course_name,
          provider,
          completion_date: completion_date ? new Date(completion_date) : null
        }
      });
      return course;
    } catch (error) {
      throw new Error(`Failed to create course: ${error.message}`);
    }
  }

  async updateCourse(courseId, studentId, courseData) {
    try {
      const { course_name, provider, completion_date } = courseData;
      
      const course = await prisma.student_courses.updateMany({
        where: { id: parseInt(courseId), student_id: studentId },
        data: {
          course_name,
          provider,
          completion_date: completion_date ? new Date(completion_date) : null
        }
      });
      
      if (course.count === 0) {
        throw new Error('Course not found or unauthorized');
      }
      return course;
    } catch (error) {
      throw new Error(`Failed to update course: ${error.message}`);
    }
  }

  async deleteCourse(courseId, studentId) {
    try {
      const course = await prisma.student_courses.deleteMany({
        where: { id: parseInt(courseId), student_id: studentId }
      });
      
      if (course.count === 0) {
        throw new Error('Course not found or unauthorized');
      }
      return { message: 'Course deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  }

  // =============================================
  // CERTIFICATIONS SECTION
  // =============================================
  
  async getCertifications(studentId) {
    try {
      const certifications = await prisma.student_certifications.findMany({
        where: { student_id: studentId },
        orderBy: { issue_date: 'desc' }
      });
      return certifications;
    } catch (error) {
      throw new Error(`Failed to get certifications: ${error.message}`);
    }
  }

  async createCertification(studentId, certificationData) {
    try {
      const {
        certificate_name, issuing_organization, issue_date,
        expiry_date, credential_id, credential_url
      } = certificationData;
      
      const certification = await prisma.student_certifications.create({
        data: {
          student_id: studentId,
          certificate_name,
          issuing_organization,
          issue_date: issue_date ? new Date(issue_date) : null,
          expiry_date: expiry_date ? new Date(expiry_date) : null,
          credential_id,
          credential_url
        }
      });
      return certification;
    } catch (error) {
      throw new Error(`Failed to create certification: ${error.message}`);
    }
  }

  async updateCertification(certificationId, studentId, certificationData) {
    try {
      const {
        certificate_name, issuing_organization, issue_date,
        expiry_date, credential_id, credential_url
      } = certificationData;
      
      const certification = await prisma.student_certifications.updateMany({
        where: { id: parseInt(certificationId), student_id: studentId },
        data: {
          certificate_name,
          issuing_organization,
          issue_date: issue_date ? new Date(issue_date) : null,
          expiry_date: expiry_date ? new Date(expiry_date) : null,
          credential_id,
          credential_url
        }
      });
      
      if (certification.count === 0) {
        throw new Error('Certification not found or unauthorized');
      }
      return certification;
    } catch (error) {
      throw new Error(`Failed to update certification: ${error.message}`);
    }
  }

  async deleteCertification(certificationId, studentId) {
    try {
      const certification = await prisma.student_certifications.deleteMany({
        where: { id: parseInt(certificationId), student_id: studentId }
      });
      
      if (certification.count === 0) {
        throw new Error('Certification not found or unauthorized');
      }
      return { message: 'Certification deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete certification: ${error.message}`);
    }
  }

  // =============================================
  // RECOMMENDATIONS SECTION
  // =============================================
  
  async getRecommendations(studentId) {
    try {
      const recommendations = await prisma.student_recommendations.findMany({
        where: { student_id: studentId },
        orderBy: { id: 'desc' }
      });
      return recommendations;
    } catch (error) {
      throw new Error(`Failed to get recommendations: ${error.message}`);
    }
  }

  async getPublicRecommendations(studentId) {
    try {
      const recommendations = await prisma.student_recommendations.findMany({
        where: { student_id: studentId },
        orderBy: { id: 'desc' }
      });
      return recommendations;
    } catch (error) {
      throw new Error(`Failed to get public recommendations: ${error.message}`);
    }
  }

  async createRecommendation(studentId, recommendationData) {
    try {
      const { recommender_name, relationship, message } = recommendationData;
      
      const recommendation = await prisma.student_recommendations.create({
        data: { student_id: studentId, recommender_name, relationship, message }
      });
      return recommendation;
    } catch (error) {
      throw new Error(`Failed to create recommendation: ${error.message}`);
    }
  }

  async updateRecommendation(recommendationId, studentId, recommendationData) {
    try {
      const { recommender_name, relationship, message } = recommendationData;
      
      const recommendation = await prisma.student_recommendations.updateMany({
        where: { id: parseInt(recommendationId), student_id: studentId },
        data: { recommender_name, relationship, message }
      });
      
      if (recommendation.count === 0) {
        throw new Error('Recommendation not found or unauthorized');
      }
      return recommendation;
    } catch (error) {
      throw new Error(`Failed to update recommendation: ${error.message}`);
    }
  }

  async deleteRecommendation(recommendationId, studentId) {
    try {
      const recommendation = await prisma.student_recommendations.deleteMany({
        where: { id: parseInt(recommendationId), student_id: studentId }
      });
      
      if (recommendation.count === 0) {
        throw new Error('Recommendation not found or unauthorized');
      }
      return { message: 'Recommendation deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete recommendation: ${error.message}`);
    }
  }

  // =============================================
  // COMPLETE PROFILE
  // =============================================
  
  async getCompleteProfile(studentId) {
    try {
      const [
        about, experiences, education, skills, projects,
        courses, certifications, recommendations
      ] = await Promise.all([
        this.getAbout(studentId),
        this.getExperiences(studentId),
        this.getEducation(studentId),
        this.getSkills(studentId),
        this.getProjects(studentId),
        this.getCourses(studentId),
        this.getCertifications(studentId),
        this.getPublicRecommendations(studentId)
      ]);
      
      return {
        about, experiences, education, skills,
        projects, courses, certifications, recommendations
      };
    } catch (error) {
      throw new Error(`Failed to get complete profile: ${error.message}`);
    }
  }

  // =============================================
  // UTILITY METHODS
  // =============================================
  
  async getProfileSummary(studentId) {
    try {
      const [
        aboutCount, experienceCount, educationCount, skillsCount,
        projectsCount, coursesCount, certificationsCount, recommendationsCount
      ] = await Promise.all([
        prisma.student_about.count({ where: { student_id: studentId } }),
        prisma.student_experience.count({ where: { student_id: studentId } }),
        prisma.student_education.count({ where: { student_id: studentId } }),
        prisma.student_skills.count({ where: { student_id: studentId } }),
        prisma.student_projects.count({ where: { student_id: studentId } }),
        prisma.student_courses.count({ where: { student_id: studentId } }),
        prisma.student_certifications.count({ where: { student_id: studentId } }),
        prisma.student_recommendations.count({ where: { student_id: studentId } })
      ]);
      
      const totalSections = 8;
      const completedSections = [
        aboutCount, experienceCount, educationCount, skillsCount,
        projectsCount, coursesCount, certificationsCount, recommendationsCount
      ].filter(count => count > 0).length;
      
      return {
        completedSections,
        totalSections,
        completionPercentage: Math.round((completedSections / totalSections) * 100),
        sectionCounts: {
          about: aboutCount,
          experiences: experienceCount,
          education: educationCount,
          skills: skillsCount,
          projects: projectsCount,
          courses: coursesCount,
          certifications: certificationsCount,
          recommendations: recommendationsCount
        }
      };
    } catch (error) {
      throw new Error(`Failed to get profile summary: ${error.message}`);
    }
  }
}

module.exports = new StudentProfileService();
