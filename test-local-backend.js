// Local backend test
const API_BASE_URL = "http://localhost:5000";

async function testLocalBackend() {
  try {
    console.log("🔍 Testing local backend...");

    // Test 1: Health check
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log("✅ Health check:", healthData);

    // Test 2: Try to create a post (this will fail without auth, but we'll see the error)
    const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "Test post",
      }),
    });

    console.log("Post endpoint status:", postResponse.status);
    const postData = await postResponse.json();
    console.log("Post endpoint response:", postData);

    if (postResponse.status === 401) {
      console.log(
        "✅ Backend is working! Authentication is required (expected)"
      );
    }
  } catch (error) {
    console.error("❌ Local backend test failed:", error);
  }
}

testLocalBackend();
