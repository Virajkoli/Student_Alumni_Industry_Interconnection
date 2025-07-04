#!/usr/bin/env node

const {
  sequelize,
  testConnection,
  syncDatabase,
} = require("../config/database");

async function setupRenderDatabase() {
  console.log("🚀 Setting up Render PostgreSQL Database...\n");

  // Test connection
  console.log("1️⃣ Testing database connection...");
  const connectionSuccess = await testConnection();

  if (!connectionSuccess) {
    console.log("\n❌ Database connection failed!");
    console.log(
      "Please check your .env file and ensure you have the correct Render database credentials:"
    );
    console.log("- DB_USERNAME");
    console.log("- DB_PASSWORD");
    console.log("- DB_HOST");
    console.log("- DB_DATABASE");
    console.log("- DB_SSL=true");
    process.exit(1);
  }

  // Sync database (create tables)
  console.log("\n2️⃣ Creating database tables...");
  const syncSuccess = await syncDatabase(false);

  if (!syncSuccess) {
    console.log("\n❌ Database sync failed!");
    process.exit(1);
  }

  console.log("\n✅ Database setup completed successfully!");
  console.log(
    "🎉 Your friends can now use the shared database for registration and login."
  );

  // Close connection
  await sequelize.close();
  process.exit(0);
}

// Handle errors
process.on("unhandledRejection", (error) => {
  console.error("\n❌ Unhandled error:", error.message);
  process.exit(1);
});

// Run setup
setupRenderDatabase().catch((error) => {
  console.error("\n❌ Setup failed:", error.message);
  process.exit(1);
});
