const axios = require("axios");

async function testStudentAPI() {
  try {
    console.log("Testing student profile API...");

    // First, try to register a new student
    const registerData = {
      first_name: "Test",
      last_name: "Student",
      email: "teststudent7@example.com",
      password: "test123",
      contact_no: "1234567890",
      college_name: "Test College",
      interested_field: "Computer",
    };

    console.log("Attempting to register new student...");
    try {
      const registerResponse = await axios.post(
        "http://localhost:5000/api/auth/register",
        registerData
      );
      console.log("Register response:", registerResponse.data);
    } catch (regError) {
      if (regError.response && regError.response.status === 409) {
        console.log("User already exists, trying to login...");
      } else {
        console.error("Registration error:", regError.response?.data);
      }
    }

    // Now try to login
    const loginResponse = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: "teststudent@example.com",
        password: "test123",
      }
    );

    console.log("Login response:", loginResponse.data);

    if (loginResponse.data.success) {
      const token = loginResponse.data.data.token;
      console.log("Got token:", token);

      // Now try to fetch the student profile
      const profileResponse = await axios.get(
        "http://localhost:5000/api/students/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Profile response:",
        JSON.stringify(profileResponse.data, null, 2)
      );
    }
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

testStudentAPI();
