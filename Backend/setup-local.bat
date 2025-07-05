@echo off
echo 🚀 Starting SCAIPS Local Development Setup...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this script from the Backend directory
    exit /b 1
)

echo 📊 Testing database connection...
node scripts/testConnection.js

echo 🔄 Running database migrations...
npx sequelize-cli db:migrate

echo 🌱 Setting up students table...
node scripts/setupStudentsTable.js

echo ✅ Database setup complete!
echo.
echo 🏃‍♂️ Starting backend server...
npm start
