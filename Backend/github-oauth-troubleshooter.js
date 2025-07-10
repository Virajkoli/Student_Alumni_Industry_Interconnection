// GitHub OAuth Configuration Troubleshooter
// Run this script to diagnose GitHub OAuth configuration issues

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = 'Ov23liJDM6B9xuTvVtBa';
const GITHUB_CLIENT_SECRET = '01a1b0a5245ae5962397676c5b178193246513fe';
const BACKEND_URL = 'https://scaips-backend.onrender.com';
const FRONTEND_URL = 'https://electrosoft-alumni.vercel.app';
const REDIRECT_URI = `${BACKEND_URL}/api/auth/github/callback`;

// Test if backend is accessible
async function testBackendConnection() {
  console.log('Testing backend connection...');
  try {
    const response = await axios.get(`${BACKEND_URL}/health`, { timeout: 10000 });
    console.log(`✅ Backend responded with status ${response.status}`);
    return true;
  } catch (error) {
    console.log('❌ Backend connection failed:');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return false;
  }
}

// Test each GitHub auth endpoint
async function testGitHubEndpoints() {
  console.log('\nTesting GitHub OAuth endpoints...');
  
  const endpoints = [
    '/api/auth/github',
    '/api/auth/github/callback',
    '/api/github',
    '/api/github/callback'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting ${endpoint}...`);
      const response = await axios.get(`${BACKEND_URL}${endpoint}`, {
        validateStatus: () => true,
        timeout: 10000
      });
      
      if (response.status === 404) {
        console.log(`❌ Endpoint not found (404)`);
      } else if (response.status >= 300 && response.status < 400) {
        console.log(`✅ Endpoint redirects (${response.status})`);
        console.log(`   Redirect to: ${response.headers.location}`);
      } else {
        console.log(`✅ Endpoint responded with status ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Request failed: ${error.message}`);
    }
  }
}

// Check GitHub OAuth app configuration
async function checkGitHubOAuthConfig() {
  console.log('\nChecking GitHub OAuth configuration...');
  console.log(`Client ID: ${GITHUB_CLIENT_ID}`);
  console.log(`Redirect URI: ${REDIRECT_URI}`);
  
  // Validate redirect URI format
  try {
    const url = new URL(REDIRECT_URI);
    console.log(`✅ Redirect URI format is valid`);
    console.log(`   Protocol: ${url.protocol}`);
    console.log(`   Host: ${url.hostname}`);
    console.log(`   Path: ${url.pathname}`);
  } catch (error) {
    console.log(`❌ Redirect URI format is invalid: ${error.message}`);
  }
  
  // Test GitHub OAuth authorization URL
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  console.log(`\nTesting GitHub authorization URL:`);
  console.log(authUrl);
  
  try {
    const response = await axios.get(authUrl, {
      validateStatus: () => true,
      timeout: 10000,
      maxRedirects: 0
    });
    
    if (response.status >= 300 && response.status < 400) {
      console.log(`✅ GitHub authorization URL works (redirects with ${response.status})`);
    } else {
      console.log(`❌ GitHub authorization URL returned unexpected status: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      console.log(`✅ GitHub authorization URL works (redirects with ${error.response.status})`);
    } else {
      console.log(`❌ GitHub authorization URL request failed: ${error.message}`);
    }
  }
}

// Check backend route configuration
async function checkBackendRoutes() {
  console.log('\nAnalyzing backend route configuration...');
  
  try {
    // Create a simple Express app to analyze route registration
    const express = require('express');
    const app = express();
    
    // Mock the necessary imports
    const originalRequire = require;
    require = function(id) {
      if (id === '../config/database') {
        return { User: {}, Student: {}, College: {} };
      }
      if (id === 'jsonwebtoken') {
        return { sign: () => 'mock-token' };
      }
      return originalRequire(id);
    };
    
    // Load the github-auth routes
    const routePath = path.join(__dirname, 'routes', 'github-auth.js');
    if (fs.existsSync(routePath)) {
      console.log(`✅ GitHub auth routes file exists`);
      try {
        const githubRoutes = require(routePath);
        
        // Test mounting at different paths
        const testApps = [
          { app: express(), mountPath: '/api', name: 'Mounted at /api' },
          { app: express(), mountPath: '/api/auth', name: 'Mounted at /api/auth' },
        ];
        
        for (const { app, mountPath, name } of testApps) {
          app.use(mountPath, githubRoutes);
          
          console.log(`\n📋 Routes when ${name}:`);
          app._router.stack.forEach(middleware => {
            if (middleware.name === 'router') {
              middleware.handle.stack.forEach(handler => {
                if (handler.route) {
                  const path = handler.route.path;
                  const methods = Object.keys(handler.route.methods).join(', ');
                  console.log(`   ${methods.toUpperCase()} ${mountPath}${path}`);
                }
              });
            }
          });
        }
      } catch (error) {
        console.log(`❌ Error loading GitHub routes: ${error.message}`);
      }
    } else {
      console.log(`❌ GitHub auth routes file not found at ${routePath}`);
    }
    
    // Restore original require
    require = originalRequire;
  } catch (error) {
    console.log(`❌ Error analyzing routes: ${error.message}`);
  }
}

