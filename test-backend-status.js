// Simple test to check if backend is responding
const API_BASE_URL = "https://scaips-backend.onrender.com";

async function testBackend() {
  try {
    console.log("🔍 Testing backend status...");

    // Test 1: Basic connectivity
    const response = await fetch(`${API_BASE_URL}/health`);
    console.log("Health check status:", response.status);

    if (response.ok) {
      const data = await response.text();
      console.log("Health check response:", data);
    }

    // Test 2: Check if auth endpoint is working
    const authResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "invalid",
        role: "student",
      }),
    });

    console.log("Auth endpoint status:", authResponse.status);
    const authData = await authResponse.json();
    console.log("Auth response:", authData);
  } catch (error) {
    console.error("❌ Backend test failed:", error.message);
  }
}

testBackend();
