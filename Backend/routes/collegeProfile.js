const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const CollegeProfileController = require('../controllers/collegeProfileController');

const collegeProfileController = new CollegeProfileController();

// College basic profile routes
router.get('/profile', auth, collegeProfileController.getProfile);
router.put('/profile', auth, collegeProfileController.updateProfile);

// College comprehensive information routes
router.get('/information', auth, collegeProfileController.getCollegeInformation);
router.get('/information/:collegeId', collegeProfileController.getCollegeInformation);
router.put('/information', auth, collegeProfileController.updateCollegeInformation);

// College sections routes
router.get('/about', auth, collegeProfileController.getAbout);
router.put('/about', auth, collegeProfileController.updateAbout);

router.get('/departments', auth, collegeProfileController.getDepartments);
router.post('/departments', auth, collegeProfileController.createDepartment);
router.put('/departments/:id', auth, collegeProfileController.updateDepartment);
router.delete('/departments/:id', auth, collegeProfileController.deleteDepartment);

router.get('/faculty', auth, collegeProfileController.getFaculty);
router.post('/faculty', auth, collegeProfileController.createFaculty);

router.get('/programs', auth, collegeProfileController.getPrograms);
router.post('/programs', auth, collegeProfileController.createProgram);

router.get('/alumni', auth, collegeProfileController.getAlumni);
router.get('/events', auth, collegeProfileController.getEvents);
router.post('/events', auth, collegeProfileController.createEvent);

router.get('/facilities', auth, collegeProfileController.getFacilities);
router.get('/placements', auth, collegeProfileController.getPlacements);
router.get('/rankings', auth, collegeProfileController.getRankings);
router.get('/admissions', auth, collegeProfileController.getAdmissions);

// College campuses routes (with map location support)
router.get('/campuses', auth, collegeProfileController.getCampuses);
router.post('/campuses', auth, collegeProfileController.createCampus);
router.put('/campuses', auth, collegeProfileController.updateCampuses); // Bulk update
router.put('/campuses/:id', auth, collegeProfileController.updateCampus);
router.delete('/campuses/:id', auth, collegeProfileController.deleteCampus);

// Campus location and map routes
router.put('/campuses/:id/location', auth, collegeProfileController.updateCampusLocation);
router.get('/campuses/locations', auth, collegeProfileController.getCampusesWithLocations);
router.get('/campuses/map/:collegeId', collegeProfileController.getCampusesMap); // Public endpoint

// New college profile sections routes
router.get('/information-new', auth, collegeProfileController.getCollegeInformationNew);
router.put('/information-new', auth, collegeProfileController.updateCollegeInformationNew);

router.get('/admissions-new', auth, collegeProfileController.getCollegeAdmissionsNew);
router.post('/admissions-new', auth, collegeProfileController.createCollegeAdmission);

router.get('/infrastructure-new', auth, collegeProfileController.getCollegeInfrastructureNew);
router.put('/infrastructure-new', auth, collegeProfileController.updateCollegeInfrastructure);

router.get('/contact-new', auth, collegeProfileController.getCollegeContactNew);
router.put('/contact-new', auth, collegeProfileController.updateCollegeContact);

// College academics/courses routes
router.get('/academics', auth, collegeProfileController.getAcademics);
router.post('/academics', auth, collegeProfileController.createAcademic);
router.put('/academics', auth, collegeProfileController.updateAcademics);
router.delete('/academics/:academicId', auth, collegeProfileController.deleteAcademic);

// College students routes (legacy)
router.get('/students', auth, collegeProfileController.getStudents);

module.exports = router;
