@echo off
echo ==========================================
echo    Updated Google Column Mapping
echo ==========================================
echo.

echo Database columns identified:
echo - google_id (for Google user ID)
echo - profile_picture (for Google profile image)
echo.

echo Models updated with correct field mapping:
echo - google_id maps to google_id
echo - imageUrl maps to profile_picture
echo.

echo Verifying columns in database...
cd /d "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
node verify-google-columns.js

echo.
echo ==========================================
echo    Ready to Test!
echo ==========================================
echo.

echo Next steps:
echo 1. Restart your backend server if running
echo 2. Test Google authentication
echo 3. Should work without column errors now!
echo.

pause
