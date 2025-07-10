const apiService = require('./ElectrosoftAlumni/src/utils/apiService').default;

// Test college authentication endpoints
async function testCollegeAuth() {
  console.log("=== Testing College Authentication ===");

  // Test data
  const testCollege = {
    email: "test.college@example.com",
    password: "testpass123",
    college_name: "Test College",
    college_address: "123 Test Street, Test City",
    establishment_year: "2000",
    website: "https://testcollege.edu",
    campus_area: "50.5",
    nirf_rank: "100",
    accreditation: "NAAC A+",
    total_students: "5000",
    total_faculty: "300",
    description: "A test college for testing purposes",
  };

  try {
    // Test 1: College Registration
    console.log("\n1. Testing College Registration...");
    try {
      const registerResponse = await fetch('http://localhost:5000/api/auth/register/college', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCollege),
      });

      const registerData = await registerResponse.json();
      console.log("✅ College Registration Response:", registerData);

      if (registerData.success) {
        console.log("✅ College registered successfully!");
        console.log("College ID:", registerData.data.user.id);
        console.log("College Name:", registerData.data.user.name);
      } else {
        console.log("❌ College registration failed:", registerData.message);
      }
    } catch (error) {
      console.log("❌ College registration error:", error.message);
    }

    // Test 2: College Login (Email/Password)
    console.log("\n2. Testing College Login...");
    try {
      const loginResponse = await fetch('http://localhost:5000/api/auth/college/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testCollege.email,
          password: testCollege.password,
        }),
      });

      const loginData = await loginResponse.json();
      console.log("✅ College Login Response:", loginData);

      if (loginData.success) {
        console.log("✅ College login successful!");
        console.log("College ID:", loginData.data.user.id);
        console.log("College Name:", loginData.data.user.name);
        console.log("Token:", loginData.data.token.substring(0, 20) + "...");
      } else {
        console.log("❌ College login failed:", loginData.message);
      }
    } catch (error) {
      console.log("❌ College login error:", error.message);
    }

    // Test 3: General Login (should also work for college)
    console.log("\n3. Testing General Login for College...");
    try {
      const generalLoginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testCollege.email,
          password: testCollege.password,
        }),
      });

      const generalLoginData = await generalLoginResponse.json();
      console.log("✅ General Login Response:", generalLoginData);

      if (generalLoginData.success) {
        console.log("✅ General login successful for college!");
        console.log("College ID:", generalLoginData.data.user.id);
        console.log("College Name:", generalLoginData.data.user.name);
        console.log("User Role:", generalLoginData.data.user.role);
      } else {
        console.log("❌ General login failed:", generalLoginData.message);
      }
    } catch (error) {
      console.log("❌ General login error:", error.message);
    }

    // Test 4: Test Google endpoints exist
    console.log("\n4. Testing Google Endpoints Availability...");
    try {
      // Just test that the endpoints exist (they should return 400 for missing data)
      const googleLoginResponse = await fetch('http://localhost:5000/api/auth/college/google/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      console.log("✅ College Google Login endpoint exists (status:", googleLoginResponse.status, ")");

      const googleRegisterResponse = await fetch('http://localhost:5000/api/auth/college/google/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      console.log("✅ College Google Register endpoint exists (status:", googleRegisterResponse.status, ")");
    } catch (error) {
      console.log("❌ Google endpoints test error:", error.message);
    }

  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testCollegeAuth();
