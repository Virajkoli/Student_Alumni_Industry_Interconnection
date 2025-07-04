#!/usr/bin/env node

const { sequelize } = require("../config/database");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function addUser() {
  try {
    console.log("\n👤 Add New User to SCAIPS Database");
    console.log("=".repeat(40));

    const email = await question("📧 Email: ");
    const fullName = await question("👤 Full Name: ");
    const password = await question("🔐 Password: ");

    console.log("\n📋 Available Roles:");
    console.log("1. student");
    console.log("2. alumni");
    console.log("3. college");
    console.log("4. industry");
    console.log("5. startup");

    const roleChoice = await question("🎭 Choose role (1-5): ");
    const roles = ["student", "alumni", "college", "industry", "startup"];
    const role = roles[parseInt(roleChoice) - 1];

    if (!role) {
      console.log("❌ Invalid role selection");
      rl.close();
      return;
    }

    const bio = await question("📝 Bio (optional): ");

    // Hash password
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate UUID
    const { v4: uuidv4 } = require("uuid");
    const userId = uuidv4();

    // Insert user
    await sequelize.query(
      `
      INSERT INTO users (
        id, email, password, "fullName", role, bio, 
        "isActive", "isEmailVerified", "profileVisibility",
        "emailNotifications", "pushNotifications", "loginCount",
        "createdAt", "updatedAt"
      ) VALUES (
        :id, :email, :password, :fullName, :role, :bio,
        true, true, 'public',
        true, true, 0,
        NOW(), NOW()
      )
    `,
      {
        replacements: {
          id: userId,
          email,
          password: hashedPassword,
          fullName,
          role,
          bio: bio || `${role} user on SCAIPS platform`,
        },
      }
    );

    console.log("\n✅ User created successfully!");
    console.log(`👤 Name: ${fullName}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🎭 Role: ${role}`);
    console.log(`🆔 ID: ${userId}`);
  } catch (error) {
    if (error.message.includes("duplicate key")) {
      console.log("❌ Error: Email already exists in database");
    } else {
      console.log("❌ Error creating user:", error.message);
    }
  } finally {
    rl.close();
    await sequelize.close();
  }
}

addUser();
