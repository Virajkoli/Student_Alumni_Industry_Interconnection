@echo off
echo ==========================================
echo    Google Auth Database Migration Fix
echo ==========================================
echo.

echo Step 1: Checking current directory...
cd /d "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
echo ✅ Changed to Backend directory: %cd%
echo.

echo Step 2: Installing dependencies (if needed)...
npm install >nul 2>&1
echo ✅ Dependencies checked
echo.

echo Step 3: Adding Google auth fields to database...
echo This will add google_id and imageUrl columns to Students and Colleges tables
echo.

node add-google-fields.js

echo.
echo Step 4: Verifying database changes...
echo If you see "Google fields added successfully" above, the migration worked!
echo.

echo ==========================================
echo    Migration Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Start your backend server: npm start
echo 2. Test Google authentication in your frontend
echo 3. Check backend logs for any errors
echo.

pause
