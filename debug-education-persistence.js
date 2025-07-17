/*
 * Debug test for education persistence issue
 * Tests if the backend is properly saving and retrieving education data
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Mock authentication - you'll need to replace this with actual auth token
const HEADERS = {
  'Content-Type': 'application/json',
  // Add actual auth headers if needed
};

async function testEducationPersistence() {
  console.log('🔍 Testing Education Data Persistence...\n');
  
  try {
    // Test 1: Check if backend is running
    console.log('1. Testing backend connection...');
    const healthResponse = await axios.get(`${BASE_URL}/../health`);
    console.log('✅ Backend is running:', healthResponse.data);
    
    // Test 2: Try to fetch education data (without auth for now)
    console.log('\n2. Testing education endpoint...');
    try {
      const educationResponse = await axios.get(`${BASE_URL}/profile/education`);
      console.log('✅ Education endpoint accessible:', educationResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('⚠️ Authentication required (expected)');
        console.log('Response:', error.response.data);
      } else {
        console.log('❌ Unexpected error:', error.response?.data || error.message);
      }
    }
    
    // Test 3: Check database connection
    console.log('\n3. Testing database connection...');
    // This would require a special endpoint or backend log check
    
    // Test 4: Frontend API service configuration
    console.log('\n4. Checking frontend API configuration...');
    const frontendApiPath = 'c:\\Users\\91801\\OneDrive\\Documents\\Electrosoft\\Student_Alumni_Industry_Interconnection\\ElectrosoftAlumni\\src\\services\\apiService.js';
    const fs = require('fs');
    const apiServiceContent = fs.readFileSync(frontendApiPath, 'utf8');
    
    const hasBaseURL = apiServiceContent.includes('baseURL');
    const hasEducationMethods = apiServiceContent.includes('getStudentEducation');
    const hasAuthHeader = apiServiceContent.includes('Authorization');
    
    console.log('Frontend API Service:');
    console.log('  - Has base URL:', hasBaseURL ? '✅' : '❌');
    console.log('  - Has education methods:', hasEducationMethods ? '✅' : '❌');
    console.log('  - Has auth headers:', hasAuthHeader ? '✅' : '❌');
    
    console.log('\n🎯 Potential Issues to Check:');
    console.log('1. Authentication: User needs to be logged in');
    console.log('2. CORS: Frontend and backend on different ports');
    console.log('3. Database: Prisma connection or migration issues');
    console.log('4. State Management: Frontend not updating correctly');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

async function checkDatabaseSchema() {
  console.log('\n🗄️ Checking Database Schema...');
  
  const schemaPath = 'c:\\Users\\91801\\OneDrive\\Documents\\Electrosoft\\Student_Alumni_Industry_Interconnection\\Backend\\prisma\\schema.prisma';
  const fs = require('fs');
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  const hasStudentEducation = schemaContent.includes('model student_education');
  const hasStudentTable = schemaContent.includes('model Student');
  const hasRelations = schemaContent.includes('student_education[]');
  
  console.log('Database Schema:');
  console.log('  - Student table exists:', hasStudentTable ? '✅' : '❌');
  console.log('  - Education table exists:', hasStudentEducation ? '✅' : '❌');
  console.log('  - Relations defined:', hasRelations ? '✅' : '❌');
  
  if (hasStudentEducation) {
    const educationMatch = schemaContent.match(/model student_education \{[^}]+\}/s);
    if (educationMatch) {
      console.log('\nEducation Table Structure:');
      console.log(educationMatch[0]);
    }
  }
}

async function main() {
  await checkDatabaseSchema();
  await testEducationPersistence();
  
  console.log('\n💡 Next Steps:');
  console.log('1. Ensure backend server is running (npm start in Backend folder)');
  console.log('2. Ensure frontend server is running (npm run dev in ElectrosoftAlumni folder)');
  console.log('3. Check if user is properly authenticated');
  console.log('4. Verify Prisma database connection');
  console.log('5. Check browser console for frontend errors');
}

main().catch(console.error);
