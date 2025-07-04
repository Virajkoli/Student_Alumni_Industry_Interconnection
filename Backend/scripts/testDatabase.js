const { sequelize } = require("../config/database");

async function testDatabase() {
  try {
    console.log("🔄 Testing database connection...");
    console.log(
      `Connecting to: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
    );

    await sequelize.authenticate();
    console.log("✅ Database connection established successfully!");

    console.log("🔄 Testing database sync...");
    await sequelize.sync({ alter: false });
    console.log("✅ Database models synced successfully!");

    console.log("🎉 Database is ready for use!");
    console.log("📊 Database Info:");
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Database: ${process.env.DB_DATABASE}`);
    console.log(`   Username: ${process.env.DB_USERNAME}`);
    console.log(`   SSL: ${process.env.DB_SSL}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("🔍 Error details:", error);
    process.exit(1);
  }
}

testDatabase();
