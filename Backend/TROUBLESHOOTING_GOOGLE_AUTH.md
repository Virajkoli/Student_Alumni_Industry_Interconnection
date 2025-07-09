# Google Authentication 404 Error - Troubleshooting Guide

## Problem
Getting 404 error when trying to access `/api/auth/google/register` endpoint:
```
POST https://scaips-backend.onrender.com/api/auth/google/register 404 (Not Found)
```

## Root Cause
The backend server is either:
1. Not running locally
2. Not deployed properly on Render
3. Missing the Google auth routes

## Quick Fix - Run Backend Locally

### Step 1: Start Backend Server
1. Open a new terminal/command prompt
2. Navigate to the Backend directory:
   ```bash
   cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Alternative: Use the Batch Script
Double-click `start-backend.bat` in the Backend folder to automatically run all the above steps.

### Step 2: Update Frontend Configuration
The frontend is already configured to use `http://localhost:5000` in `src/utils/apiService.js`.

### Step 3: Test the Fix
1. Open your browser to `http://localhost:5173` (frontend)
2. Try the Google authentication flow
3. Check backend console for logs

## Files Updated for Google Auth

### Backend Files:
- `routes/auth.js` - Added Google login/register endpoints
- `models/students.js` - Added googleId and imageUrl fields
- `models/College.js` - Added googleId and imageUrl fields
- `migrations/20250709000002-add-google-auth-fields.js` - Database migration

### Frontend Files:
- `src/utils/apiService.js` - Updated to use localhost
- `src/components/GoogleSignInButton.jsx` - Google sign-in component
- `src/utils/googleAuth.js` - Google authentication utilities
- `src/contexts/AuthContext.jsx` - Updated for Google auth

## Testing Endpoints

### Test Backend Manually:
1. **Health Check**: `GET http://localhost:5000/api/test`
2. **Google Register**: `POST http://localhost:5000/api/auth/google/register`
3. **Google Login**: `POST http://localhost:5000/api/auth/google/login`

### Test with curl:
```bash
curl -X GET http://localhost:5000/api/test
```

### Test with Postman:
- URL: `http://localhost:5000/api/auth/google/register`
- Method: POST
- Body: JSON with Google user data

## Environment Variables Required

### Backend (.env):
```
NODE_ENV=development
PORT=5000
GOOGLE_CLIENT_ID=120148362755-dmisbc1usk06heg33nan4cklovcreqm6.apps.googleusercontent.com
DB_USERNAME=scaips
DB_PASSWORD=wdDbXH0e86nefNAput4Q9s26pDXFKbNb
DB_DATABASE=scaips_portal
DB_HOST=dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com
DB_PORT=5432
DB_SSL=true
JWT_SECRET=scaips_dev_secret_key_2024_change_in_production
```

### Frontend (.env):
```
VITE_GOOGLE_CLIENT_ID=120148362755-dmisbc1usk06heg33nan4cklovcreqm6.apps.googleusercontent.com
VITE_API_BASE_URL=http://localhost:5000
```

## Common Issues and Solutions

### 1. "Cannot find module" errors
```bash
cd Backend
npm install
```

### 2. Database connection errors
- Check if PostgreSQL is accessible
- Verify database credentials in `.env`
- Try running migrations: `npx sequelize-cli db:migrate`

### 3. Port already in use
- Change PORT in Backend/.env to a different port (e.g., 5001)
- Update frontend API_BASE_URL accordingly

### 4. CORS errors
- Backend already configured for `http://localhost:5173`
- Check console for CORS-related errors

## Next Steps After Fix

1. **Test locally**: Verify Google auth works with local backend
2. **Deploy to Render**: Update the deployed backend with new routes
3. **Update frontend**: Switch back to production URL when ready
4. **Database migrations**: Run migrations on production database

## Debug Commands

### Check if backend is running:
```bash
curl -X GET http://localhost:5000/api/test
```

### Check specific route:
```bash
curl -X POST http://localhost:5000/api/auth/google/register -H "Content-Type: application/json" -d '{"test": "data"}'
```

### View backend logs:
Check the terminal where you started the backend server for detailed logs.

## Expected Backend Console Output

When backend starts successfully:
```
🚀 Server running on port 5000
✅ Database connection successful
✅ All routes loaded
```

When Google auth endpoint is hit:
```
=== GOOGLE REGISTRATION ===
Request body: { email: "user@example.com", ... }
```
