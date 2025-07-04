#!/usr/bin/env node

require("dotenv").config();

console.log("🔍 SCAIPS Database Connection Troubleshooter\n");

// Check environment variables
console.log("📋 Environment Variables:");
console.log(`DB_HOST: ${process.env.DB_HOST || "NOT SET"}`);
console.log(`DB_PORT: ${process.env.DB_PORT || "NOT SET"}`);
console.log(`DB_DATABASE: ${process.env.DB_DATABASE || "NOT SET"}`);
console.log(`DB_USERNAME: ${process.env.DB_USERNAME || "NOT SET"}`);
console.log(
  `DB_PASSWORD: ${process.env.DB_PASSWORD ? "***HIDDEN***" : "NOT SET"}`
);
console.log(`DB_SSL: ${process.env.DB_SSL || "NOT SET"}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || "NOT SET"}`);

// Check if this is a Render database
const isRenderDB =
  process.env.DB_HOST && process.env.DB_HOST.includes("render.com");
console.log(
  `\n🌐 Render Database Detected: ${isRenderDB ? "✅ YES" : "❌ NO"}`
);

if (isRenderDB && process.env.DB_SSL !== "true") {
  console.log("⚠️  WARNING: Render databases require SSL=true");
}

console.log("\n🔧 Testing Connection...");

// Test basic connection
const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
});

async function testConnection() {
  try {
    console.log("⏳ Connecting to database...");
    await client.connect();
    console.log("✅ Database connection successful!");

    // Test a simple query
    const result = await client.query("SELECT NOW() as current_time");
    console.log(`📅 Database time: ${result.rows[0].current_time}`);

    // Check if users table exists
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users'
    `);

    if (tableCheck.rows.length > 0) {
      console.log("✅ Users table exists");

      // Count users
      const userCount = await client.query(
        "SELECT COUNT(*) as count FROM users"
      );
      console.log(`👥 Total users in database: ${userCount.rows[0].count}`);
    } else {
      console.log(
        "⚠️  Users table not found - run migrations first: npm run migrate"
      );
    }
  } catch (error) {
    console.log("❌ Database connection failed:");
    console.log(`Error: ${error.message}`);

    // Provide specific solutions based on error type
    if (error.message.includes("SSL") || error.message.includes("TLS")) {
      console.log("\n🔒 SSL/TLS Error Solutions:");
      console.log("1. Ensure DB_SSL=true in your .env file");
      console.log(
        "2. Check that your host URL is correct (should include render.com)"
      );
      console.log("3. Verify your database credentials");
    } else if (error.message.includes("authentication")) {
      console.log("\n🔑 Authentication Error Solutions:");
      console.log("1. Double-check your DB_USERNAME and DB_PASSWORD");
      console.log("2. Make sure credentials match your Render database");
    } else if (
      error.message.includes("timeout") ||
      error.message.includes("ENOTFOUND")
    ) {
      console.log("\n🌐 Network Error Solutions:");
      console.log("1. Check your internet connection");
      console.log("2. Verify the DB_HOST URL is correct");
      console.log("3. Ensure Render database is running");
    }
  } finally {
    await client.end();
  }
}

testConnection()
  .then(() => {
    console.log("\n✅ Connection test completed");
    process.exit(0);
  })
  .catch((error) => {
    console.log("\n❌ Connection test failed:", error.message);
    process.exit(1);
  });
