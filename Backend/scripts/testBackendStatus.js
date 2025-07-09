// Test if the backend can handle post creation without media
const API_BASE_URL = "https://scaips-backend.onrender.com";

async function testPostCreation() {
  try {
    // First register a test user
    const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test-cloudinary@example.com",
        password: "password123",
        first_name: "Test",
        last_name: "User",
        role: "student",
        student_college_name: "Test College",
        interested_field: "Computer",
      }),
    });

    const registerData = await registerResponse.json();
    console.log("Register response:", registerData);

    if (registerData.success) {
      const token = registerData.token;

      // Test post creation without media
      const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: "Test post without media to check backend status",
        }),
      });

      const postData = await postResponse.json();
      console.log("Post response:", postData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testPostCreation();
