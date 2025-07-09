@echo off
echo ==========================================
echo    Database Google Columns Fix
echo ==========================================
echo.

echo Navigating to Backend directory...
cd /d "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"

echo.
echo Running database column fix...
echo This will add googleId and imageUrl columns to Students and Colleges tables
echo.

node fix-google-columns.js

echo.
echo ==========================================
echo    Fix Complete!
echo ==========================================
echo.

echo Next steps:
echo 1. If you saw "SUCCESS: All Google columns are now present!" above, restart your backend server
echo 2. If you saw any errors, you may need to add the columns manually
echo 3. Then test Google authentication again
echo.

pause
