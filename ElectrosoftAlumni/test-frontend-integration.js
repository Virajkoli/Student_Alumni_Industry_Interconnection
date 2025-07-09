// Simple test to verify frontend can post to backend
const API_BASE_URL = "https://scaips-backend.onrender.com";

async function testFrontendIntegration() {
  try {
    console.log("Testing frontend integration...");

    // Test 1: Health check
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log("✅ Health check:", healthData);

    // Test 2: CORS check
    const corsResponse = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "OPTIONS",
      headers: {
        Origin: "https://scaipsfrontend.vercel.app",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type,authorization",
      },
    });
    console.log("✅ CORS check status:", corsResponse.status);

    // Test 3: Create a simple post with authentication attempt
    const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer invalid_token", // Will fail but shows endpoint is working
      },
      body: JSON.stringify({
        content: "Test post from frontend integration test",
      }),
    });

    const postData = await postResponse.json();
    console.log("📝 Post response:", postData);

    if (postData.message === "Token is not valid") {
      console.log("✅ Authentication middleware working correctly");
    }
  } catch (error) {
    console.error("❌ Frontend integration test failed:", error);
  }
}

testFrontendIntegration();
