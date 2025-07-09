// Script to manually create colleges table and mark migration as done
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? {
    require: true,
    rejectUnauthorized: false,
  } : false,
});

async function createCollegeTable() {
  const client = await pool.connect();
  try {
    console.log('Creating colleges table...');
    
    // Drop the table if it exists (to start fresh)
    await client.query('DROP TABLE IF EXISTS colleges CASCADE');
    
    // Create the colleges table
    await client.query(`
      CREATE TABLE colleges (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(100),
        established INTEGER,
        "campusArea" DECIMAL(10,2),
        "nirfRank" INTEGER,
        accreditation VARCHAR(100),
        "totalStudents" INTEGER,
        "totalFaculty" INTEGER,
        website VARCHAR(255),
        "logoUrl" VARCHAR(255),
        "backgroundUrl" VARCHAR(255),
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
        "lastLogin" TIMESTAMP WITH TIME ZONE,
        "loginCount" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Colleges table created successfully');
    
    // Mark the migration as completed
    await client.query(`
      INSERT INTO "SequelizeMeta" (name) 
      VALUES ('20250708000002-create-colleges-table.js')
      ON CONFLICT (name) DO NOTHING
    `);
    
    console.log('✅ Migration marked as completed');
    
    // Test the table
    const result = await client.query('SELECT COUNT(*) FROM colleges');
    console.log('✅ Table test successful, row count:', result.rows[0].count);
    
  } catch (error) {
    console.error('❌ Error creating colleges table:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

createCollegeTable();
