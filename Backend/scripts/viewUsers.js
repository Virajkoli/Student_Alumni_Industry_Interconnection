#!/usr/bin/env node

const { sequelize } = require("../config/database");

async function viewUsers() {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        id,
        email,
        "fullName",
        role,
        "isActive",
        "createdAt",
        "loginCount"
      FROM users 
      ORDER BY "createdAt" DESC;
    `);

    console.log("\n📊 Current Users in Database:");
    console.log("=".repeat(80));

    if (results.length === 0) {
      console.log('No users found. Run "npm run seed" to add demo users.');
      return;
    }

    results.forEach((user, index) => {
      console.log(`${index + 1}. ${user.fullName} (${user.email})`);
      console.log(
        `   Role: ${user.role} | Active: ${
          user.isActive ? "✅" : "❌"
        } | Logins: ${user.loginCount}`
      );
      console.log(
        `   Created: ${new Date(user.createdAt).toLocaleDateString()}`
      );
      console.log("-".repeat(60));
    });

    console.log(`\nTotal Users: ${results.length}`);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
  } finally {
    await sequelize.close();
  }
}

viewUsers();