// Check frontend GitHub OAuth implementation
function checkFrontendImplementation() {
  console.log('\nAnalyzing frontend GitHub OAuth implementation...');
  
  const frontendFiles = [
    { path: path.join(__dirname, '..', 'ElectrosoftAlumni', 'src', 'utils', 'githubAuth.js'), name: 'GitHub Auth Service' },
    { path: path.join(__dirname, '..', 'ElectrosoftAlumni', 'src', 'contexts', 'AuthContext.jsx'), name: 'Auth Context' },
    { path: path.join(__dirname, '..', 'ElectrosoftAlumni', 'src', 'components', 'GitHubSignInButton.jsx'), name: 'GitHub Sign In Button' },
  ];
  
  for (const { path: filePath, name } of frontendFiles) {
    console.log(`\nChecking ${name}...`);
    if (fs.existsSync(filePath)) {
      console.log(`✅ File exists`);
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for API endpoints
        const apiEndpoints = content.match(/\/api\/auth\/github[^\s"']+/g) || [];
        if (apiEndpoints.length > 0) {
          console.log(`📋 API endpoints found:`);
          apiEndpoints.forEach(endpoint => console.log(`   ${endpoint}`));
        } else {
          console.log(`ℹ️ No API endpoints found`);
        }
        
        // Check for redirect URI
        const redirectUris = content.match(/redirectUri\s*=\s*['"]([^'"]+)['"]/g) || [];
        if (redirectUris.length > 0) {
          console.log(`📋 Redirect URIs found:`);
          redirectUris.forEach(uri => console.log(`   ${uri.split('=')[1].trim()}`));
        }
        
        // Check for client ID
        const clientIds = content.match(/clientId\s*=\s*['"]([^'"]+)['"]/g) || [];
        if (clientIds.length > 0) {
          console.log(`📋 Client IDs found:`);
          clientIds.forEach(id => console.log(`   ${id.split('=')[1].trim()}`));
        }
      } catch (error) {
        console.log(`❌ Error reading file: ${error.message}`);
      }
    } else {
      console.log(`❌ File not found`);
    }
  }
}

// Final recommendations
function provideRecommendations() {
  console.log('\n🔧 RECOMMENDATIONS:');
  console.log('1. Ensure your backend server is running and accessible');
  console.log('2. In server.js, mount GitHub routes correctly:');
  console.log('   - If routes in github-auth.js start with "/github", mount with app.use("/api/auth", githubAuthRoutes)');
  console.log('   - If routes in github-auth.js start with "/auth/github", mount with app.use("/api", githubAuthRoutes)');
  console.log('3. Make sure GitHub OAuth app settings have exactly this redirect URI:');
  console.log(`   ${REDIRECT_URI}`);
  console.log('4. Update all frontend API calls to match the backend routes');
  console.log('5. Check for any CORS issues by testing with local endpoints');
  console.log('6. Verify JWT_SECRET is properly set in your backend environment');
}

// Run all checks
async function runChecks() {
  console.log('🔍 GITHUB OAUTH TROUBLESHOOTER');
  console.log('=============================');
  
  const backendOk = await testBackendConnection();
  if (backendOk) {
    await testGitHubEndpoints();
  }
  
  await checkGitHubOAuthConfig();
  await checkBackendRoutes();
  checkFrontendImplementation();
  provideRecommendations();
  
  console.log('\n✅ All checks completed!');
}

runChecks();
