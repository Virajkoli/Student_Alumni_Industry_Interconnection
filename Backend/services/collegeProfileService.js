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
          college_information_new: true,
          college_admissions_new: true,
          college_academics_new: true,
          college_infrastructure_new: true,
          college_activities_new: true,
          college_placements_new: true,
          college_contact_new: true,
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
        overview: college.college_information_new?.overview || college.about?.[0]?.overview || college.description || '',
        website: college.college_information_new?.website || college.website || '',
        verified: college.isEmailVerified || false,
        verifiedDate: college.isEmailVerified ? college.updatedAt : null,
        establishmentYear: college.college_information_new?.establishment_year || college.established || '',
        location: college.location || '',
        collegeType: college.college_information_new?.college_type || 'Public University',
        totalStudents: college.totalStudents || '',
        faculty: college.totalFaculty || '',
        accreditation: college.college_information_new?.accreditation || college.accreditation || '',
        nirfRank: college.college_information_new?.nirf_rank || college.nirfRank || '',
        specialties: college.college_information_new?.specialties || [],
        customFields: college.college_information_new?.custom_fields || [],
        highlights: college.college_information_new?.highlights || [],
        programsOffered: college.college_information_new?.programs_offered || [],
        dualPrograms: college.college_information_new?.dual_programs || [],
        // New section data
        informationData: college.college_information_new || {},
        admissionsData: college.college_admissions_new || [],
        academicsData: college.college_academics_new || [],
        infrastructureData: college.college_infrastructure_new || {},
        activitiesData: college.college_activities_new || [],
        placementsData: college.college_placements_new || [],
        contactData: college.college_contact_new || {},
        // Legacy data
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

  async updateCollegeEvents(collegeId, eventsData) {
    try {
      // Handle both array and object input
      if (Array.isArray(eventsData)) {
        // Bulk update: delete existing and create new
        await prisma.college_events.deleteMany({
          where: { college_id: collegeId }
        });

        const events = await Promise.all(
          eventsData.map(eventData => 
            prisma.college_events.create({
              data: {
                college_id: collegeId,
                ...eventData
              }
            })
          )
        );
        return events;
      } else {
        // Single event update
        return await this.createCollegeEvent(collegeId, eventsData);
      }
    } catch (error) {
      throw new Error(`Failed to update college events: ${error.message}`);
    }
  }

  async updateCollegeEvent(eventId, collegeId, eventData) {
    try {
      const event = await prisma.college_events.update({
        where: { 
          id: eventId,
          college_id: collegeId // Ensure the event belongs to this college
        },
        data: eventData
      });
      return event;
    } catch (error) {
      throw new Error(`Failed to update college event: ${error.message}`);
    }
  }

  async deleteCollegeEvent(eventId, collegeId) {
    try {
      await prisma.college_events.delete({
        where: { 
          id: eventId,
          college_id: collegeId // Ensure the event belongs to this college
        }
      });
    } catch (error) {
      throw new Error(`Failed to delete college event: ${error.message}`);
    }
  }

  // =============================================
  // COLLEGE ALUMNI (Updated with CRUD operations)
  // =============================================
  
  async updateCollegeAlumni(collegeId, alumniData) {
    try {
      // Handle both array and object input
      if (Array.isArray(alumniData)) {
        // Bulk update: delete existing and create new
        await prisma.college_alumni.deleteMany({
          where: { college_id: collegeId }
        });

        const alumni = await Promise.all(
          alumniData.map(alumniRecord => 
            prisma.college_alumni.create({
              data: {
                college_id: collegeId,
                ...alumniRecord
              }
            })
          )
        );
        return alumni;
      } else {
        // Single alumni record update
        return await this.createCollegeAlumni(collegeId, alumniData);
      }
    } catch (error) {
      throw new Error(`Failed to update college alumni: ${error.message}`);
    }
  }

  async createCollegeAlumni(collegeId, alumniData) {
    try {
      const alumni = await prisma.college_alumni.create({
        data: {
          college_id: collegeId,
          ...alumniData
        }
      });
      return alumni;
    } catch (error) {
      throw new Error(`Failed to create college alumni: ${error.message}`);
    }
  }

  async deleteCollegeAlumni(alumniId, collegeId) {
    try {
      await prisma.college_alumni.delete({
        where: { 
          id: alumniId,
          college_id: collegeId // Ensure the alumni belongs to this college
        }
      });
    } catch (error) {
      throw new Error(`Failed to delete college alumni: ${error.message}`);
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
      
      // Helper function to safely parse numbers
      const safeParseFloat = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
      };
      
      const safeParseInt = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
      };
      
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
          student_count: safeParseInt(student_count),
          faculty_count: safeParseInt(faculty_count),
          area_acres: safeParseFloat(area_acres),
          latitude: safeParseFloat(latitude),
          longitude: safeParseFloat(longitude),
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
      
      // Helper function to safely parse numbers
      const safeParseFloat = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
      };
      
      const safeParseInt = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
      };
      
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
          student_count: safeParseInt(student_count),
          faculty_count: safeParseInt(faculty_count),
          area_acres: safeParseFloat(area_acres),
          latitude: safeParseFloat(latitude),
          longitude: safeParseFloat(longitude),
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
      
      // Helper function to safely parse floats
      const safeParseFloat = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
      };
      
      const campus = await prisma.college_campuses_new.updateMany({
        where: { id: parseInt(campusId), college_id: collegeId },
        data: {
          latitude: safeParseFloat(latitude),
          longitude: safeParseFloat(longitude),
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
  // BULK CAMPUS OPERATIONS
  // =============================================
  
  async updateCollegeCampuses(collegeId, campusesData) {
    try {
      if (!Array.isArray(campusesData)) {
        throw new Error('Campuses data must be an array');
      }

      const results = [];
      
      for (const campusData of campusesData) {
        if (campusData.id) {
          // Update existing campus
          const updatedCampus = await this.updateCollegeCampus(campusData.id, collegeId, campusData);
          results.push(updatedCampus);
        } else {
          // Create new campus
          const newCampus = await this.createCollegeCampus(collegeId, campusData);
          results.push(newCampus);
        }
      }
      
      return results;
    } catch (error) {
      throw new Error(`Failed to update college campuses: ${error.message}`);
    }
  }

  // =============================================
  // NEW COLLEGE PROFILE SECTIONS
  // =============================================
  
  // COLLEGE INFORMATION SECTION (NEW)
  async getCollegeInformationNew(collegeId) {
    try {
      const information = await prisma.college_information_new.findUnique({
        where: { college_id: collegeId }
      });
      return information || {};
    } catch (error) {
      throw new Error(`Failed to get college information: ${error.message}`);
    }
  }

  async updateCollegeInformationNew(collegeId, informationData) {
    try {
      const {
        overview, website, establishment_year, college_type, accreditation,
        nirf_rank, specialties, custom_fields, highlights, programs_offered, dual_programs
      } = informationData;
      
      const information = await prisma.college_information_new.upsert({
        where: { college_id: collegeId },
        update: {
          overview,
          website,
          establishment_year: establishment_year ? parseInt(establishment_year) : null,
          college_type,
          accreditation,
          nirf_rank: nirf_rank ? parseInt(nirf_rank) : null,
          specialties: specialties || [],
          custom_fields: custom_fields || {},
          highlights: highlights || [],
          programs_offered: programs_offered || [],
          dual_programs: dual_programs || [],
          updated_at: new Date()
        },
        create: {
          college_id: collegeId,
          overview,
          website,
          establishment_year: establishment_year ? parseInt(establishment_year) : null,
          college_type,
          accreditation,
          nirf_rank: nirf_rank ? parseInt(nirf_rank) : null,
          specialties: specialties || [],
          custom_fields: custom_fields || {},
          highlights: highlights || [],
          programs_offered: programs_offered || [],
          dual_programs: dual_programs || []
        }
      });
      
      return information;
    } catch (error) {
      throw new Error(`Failed to update college information: ${error.message}`);
    }
  }

  // COLLEGE ADMISSIONS SECTION (NEW)
  async getCollegeAdmissionsNew(collegeId) {
    try {
      const admissions = await prisma.college_admissions_new.findMany({
        where: { college_id: collegeId },
        orderBy: { course_name: 'asc' }
      });
      return admissions;
    } catch (error) {
      throw new Error(`Failed to get college admissions: ${error.message}`);
    }
  }

  async createCollegeAdmission(collegeId, admissionData) {
    try {
      const admission = await prisma.college_admissions_new.create({
        data: {
          college_id: collegeId,
          ...admissionData,
          application_fee: admissionData.application_fee ? parseFloat(admissionData.application_fee) : null,
          total_seats: admissionData.total_seats ? parseInt(admissionData.total_seats) : null,
          required_documents: admissionData.required_documents || []
        }
      });
      return admission;
    } catch (error) {
      throw new Error(`Failed to create college admission: ${error.message}`);
    }
  }

  async updateCollegeAdmissions(collegeId, admissionsData) {
    try {
      // This method handles bulk update of admissions data
      // It can be used to save all admission form data at once
      
      // First, get existing admissions to compare
      const existingAdmissions = await prisma.college_admissions_new.findMany({
        where: { college_id: collegeId }
      });

      const results = [];

      // Handle array of admissions or convert single admission data
      const admissions = Array.isArray(admissionsData) ? admissionsData : [admissionsData];

      for (const admissionData of admissions) {
        if (admissionData.id) {
          // Update existing admission - filter out fields that shouldn't be updated
          const { id, created_at, updated_at, college_id, colleges, ...updateData } = admissionData;
          
          const updatedAdmission = await prisma.college_admissions_new.update({
            where: { 
              id: parseInt(admissionData.id),
              college_id: collegeId 
            },
            data: {
              course_name: updateData.course_name,
              degree_type: updateData.degree_type || 'Other',
              duration: updateData.duration || null,
              eligibility_criteria: updateData.eligibility_criteria || null,
              entrance_exam: updateData.entrance_exam || null,
              application_process: updateData.application_process || null,
              application_fee: updateData.application_fee ? parseFloat(updateData.application_fee) : null,
              total_seats: updateData.total_seats ? parseInt(updateData.total_seats) : null,
              admission_url: updateData.admission_url || null,
              application_start: this.safeParseDatetime(updateData.application_start),
              application_end: this.safeParseDatetime(updateData.application_end),
              exam_date: this.safeParseDatetime(updateData.exam_date),
              result_date: this.safeParseDatetime(updateData.result_date),
              required_documents: updateData.required_documents || [],
              reservation_policy: updateData.reservation_policy || null,
              scholarship_info: updateData.scholarship_info || null,
              important_dates: updateData.important_dates || {},
              is_active: updateData.is_active !== undefined ? updateData.is_active : true,
              updated_at: new Date()
            }
          });
          results.push(updatedAdmission);
        } else {
          // Create new admission - filter out id and other non-database fields
          const { id, created_at, updated_at, college_id, colleges, ...createData } = admissionData;
          
          const newAdmission = await prisma.college_admissions_new.create({
            data: {
              colleges: {
                connect: { id: collegeId }
              },
              course_name: createData.course_name,
              degree_type: createData.degree_type || 'Other',
              duration: createData.duration || null,
              eligibility_criteria: createData.eligibility_criteria || null,
              entrance_exam: createData.entrance_exam || null,
              application_process: createData.application_process || null,
              application_fee: createData.application_fee ? parseFloat(createData.application_fee) : null,
              total_seats: createData.total_seats ? parseInt(createData.total_seats) : null,
              admission_url: createData.admission_url || null,
              application_start: this.safeParseDatetime(createData.application_start),
              application_end: this.safeParseDatetime(createData.application_end),
              exam_date: this.safeParseDatetime(createData.exam_date),
              result_date: this.safeParseDatetime(createData.result_date),
              required_documents: createData.required_documents || [],
              reservation_policy: createData.reservation_policy || null,
              scholarship_info: createData.scholarship_info || null,
              important_dates: createData.important_dates || {},
              is_active: createData.is_active !== undefined ? createData.is_active : true
            }
          });
          results.push(newAdmission);
        }
      }

      return results;
    } catch (error) {
      throw new Error(`Failed to update college admissions: ${error.message}`);
    }
  }

  async updateCollegeAdmission(admissionId, collegeId, admissionData) {
    try {
      const updatedAdmission = await prisma.college_admissions_new.update({
        where: { 
          id: admissionId,
          college_id: collegeId 
        },
        data: {
          ...admissionData,
          application_fee: admissionData.application_fee ? parseFloat(admissionData.application_fee) : null,
          total_seats: admissionData.total_seats ? parseInt(admissionData.total_seats) : null,
          required_documents: admissionData.required_documents || [],
          updated_at: new Date()
        }
      });
      return updatedAdmission;
    } catch (error) {
      throw new Error(`Failed to update college admission: ${error.message}`);
    }
  }

  async deleteCollegeAdmission(admissionId, collegeId) {
    try {
      await prisma.college_admissions_new.delete({
        where: { 
          id: admissionId,
          college_id: collegeId 
        }
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete college admission: ${error.message}`);
    }
  }

  // COLLEGE INFRASTRUCTURE SECTION (NEW)
  async getCollegeInfrastructureNew(collegeId) {
    try {
      const infrastructure = await prisma.college_infrastructure_new.findUnique({
        where: { college_id: collegeId }
      });
      return infrastructure || {};
    } catch (error) {
      throw new Error(`Failed to get college infrastructure: ${error.message}`);
    }
  }

  async updateCollegeInfrastructure(collegeId, infrastructureData) {
    try {
      const infrastructure = await prisma.college_infrastructure_new.upsert({
        where: { college_id: collegeId },
        update: {
          ...infrastructureData,
          buildings_count: infrastructureData.buildings_count ? parseInt(infrastructureData.buildings_count) : null,
          classrooms_count: infrastructureData.classrooms_count ? parseInt(infrastructureData.classrooms_count) : null,
          laboratories_count: infrastructureData.laboratories_count ? parseInt(infrastructureData.laboratories_count) : null,
          sports_facilities: infrastructureData.sports_facilities || [],
          security_features: infrastructureData.security_features || [],
          green_initiatives: infrastructureData.green_initiatives || [],
          accessibility: infrastructureData.accessibility || [],
          other_facilities: infrastructureData.other_facilities || [],
          updated_at: new Date()
        },
        create: {
          college_id: collegeId,
          ...infrastructureData,
          buildings_count: infrastructureData.buildings_count ? parseInt(infrastructureData.buildings_count) : null,
          classrooms_count: infrastructureData.classrooms_count ? parseInt(infrastructureData.classrooms_count) : null,
          laboratories_count: infrastructureData.laboratories_count ? parseInt(infrastructureData.laboratories_count) : null,
          sports_facilities: infrastructureData.sports_facilities || [],
          security_features: infrastructureData.security_features || [],
          green_initiatives: infrastructureData.green_initiatives || [],
          accessibility: infrastructureData.accessibility || [],
          other_facilities: infrastructureData.other_facilities || []
        }
      });
      
      return infrastructure;
    } catch (error) {
      throw new Error(`Failed to update college infrastructure: ${error.message}`);
    }
  }

  // COLLEGE CONTACT SECTION (NEW)
  async getCollegeContactNew(collegeId) {
    try {
      const contact = await prisma.college_contact_new.findUnique({
        where: { college_id: collegeId }
      });
      return contact || {};
    } catch (error) {
      throw new Error(`Failed to get college contact: ${error.message}`);
    }
  }

  async updateCollegeContact(collegeId, contactData) {
    try {
      const contact = await prisma.college_contact_new.upsert({
        where: { college_id: collegeId },
        update: {
          ...contactData,
          social_media: contactData.social_media || {},
          updated_at: new Date()
        },
        create: {
          college_id: collegeId,
          ...contactData,
          social_media: contactData.social_media || {}
        }
      });
      
      return contact;
    } catch (error) {
      throw new Error(`Failed to update college contact: ${error.message}`);
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
  // ACADEMICS/COURSES SECTION
  // =============================================
  
  async getCollegeAcademics(collegeId) {
    try {
      const academics = await prisma.college_academics_new.findMany({
        where: { college_id: collegeId },
        orderBy: { created_at: 'desc' }
      });
      
      return {
        success: true,
        data: academics
      };
    } catch (error) {
      throw new Error(`Failed to get college academics: ${error.message}`);
    }
  }

  async createCollegeAcademic(collegeId, academicData) {
    try {
      const {
        course_name,
        degree_type,
        duration,
        total_seats,
        specializations = [],
        curriculum,
        syllabus_url,
        course_structure,
        assessment_method,
        is_active = true
      } = academicData;

      const academic = await prisma.college_academics_new.create({
        data: {
          college_id: collegeId,
          course_name,
          degree_type,
          duration,
          total_seats: total_seats ? parseInt(total_seats) : null,
          specializations,
          curriculum,
          syllabus_url,
          course_structure,
          assessment_method,
          is_active
        }
      });

      return {
        success: true,
        data: academic
      };
    } catch (error) {
      throw new Error(`Failed to create college academic: ${error.message}`);
    }
  }

  async updateCollegeAcademics(collegeId, academicsData) {
    try {
      // First, deactivate all existing academics for this college
      await prisma.college_academics_new.updateMany({
        where: { college_id: collegeId },
        data: { is_active: false }
      });

      // Then create new ones
      const academics = [];
      for (const academicData of academicsData) {
        if (academicData.course_name) { // Only create if course name is provided
          const academic = await prisma.college_academics_new.create({
            data: {
              college_id: collegeId,
              course_name: academicData.course_name,
              degree_type: academicData.degree_type || '',
              duration: academicData.duration || null,
              total_seats: academicData.total_seats ? parseInt(academicData.total_seats) : null,
              specializations: Array.isArray(academicData.specializations) ? academicData.specializations : [],
              curriculum: academicData.curriculum || null,
              syllabus_url: academicData.syllabus_url || null,
              course_structure: academicData.course_structure || null,
              assessment_method: academicData.assessment_method || null,
              is_active: true
            }
          });
          academics.push(academic);
        }
      }

      return {
        success: true,
        data: academics
      };
    } catch (error) {
      throw new Error(`Failed to update college academics: ${error.message}`);
    }
  }

  async deleteCollegeAcademic(academicId) {
    try {
      await prisma.college_academics_new.update({
        where: { id: academicId },
        data: { is_active: false }
      });

      return {
        success: true,
        message: 'Academic record deactivated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to delete college academic: ${error.message}`);
    }
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
  // FEES MANAGEMENT METHODS
  // =============================================

  async getFees(collegeId) {
    try {
      console.log('🔍 Getting fees for college:', collegeId);
      
      const fees = await prisma.college_fees.findMany({
        where: { college_id: collegeId },
        orderBy: { created_at: 'desc' }
      });

      console.log('📋 Found', fees.length, 'fee records');
      if (fees.length > 0) {
        console.log('📊 Sample fee record:', JSON.stringify(fees[0], null, 2));
      }

      // Transform fees data to match frontend structure
      const feesStructure = {
        btech: "",
        mtech: "",
        bsc: "",
        msc: "",
        mba: "",
        phd: "",
        scholarships: [],
        hostel: "",
        mess: "",
        other: "",
        customFees: [],
        customCharges: [],
        customFields: []
      };

      // Track if we found any scholarships in the database
      let hasDbScholarships = false;
      let allCustomCharges = new Map(); // Use Map to avoid duplicates
      let allCustomFields = new Map(); // Use Map to avoid duplicates

      // Process database fees and populate structure
      for (const fee of fees) {
        const courseKey = fee.course_name.toLowerCase().replace(/[^a-z]/g, '');
        
        if (['btech', 'mtech', 'bsc', 'msc', 'mba', 'phd'].includes(courseKey)) {
          feesStructure[courseKey] = `₹${parseFloat(fee.total_fee || fee.tuition_fee || 0).toLocaleString('en-IN')}`;
        } else {
          feesStructure.customFees.push({
            id: fee.id,
            program: fee.course_name,
            amount: `₹${parseFloat(fee.total_fee || fee.tuition_fee || 0).toLocaleString('en-IN')}`
          });
        }

        // Extract hostel and mess fees
        if (fee.hostel_fee) {
          feesStructure.hostel = `₹${parseFloat(fee.hostel_fee).toLocaleString('en-IN')} per year`;
        }
        if (fee.mess_fee) {
          feesStructure.mess = `₹${parseFloat(fee.mess_fee).toLocaleString('en-IN')} per year`;
        }
        if (fee.other_fees) {
          feesStructure.customCharges.push({
            id: `other_${fee.id}`,
            name: "Other Fees",
            amount: `₹${parseFloat(fee.other_fees).toLocaleString('en-IN')}`
          });
        }

        // Extract scholarships if available
        if (fee.scholarships && fee.scholarships.length > 0) {
          hasDbScholarships = true;
          feesStructure.scholarships = [...new Set([...feesStructure.scholarships, ...fee.scholarships])];
        }

        // Extract custom charges and fields from fee_structure JSON
        if (fee.fee_structure) {
          if (fee.fee_structure.customCharges && Array.isArray(fee.fee_structure.customCharges)) {
            fee.fee_structure.customCharges.forEach(charge => {
              if (charge.id && charge.name && charge.amount) {
                allCustomCharges.set(charge.id, charge);
              }
            });
          }
          
          if (fee.fee_structure.customFields && Array.isArray(fee.fee_structure.customFields)) {
            fee.fee_structure.customFields.forEach(field => {
              if (field.id && field.label && field.value) {
                allCustomFields.set(field.id, field);
              }
            });
          }
        }
      }

      // Add unique custom charges and fields to the result
      feesStructure.customCharges.push(...Array.from(allCustomCharges.values()));
      feesStructure.customFields = Array.from(allCustomFields.values());

      console.log('🎯 Final fees structure custom data:');
      console.log('- Custom charges:', feesStructure.customCharges.length);
      console.log('- Custom fields:', feesStructure.customFields.length);
      console.log('- Custom fees:', feesStructure.customFees.length);

      // If no scholarships found in database, provide default ones for new colleges
      if (!hasDbScholarships && fees.length === 0) {
        feesStructure.scholarships = [
          "Merit-based scholarships up to 100% fee waiver",
          "Need-based financial assistance for economically weaker sections",
          "Sports quota scholarships for outstanding athletes",
          "SC/ST/OBC category fee concessions as per government norms",
          "Girl child education support program"
        ];
      }

      return feesStructure;
    } catch (error) {
      throw new Error(`Failed to get college fees: ${error.message}`);
    }
  }

  async updateFees(collegeId, feesData) {
    try {
      console.log('🔄 Updating fees for college:', collegeId);
      console.log('📋 Input fees data:', JSON.stringify(feesData, null, 2));
      
      // Start transaction
      return await prisma.$transaction(async (tx) => {
        // Clear existing fees for this college
        await tx.college_fees.deleteMany({
          where: { college_id: collegeId }
        });

        const feesToCreate = [];
        const currentYear = new Date().getFullYear();
        const academicYear = `${currentYear}-${currentYear + 1}`;

        // Process standard course fees
        const standardCourses = ['btech', 'mtech', 'bsc', 'msc', 'mba', 'phd'];
        const courseNameMap = {
          btech: 'B.Tech',
          mtech: 'M.Tech',
          bsc: 'B.Sc',
          msc: 'M.Sc',
          mba: 'MBA',
          phd: 'Ph.D'
        };

        for (const courseKey of standardCourses) {
          if (feesData[courseKey]) {
            const feeAmount = this.parseNumericValue(feesData[courseKey]);
            if (feeAmount > 0) {
              feesToCreate.push({
                college_id: collegeId,
                course_name: courseNameMap[courseKey],
                degree_type: courseKey.includes('m') || courseKey === 'phd' ? 'Postgraduate' : 'Undergraduate',
                tuition_fee: feeAmount,
                total_fee: feeAmount,
                academic_year: academicYear,
                scholarships: feesData.scholarships || [],
                payment_modes: ['Online', 'Offline'],
                fee_structure: {
                  customCharges: feesData.customCharges || [],
                  customFields: feesData.customFields || []
                },
                created_at: new Date(),
                updated_at: new Date()
              });
            }
          }
        }

        // Process custom fees
        if (feesData.customFees && Array.isArray(feesData.customFees)) {
          for (const customFee of feesData.customFees) {
            if (customFee.program && customFee.amount) {
              const feeAmount = this.parseNumericValue(customFee.amount);
              if (feeAmount > 0) {
                feesToCreate.push({
                  college_id: collegeId,
                  course_name: customFee.program,
                  degree_type: 'Other',
                  tuition_fee: feeAmount,
                  total_fee: feeAmount,
                  academic_year: academicYear,
                  scholarships: feesData.scholarships || [],
                  payment_modes: ['Online', 'Offline'],
                  fee_structure: {
                    customCharges: feesData.customCharges || [],
                    customFields: feesData.customFields || []
                  },
                  created_at: new Date(),
                  updated_at: new Date()
                });
              }
            }
          }
        }

        // Add hostel and mess fees to the first course or create a general entry
        if (feesToCreate.length > 0) {
          if (feesData.hostel) {
            const hostelFee = this.parseNumericValue(feesData.hostel);
            if (hostelFee > 0) {
              feesToCreate[0].hostel_fee = hostelFee;
            }
          }
          if (feesData.mess) {
            const messFee = this.parseNumericValue(feesData.mess);
            if (messFee > 0) {
              feesToCreate[0].mess_fee = messFee;
            }
          }
          if (feesData.other) {
            const otherFee = this.parseNumericValue(feesData.other);
            if (otherFee > 0) {
              feesToCreate[0].other_fees = otherFee;
            }
          }
        } else if (feesData.hostel || feesData.mess || feesData.other) {
          // Create a general entry for accommodation fees if no course fees exist
          feesToCreate.push({
            college_id: collegeId,
            course_name: 'General',
            degree_type: 'Other',
            tuition_fee: 0,
            hostel_fee: feesData.hostel ? this.parseNumericValue(feesData.hostel) : null,
            mess_fee: feesData.mess ? this.parseNumericValue(feesData.mess) : null,
            other_fees: feesData.other ? this.parseNumericValue(feesData.other) : null,
            total_fee: 0,
            academic_year: academicYear,
            scholarships: feesData.scholarships || [],
            payment_modes: ['Online', 'Offline'],
            fee_structure: {
              customCharges: feesData.customCharges || [],
              customFields: feesData.customFields || []
            },
            created_at: new Date(),
            updated_at: new Date()
          });
        }

        // If we have custom charges or custom fields but no course fees, create a minimal entry to store them
        if ((feesData.customCharges && feesData.customCharges.length > 0) || 
            (feesData.customFields && feesData.customFields.length > 0)) {
          if (feesToCreate.length === 0) {
            feesToCreate.push({
              college_id: collegeId,
              course_name: 'General',
              degree_type: 'Other',
              tuition_fee: 0,
              total_fee: 0,
              academic_year: academicYear,
              scholarships: feesData.scholarships || [],
              payment_modes: ['Online', 'Offline'],
              fee_structure: {
                customCharges: feesData.customCharges || [],
                customFields: feesData.customFields || []
              },
              created_at: new Date(),
              updated_at: new Date()
            });
          }
        }

        // Create all fee records
        if (feesToCreate.length > 0) {
          console.log('🚀 Creating fees records:', feesToCreate.length);
          console.log('📊 First record sample:', JSON.stringify(feesToCreate[0], null, 2));
          
          // Validate all numeric fields before creating
          const validatedFeesToCreate = feesToCreate.map(fee => {
            const validatedFee = { ...fee };
            
            // Validate and cap numeric fields
            const numericFields = ['tuition_fee', 'hostel_fee', 'mess_fee', 'other_fees', 'total_fee'];
            numericFields.forEach(field => {
              if (validatedFee[field] !== null && validatedFee[field] !== undefined) {
                if (validatedFee[field] > 99999999.99) {
                  console.warn(`${field} value ${validatedFee[field]} exceeds limit, capping to 99999999.99`);
                  validatedFee[field] = 99999999.99;
                }
                if (validatedFee[field] < 0) {
                  validatedFee[field] = 0;
                }
                // Round to 2 decimal places
                validatedFee[field] = Math.round(validatedFee[field] * 100) / 100;
              }
            });
            
            return validatedFee;
          });
          
          await tx.college_fees.createMany({
            data: validatedFeesToCreate
          });
          
          console.log('✅ Successfully created', validatedFeesToCreate.length, 'fee records');
        } else {
          console.log('⚠️  No fees to create');
        }

        return { message: 'Fees updated successfully' };
      });
    } catch (error) {
      throw new Error(`Failed to update college fees: ${error.message}`);
    }
  }

  // =============================================
  // UTILITY METHODS
  // =============================================
  
  // Helper method to parse numeric values from strings (like currency)
  parseNumericValue(value) {
    if (value === null || value === undefined || value === '') return 0;
    
    // Remove currency symbols, commas, and spaces
    const cleanValue = value.toString()
      .replace(/[₹$£€,\s]/g, '')
      .replace(/[^\d.-]/g, '');
    
    const parsed = parseFloat(cleanValue);
    if (isNaN(parsed)) return 0;
    
    // Ensure the value doesn't exceed PostgreSQL numeric(10,2) limits
    // Maximum value: 99,999,999.99
    const maxValue = 99999999.99;
    if (parsed > maxValue) {
      console.warn(`Value ${parsed} exceeds maximum allowed value ${maxValue}, capping to maximum`);
      return maxValue;
    }
    
    // Ensure minimum value is 0
    return Math.max(0, parsed);
  }

  // Helper method to safely parse dates
  safeParseDatetime(dateValue) {
    if (!dateValue || dateValue === '') return null;
    
    // If it's already a Date object, return it
    if (dateValue instanceof Date) return dateValue;
    
    try {
      // If it's a string, try to parse it
      const date = new Date(dateValue);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) return null;
      
      return date;
    } catch (error) {
      console.warn('Invalid date format:', dateValue, error.message);
      return null;
    }
  }

  // Helper method to safely parse integers
  safeParseInt(value) {
    if (value === null || value === undefined || value === '') return null;
    const parsed = parseInt(value);
    return isNaN(parsed) ? null : parsed;
  }

  // Helper method to safely parse floats
  safeParseFloat(value) {
    if (value === null || value === undefined || value === '') return null;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  
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
