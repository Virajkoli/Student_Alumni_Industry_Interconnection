const axios = require('axios');

async function testCollegeUpdate() {
  try {
    // First, create a test student via registration
    console.log('📝 Creating test student...');
    
    try {
      const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
        email: 'test.student@example.com',
        password: 'TestPassword123!',
        first_name: 'Test',
        last_name: 'Student',
        contact_no: '1234567890',
        student_college_name: 'Test University',
        interested_field: 'Computer',
        role: 'student'
      });
      console.log('✅ Student registration successful');
    } catch (regError) {
      if (regError.response && regError.response.status === 400 && 
          regError.response.data.message === 'User already exists with this email') {
        console.log('📝 Test student already exists, proceeding with login...');
      } else {
        throw regError;
      }
    }

    // Now login with the test student
    const authResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test.student@example.com',
      password: 'TestPassword123!'
    });

    const token = authResponse.data.token;
    console.log('✅ Authentication successful');

    // Test college information update
    const updateData = {
      overview: "Test overview update",
      website: "https://test-university.edu",
      establishmentYear: 1950,
      location: "Test City, Test State",
      collegeType: "Public",
      totalStudents: 2000,
      faculty: 200,
      nirfRank: 50,
      specialties: ["Engineering", "Computer Science"],
      customFields: {
        "facilities": "Modern labs and library",
        "notable_alumni": "Various industry leaders"
      }
    };

    console.log('📤 Sending update request with data:', JSON.stringify(updateData, null, 2));

    const response = await axios.put('http://localhost:5000/api/colleges/1/information', updateData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Update successful:', response.data);

  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testCollegeUpdate();
