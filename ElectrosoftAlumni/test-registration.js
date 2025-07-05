// Test script to debug the registration issue
// Run this in your browser console on localhost:3000 or localhost:5173

const testRegistration = async () => {
  const testData = {
    role: "student",
    first_name: "Test",
    last_name: "Student",
    email: "test@example.com",
    password: "password123",
    contact_no: "1234567890",
    college_name: "Test College",
    interested_field: "Computer",
  };

  console.log("Sending test data:", testData);

  try {
    // Test debug endpoint first
    const debugResponse = await fetch(
      "https://scaips-backend.onrender.com/api/auth/debug-register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      }
    );

    const debugResult = await debugResponse.json();
    console.log("Debug response:", debugResult);

    // Now test actual registration
    const response = await fetch(
      "https://scaips-backend.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      }
    );

    const result = await response.json();
    console.log("Registration response:", result);
  } catch (error) {
    console.error("Test failed:", error);
  }
};

// Run the test
testRegistration();
