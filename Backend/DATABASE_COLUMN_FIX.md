# CRITICAL: Google Column Missing - Database Fix Required

## Problem
Getting error: "googleId column doesn't exist" when trying to register with Google.

## Root Cause
The database tables (Students and Colleges) don't have the Google authentication columns yet.

## SOLUTION (Choose One):

### Option 1: Automated Fix (Recommended)
1. **Double-click** `fix-database-columns.bat` in the Backend folder
2. **Wait for** "SUCCESS: All Google columns are now present!" message
3. **Restart your backend server**

### Option 2: Manual Command Line
1. **Open Command Prompt**
2. **Navigate to Backend:**
   ```bash
   cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
   ```
3. **Run the fix:**
   ```bash
   node fix-google-columns.js
   ```
4. **Look for success message**

### Option 3: Direct Database Access
1. **Connect to your PostgreSQL database** using pgAdmin, DBeaver, or similar tool:
   - Host: `dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com`
   - Database: `scaips_portal`
   - Username: `scaips`
   - Password: `wdDbXH0e86nefNAput4Q9s26pDXFKbNb`
   - Port: `5432`

2. **Run the SQL commands** from `manual-database-fix.sql`:
   ```sql
   ALTER TABLE "Students" ADD COLUMN IF NOT EXISTS "googleId" VARCHAR(255);
   ALTER TABLE "Students" ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500);
   ALTER TABLE "Colleges" ADD COLUMN IF NOT EXISTS "googleId" VARCHAR(255);
   ALTER TABLE "Colleges" ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500);
   ```

3. **Verify columns were added:**
   ```sql
   SELECT column_name, data_type FROM information_schema.columns 
   WHERE table_name = 'Students' AND column_name IN ('googleId', 'imageUrl');
   ```

## Expected Success Result
You should see:
- ✅ Added Students.googleId
- ✅ Added Students.imageUrl  
- ✅ Added Colleges.googleId
- ✅ Added Colleges.imageUrl
- ✅ SUCCESS: All Google columns are now present!

## After Fix
1. **Restart your backend server** (if running)
2. **Test Google authentication** in your frontend
3. **Should work without errors**

## If Still Getting Errors
1. **Check backend console** for detailed error messages
2. **Verify columns exist** using the SQL verification queries
3. **Make sure backend server is running** on port 5000

## Files Created
- `fix-google-columns.js` - Automated database fix script
- `fix-database-columns.bat` - One-click database fix
- `manual-database-fix.sql` - Manual SQL commands
- This guide - Step-by-step instructions

## Database Schema After Fix
```sql
-- Students table will have:
googleId VARCHAR(255) NULL
imageUrl VARCHAR(500) NULL

-- Colleges table will have:  
googleId VARCHAR(255) NULL
imageUrl VARCHAR(500) NULL
```

---

**Run the fix now, then test your Google authentication!**
