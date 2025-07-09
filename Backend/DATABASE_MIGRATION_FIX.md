# Database Migration Fix for Google Auth

## Problem
The error "column 'googleId' does not exist" means the database tables don't have the Google authentication fields yet.

## Solution: Manual Database Migration

### Option 1: Using Command Line (Recommended)

1. **Open a new Command Prompt or PowerShell window**
2. **Navigate to the Backend directory:**
   ```bash
   cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
   ```

3. **Run the custom migration script:**
   ```bash
   node add-google-fields.js
   ```

4. **OR run the SQL script directly:**
   ```bash
   node -e "
   const { sequelize } = require('./config/database');
   (async () => {
     try {
       await sequelize.query('ALTER TABLE \"Students\" ADD COLUMN \"googleId\" VARCHAR(255) UNIQUE;');
       await sequelize.query('ALTER TABLE \"Students\" ADD COLUMN \"imageUrl\" VARCHAR(500);');
       await sequelize.query('ALTER TABLE \"Colleges\" ADD COLUMN \"googleId\" VARCHAR(255) UNIQUE;');
       await sequelize.query('ALTER TABLE \"Colleges\" ADD COLUMN \"imageUrl\" VARCHAR(500);');
       console.log('✅ Google fields added successfully!');
     } catch (error) {
       console.log('Error (might be expected if columns exist):', error.message);
     } finally {
       await sequelize.close();
     }
   })();
   "
   ```

### Option 2: Using Database Client (pgAdmin, DBeaver, etc.)

1. **Connect to your PostgreSQL database** using:
   - Host: `dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com`
   - Database: `scaips_portal`
   - Username: `scaips`
   - Password: `wdDbXH0e86nefNAput4Q9s26pDXFKbNb`
   - Port: `5432`

2. **Run the following SQL commands:**
   ```sql
   -- Add Google OAuth fields to Students table
   ALTER TABLE "Students" ADD COLUMN "googleId" VARCHAR(255) UNIQUE;
   ALTER TABLE "Students" ADD COLUMN "imageUrl" VARCHAR(500);

   -- Add Google OAuth fields to Colleges table  
   ALTER TABLE "Colleges" ADD COLUMN "googleId" VARCHAR(255) UNIQUE;
   ALTER TABLE "Colleges" ADD COLUMN "imageUrl" VARCHAR(500);
   ```

3. **Verify the columns were added:**
   ```sql
   SELECT column_name, data_type, is_nullable 
   FROM information_schema.columns 
   WHERE table_name = 'Students' AND column_name IN ('googleId', 'imageUrl');

   SELECT column_name, data_type, is_nullable 
   FROM information_schema.columns 
   WHERE table_name = 'Colleges' AND column_name IN ('googleId', 'imageUrl');
   ```

### Option 3: Using Sequelize CLI

1. **Navigate to Backend directory:**
   ```bash
   cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
   ```

2. **Run migrations:**
   ```bash
   npx sequelize-cli db:migrate
   ```

## After Migration

1. **Restart your backend server** (if running)
2. **Test the Google authentication** in your frontend
3. **Check backend logs** for any other errors

## Expected Success Messages

You should see:
- "✅ Google fields added successfully!" 
- Backend logs should show Google registration working
- Frontend should complete the registration process

## If You Still Get Errors

Check if the columns exist by running:
```sql
\d "Students"
\d "Colleges"
```

Or use the verification queries above to confirm the columns are present.

## Files Created for This Fix

- `add-google-fields.js` - Node.js script to add columns
- `add-google-fields.sql` - SQL commands to add columns
- `run-google-migration.js` - Alternative migration script
- `20250709000002-add-google-auth-fields.js` - Sequelize migration file
