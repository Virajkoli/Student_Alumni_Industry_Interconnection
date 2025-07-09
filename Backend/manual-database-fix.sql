-- Manual Database Fix for Google Authentication
-- Run these commands in pgAdmin, DBeaver, or any PostgreSQL client

-- Connect to your database first:
-- Host: dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com
-- Database: scaips_portal
-- Username: scaips
-- Password: wdDbXH0e86nefNAput4Q9s26pDXFKbNb
-- Port: 5432

-- Add Google columns to Students table
ALTER TABLE "Students" ADD COLUMN IF NOT EXISTS "googleId" VARCHAR(255);
ALTER TABLE "Students" ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500);

-- Add Google columns to Colleges table
ALTER TABLE "Colleges" ADD COLUMN IF NOT EXISTS "googleId" VARCHAR(255);
ALTER TABLE "Colleges" ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500);

-- Add unique constraint for googleId (optional but recommended)
ALTER TABLE "Students" ADD CONSTRAINT "students_googleid_unique" UNIQUE ("googleId");
ALTER TABLE "Colleges" ADD CONSTRAINT "colleges_googleid_unique" UNIQUE ("googleId");

-- Verify columns were added
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns 
WHERE table_name = 'Students' AND column_name IN ('googleId', 'imageUrl')
ORDER BY column_name;

SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns 
WHERE table_name = 'Colleges' AND column_name IN ('googleId', 'imageUrl')
ORDER BY column_name;

-- Expected result: You should see 4 rows total (2 for Students, 2 for Colleges)
-- googleId: VARCHAR(255), nullable
-- imageUrl: VARCHAR(500), nullable
