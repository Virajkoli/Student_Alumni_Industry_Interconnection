const axios = require("axios");
require("dotenv").config();

// Configuration
const BASE_URL = process.env.API_URL || "http://localhost:5000";
const GITHUB_CLIENT_ID = "Ov23liJDM6B9xuTvVtBa";
const GITHUB_CLIENT_SECRET = "01a1b0a5245ae5962397676c5b178193246513fe";

async function testGitHubRoutes() {
  console.log("=== Testing GitHub Authentication Routes ===");

  try {
    // Test GitHub route
    console.log("\n1. Testing GitHub Auth Route");
    console.log(`GET ${BASE_URL}/api/auth/github`);
    console.log("This should redirect to GitHub for authentication.");
    console.log(
      "Cannot test programmatically, but endpoint should be accessible."
    );

    // Test GitHub callback route
    console.log("\n2. GitHub Callback Route");
    console.log(`GET ${BASE_URL}/api/auth/github/callback`);
    console.log("This will be called by GitHub after user authorizes.");
    console.log("Cannot test without a valid code from GitHub OAuth flow.");

    // Test GitHub login endpoint
    console.log("\n3. Testing GitHub Login API");
    const mockGitHubUser = {
      email: "test@example.com",
      github_id: "123456789",
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      imageUrl: "https://avatars.githubusercontent.com/u/123456789",
    };

    console.log(`POST ${BASE_URL}/api/auth/github/login`);
    console.log("Request body:", mockGitHubUser);
    console.log(
      'This would fail with 404 "User not found" if the user does not exist'
    );
    console.log("which is expected for this test user.");

    // Test GitHub registration endpoint
    console.log("\n4. Testing GitHub Registration API");
    console.log(`POST ${BASE_URL}/api/auth/github/register`);
    console.log("Request body (would include additional registration fields)");

    console.log("\n=== GitHub Routes Test Complete ===");
    console.log(
      "Note: These routes require an actual GitHub OAuth flow to fully test."
    );
    console.log("The GitHub integration is set up correctly if you can:");
    console.log("1. Click the GitHub button and get redirected to GitHub");
    console.log("2. Authorize your app on GitHub");
    console.log("3. Get redirected back to your application");
  } catch (error) {
    console.error("Error testing GitHub routes:", error.message);
  }
}

testGitHubRoutes();
