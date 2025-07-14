@echo off
echo Setting up Prisma for SCAIPS Backend...

REM Navigate to Backend directory
cd Backend

REM Install Prisma dependencies
echo Installing Prisma dependencies...
npm install @prisma/client prisma

REM Generate Prisma client
echo Generating Prisma client...
npx prisma generate

REM Create migration
echo Creating initial migration...
npx prisma migrate dev --name init

echo Setup complete!
echo.
echo Next steps:
echo 1. Make sure your DATABASE_URL in .env is correct
echo 2. Run 'npm run prisma:migrate' to apply migrations
echo 3. Run 'npm run prisma:generate' to generate the client
echo 4. Replace the old auth routes with the new ones
echo 5. Update server.js to use the new auth routes
echo.
echo You can run 'npx prisma studio' to view your database.

pause
