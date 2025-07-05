const { sequelize, Student } = require("../config/database");

const setupStudentsTable = async () => {
  try {
    console.log("🔄 Setting up students table...");

    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully");

    // Sync the Student model to create the table
    await Student.sync({ force: true }); // Use force: true to recreate the table
    console.log("✅ Students table created successfully");

    // Test creating a sample student
    const testStudent = await Student.create({
      first_name: "Test",
      last_name: "Student",
      email: "test@student.com",
      password: "password123",
      contact_no: "1234567890",
      college_name: "Test College",
      interested_field: "Computer",
    });

    console.log("✅ Test student created:", testStudent.email);

    // Clean up test data
    await testStudent.destroy();
    console.log("✅ Test student cleaned up");

    console.log("🎉 Students table setup completed successfully!");
  } catch (error) {
    console.error("❌ Error setting up students table:", error);
  } finally {
    await sequelize.close();
  }
};

// Run the setup
setupStudentsTable();
