@echo off
echo ==========================================
echo    Backend Server Startup Script
echo ==========================================
echo.

echo Step 1: Checking if Node.js is installed...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)
echo ✅ Node.js is installed
echo.

echo Step 2: Changing to Backend directory...
cd /d "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
if %errorlevel% neq 0 (
    echo ERROR: Cannot access Backend directory
    pause
    exit /b 1
)
echo ✅ Changed to Backend directory
echo.

echo Step 3: Installing/updating dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

echo Step 4: Running database migrations...
npx sequelize-cli db:migrate
if %errorlevel% neq 0 (
    echo WARNING: Database migration failed - this might be expected
)
echo ✅ Migration attempt completed
echo.

echo Step 5: Starting the backend server...
echo Backend will start on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
echo ==========================================
echo    Starting Backend Server...
echo ==========================================
echo.

npm start
