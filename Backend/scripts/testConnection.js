#!/usr/bin/env node

// Simple connection test for SCAIPS database
const { Client } = require("pg");

console.log("🔍 Testing SCAIPS Database Connection...\n");

// Connection configuration
const config = {
  user: "scaips",
  password: "wdDbXH0e86nefNAput4Q9s26pDXFKbNb",
  host: "dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com",
  port: 5432,
  database: "scaips_portal",
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

async function testConnection() {
  const client = new Client(config);

  try {
    console.log("⏳ Connecting to database...");
    await client.connect();

    console.log("✅ Connection successful!");

    // Test query
    console.log("⏳ Testing query...");
    const result = await client.query(
      "SELECT COUNT(*) as user_count FROM users"
    );

    console.log(
      `✅ Query successful! Found ${result.rows[0].user_count} users in database`
    );
    console.log("\n🎉 Database connection is working perfectly!");
    console.log("📋 You can now use these same credentials in pgAdmin");
  } catch (error) {
    console.log("❌ Connection failed!");
    console.log("📋 Error details:", error.message);

    if (error.message.includes("password authentication failed")) {
      console.log("\n🔧 Solution: Double-check your credentials");
      console.log("   - Username: scaips");
      console.log("   - Password: wdDbXH0e86nefNAput4Q9s26pDXFKbNb");
      console.log(
        "   - Host: dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com"
      );
    } else if (error.message.includes("SSL")) {
      console.log("\n🔧 Solution: SSL configuration issue");
      console.log("   - Make sure SSL is enabled");
      console.log("   - Check your internet connection");
    } else {
      console.log("\n🔧 Solution: Check network connection and try again");
    }
  } finally {
    await client.end();
  }
}

testConnection();
