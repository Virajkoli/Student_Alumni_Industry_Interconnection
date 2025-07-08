require("dotenv").config();
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");

// Database connection using environment variables
const pool = new Pool({
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "scaips_dev",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
});

// Simple migration runner
async function runMigrations() {
  const client = await pool.connect();

  try {
    console.log("🔄 Starting database migrations...");

    // Create migration tracking table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS migration_history (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const migrationsDir = path.join(__dirname, "../migrations");
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".js"))
      .sort();

    for (const file of migrationFiles) {
      const migrationName = path.basename(file, ".js");

      // Check if migration has already been run
      const result = await client.query(
        "SELECT id FROM migration_history WHERE migration_name = $1",
        [migrationName]
      );

      if (result.rows.length > 0) {
        console.log(`⏭️  Skipping ${migrationName} (already executed)`);
        continue;
      }

      console.log(`🔄 Running migration: ${migrationName}`);

      try {
        // Simple SQL execution for our posts tables migration
        if (migrationName === "20250707000002-create-posts-tables") {
          await runPostsTablesMigration(client);
        } else if (
          migrationName ===
          "20250708000001-add-unique-constraint-post-reactions"
        ) {
          await runReactionsConstraintMigration(client);
        }

        // Mark migration as completed
        await client.query(
          "INSERT INTO migration_history (migration_name) VALUES ($1)",
          [migrationName]
        );

        console.log(`✅ Completed migration: ${migrationName}`);
      } catch (migrationError) {
        console.error(
          `❌ Error in migration ${migrationName}:`,
          migrationError
        );
        throw migrationError;
      }
    }

    console.log("✅ All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

async function runPostsTablesMigration(client) {
  // Create posts table
  await client.query(`
    CREATE TABLE IF NOT EXISTS posts (
      post_id SERIAL PRIMARY KEY,
      content TEXT,
      student_id INTEGER REFERENCES students(id),
      college_id INTEGER REFERENCES college(id),
      industry_id INTEGER REFERENCES industry(id),
      alumni_id INTEGER REFERENCES alumni(id),
      startup_id INTEGER REFERENCES startup(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

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

  // Create post_reactions table
  await client.query(`
    CREATE TABLE IF NOT EXISTS post_reactions (
      reaction_id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
      reaction_type VARCHAR(10) CHECK (reaction_type IN ('like', 'love', 'share', 'wow', 'sad')),
      student_id INTEGER REFERENCES students(id),
      college_id INTEGER REFERENCES college(id),
      industry_id INTEGER REFERENCES industry(id),
      alumni_id INTEGER REFERENCES alumni(id),
      startup_id INTEGER REFERENCES startup(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create post_comments table
  await client.query(`
    CREATE TABLE IF NOT EXISTS post_comments (
      comment_id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      student_id INTEGER REFERENCES students(id),
      college_id INTEGER REFERENCES college(id),
      industry_id INTEGER REFERENCES industry(id),
      alumni_id INTEGER REFERENCES alumni(id),
      startup_id INTEGER REFERENCES startup(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create post_shares table
  await client.query(`
    CREATE TABLE IF NOT EXISTS post_shares (
      share_id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
      student_id INTEGER REFERENCES students(id),
      college_id INTEGER REFERENCES college(id),
      industry_id INTEGER REFERENCES industry(id),
      alumni_id INTEGER REFERENCES alumni(id),
      startup_id INTEGER REFERENCES startup(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Created all posts-related tables");
}

async function runReactionsConstraintMigration(client) {
  // This will be implemented later when we want to add unique constraints
  console.log("⏭️  Skipping reactions constraint migration for now");
}

// Run migrations if this script is executed directly
if (require.main === module) {
  runMigrations().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = { runMigrations };
