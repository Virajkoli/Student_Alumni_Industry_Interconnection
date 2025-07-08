#!/bin/bash

echo "🚀 Starting SCAIPS Local Development Setup..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the Backend directory"
    exit 1
fi

echo "📊 Testing database connection..."
node scripts/testConnection.js

echo "🔄 Running database migrations..."
npx sequelize-cli db:migrate

echo "🌱 Setting up students table..."
node scripts/setupStudentsTable.js

echo "✅ Database setup complete!"
echo ""
echo "🏃‍♂️ Starting backend server..."
npm start




https://120148362755-dmisbc1usk06heg33nan4cklovcreqm6.apps.googleusercontent.com
