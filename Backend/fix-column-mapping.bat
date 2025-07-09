@echo off
echo ==========================================
echo    Google Column Mapping Fix
echo ==========================================
echo.

echo The issue was a naming mismatch:
echo - Database columns: google_id, image_url (snake_case)
echo - Model fields: googleId, imageUrl (camelCase)
echo.

echo Step 1: Checking/adding missing columns...
cd /d "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
node check-google-columns.js

echo.
echo Step 2: Models have been updated with field mapping:
echo - googleId maps to google_id column
echo - imageUrl maps to image_url column
echo.

echo ==========================================
echo    Fix Complete!
echo ==========================================
echo.

echo Next steps:
echo 1. Restart your backend server if it's running
echo 2. Test Google authentication
echo 3. Should work now!
echo.

pause
