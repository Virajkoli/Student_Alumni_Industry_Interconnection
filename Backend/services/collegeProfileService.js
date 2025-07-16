const prisma = require('../config/prisma');

/**
 * College Profile Service
 * Service for college profile management and related operations
 * Note: College-specific profile section tables don't exist yet in the schema
 * This service handles basic college profile operations and can be extended
 */

class CollegeProfileService {
  
  // =============================================
  // BASIC COLLEGE PROFILE
  // =============================================
  
  async getCollegeProfile(collegeId) {
    try {
      const college = await prisma.college.findUnique({
        where: { id: collegeId },
        select: {
          id: true,
          name: true,
          email: true,
          description: true,
          location: true,
          established: true,
          campusArea: true,
          nirfRank: true,
          accreditation: true,
          totalStudents: true,
          totalFaculty: true,
          website: true,
          logoUrl: true,
          backgroundUrl: true,
          profilePicture: true,
          isActive: true,
          isEmailVerified: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return college;
    } catch (error) {
      throw new Error(`Failed to get college profile: ${error.message}`);
    }
  }

  async updateCollegeProfile(collegeId, profileData) {
    try {
      const {
        name, description, location, established, campusArea,
        nirfRank, accreditation, totalStudents, totalFaculty,
        website, logoUrl, backgroundUrl, profilePicture
      } = profileData;
      
      const college = await prisma.college.update({
        where: { id: collegeId },
        data: {
          name,
          description,
          location,
          established: established ? parseInt(established) : null,
          campusArea: campusArea ? parseFloat(campusArea) : null,
          nirfRank: nirfRank ? parseInt(nirfRank) : null,
          accreditation,
          totalStudents: totalStudents ? parseInt(totalStudents) : null,
          totalFaculty: totalFaculty ? parseInt(totalFaculty) : null,
          website,
          logoUrl,
          backgroundUrl,
          profilePicture,
          updatedAt: new Date()
        }
      });
      return college;
    } catch (error) {
      throw new Error(`Failed to update college profile: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE CAMPUSES (Related table exists)
  // =============================================
  
  async getCollegeCampuses(collegeId) {
    try {
      const campuses = await prisma.college_campuses.findMany({
        where: { college_id: collegeId },
        orderBy: { id: 'asc' }
      });
      return campuses;
    } catch (error) {
      throw new Error(`Failed to get college campuses: ${error.message}`);
    }
  }

  async createCollegeCampus(collegeId, campusData) {
    try {
      const { campus_name, location, contact_person, contact_email, contact_phone } = campusData;
      
      const campus = await prisma.college_campuses.create({
        data: {
          college_id: collegeId,
          campus_name,
          location,
          contact_person,
          contact_email,
          contact_phone
        }
      });
      return campus;
    } catch (error) {
      throw new Error(`Failed to create college campus: ${error.message}`);
    }
  }

  async updateCollegeCampus(campusId, collegeId, campusData) {
    try {
      const { campus_name, location, contact_person, contact_email, contact_phone } = campusData;
      
      const campus = await prisma.college_campuses.updateMany({
        where: { id: parseInt(campusId), college_id: collegeId },
        data: {
          campus_name,
          location,
          contact_person,
          contact_email,
          contact_phone
        }
      });
      
      if (campus.count === 0) {
        throw new Error('Campus not found or unauthorized');
      }
      return campus;
    } catch (error) {
      throw new Error(`Failed to update college campus: ${error.message}`);
    }
  }

  async deleteCollegeCampus(campusId, collegeId) {
    try {
      const campus = await prisma.college_campuses.deleteMany({
        where: { id: parseInt(campusId), college_id: collegeId }
      });
      
      if (campus.count === 0) {
        throw new Error('Campus not found or unauthorized');
      }
      return { message: 'Campus deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete college campus: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE STUDENTS (Related data)
  // =============================================
  
  async getCollegeStudents(collegeId, limit = 50, offset = 0) {
    try {
      // Get students associated with this college
      const college = await prisma.college.findUnique({
        where: { id: collegeId }
      });
      
      if (!college) {
        throw new Error('College not found');
      }
      
      const students = await prisma.student.findMany({
        where: {
          collegeName: college.name // Assuming students are linked by college name
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          interestedField: true,
          profilePicture: true,
          isActive: true,
          createdAt: true
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      });
      
      const totalStudents = await prisma.student.count({
        where: { collegeName: college.name }
      });
      
      return {
        students,
        totalStudents,
        pagination: {
          limit,
          offset,
          hasMore: (offset + limit) < totalStudents
        }
      };
    } catch (error) {
      throw new Error(`Failed to get college students: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE STATISTICS
  // =============================================
  
  async getCollegeStatistics(collegeId) {
    try {
      const college = await prisma.college.findUnique({
        where: { id: collegeId }
      });
      
      if (!college) {
        throw new Error('College not found');
      }
      
      // Get student statistics
      const totalStudents = await prisma.student.count({
        where: { collegeName: college.name }
      });
      
      const activeStudents = await prisma.student.count({
        where: { 
          collegeName: college.name,
          isActive: true
        }
      });
      
      // Get field distribution
      const fieldDistribution = await prisma.student.groupBy({
        by: ['interestedField'],
        where: { 
          collegeName: college.name,
          interestedField: { not: null }
        },
        _count: { interestedField: true }
      });
      
      // Get recent registrations (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentRegistrations = await prisma.student.count({
        where: {
          collegeName: college.name,
          createdAt: { gte: thirtyDaysAgo }
        }
      });
      
      return {
        totalStudents,
        activeStudents,
        recentRegistrations,
        fieldDistribution,
        campusCount: await prisma.college_campuses.count({ where: { college_id: collegeId } })
      };
    } catch (error) {
      throw new Error(`Failed to get college statistics: ${error.message}`);
    }
  }

  // =============================================
  // FUTURE EXTENSIBILITY - PLACEHOLDER METHODS
  // =============================================
  // These methods are prepared for when college profile section tables are added
  
  async getCollegeAbout(collegeId) {
    // Placeholder for college_about table when implemented
    return { message: 'College about section not yet implemented in database schema' };
  }

  async getCollegeDepartments(collegeId) {
    // Placeholder for college_departments table when implemented
    return { message: 'College departments section not yet implemented in database schema' };
  }

  async getCollegeFaculty(collegeId) {
    // Placeholder for college_faculty table when implemented
    return { message: 'College faculty section not yet implemented in database schema' };
  }

  async getCollegePrograms(collegeId) {
    // Placeholder for college_programs table when implemented
    return { message: 'College programs section not yet implemented in database schema' };
  }

  async getCollegeAchievements(collegeId) {
    // Placeholder for college_achievements table when implemented
    return { message: 'College achievements section not yet implemented in database schema' };
  }

  async getCollegeFacilities(collegeId) {
    // Placeholder for college_facilities table when implemented
    return { message: 'College facilities section not yet implemented in database schema' };
  }

  // =============================================
  // COMPLETE COLLEGE PROFILE
  // =============================================
  
  async getCompleteCollegeProfile(collegeId) {
    try {
      const [
        basicProfile,
        campuses,
        statistics,
        students
      ] = await Promise.all([
        this.getCollegeProfile(collegeId),
        this.getCollegeCampuses(collegeId),
        this.getCollegeStatistics(collegeId),
        this.getCollegeStudents(collegeId, 10, 0) // Get first 10 students
      ]);
      
      return {
        profile: basicProfile,
        campuses,
        statistics,
        recentStudents: students.students,
        // Placeholder sections for future implementation
        about: await this.getCollegeAbout(collegeId),
        departments: await this.getCollegeDepartments(collegeId),
        faculty: await this.getCollegeFaculty(collegeId),
        programs: await this.getCollegePrograms(collegeId),
        achievements: await this.getCollegeAchievements(collegeId),
        facilities: await this.getCollegeFacilities(collegeId)
      };
    } catch (error) {
      throw new Error(`Failed to get complete college profile: ${error.message}`);
    }
  }

  // =============================================
  // UTILITY METHODS
  // =============================================
  
  async getCollegeProfileSummary(collegeId) {
    try {
      const [
        basicProfile,
        campusCount,
        studentCount
      ] = await Promise.all([
        this.getCollegeProfile(collegeId),
        prisma.college_campuses.count({ where: { college_id: collegeId } }),
        this.getCollegeStatistics(collegeId).then(stats => stats.totalStudents)
      ]);
      
      // Calculate profile completion
      const profileFields = [
        'description', 'location', 'established', 'accreditation',
        'website', 'logoUrl', 'totalStudents', 'totalFaculty'
      ];
      
      const completedFields = profileFields.filter(field => 
        basicProfile && basicProfile[field] !== null && basicProfile[field] !== ''
      ).length;
      
      const completionPercentage = Math.round((completedFields / profileFields.length) * 100);
      
      return {
        profileCompletion: completionPercentage,
        totalCampuses: campusCount,
        totalStudents: studentCount,
        isVerified: basicProfile?.isEmailVerified || false,
        lastLogin: basicProfile?.lastLogin
      };
    } catch (error) {
      throw new Error(`Failed to get college profile summary: ${error.message}`);
    }
  }
}

module.exports = new CollegeProfileService();
