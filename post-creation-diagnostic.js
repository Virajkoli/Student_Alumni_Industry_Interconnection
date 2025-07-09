// Comprehensive diagnostic for post creation issues
// Copy and paste this into browser console while on your app

async function diagnosePostCreation() {
  console.log("🔍 Starting comprehensive post creation diagnosis...");

  // Test 1: Check localStorage
  console.log("\n📋 Step 1: Checking localStorage...");
  const authToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");

  if (!authToken) {
    console.log("❌ No auth token found. Please login first.");
    return;
  }

  console.log("✅ Auth token found:", authToken.substring(0, 20) + "...");
  console.log("✅ User data found:", userData ? "Yes" : "No");

  // Test 2: Check backend connectivity
  console.log("\n🌐 Step 2: Testing backend connectivity...");
  try {
    const healthResponse = await fetch(
      "https://scaips-backend.onrender.com/health"
    );
    const healthData = await healthResponse.json();
    console.log("✅ Backend health check:", healthData);
  } catch (error) {
    console.log("❌ Backend health check failed:", error.message);
    return;
  }

  // Test 3: Test authentication
  console.log("\n🔑 Step 3: Testing authentication...");
  try {
    const authResponse = await fetch(
      "https://scaips-backend.onrender.com/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const authData = await authResponse.json();
    console.log("Auth response status:", authResponse.status);
    console.log("Auth response data:", authData);

    if (!authResponse.ok) {
      console.log("❌ Authentication failed. Token might be expired.");
      return;
    }

    console.log("✅ Authentication successful");
  } catch (error) {
    console.log("❌ Authentication test failed:", error.message);
    return;
  }

  // Test 4: Test simple post creation
  console.log("\n📝 Step 4: Testing simple post creation...");
  try {
    const postResponse = await fetch(
      "https://scaips-backend.onrender.com/api/posts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `Test post from diagnostic - ${new Date().toISOString()}`,
        }),
      }
    );

    console.log("Post response status:", postResponse.status);
    console.log(
      "Post response headers:",
      Object.fromEntries(postResponse.headers.entries())
    );

    let postData;
    try {
      postData = await postResponse.json();
      console.log("Post response data:", postData);
    } catch (parseError) {
      console.log("❌ Could not parse response as JSON:", parseError);
      const textResponse = await postResponse.text();
      console.log("Raw response:", textResponse);
      return;
    }

    if (postResponse.ok) {
      console.log("✅ Post creation successful!");
      console.log(
        "🎉 Your post creation should work now. Try again in your app."
      );
    } else {
      console.log("❌ Post creation failed");
      console.log("Status:", postResponse.status);
      console.log("Error:", postData);

      // Provide specific guidance based on error
      if (postResponse.status === 500) {
        console.log(
          "📋 SOLUTION: Server error (500) - This is likely a backend database issue."
        );
        console.log(
          "   - The backend may not be connected to the database properly"
        );
        console.log(
          "   - Contact your backend team to check Render environment variables"
        );
        console.log("   - Check if database migrations have been run");
      } else if (postResponse.status === 401) {
        console.log(
          "📋 SOLUTION: Authentication error (401) - Please login again"
        );
      } else if (postResponse.status === 400) {
        console.log(
          "📋 SOLUTION: Bad request (400) - Check your request format"
        );
      }
    }
  } catch (error) {
    console.log("❌ Post creation test failed:", error.message);

    if (error.message.includes("Failed to fetch")) {
      console.log(
        "📋 SOLUTION: Network error - Check your internet connection"
      );
    }
  }

  console.log("\n🏁 Diagnosis complete!");
}

// Run the diagnosis
diagnosePostCreation();
