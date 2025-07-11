const fetch = require('node-fetch');
const { College, CollegeCampus } = require('./config/database');
require('dotenv').config();

const API_BASE_URL = 'http://localhost:5000';

async function testCollegeAPI() {
  try {
    console.log('🏫 Testing College Information API...\n');

    // Create and login as a college first
    const college = await College.create({
      name: 'Test College',
      email: 'test.college@example.com',
      password: 'password123',
      description: 'A test college for development',
      location: 'Mumbai, Maharashtra, India',
      established: 1995,
      website: 'https://testcollege.edu',
      about: 'A premier institution dedicated to excellence in education.',
      verified: true,
      verifiedDate: new Date('2020-01-15'),
    });

    console.log('✅ Test college created:', college.id);

    // Login to get auth token
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test.college@example.com',
        password: 'password123',
      }),
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    console.log('✅ College logged in successfully');

    const authToken = loginData.data.token;
    const collegeId = loginData.data.user.id;

    // Test 1: Get college information (initially empty)
    console.log('\n📋 Test 1: Get college information...');
    const getResponse = await fetch(`${API_BASE_URL}/api/colleges/${collegeId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const getResult = await getResponse.json();
    console.log('College data:', getResult);

    // Test 2: Update college information
    console.log('\n📝 Test 2: Update college information...');
    const updateData = {
      overview: 'Updated college overview with new information',
      website: 'https://newtestcollege.edu',
      establishmentYear: '1995',
      location: 'New Mumbai, Maharashtra',
      collegeType: 'Private University',
      totalStudents: '2000',
      faculty: '200',
      accreditation: 'NAAC A+',
      nirfRank: '150',
      specialties: ['Computer Science', 'Electronics', 'Mechanical Engineering'],
      verified: true,
      verifiedDate: '2020-01-15',
      customFields: [
        { id: 1, label: 'Campus Area', value: '100 acres' },
        { id: 2, label: 'Alumni Network', value: '10,000+' }
      ]
    };

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
    
    const getUpdatedResult = await getUpdatedResponse.json();
    console.log('Updated college data:', getUpdatedResult);

    // Test 4: Add campus information
    console.log('\n🏛️ Test 4: Add campus information...');
    const campusData = [
      {
        name: 'Main Campus',
        address: 'Main Street, Mumbai, Maharashtra',
        type: 'Main Campus',
        students: '1500',
        coordinates: [19.076, 72.8777],
        dean: 'Dr. John Doe',
        contact: {
          phone: '+91 22 1234 5678',
          email: 'main@testcollege.edu'
        },
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
        customFields: {
          'Library': '24/7 Access',
          'Sports Complex': 'Available'
        }
      },
      {
        name: 'Engineering Campus',
        address: 'Tech Park, Mumbai, Maharashtra',
        type: 'Specialized Campus',
        students: '500',
        coordinates: [19.080, 72.880],
        dean: 'Dr. Jane Smith',
        contact: {
          phone: '+91 22 9876 5432',
          email: 'engineering@testcollege.edu'
        },
        customFields: {
          'Research Labs': '15 Labs',
          'Workshops': '5 Active'
        }
      }
    ];

    const campusResponse = await fetch(`${API_BASE_URL}/api/colleges/${collegeId}/campuses`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(campusData),
    });

    if (!campusResponse.ok) {
      const errorText = await campusResponse.text();
      console.error('❌ Campus update failed:', campusResponse.status, errorText);
    } else {
      const campusResult = await campusResponse.json();
      console.log('✅ Campus information updated:', campusResult);
    }

    // Test 5: Get final college data with campuses
    console.log('\n📋 Test 5: Get final college data with campuses...');
    const getFinalResponse = await fetch(`${API_BASE_URL}/api/colleges/${collegeId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    
    const getFinalResult = await getFinalResponse.json();
    console.log('Final college data with campuses:', JSON.stringify(getFinalResult, null, 2));

    // Cleanup
    console.log('\n🧹 Cleaning up test data...');
    await CollegeCampus.destroy({ where: { collegeId: college.id } });
    await College.destroy({ where: { id: college.id } });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All college API tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

// Run the test
testCollegeAPI();
