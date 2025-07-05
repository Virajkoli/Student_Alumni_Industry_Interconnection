const { sequelize, Student, User } = require("../config/database");

const setupDatabase = async () => {
  try {
    console.log("🔄 Setting up database for production...");

    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully");

    // Check if models are loaded
    console.log("📊 Available models:", Object.keys(sequelize.models));

    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized successfully");

    // Test Student model specifically
    if (Student) {
      console.log("✅ Student model is available");

      // Try to find or create a test student
      const testData = {
        first_name: "Test",
        last_name: "Student",
        email: "test@example.com",
        password: "password123",
        contact_no: "1234567890",
        college_name: "Test College",
        interested_field: "Computer",
      };

      const [student, created] = await Student.findOrCreate({
        where: { email: testData.email },
        defaults: testData,
      });

      if (created) {
        console.log("✅ Test student created successfully");
        // Clean up test data
        await student.destroy();
        console.log("✅ Test student cleaned up");
      } else {
        console.log("✅ Student table already exists");
      }
    } else {
      console.error("❌ Student model not found!");
    }

    // Test User model
    if (User) {
      console.log("✅ User model is available");
    } else {
      console.error("❌ User model not found!");
    }

    console.log("🎉 Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    console.error("Error details:", error.message);
    console.error("Stack trace:", error.stack);
  } finally {
    await sequelize.close();
  }
};

// Run the setup
setupDatabase();
