const { CollegeProfileService } = require('../services/collegeProfileService');
const collegeProfileService = new CollegeProfileService();

/**
 * College Profile Controller
 * Handles all college profile related operations including sections
 */

class CollegeProfileController {
  
  // =============================================
  // BASIC COLLEGE PROFILE
  // =============================================
  
  async getProfile(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      
      const profile = await collegeProfileService.getCollegeProfile(collegeId);
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'College profile not found'
        });
      }
      
      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Get college profile error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college profile'
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const collegeId = req.user.id;
      const profileData = req.body;
      
      const updatedProfile = await collegeProfileService.updateCollegeProfile(collegeId, profileData);
      
      res.json({
        success: true,
        data: updatedProfile,
        message: 'College profile updated successfully'
      });
    } catch (error) {
      console.error('Update college profile error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update college profile'
      });
    }
  }

  // =============================================
  // COLLEGE INFORMATION (Comprehensive)
  // =============================================

  async getCollegeInformation(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      
      const information = await collegeProfileService.getCollegeInformation(collegeId);
      
      res.json({
        success: true,
        data: information
      });
    } catch (error) {
      console.error('Get college information error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college information'
      });
    }
  }

  async updateCollegeInformation(req, res) {
    try {
      const collegeId = req.user.id;
      const informationData = req.body;
      
      // Validate collegeId
      if (!collegeId || isNaN(parseInt(collegeId))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid college ID'
        });
      }
      
      console.log('Updating college information for ID:', collegeId);
      console.log('Data received:', JSON.stringify(informationData, null, 2));
      
      const updatedInformation = await collegeProfileService.updateCollegeInformation(parseInt(collegeId), informationData);
      
      res.json({
        success: true,
        data: updatedInformation,
        message: 'College information updated successfully'
      });
    } catch (error) {
      console.error('Update college information error:', error);
      console.error('Error stack:', error.stack);
      
      // Check for specific Prisma errors
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'College not found'
        });
      }
      
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update college information'
      });
    }
  }

  // =============================================
  // COLLEGE SECTIONS
  // =============================================

  // About Section
  async getAbout(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const about = await collegeProfileService.getCollegeAbout(collegeId);
      
      res.json({
        success: true,
        data: about
      });
    } catch (error) {
      console.error('Get college about error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college about information'
      });
    }
  }

  async updateAbout(req, res) {
    try {
      const collegeId = req.user.id;
      const aboutData = req.body;
      
      const updatedAbout = await collegeProfileService.updateCollegeAbout(collegeId, aboutData);
      
      res.json({
        success: true,
        data: updatedAbout,
        message: 'College about section updated successfully'
      });
    } catch (error) {
      console.error('Update college about error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update college about section'
      });
    }
  }

  // Departments
  async getDepartments(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const departments = await collegeProfileService.getCollegeDepartments(collegeId);
      
      res.json({
        success: true,
        data: departments
      });
    } catch (error) {
      console.error('Get college departments error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college departments'
      });
    }
  }

  async createDepartment(req, res) {
    try {
      const collegeId = req.user.id;
      const departmentData = req.body;
      
      const newDepartment = await collegeProfileService.createCollegeDepartment(collegeId, departmentData);
      
      res.status(201).json({
        success: true,
        data: newDepartment,
        message: 'Department created successfully'
      });
    } catch (error) {
      console.error('Create department error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create department'
      });
    }
  }

  async updateDepartment(req, res) {
    try {
      const collegeId = req.user.id;
      const departmentId = parseInt(req.params.id);
      const departmentData = req.body;
      
      const updatedDepartment = await collegeProfileService.updateCollegeDepartment(departmentId, collegeId, departmentData);
      
      res.json({
        success: true,
        data: updatedDepartment,
        message: 'Department updated successfully'
      });
    } catch (error) {
      console.error('Update department error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update department'
      });
    }
  }

  async deleteDepartment(req, res) {
    try {
      const collegeId = req.user.id;
      const departmentId = parseInt(req.params.id);
      
      await collegeProfileService.deleteCollegeDepartment(departmentId, collegeId);
      
      res.json({
        success: true,
        message: 'Department deleted successfully'
      });
    } catch (error) {
      console.error('Delete department error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete department'
      });
    }
  }

  // Faculty
  async getFaculty(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const faculty = await collegeProfileService.getCollegeFaculty(collegeId);
      
      res.json({
        success: true,
        data: faculty
      });
    } catch (error) {
      console.error('Get college faculty error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college faculty'
      });
    }
  }

  async createFaculty(req, res) {
    try {
      const collegeId = req.user.id;
      const facultyData = req.body;
      
      const newFaculty = await collegeProfileService.createCollegeFaculty(collegeId, facultyData);
      
      res.status(201).json({
        success: true,
        data: newFaculty,
        message: 'Faculty member added successfully'
      });
    } catch (error) {
      console.error('Create faculty error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to add faculty member'
      });
    }
  }

  // Programs
  async getPrograms(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const programs = await collegeProfileService.getCollegePrograms(collegeId);
      
      res.json({
        success: true,
        data: programs
      });
    } catch (error) {
      console.error('Get college programs error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college programs'
      });
    }
  }

  async createProgram(req, res) {
    try {
      const collegeId = req.user.id;
      const programData = req.body;
      
      const newProgram = await collegeProfileService.createCollegeProgram(collegeId, programData);
      
      res.status(201).json({
        success: true,
        data: newProgram,
        message: 'Program created successfully'
      });
    } catch (error) {
      console.error('Create program error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create program'
      });
    }
  }

  // Alumni
  async getAlumni(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const alumni = await collegeProfileService.getCollegeAlumni(collegeId);
      
      res.json({
        success: true,
        data: alumni
      });
    } catch (error) {
      console.error('Get college alumni error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college alumni'
      });
    }
  }

  // Events
  async getEvents(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const events = await collegeProfileService.getCollegeEvents(collegeId);
      
      res.json({
        success: true,
        data: events
      });
    } catch (error) {
      console.error('Get college events error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college events'
      });
    }
  }

  async createEvent(req, res) {
    try {
      const collegeId = req.user.id;
      const eventData = req.body;
      
      const newEvent = await collegeProfileService.createCollegeEvent(collegeId, eventData);
      
      res.status(201).json({
        success: true,
        data: newEvent,
        message: 'Event created successfully'
      });
    } catch (error) {
      console.error('Create event error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create event'
      });
    }
  }

  // Facilities
  async getFacilities(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const facilities = await collegeProfileService.getCollegeFacilities(collegeId);
      
      res.json({
        success: true,
        data: facilities
      });
    } catch (error) {
      console.error('Get college facilities error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college facilities'
      });
    }
  }

  // Placements
  async getPlacements(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const placements = await collegeProfileService.getCollegePlacements(collegeId);
      
      res.json({
        success: true,
        data: placements
      });
    } catch (error) {
      console.error('Get college placements error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college placements'
      });
    }
  }

  // Rankings
  async getRankings(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const rankings = await collegeProfileService.getCollegeRankings(collegeId);
      
      res.json({
        success: true,
        data: rankings
      });
    } catch (error) {
      console.error('Get college rankings error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college rankings'
      });
    }
  }

  // Admissions
  async getAdmissions(req, res) {
    try {
      const collegeId = parseInt(req.params.collegeId) || req.user.id;
      const admissions = await collegeProfileService.getCollegeAdmissions(collegeId);
      
      res.json({
        success: true,
        data: admissions
      });
    } catch (error) {
      console.error('Get college admissions error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college admissions'
      });
    }
  }

  // =============================================
  // LEGACY ROUTES (From existing service)
  // =============================================
  
  async getCampuses(req, res) {
    try {
      const collegeId = req.user.id;
      const campuses = await collegeProfileService.getCollegeCampuses(collegeId);
      
      res.json({
        success: true,
        data: campuses
      });
    } catch (error) {
      console.error('Get campuses error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college campuses'
      });
    }
  }

  async createCampus(req, res) {
    try {
      const collegeId = req.user.id;
      const campusData = req.body;
      
      const newCampus = await collegeProfileService.createCollegeCampus(collegeId, campusData);
      
      res.status(201).json({
        success: true,
        data: newCampus,
        message: 'Campus created successfully'
      });
    } catch (error) {
      console.error('Create campus error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create campus'
      });
    }
  }

  async updateCampus(req, res) {
    try {
      const collegeId = req.user.id;
      const campusId = parseInt(req.params.id);
      const campusData = req.body;
      
      const updatedCampus = await collegeProfileService.updateCollegeCampus(campusId, collegeId, campusData);
      
      res.json({
        success: true,
        data: updatedCampus,
        message: 'Campus updated successfully'
      });
    } catch (error) {
      console.error('Update campus error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update campus'
      });
    }
  }

  async deleteCampus(req, res) {
    try {
      const collegeId = req.user.id;
      const campusId = parseInt(req.params.id);
      
      await collegeProfileService.deleteCollegeCampus(campusId, collegeId);
      
      res.json({
        success: true,
        message: 'Campus deleted successfully'
      });
    } catch (error) {
      console.error('Delete campus error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete campus'
      });
    }
  }

  async getStudents(req, res) {
    try {
      const collegeId = req.user.id;
      const { limit = 50, offset = 0 } = req.query;
      
      const result = await collegeProfileService.getCollegeStudents(collegeId, parseInt(limit), parseInt(offset));
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Get students error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get college students'
      });
    }
  }

  // =============================================
  // CAMPUS MAP LOCATION METHODS
  // =============================================

  async updateCampusLocation(req, res) {
    try {
      const collegeId = req.user.id;
      const campusId = parseInt(req.params.id);
      const locationData = req.body;
      
      console.log('Updating campus location for campus:', campusId, 'data:', locationData);
      
      const updatedCampus = await collegeProfileService.updateCampusLocation(campusId, collegeId, locationData);
      
      res.json({
        success: true,
        data: updatedCampus,
        message: 'Campus location updated successfully'
      });
    } catch (error) {
      console.error('Update campus location error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update campus location'
      });
    }
  }

  async getCampusesWithLocations(req, res) {
    try {
      const collegeId = req.user.id;
      
      const campuses = await collegeProfileService.getCampusesWithLocations(collegeId);
      
      res.json({
        success: true,
        data: campuses
      });
    } catch (error) {
      console.error('Get campuses with locations error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get campuses with locations'
      });
    }
  }

  async getCampusesMap(req, res) {
    try {
      const { collegeId } = req.params;
      
      // Public endpoint for viewing campus locations
      const campuses = await collegeProfileService.getCampusesWithLocations(parseInt(collegeId));
      
      res.json({
        success: true,
        data: campuses
      });
    } catch (error) {
      console.error('Get campuses map error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get campuses map'
      });
    }
  }
}

module.exports = CollegeProfileController;
