const axios = require('axios');
require('dotenv').config();

// GitHub OAuth credentials
const GITHUB_CLIENT_ID = "Ov23liJDM6B9xuTvVtBa";
const GITHUB_CLIENT_SECRET = "01a1b0a5245ae5962397676c5b178193246513fe";
const REDIRECT_URI = "https://scaips-backend.onrender.com/api/auth/github/callback";

async function testGitHubOAuthSetup() {
  console.log("Testing GitHub OAuth Setup...");
  console.log("------------------------------");
  console.log("Client ID:", GITHUB_CLIENT_ID);
  console.log("Redirect URI:", REDIRECT_URI);
  
  // Test the GitHub OAuth API to see if the credentials are valid
  try {
    console.log("\nTesting GitHub OAuth App credentials...");
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user:email`;
    console.log("Authorization URL:", authUrl);
    
    // Make a GET request to GitHub to check if the client ID is valid
    // This won't actually complete OAuth flow, but will show if GitHub recognizes the client ID
    const testResponse = await axios.get(authUrl, {
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 400
    }).catch(error => {
      // We expect a redirect, which will throw an error with axios
      if (error.response && error.response.status === 302) {
        return { status: 302, headers: error.response.headers };
      }
      throw error;
    });
    
    if (testResponse.status === 302) {
      console.log("✅ GitHub recognizes your Client ID and Redirect URI!");
    } else {
      console.log("⚠️ Unexpected response from GitHub:", testResponse.status);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.log("❌ GitHub returned 404 - Client ID may be invalid!");
      } else if (error.response.data && error.response.data.includes("redirect_uri_mismatch")) {
        console.log("❌ GitHub rejected your redirect URI! It doesn't match what's configured in your GitHub OAuth App.");
      } else {
        console.log("❌ GitHub API error:", error.response.status, error.response.data);
      }
    } else {
      console.log("❌ Error testing GitHub OAuth:", error.message);
    }
  }
  
  // Test backend endpoints
  console.log("\nTesting backend GitHub OAuth endpoints...");
  const backendUrl = process.env.BACKEND_URL || "https://scaips-backend.onrender.com";
  
  // Test the GitHub OAuth initialization endpoint
  try {
    console.log(`Testing endpoint: ${backendUrl}/api/auth/github`);
    const response = await axios.get(`${backendUrl}/api/auth/github`, {
      maxRedirects: 0,
      validateStatus: status => true
    });
    
    if (response.status === 302) {
      console.log("✅ GitHub initialization endpoint is working!");
      console.log("   Redirects to:", response.headers.location);
    } else {
      console.log("❌ GitHub initialization endpoint returned:", response.status);
      console.log("   Response:", response.data);
    }
  } catch (error) {
    console.log("❌ Error testing GitHub initialization endpoint:", error.message);
  }
  
  // Test the GitHub OAuth callback endpoint (just to check if it exists)
  try {
    console.log(`\nTesting callback endpoint: ${backendUrl}/api/auth/github/callback`);
    console.log("(This should return an error about missing code, but should not be a 404)");
    
    const response = await axios.get(`${backendUrl}/api/auth/github/callback`, {
      validateStatus: status => true
    });
    
    if (response.status === 404) {
      console.log("❌ GitHub callback endpoint returned 404 - Endpoint doesn't exist!");
    } else {
      console.log("✅ GitHub callback endpoint exists! Status:", response.status);
      console.log("   Response:", typeof response.data === 'object' ? JSON.stringify(response.data) : response.data);
    }
  } catch (error) {
    console.log("❌ Error testing GitHub callback endpoint:", error.message);
  }
  
  // Check all registered routes to help debug
  try {
    console.log("\nFetching all registered routes from backend...");
    const routesResponse = await axios.get(`${backendUrl}/api/debug/routes`, {
      validateStatus: status => true
    });
    
    if (routesResponse.status === 200) {
      console.log("✅ Routes endpoint working. Found routes:");
      const routes = routesResponse.data.routes;
      routes.forEach(route => {
        console.log(`   ${route.methods} ${route.path}`);
      });
      
      // Check specifically for GitHub callback route
      const callbackRoute = routes.find(r => r.path.includes('/auth/github/callback'));
      if (callbackRoute) {
        console.log("\n✅ GitHub callback route is registered!");
        console.log(`   ${callbackRoute.methods} ${callbackRoute.path}`);
      } else {
        console.log("\n❌ GitHub callback route is NOT registered in the backend!");
      }
    } else {
      console.log("❌ Could not fetch routes:", routesResponse.status);
    }
  } catch (error) {
    console.log("❌ Error fetching routes:", error.message);
  }
  
  console.log("\nTroubleshooting Recommendations:");
  console.log("1. Verify your GitHub OAuth App settings at https://github.com/settings/developers");
  console.log("2. Make sure the Authorization callback URL exactly matches:", REDIRECT_URI);
  console.log("3. Check that your backend server has the github-auth.js routes properly registered");
  console.log("4. Verify that CORS settings allow GitHub's domain");
  console.log("5. Check server.js to ensure routes are mounted correctly");
}

testGitHubOAuthSetup();
