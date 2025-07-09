@echo off
echo ==========================================
echo    Backend Server Startup
echo ==========================================
echo.

echo Step 1: Navigate to Backend directory
cd /d "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"

echo Step 2: Install dependencies
npm install

echo Step 3: Add Google fields to database (if needed)
node add-google-fields.js

echo Step 4: Start the backend server
echo Backend server will start on http://localhost:5000
echo Keep this window open while testing
echo Press Ctrl+C to stop the server
echo.

npm start
