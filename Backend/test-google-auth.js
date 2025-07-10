const fetch = require("node-fetch");

const testGoogleAuth = async () => {
  console.log("🧪 Testing Google Auth Endpoints...\n");

  const baseUrl = "http://localhost:5000";

  // Test 1: Health check
  console.log("1. Testing health check endpoint...");
  try {
    const response = await fetch(`${baseUrl}/api/test`);
    const data = await response.json();
    console.log("✅ Health check:", data.message);
  } catch (error) {
    console.log("❌ Health check failed:", error.message);
  }

  // Test 2: Google Register endpoint
  console.log("\n2. Testing Google Register endpoint...");
  try {
    const testData = {
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      google_id: "test123",
      imageUrl: "https://example.com/avatar.jpg",
      role: "student",
      contact_no: "1234567890",
      student_college_name: "Test College",
      interested_field: "Computer Science",
      other_field: "AI/ML",
    };

    const response = await fetch(`${baseUrl}/api/auth/google/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();
    console.log("✅ Google Register response:", data);
  } catch (error) {
    console.log("❌ Google Register failed:", error.message);
  }

  // Test 3: Google Login endpoint
  console.log("\n3. Testing Google Login endpoint...");
  try {
    const testData = {
      email: "test@example.com",
      google_id: "test123",
      firstName: "Test",
      lastName: "User",
      imageUrl: "https://example.com/avatar.jpg",
    };

    const response = await fetch(`${baseUrl}/api/auth/google/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();
    console.log("✅ Google Login response:", data);
  } catch (error) {
    console.log("❌ Google Login failed:", error.message);
  }
};

// Run the test
testGoogleAuth().catch(console.error);
