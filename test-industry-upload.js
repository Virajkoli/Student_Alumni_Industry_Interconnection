const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testIndustryUpload() {
  try {
    // This is a simple test to verify the route exists
    const response = await axios.post('http://localhost:5000/api/industries/cover-image', {}, {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    });
    console.log('Route exists, but requires proper authentication and file');
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('✅ Route exists and requires authentication (expected)');
    } else if (error.response?.status === 400) {
      console.log('✅ Route exists and expects file upload (expected)');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('❌ Server is not running on localhost:5000');
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

testIndustryUpload();
