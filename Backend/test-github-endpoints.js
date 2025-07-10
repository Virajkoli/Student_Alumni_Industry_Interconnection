// Direct GitHub OAuth Route Test
const axios = require('axios');

// Configuration
const BACKEND_URL = 'https://scaips-backend.onrender.com'; // Your actual backend URL
const GITHUB_CLIENT_ID = 'Ov23liJDM6B9xuTvVtBa';
const REDIRECT_URI = 'https://scaips-backend.onrender.com/api/auth/github/callback';

// Endpoints to test
const endpoints = [
  '/api/auth/github',
  '/api/auth/github/callback',
  '/auth/github',
  '/auth/github/callback',
  '/api/github/auth',
  '/api/github/callback',
  '/health',
  '/'
];

async function testEndpoints() {
  console.log(`Testing endpoints on ${BACKEND_URL}`);
  console.log('------------------------------------');
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting ${endpoint}...`);
      const url = `${BACKEND_URL}${endpoint}`;
      const response = await axios.get(url, {
        validateStatus: () => true, // Accept all status codes
        timeout: 10000 // 10 second timeout
      });
      
      console.log(`Status: ${response.status} ${response.statusText}`);
      
      if (response.status >= 200 && response.status < 300) {
        console.log('✅ Success');
        if (typeof response.data === 'object') {
          console.log('Response:', JSON.stringify(response.data, null, 2).substring(0, 200) + '...');
        } else {
          console.log('Response:', String(response.data).substring(0, 200) + '...');
        }
      } else if (response.status >= 300 && response.status < 400) {
        console.log('➡️ Redirect to:', response.headers.location);
      } else if (response.status === 404) {
        console.log('❌ Not Found');
      } else {
        console.log('❌ Error');
        console.log('Response:', response.data);
      }
    } catch (error) {
      console.log('❌ Request Failed');
      if (error.response) {
        console.log(`Status: ${error.response.status} ${error.response.statusText}`);
      } else {
        console.log('Error:', error.message);
      }
    }
  }
  
  // Test GitHub OAuth URL directly
  try {
    console.log('\n\nTesting GitHub OAuth URL directly...');
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    console.log(`URL: ${githubUrl}`);
    
    const response = await axios.get(githubUrl, {
      validateStatus: () => true,
      timeout: 10000,
      maxRedirects: 0 // Don't follow redirects
    });
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    if (response.status >= 300 && response.status < 400) {
      console.log('➡️ Redirect to:', response.headers.location);
      console.log('✅ GitHub OAuth URL is valid');
    } else {
      console.log('❌ Unexpected response');
      console.log('Response:', response.data.substring(0, 200) + '...');
    }
  } catch (error) {
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      console.log(`Status: ${error.response.status} ${error.response.statusText}`);
      console.log('➡️ Redirect to:', error.response.headers.location);
      console.log('✅ GitHub OAuth URL is valid');
    } else {
      console.log('❌ Request Failed');
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        if (error.response.data) {
          console.log('Response:', typeof error.response.data === 'string' 
            ? error.response.data.substring(0, 200) + '...' 
            : JSON.stringify(error.response.data, null, 2));
        }
      } else {
        console.log('Error:', error.message);
      }
    }
  }
  
  console.log('\n\nTest Recommendations:');
  console.log('1. Verify your backend is running and accessible');
  console.log('2. Check if "/api/auth/github" returns a 302 redirect to GitHub');
  console.log('3. Make sure your GitHub OAuth app settings are correctly configured');
  console.log('4. Confirm the redirect URI is exactly:', REDIRECT_URI);
}

testEndpoints();
