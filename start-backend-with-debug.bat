@echo off
echo Starting backend with GitHub OAuth debugging enabled...
echo.

REM Set environment variables for debugging
set DEBUG=express:*,oauth:*,github:*
set NODE_DEBUG=request,http,net
set LOG_LEVEL=debug

echo Backend URL: https://scaips-backend.onrender.com
echo Frontend URL: https://electrosoft-alumni.vercel.app
echo GitHub Client ID: Ov23liJDM6B9xuTvVtBa
echo GitHub Redirect URI: https://scaips-backend.onrender.com/api/auth/github/callback
echo.

echo First, let's run the route testing script...
node test-github-routes.js
echo.

echo Press any key to start the backend server...
pause > nul

cd Backend
echo Starting backend server with debug logging...
node server.js
