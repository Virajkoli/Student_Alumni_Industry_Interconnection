const fetch = require('node-fetch');
require('dotenv').config();

const API_BASE_URL = 'http://localhost:5000';

async function testCollegeLogin() {
  try {
    console.log('🏫 Testing College Login and API...\n');

    // Use the existing college account that was created earlier via Google OAuth
    const email = 'patildurgesh0807@gmail.com';
    
    console.log('📋 Attempting login with college account:', email);
    
    // Try to login
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: 'google_auth_1752227329065',  // From the terminal logs
      }),
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      console.error('❌ Login failed:', loginResponse.status, errorText);
      return;
    }

    const loginData = await loginResponse.json();
    console.log('✅ College logged in successfully');
    console.log('User data:', loginData.data.user);

    const authToken = loginData.data.token;
    const collegeId = loginData.data.user.id;

    // Test 1: Get college information
    console.log('\n📋 Test 1: Get college information...');
    const getResponse = await fetch(`${API_BASE_URL}/api/colleges/${collegeId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    if (!getResponse.ok) {
      const errorText = await getResponse.text();
      console.error('❌ Get college info failed:', getResponse.status, errorText);
      return;
    }
    
    const getResult = await getResponse.json();
    console.log('✅ College data retrieved:', getResult);

    // Test 2: Update college information
    console.log('\n📝 Test 2: Update college information...');
    const updateData = {
      overview: 'This is an updated overview for our college.',
      totalStudents: '2000',
      faculty: '200',
      accreditation: 'NAAC A+',
      nirfRank: '150',
      specialties: ['Computer Science', 'Electronics', 'Mechanical Engineering'],
    };

    console.log('Sending update data:', updateData);

    const updateResponse = await fetch(`${API_BASE_URL}/api/colleges/${collegeId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('❌ Update failed:', updateResponse.status, errorText);
    } else {
      const updateResult = await updateResponse.json();
      console.log('✅ College information updated:', updateResult);
    }

    // Test 3: Get updated college information
    console.log('\n📋 Test 3: Get updated college information...');
    const getUpdatedResponse = await fetch(`${API_BASE_URL}/api/colleges/${collegeId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    if (!getUpdatedResponse.ok) {
      const errorText = await getUpdatedResponse.text();
      console.error('❌ Get updated info failed:', getUpdatedResponse.status, errorText);
    } else {
      const getUpdatedResult = await getUpdatedResponse.json();
      console.log('✅ Updated college data:', JSON.stringify(getUpdatedResult, null, 2));
    }

    console.log('\n🎉 College API tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

// Run the test
testCollegeLogin();
