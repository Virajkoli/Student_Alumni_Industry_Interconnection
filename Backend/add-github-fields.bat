@echo off

echo =============================================
echo Adding GitHub Authentication Fields to Database
echo =============================================

echo Running GitHub Authentication Fields Migration...
npx sequelize-cli db:migrate --name 20250710000001-add-github-auth-fields.js

if %ERRORLEVEL% NEQ 0 (
  echo Error running migration!
  pause
  exit /b 1
)

echo.
echo =============================================
echo GitHub Authentication Fields Added Successfully!
echo =============================================
echo.

pause
