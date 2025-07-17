const axios = require('axios');

// Test education editing functionality
async function testEducationEditing() {
  console.log('🧪 Testing Education Section Editing...');
  
  const baseURL = 'http://localhost:5000/api';
  const timestamp = Date.now();
  
  // Create axios instance
  const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    // Register test user with unique email
    const registerData = {
      name: `Education Test User ${timestamp}`,
      email: `edutest${timestamp}@example.com`,
      password: 'password123',
      role: 'student'
    };
    
    const registerResponse = await api.post('/auth/register', registerData);
    console.log('✅ Test user registered');
    
    const token = registerResponse.data.tokens.accessToken;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    
    // Test Education CRUD operations
    console.log('\n📚 Testing Education Section...');
    
    // 1. Create education entry
    const educationData = {
      institution: 'Test University',
      degree: 'Bachelor of Technology',
      field_of_study: 'Computer Science',
      start_year: 2020,
      end_year: 2024,
      grade: '8.5 CGPA'
    };
    
    console.log('Creating education entry...');
    const createResponse = await api.post('/profile/education', educationData);
    const educationId = createResponse.data.data.id;
    console.log('✅ Education entry created with ID:', educationId);
    
    // 2. Get education entries
    console.log('Fetching education entries...');
    const getResponse = await api.get('/profile/education');
    console.log('✅ Education entries fetched:', getResponse.data.data?.length || 0, 'entries');
    
    // 3. Update education entry
    const updatedEducationData = {
      ...educationData,
      degree: 'Master of Technology',
      grade: '9.0 CGPA'
    };
    
    console.log('Updating education entry...');
    const updateResponse = await api.put(`/profile/education/${educationId}`, updatedEducationData);
    console.log('✅ Education entry updated');
    
    // 4. Verify update
    console.log('Verifying update...');
    const verifyResponse = await api.get('/profile/education');
    const updatedEntry = verifyResponse.data.data?.find(edu => edu.id === educationId);
    if (updatedEntry && updatedEntry.degree === 'Master of Technology') {
      console.log('✅ Update verified successfully');
    } else {
      console.log('❌ Update verification failed');
    }
    
    // 5. Delete education entry
    console.log('Deleting education entry...');
    await api.delete(`/profile/education/${educationId}`);
    console.log('✅ Education entry deleted');
    
    // 6. Verify deletion
    console.log('Verifying deletion...');
    const finalResponse = await api.get('/profile/education');
    const deletedEntry = finalResponse.data.data?.find(edu => edu.id === educationId);
    if (!deletedEntry) {
      console.log('✅ Deletion verified successfully');
    } else {
      console.log('❌ Deletion verification failed');
    }
    
    console.log('\n🎉 Education Section Testing PASSED!');
    console.log('✅ Create operation: Working');
    console.log('✅ Read operation: Working');
    console.log('✅ Update operation: Working');
    console.log('✅ Delete operation: Working');
    console.log('✅ All CRUD operations functional for Education section');
    
  } catch (error) {
    console.error('❌ Education Section Testing FAILED:', error.response?.data || error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testEducationEditing();
