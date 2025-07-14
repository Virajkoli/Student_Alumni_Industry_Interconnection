#!/bin/bash

# Setup script for Prisma migration
echo "Setting up Prisma for SCAIPS Backend..."

# Navigate to Backend directory
cd Backend

# Install Prisma dependencies
echo "Installing Prisma dependencies..."
npm install @prisma/client prisma

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Create migration (this will create the initial migration based on your schema)
echo "Creating initial migration..."
npx prisma migrate dev --name init

# Optional: Open Prisma Studio
echo "Setup complete! You can now run 'npx prisma studio' to view your database."

echo "Next steps:"
echo "1. Make sure your DATABASE_URL in .env is correct"
echo "2. Run 'npm run prisma:migrate' to apply migrations"
echo "3. Run 'npm run prisma:generate' to generate the client"
echo "4. Replace the old auth routes with the new ones"
echo "5. Update server.js to use the new auth routes"
