const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("Testing Prisma connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    // Test query
    const studentCount = await prisma.student.count();
    console.log(`📊 Current students in database: ${studentCount}`);

    const collegeCount = await prisma.college.count();
    console.log(`📊 Current colleges in database: ${collegeCount}`);

    const startupCount = await prisma.startup.count();
    console.log(`📊 Current startups in database: ${startupCount}`);

    const industryCount = await prisma.industry.count();
    console.log(`📊 Current industries in database: ${industryCount}`);

    // Test Post model connection
    const posts = await prisma.post.findMany({
      take: 1,
    });
    console.log("Connection successful. Posts:", posts);

    console.log("\n🎉 Prisma setup completed successfully!");
    console.log("💡 You can now:");
    console.log("   - Use the new authentication endpoints");
    console.log("   - Register users with role-based system");
    console.log("   - Access Prisma Studio at: http://localhost:5555");
  } catch (error) {
    console.error("❌ Connection test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
