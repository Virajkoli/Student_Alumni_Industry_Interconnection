const prisma = require('../config/prisma');

/**
 * College Profile Service
 * Service for college profile management and related operations
 * Now includes all college profile section tables
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
  // COMPREHENSIVE COLLEGE INFORMATION
  // =============================================
  
  async getCollegeInformation(collegeId) {
    try {
      const college = await prisma.college.findUnique({
        where: { id: collegeId },
        include: {
          about: true,
          college_campuses_new: true,
          departments: true,
          faculty: true,
          programs: true,
          alumni: true,
          events: true,
          facilities: true,
          placements: true,
          rankings: true,
          admissions: true,
          achievements: true,
          affiliations: true,
          certifications: true,
          history: true,
          research: true,
          college_courses: true,
          college_downloads: true,
          college_fees: true,
          college_hostels: true,
          college_reviews: true
        }
      });
      
      if (!college) {
        throw new Error('College not found');
      }
      
      // Transform data to match frontend expectations
      const transformedData = {
        id: college.id,
        name: college.name,
        overview: college.about?.[0]?.overview || college.description || '',
        website: college.website || '',
        verified: college.isEmailVerified || false,
        verifiedDate: college.isEmailVerified ? college.updatedAt : null,
        establishmentYear: college.established || '',
        location: college.location || '',
        collegeType: 'Public University', // Default, could be made configurable
        totalStudents: college.totalStudents || '',
        faculty: college.totalFaculty || '',
        accreditation: college.accreditation || '',
        nirfRank: college.nirfRank || '',
        specialties: [],
        customFields: [],
        campuses: college.college_campuses_new || [],
        departments: college.departments || [],
        facultyMembers: college.faculty || [],
        programs: college.programs || [],
        alumni: college.alumni || [],
        events: college.events || [],
        facilities: college.facilities || [],
        placements: college.placements || [],
        rankings: college.rankings || [],
        admissions: college.admissions || [],
        achievements: college.achievements || [],
        affiliations: college.affiliations || [],
        certifications: college.certifications || [],
        history: college.history || [],
        research: college.research || []
      };
      
      return transformedData;
    } catch (error) {
      throw new Error(`Failed to get college information: ${error.message}`);
    }
  }

  async updateCollegeInformation(collegeId, informationData) {
    try {
      const {
        overview, website, establishmentYear, location, collegeType,
        totalStudents, faculty, accreditation, nirfRank, specialties,
        customFields, ...otherData
      } = informationData;
      
      // Helper function to safely parse integers
      const safeParseInt = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
      };
      
      // Update main college record
      const updatedCollege = await prisma.college.update({
        where: { id: collegeId },
        data: {
          description: overview || null,
          website: website || null,
          established: safeParseInt(establishmentYear),
          location: location || null,
          totalStudents: safeParseInt(totalStudents),
          totalFaculty: safeParseInt(faculty),
          accreditation: accreditation || null,
          nirfRank: safeParseInt(nirfRank),
          updatedAt: new Date()
        }
      });

      // Update about section
      if (overview) {
        await prisma.college_about.upsert({
          where: { college_id: collegeId },
          update: { overview },
          create: { college_id: collegeId, overview }
        });
      }

      return this.getCollegeInformation(collegeId);
    } catch (error) {
      throw new Error(`Failed to update college information: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE ABOUT SECTION
  // =============================================
  
  async getCollegeAbout(collegeId) {
    try {
      const about = await prisma.college_about.findFirst({
        where: { college_id: collegeId }
      });
      return about || {};
    } catch (error) {
      throw new Error(`Failed to get college about: ${error.message}`);
    }
  }

  async updateCollegeAbout(collegeId, aboutData) {
    try {
      const { mission, vision, values, overview } = aboutData;
      
      const about = await prisma.college_about.upsert({
        where: { college_id: collegeId },
        update: { mission, vision, values, overview },
        create: { college_id: collegeId, mission, vision, values, overview }
      });
      
      return about;
    } catch (error) {
      throw new Error(`Failed to update college about: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE DEPARTMENTS
  // =============================================
  
  async getCollegeDepartments(collegeId) {
    try {
      const departments = await prisma.college_departments.findMany({
        where: { college_id: collegeId },
        orderBy: { name: 'asc' }
      });
      return departments;
    } catch (error) {
      throw new Error(`Failed to get college departments: ${error.message}`);
    }
  }

  async createCollegeDepartment(collegeId, departmentData) {
    try {
      const department = await prisma.college_departments.create({
        data: {
          college_id: collegeId,
          ...departmentData
        }
      });
      return department;
    } catch (error) {
      throw new Error(`Failed to create college department: ${error.message}`);
    }
  }

  async updateCollegeDepartment(departmentId, collegeId, departmentData) {
    try {
      const department = await prisma.college_departments.update({
        where: { 
          id: departmentId,
          college_id: collegeId 
        },
        data: departmentData
      });
      return department;
    } catch (error) {
      throw new Error(`Failed to update college department: ${error.message}`);
    }
  }

  async deleteCollegeDepartment(departmentId, collegeId) {
    try {
      await prisma.college_departments.delete({
        where: { 
          id: departmentId,
          college_id: collegeId 
        }
      });
      return { message: 'Department deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete college department: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE FACULTY
  // =============================================
  
  async getCollegeFaculty(collegeId) {
    try {
      const faculty = await prisma.college_faculty.findMany({
        where: { college_id: collegeId },
        orderBy: { name: 'asc' }
      });
      return faculty;
    } catch (error) {
      throw new Error(`Failed to get college faculty: ${error.message}`);
    }
  }

  async createCollegeFaculty(collegeId, facultyData) {
    try {
      const faculty = await prisma.college_faculty.create({
        data: {
          college_id: collegeId,
          ...facultyData
        }
      });
      return faculty;
    } catch (error) {
      throw new Error(`Failed to create college faculty: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE PROGRAMS
  // =============================================
  
  async getCollegePrograms(collegeId) {
    try {
      const programs = await prisma.college_programs.findMany({
        where: { college_id: collegeId },
        orderBy: { name: 'asc' }
      });
      return programs;
    } catch (error) {
      throw new Error(`Failed to get college programs: ${error.message}`);
    }
  }

  async createCollegeProgram(collegeId, programData) {
    try {
      const program = await prisma.college_programs.create({
        data: {
          college_id: collegeId,
          ...programData
        }
      });
      return program;
    } catch (error) {
      throw new Error(`Failed to create college program: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE ALUMNI
  // =============================================
  
  async getCollegeAlumni(collegeId) {
    try {
      const alumni = await prisma.college_alumni.findMany({
        where: { college_id: collegeId },
        orderBy: { graduation_year: 'desc' }
      });
      return alumni;
    } catch (error) {
      throw new Error(`Failed to get college alumni: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE EVENTS
  // =============================================
  
  async getCollegeEvents(collegeId) {
    try {
      const events = await prisma.college_events.findMany({
        where: { college_id: collegeId },
        orderBy: { start_date: 'desc' }
      });
      return events;
    } catch (error) {
      throw new Error(`Failed to get college events: ${error.message}`);
    }
  }

  async createCollegeEvent(collegeId, eventData) {
    try {
      const event = await prisma.college_events.create({
        data: {
          college_id: collegeId,
          ...eventData
        }
      });
      return event;
    } catch (error) {
      throw new Error(`Failed to create college event: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE FACILITIES
  // =============================================
  
  async getCollegeFacilities(collegeId) {
    try {
      const facilities = await prisma.college_facilities.findMany({
        where: { college_id: collegeId },
        orderBy: { name: 'asc' }
      });
      return facilities;
    } catch (error) {
      throw new Error(`Failed to get college facilities: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE PLACEMENTS
  // =============================================
  
  async getCollegePlacements(collegeId) {
    try {
      const placements = await prisma.college_placements.findMany({
        where: { college_id: collegeId },
        orderBy: { academic_year: 'desc' }
      });
      return placements;
    } catch (error) {
      throw new Error(`Failed to get college placements: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE RANKINGS
  // =============================================
  
  async getCollegeRankings(collegeId) {
    try {
      const rankings = await prisma.college_rankings.findMany({
        where: { college_id: collegeId },
        orderBy: { year: 'desc' }
      });
      return rankings;
    } catch (error) {
      throw new Error(`Failed to get college rankings: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE ADMISSIONS
  // =============================================
  
  async getCollegeAdmissions(collegeId) {
    try {
      const admissions = await prisma.college_admissions.findMany({
        where: { college_id: collegeId },
        orderBy: { academic_year: 'desc' }
      });
      return admissions;
    } catch (error) {
      throw new Error(`Failed to get college admissions: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE CAMPUSES (with Map Location Support)
  // =============================================
  
  async getCollegeCampuses(collegeId) {
    try {
      const campuses = await prisma.college_campuses_new.findMany({
        where: { college_id: collegeId },
        orderBy: { is_main_campus: 'desc' } // Main campus first
      });
      return campuses;
    } catch (error) {
      throw new Error(`Failed to get college campuses: ${error.message}`);
    }
  }

  async createCollegeCampus(collegeId, campusData) {
    try {
      const {
        name, type = 'Campus', address, city, state, country, pincode,
        student_count, faculty_count, area_acres, latitude, longitude,
        dean, dean_email, contact_number, image_url, facilities = [],
        departments = [], is_main_campus = false
      } = campusData;
      
      const campus = await prisma.college_campuses_new.create({
        data: {
          college_id: collegeId,
          name,
          type,
          address,
          city,
          state,
          country,
          pincode,
          student_count: student_count ? parseInt(student_count) : null,
          faculty_count: faculty_count ? parseInt(faculty_count) : null,
          area_acres: area_acres ? parseFloat(area_acres) : null,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          dean,
          dean_email,
          contact_number,
          image_url,
          facilities,
          departments,
          is_main_campus: Boolean(is_main_campus),
          is_active: true
        }
      });
      return campus;
    } catch (error) {
      throw new Error(`Failed to create college campus: ${error.message}`);
    }
  }

  async updateCollegeCampus(campusId, collegeId, campusData) {
    try {
      const {
        name, type, address, city, state, country, pincode,
        student_count, faculty_count, area_acres, latitude, longitude,
        dean, dean_email, contact_number, image_url, facilities,
        departments, is_main_campus, is_active
      } = campusData;
      
      const campus = await prisma.college_campuses_new.updateMany({
        where: { id: parseInt(campusId), college_id: collegeId },
        data: {
          name,
          type,
          address,
          city,
          state,
          country,
          pincode,
          student_count: student_count ? parseInt(student_count) : null,
          faculty_count: faculty_count ? parseInt(faculty_count) : null,
          area_acres: area_acres ? parseFloat(area_acres) : null,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          dean,
          dean_email,
          contact_number,
          image_url,
          facilities: facilities || [],
          departments: departments || [],
          is_main_campus: Boolean(is_main_campus),
          is_active: is_active !== undefined ? Boolean(is_active) : true,
          updated_at: new Date()
        }
      });
      
      if (campus.count === 0) {
        throw new Error('Campus not found or unauthorized');
      }
      
      // Return the updated campus
      const updatedCampus = await prisma.college_campuses_new.findFirst({
        where: { id: parseInt(campusId), college_id: collegeId }
      });
      return updatedCampus;
    } catch (error) {
      throw new Error(`Failed to update college campus: ${error.message}`);
    }
  }

  async deleteCollegeCampus(campusId, collegeId) {
    try {
      const campus = await prisma.college_campuses_new.deleteMany({
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

  // Campus location and map methods
  async updateCampusLocation(campusId, collegeId, locationData) {
    try {
      const { latitude, longitude, address, city, state, country, pincode } = locationData;
      
      const campus = await prisma.college_campuses_new.updateMany({
        where: { id: parseInt(campusId), college_id: collegeId },
        data: {
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          address: address || undefined,
          city: city || undefined,
          state: state || undefined,
          country: country || undefined,
          pincode: pincode || undefined,
          updated_at: new Date()
        }
      });
      
      if (campus.count === 0) {
        throw new Error('Campus not found or unauthorized');
      }
      
      return await prisma.college_campuses_new.findFirst({
        where: { id: parseInt(campusId), college_id: collegeId }
      });
    } catch (error) {
      throw new Error(`Failed to update campus location: ${error.message}`);
    }
  }

  async getCampusesWithLocations(collegeId) {
    try {
      const campuses = await prisma.college_campuses_new.findMany({
        where: { 
          college_id: collegeId,
          is_active: true,
          latitude: { not: null },
          longitude: { not: null }
        },
        orderBy: { is_main_campus: 'desc' },
        select: {
          id: true,
          name: true,
          type: true,
          address: true,
          city: true,
          state: true,
          country: true,
          latitude: true,
          longitude: true,
          is_main_campus: true,
          student_count: true,
          faculty_count: true,
          image_url: true
        }
      });
      return campuses;
    } catch (error) {
      throw new Error(`Failed to get campuses with locations: ${error.message}`);
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

module.exports = CollegeProfileService;
module.exports.CollegeProfileService = CollegeProfileService;
