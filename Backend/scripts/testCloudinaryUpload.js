// Test Cloudinary upload functionality
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const API_BASE_URL = "https://scaips-backend.onrender.com";

// First login to get a token
async function loginAndTestUpload() {
  try {
    // Login with test credentials
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "alagwala@gmail.com",
        password: "password123", // Common test password
      }),
    });

    const loginData = await loginResponse.json();
    console.log("Login response:", loginData);

    if (loginData.success && loginData.token) {
      const token = loginData.token;

      // Test file upload (create a small test file)
      const testContent = "This is a test file for Cloudinary upload";
      const testFilePath = path.join(__dirname, "test-upload.txt");
      fs.writeFileSync(testFilePath, testContent);

      // Create form data
      const formData = new FormData();
      formData.append("content", "Testing Cloudinary upload from backend!");
      formData.append("media", fs.createReadStream(testFilePath));

      // Make post request
      const postResponse = await fetch(`${API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...formData.getHeaders(),
        },
        body: formData,
      });

      const postData = await postResponse.json();
      console.log("Post creation response:", postData);

      // Clean up test file
      fs.unlinkSync(testFilePath);
    } else {
      console.log("Login failed:", loginData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

loginAndTestUpload();
