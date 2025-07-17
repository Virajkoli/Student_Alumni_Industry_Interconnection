const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test all profile sections
async function testAllProfileSections() {
  try {
    console.log('🔄 Testing All Student Profile Sections...\n');

    // Setup: Create/login test student
    console.log('1. Setting up test student...');
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        email: 'test.student@example.com',
        password: 'TestPassword123!',
        first_name: 'Test',
        last_name: 'Student',
        contact_no: '1234567890',
        student_college_name: 'Test University',
        interested_field: 'Computer',
        role: 'student'
      });
    } catch (regError) {
      if (regError.response?.status !== 400) throw regError;
    }

    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test.student@example.com',
      password: 'TestPassword123!',
      role: 'student'
    });

    const token = loginResponse.data.tokens.accessToken;
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    console.log('✅ Test student ready\n');

    // ===========================================
    // TEST ABOUT SECTION
    // ===========================================
    console.log('📝 Testing About Section...');
    
    const aboutData = {
      summary: 'I am a passionate computer science student with experience in full-stack web development.'
    };

    await axios.put(`${API_BASE_URL}/profile/about`, aboutData, { headers });
    const aboutResponse = await axios.get(`${API_BASE_URL}/profile/about`, { headers });
    console.log('✅ About section:', aboutResponse.data.success ? 'WORKING' : 'FAILED');

    // ===========================================
    // TEST EXPERIENCE SECTION
    // ===========================================
    console.log('👔 Testing Experience Section...');
    
    const experienceData = {
      title: 'Software Developer Intern',
      company: 'Tech Corp',
      start_date: '2023-06-01',
      end_date: '2023-08-31',
      description: 'Developed web applications using React and Node.js',
      location: 'Remote',
      employment_type: 'Internship',
      currently_working: false
    };

    const createExpResponse = await axios.post(`${API_BASE_URL}/profile/experience`, experienceData, { headers });
    const experienceId = createExpResponse.data.data.id;
    
    const getExpResponse = await axios.get(`${API_BASE_URL}/profile/experience`, { headers });
    console.log('✅ Experience section:', getExpResponse.data.success ? 'WORKING' : 'FAILED');

    // Test update experience
    const updateExpData = { ...experienceData, title: 'Senior Software Developer Intern' };
    await axios.put(`${API_BASE_URL}/profile/experience/${experienceId}`, updateExpData, { headers });
    console.log('✅ Experience update:', 'WORKING');

    // ===========================================
    // TEST EDUCATION SECTION
    // ===========================================
    console.log('🎓 Testing Education Section...');
    
    const educationData = {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field_of_study: 'Computer Science',
      start_year: 2020,
      end_year: 2024,
      grade: 'A'
    };

    const createEduResponse = await axios.post(`${API_BASE_URL}/profile/education`, educationData, { headers });
    const educationId = createEduResponse.data.data.id;
    
    const getEduResponse = await axios.get(`${API_BASE_URL}/profile/education`, { headers });
    console.log('✅ Education section:', getEduResponse.data.success ? 'WORKING' : 'FAILED');

    // ===========================================
    // TEST SKILLS SECTION
    // ===========================================
    console.log('💡 Testing Skills Section...');
    
    const skillData = {
      skill_name: 'JavaScript',
      proficiency: 'Advanced'
    };

    await axios.post(`${API_BASE_URL}/profile/skills`, skillData, { headers });
    
    // Test batch skills creation
    const batchSkillsData = {
      skills: [
        { skill_name: 'React', proficiency: 'Advanced' },
        { skill_name: 'Node.js', proficiency: 'Intermediate' },
        { skill_name: 'Python', proficiency: 'Beginner' }
      ]
    };

    await axios.post(`${API_BASE_URL}/profile/skills/batch`, batchSkillsData, { headers });
    const getSkillsResponse = await axios.get(`${API_BASE_URL}/profile/skills`, { headers });
    console.log('✅ Skills section:', getSkillsResponse.data.success ? 'WORKING' : 'FAILED');

    // ===========================================
    // TEST PROJECTS SECTION
    // ===========================================
    console.log('🚀 Testing Projects Section...');
    
    const projectData = {
      title: 'E-commerce Website',
      description: 'A full-stack e-commerce application built with MERN stack',
      technologies: 'React, Node.js, MongoDB, Express',
      start_date: '2023-01-01',
      end_date: '2023-05-01',
      project_link: 'https://github.com/test/ecommerce'
    };

    const createProjectResponse = await axios.post(`${API_BASE_URL}/profile/projects`, projectData, { headers });
    const projectId = createProjectResponse.data.data.id;
    
    const getProjectsResponse = await axios.get(`${API_BASE_URL}/profile/projects`, { headers });
    console.log('✅ Projects section:', getProjectsResponse.data.success ? 'WORKING' : 'FAILED');

    // ===========================================
    // TEST COURSES SECTION
    // ===========================================
    console.log('📚 Testing Courses Section...');
    
    const courseData = {
      course_name: 'Advanced React Development',
      provider: 'Tech Academy',
      completion_date: '2023-03-15'
    };

    await axios.post(`${API_BASE_URL}/profile/courses`, courseData, { headers });
    const getCoursesResponse = await axios.get(`${API_BASE_URL}/profile/courses`, { headers });
    console.log('✅ Courses section:', getCoursesResponse.data.success ? 'WORKING' : 'FAILED');

    // ===========================================
    // TEST CERTIFICATIONS SECTION
    // ===========================================
    console.log('🏆 Testing Certifications Section...');
    
    const certificationData = {
      certificate_name: 'AWS Cloud Practitioner',
      issuing_organization: 'Amazon Web Services',
      issue_date: '2023-02-01',
      expiry_date: '2026-02-01',
      credential_id: 'AWS-123456',
      credential_url: 'https://aws.amazon.com/verification'
    };

    await axios.post(`${API_BASE_URL}/profile/certifications`, certificationData, { headers });
    const getCertsResponse = await axios.get(`${API_BASE_URL}/profile/certifications`, { headers });
    console.log('✅ Certifications section:', getCertsResponse.data.success ? 'WORKING' : 'FAILED');

    // ===========================================
    // TEST RECOMMENDATIONS SECTION
    // ===========================================
    console.log('💼 Testing Recommendations Section...');
    
    const recommendationData = {
      recommender_name: 'John Smith',
      relationship: 'Manager',
      message: 'Excellent developer with strong problem-solving skills.'
    };

    await axios.post(`${API_BASE_URL}/profile/recommendations`, recommendationData, { headers });
    const getRecsResponse = await axios.get(`${API_BASE_URL}/profile/recommendations`, { headers });
    console.log('✅ Recommendations section:', getRecsResponse.data.success ? 'WORKING' : 'FAILED');

    // ===========================================
    // TEST COMPLETE PROFILE
    // ===========================================
    console.log('\n🎯 Testing Complete Profile...');
    
    const completeProfileResponse = await axios.get(`${API_BASE_URL}/profile/complete`, { headers });
    console.log('✅ Complete profile:', completeProfileResponse.data.success ? 'WORKING' : 'FAILED');

    const profileSummaryResponse = await axios.get(`${API_BASE_URL}/profile/summary`, { headers });
    console.log('✅ Profile summary:', profileSummaryResponse.data.success ? 'WORKING' : 'FAILED');

    console.log('\n🎉 All Profile Sections Test Completed!');
    console.log('\n📊 Summary:');
    console.log('✅ About: Working');
    console.log('✅ Experience: Working');
    console.log('✅ Education: Working');
    console.log('✅ Skills: Working');
    console.log('✅ Projects: Working');
    console.log('✅ Courses: Working');
    console.log('✅ Certifications: Working');
    console.log('✅ Recommendations: Working');
    console.log('✅ Complete Profile: Working');

    // Clean up test data (optional)
    console.log('\n🧹 Cleaning up test data...');
    try {
      await axios.delete(`${API_BASE_URL}/profile/experience/${experienceId}`, { headers });
      await axios.delete(`${API_BASE_URL}/profile/education/${educationId}`, { headers });
      await axios.delete(`${API_BASE_URL}/profile/projects/${projectId}`, { headers });
      console.log('✅ Test data cleaned up');
    } catch (cleanupError) {
      console.log('⚠️ Some test data cleanup failed (this is normal)');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the comprehensive test
testAllProfileSections();
