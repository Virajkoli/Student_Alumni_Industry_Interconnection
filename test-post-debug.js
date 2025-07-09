// Debug script to test post creation
const API_BASE_URL = "https://scaips-backend.onrender.com";

async function debugPostCreation() {
  try {
    console.log("🔍 Starting post creation debug...");

    // Get token from localStorage (you'll need to replace this with your actual token)
    const token = "YOUR_TOKEN_HERE"; // Replace with your actual token from browser's localStorage

    if (!token || token === "YOUR_TOKEN_HERE") {
      console.log("❌ No token provided. Please:");
      console.log("1. Login to your app in the browser");
      console.log("2. Open browser DevTools (F12)");
      console.log("3. Go to Application/Storage tab");
      console.log("4. Find localStorage -> authToken");
      console.log(
        "5. Copy the token value and replace YOUR_TOKEN_HERE in this script"
      );
      return;
    }

    console.log("🔑 Using token:", token.substring(0, 20) + "...");

    // Test 1: Check if backend is reachable
    console.log("\n📡 Testing backend connectivity...");
    try {
      const healthResponse = await fetch(`${API_BASE_URL}/health`);
      console.log("Backend health check:", healthResponse.status);
    } catch (error) {
      console.log("❌ Backend health check failed:", error.message);
    }

    // Test 2: Test authentication
    console.log("\n🔐 Testing authentication...");
    const authResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const authData = await authResponse.json();
    console.log("Auth response status:", authResponse.status);
    console.log("Auth response data:", authData);

    if (!authResponse.ok) {
      console.log("❌ Authentication failed. Please check your token.");
      return;
    }

    // Test 3: Test simple post creation
    console.log("\n📝 Testing simple post creation...");
    const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "Test post from debug script",
      }),
    });

    const postData = await postResponse.json();
    console.log("Post response status:", postResponse.status);
    console.log("Post response data:", postData);

    if (postResponse.ok) {
      console.log("✅ Post creation successful!");
    } else {
      console.log("❌ Post creation failed");
      console.log("Error details:", postData);
    }
  } catch (error) {
    console.error("❌ Debug script failed:", error);
  }
}

// Run the debug function
debugPostCreation();
