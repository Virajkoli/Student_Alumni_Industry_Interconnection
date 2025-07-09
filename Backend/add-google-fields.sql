-- Add Google OAuth fields to Students table
ALTER TABLE "Students" ADD COLUMN "googleId" VARCHAR(255) UNIQUE;
ALTER TABLE "Students" ADD COLUMN "imageUrl" VARCHAR(500);

-- Add Google OAuth fields to Colleges table  
ALTER TABLE "Colleges" ADD COLUMN "googleId" VARCHAR(255) UNIQUE;
ALTER TABLE "Colleges" ADD COLUMN "imageUrl" VARCHAR(500);

-- Verify columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'Students' AND column_name IN ('googleId', 'imageUrl');

SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'Colleges' AND column_name IN ('googleId', 'imageUrl');
