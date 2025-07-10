// This script will help verify that the GitHub OAuth routes are correctly registered and working
// To run: node test-github-routes.js
const axios = require('axios');

// Configuration - CHANGE THESE VALUES IF NEEDED
const BACKEND_URL = 'https://scaips-backend.onrender.com'; // Change to your backend URL
const expectedPaths = [
  '/api/auth/github',
  '/api/auth/github/callback',
  '/api/auth/github/login',
  '/api/auth/github/register'
];

async function testRoutes() {
  console.log('Testing GitHub OAuth routes...');
  console.log(`Backend URL: ${BACKEND_URL}`);
  
  // First test the debug/routes endpoint
  try {
    console.log('\nFetching all registered routes:');
    const response = await axios.get(`${BACKEND_URL}/api/debug/routes`);
    
    if (response.data && response.data.routes) {
      console.log(`Found ${response.data.totalRoutes} total routes.`);
      
      // Filter for GitHub related routes
      const githubRoutes = response.data.routes.filter(route => 
        route.path.includes('github')
      );
      
      console.log('\nGitHub-related routes:');
      if (githubRoutes.length === 0) {
        console.log('❌ No GitHub routes found!');
      } else {
        githubRoutes.forEach(route => {
          console.log(`${route.methods} ${route.path}`);
        });
      }
      
      // Check for expected paths
      console.log('\nChecking for expected GitHub OAuth paths:');
      expectedPaths.forEach(path => {
        const foundRoute = response.data.routes.find(r => r.path === path);
        if (foundRoute) {
          console.log(`✅ ${path} - FOUND (${foundRoute.methods})`);
        } else {
          console.log(`❌ ${path} - NOT FOUND`);
        }
      });
    } else {
      console.log('❌ Invalid response format from routes endpoint');
    }
  } catch (error) {
    console.log('❌ Error fetching routes:', error.message);
  }
  
  // Test if the routes are actually responding (not just registered)
  console.log('\nTesting actual route responses:');
  
  for (const path of expectedPaths) {
    try {
      console.log(`Testing ${path}...`);
      const response = await axios.get(`${BACKEND_URL}${path}`, {
        maxRedirects: 0,
        validateStatus: function (status) {
          return true; // Accept all status codes for testing
        }
      });
      
      console.log(`✅ ${path} - Status: ${response.status}`);
      if (response.status === 404) {
        console.log(`   ❌ WARNING: Route returned 404 Not Found!`);
      } else if (response.status >= 300 && response.status < 400) {
        console.log(`   ℹ️ Redirects to: ${response.headers.location}`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 302) {
          console.log(`✅ ${path} - Status: 302 Redirect`);
          console.log(`   ℹ️ Redirects to: ${error.response.headers.location}`);
        } else {
          console.log(`❌ ${path} - Status: ${error.response.status}`);
        }
      } else {
        console.log(`❌ ${path} - Error: ${error.message}`);
      }
    }
  }
  
  console.log('\nTroubleshooting recommendations:');
  console.log('1. Make sure your github-auth.js routes are defined with the correct paths');
  console.log('2. Verify that server.js mounts the GitHub routes correctly');
  console.log('3. Check that your redirect URI matches exactly what is in your GitHub OAuth app settings');
  console.log('4. Verify your backend is running and accessible at the specified URL');
}

testRoutes();
