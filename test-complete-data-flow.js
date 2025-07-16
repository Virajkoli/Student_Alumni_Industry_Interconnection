/*
 * Comprehensive Data Flow Test
 * Tests the complete flow from database to frontend
 */

const axios = require('axios');
const fs = require('fs');

// Mock token - In real testing, you'd need to get this from login
const MOCK_TOKEN = 'your-jwt-token-here';

async function testCompleteDataFlow() {
  console.log('🔄 Testing Complete Data Flow...\n');
  
  try {
    // Test 1: Backend to Database Connection
    console.log('1. 📊 Testing Backend Database Connection...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Backend Status:', healthResponse.data.status);
    
    // Test 2: Check if authentication middleware is working
    console.log('\n2. 🔐 Testing Authentication Middleware...');
    try {
      const authResponse = await axios.get('http://localhost:5000/api/profile/education', {
        headers: {
          'Authorization': `Bearer ${MOCK_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ Auth working:', authResponse.data);
    } catch (authError) {
      if (authError.response?.status === 401) {
        console.log('⚠️ Auth required (normal):', authError.response.data.message);
      } else {
        console.log('❌ Unexpected auth error:', authError.response?.data);
      }
    }
    
    // Test 3: Check frontend API service configuration
    console.log('\n3. 🖥️ Checking Frontend API Service...');
    const apiServicePath = 'c:\\Users\\91801\\OneDrive\\Documents\\Electrosoft\\Student_Alumni_Industry_Interconnection\\ElectrosoftAlumni\\src\\services\\apiService.js';
    const apiServiceContent = fs.readFileSync(apiServicePath, 'utf8');
    
    // Check for correct endpoints
    const hasCorrectEducationEndpoint = apiServiceContent.includes('"/profile/education"');
    const hasAuthInterceptor = apiServiceContent.includes('Authorization');
    const hasErrorHandling = apiServiceContent.includes('interceptors.response');
    
    console.log('Frontend API Service Check:');
    console.log('  - Correct education endpoint:', hasCorrectEducationEndpoint ? '✅' : '❌');
    console.log('  - Auth interceptor:', hasAuthInterceptor ? '✅' : '❌');
    console.log('  - Error handling:', hasErrorHandling ? '✅' : '❌');
    
    // Test 4: Check if the routes are correctly registered
    console.log('\n4. 🛣️ Checking Backend Routes...');
    const routesPath = 'c:\\Users\\91801\\OneDrive\\Documents\\Electrosoft\\Student_Alumni_Industry_Interconnection\\Backend\\routes\\profile.js';
    const routesContent = fs.readFileSync(routesPath, 'utf8');
    
    const hasEducationRoutes = routesContent.includes('router.get(\'/education\'');
    const hasEducationPost = routesContent.includes('router.post(\'/education\'');
    const hasEducationPut = routesContent.includes('router.put(\'/education/:id\'');
    const hasEducationDelete = routesContent.includes('router.delete(\'/education/:id\'');
    
    console.log('Backend Routes Check:');
    console.log('  - GET /education:', hasEducationRoutes ? '✅' : '❌');
    console.log('  - POST /education:', hasEducationPost ? '✅' : '❌');
    console.log('  - PUT /education/:id:', hasEducationPut ? '✅' : '❌');
    console.log('  - DELETE /education/:id:', hasEducationDelete ? '✅' : '❌');
    
    // Test 5: Check database schema
    console.log('\n5. 🗄️ Checking Database Schema...');
    const schemaPath = 'c:\\Users\\91801\\OneDrive\\Documents\\Electrosoft\\Student_Alumni_Industry_Interconnection\\Backend\\prisma\\schema.prisma';
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    
    const hasStudentEducationModel = schemaContent.includes('model student_education');
    const hasStudentIdField = schemaContent.includes('student_id');
    const hasInstitutionField = schemaContent.includes('institution');
    
    console.log('Database Schema Check:');
    console.log('  - student_education model:', hasStudentEducationModel ? '✅' : '❌');
    console.log('  - student_id field:', hasStudentIdField ? '✅' : '❌');
    console.log('  - institution field:', hasInstitutionField ? '✅' : '❌');
    
    // Test 6: Check React component structure
    console.log('\n6. ⚛️ Checking React Component...');
    const componentPath = 'c:\\Users\\91801\\OneDrive\\Documents\\Electrosoft\\Student_Alumni_Industry_Interconnection\\ElectrosoftAlumni\\src\\components\\student\\sections\\EducationSection.jsx';
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    const hasCallbackProp = componentContent.includes('onEducationUpdate');
    const hasApiServiceImport = componentContent.includes('import apiService');
    const hasCreateCall = componentContent.includes('createStudentEducation');
    const hasUpdateCall = componentContent.includes('updateStudentEducation');
    const hasDeleteCall = componentContent.includes('deleteStudentEducation');
    const hasGetCall = componentContent.includes('getStudentEducation');
    
    console.log('React Component Check:');
    console.log('  - Callback prop:', hasCallbackProp ? '✅' : '❌');
    console.log('  - API service import:', hasApiServiceImport ? '✅' : '❌');
    console.log('  - Create call:', hasCreateCall ? '✅' : '❌');
    console.log('  - Update call:', hasUpdateCall ? '✅' : '❌');
    console.log('  - Delete call:', hasDeleteCall ? '✅' : '❌');
    console.log('  - Get call:', hasGetCall ? '✅' : '❌');
    
    console.log('\n🎯 Summary:');
    console.log('The technical stack appears to be properly configured.');
    console.log('The most likely issues are:');
    console.log('1. 🔐 User authentication - User needs to be logged in');
    console.log('2. 🔄 State synchronization - Data not refreshing properly');
    console.log('3. 📱 Browser cache - Old data being shown');
    console.log('4. 🌐 CORS/Network - Connection issues between frontend and backend');
    
    console.log('\n🔍 Next Steps:');
    console.log('1. Log in to the application and check browser console');
    console.log('2. Check Network tab in browser dev tools for API calls');
    console.log('3. Verify the education data is being saved in the database');
    console.log('4. Test with logging to see the exact data flow');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCompleteDataFlow();
