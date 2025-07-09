// Test college registration endpoint
require('dotenv').config();

const API_BASE_URL = 'https://scaips-backend.onrender.com';

const testCollegeData = {
  email: `test-college-${Date.now()}@example.com`,
  password: 'testpass123',
  college_name: 'Test College',
  college_address: 'Test Address',
  establishment_year: '2000',
  website: 'https://testcollege.edu',
  campus_area: '50',
  nirf_rank: '100',
  accreditation: 'NAAC A+',
  total_students: '5000',
  total_faculty: '200',
  description: 'Test college description'
};

async function testCollegeRegistration() {
  try {
    console.log('Testing college registration...');
    console.log('Test data:', { ...testCollegeData, password: '[HIDDEN]' });
    
    const response = await fetch(`${API_BASE_URL}/api/auth/register/college`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCollegeData)
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    console.log('Response body:', responseText);

    try {
      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);
    } catch (parseError) {
      console.log('Failed to parse response as JSON:', parseError.message);
    }

  } catch (error) {
    console.error('Error testing college registration:', error);
  }
}

testCollegeRegistration();
