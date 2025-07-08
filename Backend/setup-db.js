#!/usr/bin/env node

// This script runs migrations on the production database
// It can be triggered manually or as part of the deployment process

console.log("🚀 Setting up production database with posts tables...");

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === "true" ? {
    require: true,
    rejectUnauthorized: false,
  } : false,
});

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log("🔍 Checking database connection...");
    await client.query('SELECT NOW()');
    console.log("✅ Database connected successfully");

    console.log("🔄 Creating posts tables...");

    // Create posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        post_id SERIAL PRIMARY KEY,
        content TEXT,
        student_id INTEGER,
        college_id INTEGER, 
        industry_id INTEGER,
        alumni_id INTEGER,
        startup_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Posts table created");

    // Create post_media table
    await client.query(`
      CREATE TABLE IF NOT EXISTS post_media (
        media_id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
        media_type VARCHAR(10) CHECK (media_type IN ('image', 'video')),
        media_url VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Post media table created");

    // Create post_polls table
    await client.query(`
      CREATE TABLE IF NOT EXISTS post_polls (
        poll_id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
        option_text VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Post polls table created");

    // Create post_reactions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS post_reactions (
        reaction_id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
        reaction_type VARCHAR(10) CHECK (reaction_type IN ('like', 'love', 'share', 'wow', 'sad')),
        student_id INTEGER,
        college_id INTEGER,
        industry_id INTEGER,
        alumni_id INTEGER,
        startup_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Post reactions table created");

    // Create post_comments table  
    await client.query(`
      CREATE TABLE IF NOT EXISTS post_comments (
        comment_id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        student_id INTEGER,
        college_id INTEGER,
        industry_id INTEGER,
        alumni_id INTEGER,
        startup_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Post comments table created");

    // Create post_shares table
    await client.query(`
      CREATE TABLE IF NOT EXISTS post_shares (
        share_id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
        student_id INTEGER,
        college_id INTEGER,
        industry_id INTEGER,
        alumni_id INTEGER,
        startup_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Post shares table created");

    // Verify tables exist
    const tablesResult = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename LIKE 'post%' 
      ORDER BY tablename
    `);
    
    console.log("📋 Posts-related tables found:");
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.tablename}`);
    });

    console.log("🎉 Database setup completed successfully!");
    
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
