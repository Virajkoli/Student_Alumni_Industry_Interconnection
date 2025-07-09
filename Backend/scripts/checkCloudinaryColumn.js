// Quick script to check if cloudinary_public_id column exists
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
});

async function checkCloudinaryColumn() {
  try {
    const result = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'post_media' 
      AND column_name = 'cloudinary_public_id';
    `);

    if (result.rows.length > 0) {
      console.log("✅ cloudinary_public_id column exists");
    } else {
      console.log("❌ cloudinary_public_id column does not exist");
      // Add it manually
      await pool.query(`
        ALTER TABLE post_media 
        ADD COLUMN IF NOT EXISTS cloudinary_public_id VARCHAR(255);
      `);
      console.log("✅ Added cloudinary_public_id column");
    }
  } catch (error) {
    console.error("Error checking/adding column:", error);
  } finally {
    await pool.end();
  }
}

checkCloudinaryColumn();
