const { Student, StudentAbout } = require("../config/database");
const bcrypt = require("bcryptjs");

async function testStudentProfile() {
  try {
    console.log("Testing student profile functionality...");

    // Check if any students exist
    const existingStudents = await Student.findAll();
    console.log(`Found ${existingStudents.length} existing students`);

    if (existingStudents.length > 0) {
      console.log("First student:", {
        id: existingStudents[0].id,
        first_name: existingStudents[0].first_name,
        last_name: existingStudents[0].last_name,
        email: existingStudents[0].email,
        college_name: existingStudents[0].college_name,
        interested_field: existingStudents[0].interested_field,
      });
    } else {
      console.log("No students found. Creating a test student...");

      // Create a test student
      const hashedPassword = await bcrypt.hash("test123", 10);
      const testStudent = await Student.create({
        first_name: "Test",
        last_name: "Student",
        email: "test@example.com",
        password: hashedPassword,
        contact_no: "1234567890",
        college_name: "Test College",
        interested_field: "Computer",
      });

      console.log("Test student created:", {
        id: testStudent.id,
        first_name: testStudent.first_name,
        last_name: testStudent.last_name,
        email: testStudent.email,
      });

      // Create about section for test student
      await StudentAbout.create({
        student_id: testStudent.id,
        summary: "Test student profile summary",
      });

      console.log("Student about section created");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

testStudentProfile();
