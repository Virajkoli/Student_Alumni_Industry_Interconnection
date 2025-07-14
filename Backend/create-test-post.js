const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createTestPost() {
  try {
    console.log("Creating test post...");
    const result = await prisma.post.create({
      data: {
        title: "Test Post",
        content: "This is a test post to verify the posts table is working",
        authorId: 1,
        authorType: "STUDENT",
      },
    });
    console.log("Test post created:", result);
  } catch (err) {
    console.error("Failed to create test post:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestPost();
