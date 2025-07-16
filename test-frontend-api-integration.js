const axios = require('axios');

// Test if frontend can connect to backend using apiService-like requests
async function testFrontendAPIIntegration() {
  console.log('🧪 Testing Frontend-API Integration...');
  
  const baseURL = 'http://localhost:5000/api';
  
  // Create axios instance similar to apiService
  const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    // Test auth endpoints
    console.log('\n🔐 Testing Auth System...');
    
    // Register test user
    const registerData = {
      name: 'API Test User',
      email: 'apitest@example.com',
      password: 'password123',
      role: 'student'
    };
    
    const registerResponse = await api.post('/auth/register', registerData);
    console.log('✅ Registration works');
    
    const token = registerResponse.data.tokens.accessToken;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    
    // Test profile endpoints (using the same paths as apiService)
    console.log('\n📝 Testing Profile API Endpoints...');
    
    // Test about section
    const aboutData = { summary: 'Test summary for API integration' };
    const aboutResponse = await api.put('/profile/about', aboutData);
    console.log('✅ About endpoint works');
    
    const getAboutResponse = await api.get('/profile/about');
    console.log('✅ Get About endpoint works');
    
    // Test experience section
    const experienceData = {
      title: 'API Test Position',
      company: 'Test Company',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      description: 'Testing API integration'
    };
    
    const createExpResponse = await api.post('/profile/experience', experienceData);
    console.log('✅ Create Experience endpoint works');
    
    const getExpResponse = await api.get('/profile/experience');
    console.log('✅ Get Experiences endpoint works');
    
    // Test other sections quickly
    const sections = [
      'education',
      'skills', 
      'projects',
      'courses',
      'certifications',
      'recommendations'
    ];
    
    for (const section of sections) {
      const getResponse = await api.get(`/profile/${section}`);
      console.log(`✅ Get ${section} endpoint works`);
    }
    
    // Test complete profile
    const completeProfile = await api.get('/profile/complete');
    console.log('✅ Complete profile endpoint works');
    
    const profileSummary = await api.get('/profile/summary');
    console.log('✅ Profile summary endpoint works');
    
    console.log('\n🎉 Frontend-API Integration Test PASSED!');
    console.log('✅ All apiService.js endpoints are working correctly');
    console.log('✅ Authentication flow works');
    console.log('✅ All profile sections are accessible');
    console.log('✅ Data operations (GET/POST/PUT) are functional');
    
  } catch (error) {
    console.error('❌ Frontend-API Integration Test FAILED:', error.response?.data || error.message);
  }
}

// Run the test
testFrontendAPIIntegration();
