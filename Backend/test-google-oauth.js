const axios = require("axios");

// Test Google OAuth registration
async function testGoogleOAuth() {
  try {
    console.log("🧪 Testing Google OAuth Registration...");

    // Simulate Google OAuth data - Using correct schema field names
    const mockGoogleData = {
      googleId: "test_google_id_123",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      profilePicture: "https://example.com/profile.jpg",
      role: "student",
      // Additional student fields according to schema
      contactNo: "1234567890",
      collegeName: "Test College",
      interestedField: "Computer Science",
      otherField: "Web Development",
    };

    const response = await axios.post(
      "http://localhost:5000/api/auth/google/register",
      mockGoogleData
    );

    console.log("✅ Google OAuth Registration Response:");
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(response.data, null, 2));

    // Test login after registration
    console.log("\n🔐 Testing login after Google OAuth registration...");
    const loginData = {
      email: mockGoogleData.email,
      password: "not_needed_for_google_oauth", // This should be handled by Google OAuth
      role: "student",
    };

    // Note: For Google OAuth users, login might work differently
    // Let's test if we can get user info using the token from registration
    if (response.data.token) {
      const userResponse = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );

      console.log("✅ User Profile Retrieved:");
      console.log("Status:", userResponse.status);
      console.log("Data:", JSON.stringify(userResponse.data, null, 2));
    }
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

// Test different roles
async function testAllRoles() {
  const roles = ["student", "college", "startup", "industry"];

  for (const role of roles) {
    console.log(`\n🧪 Testing Google OAuth for ${role}...`);

    const mockData = {
      googleId: `test_google_id_${role}_123`,
      email: `test.${role}@example.com`,
      firstName: "Test",
      lastName: `${role.charAt(0).toUpperCase() + role.slice(1)}`,
      profilePicture: "https://example.com/profile.jpg",
      role: role,
    };

    // Add role-specific fields according to schema
    if (role === "student") {
      mockData.contactNo = "1234567890";
      mockData.collegeName = "Test College";
      mockData.interestedField = "Computer Science";
      mockData.otherField = "Web Development";
    } else if (role === "college") {
      mockData.name = "Test College";
      mockData.location = "Test City";
      mockData.established = 2000;
      mockData.description = "A test college for testing purposes";
      mockData.website = "https://testcollege.edu";
    } else if (role === "startup") {
      mockData.startupName = "Test Startup";
      mockData.startupStage = "Early Stage";
      mockData.fundingStatus = "Seed";
      mockData.teamSize = "5-10";
      mockData.location = "Test City";
      mockData.website = "https://teststartup.com";
      mockData.contactNo = "1234567890";
      mockData.description = "A test startup for testing purposes";
    } else if (role === "industry") {
      mockData.companyName = "Test Industry Corp";
      mockData.industryType = "Technology";
      mockData.companySize = "100-500";
      mockData.designation = "Software Engineer";
      mockData.location = "Test City";
      mockData.website = "https://testindustry.com";
      mockData.contactNo = "1234567890";
      mockData.description = "A test industry company for testing purposes";
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/google/register",
        mockData
      );
      console.log(
        `✅ ${role} Google OAuth Registration successful:`,
        response.data.message
      );
    } catch (error) {
      console.error(
        `❌ ${role} Google OAuth Registration failed:`,
        error.response?.data || error.message
      );
    }
  }
}

// Run tests
async function runTests() {
  console.log("🚀 Starting Google OAuth Tests with Prisma...\n");

  await testGoogleOAuth();
  await testAllRoles();

  console.log("\n✅ All Google OAuth tests completed!");
}

runTests();
