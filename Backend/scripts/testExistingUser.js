// Test with a simpler approach - check if existing user can login
const API_BASE_URL = "https://scaips-backend.onrender.com";

async function testExistingUserLogin() {
  try {
    console.log("Testing login with existing user...");

    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "alagwala@gmail.com",
        password: "password123",
      }),
    });

    const loginData = await loginResponse.json();
    console.log("Login response:", loginData);

    if (loginData.success) {
      console.log("Login successful! Testing post creation...");

      const token = loginData.token;

      // Test basic post creation
      const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: "Test post to check backend functionality",
        }),
      });

      const postData = await postResponse.json();
      console.log("Post response:", postData);

      if (!postResponse.ok) {
        console.error("Post creation failed:", postResponse.status, postData);
      }
    } else {
      console.log("Login failed. Trying with different password...");

      // Try with a different common password
      const loginResponse2 = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "alagwala@gmail.com",
          password: "viraj123",
        }),
      });

      const loginData2 = await loginResponse2.json();
      console.log("Login response (attempt 2):", loginData2);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testExistingUserLogin();
