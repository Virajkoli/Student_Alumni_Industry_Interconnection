const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testPosts() {
  try {
    console.log("Testing posts query...");
    const result = await prisma.post.findMany({ take: 1 });
    console.log("Query successful:", result);
  } catch (err) {
    console.error("Query failed:", err.message);
    console.error("Full error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testPosts();
