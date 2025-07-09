# URGENT: Backend Server Not Running - Fix Required

## Problem
You're getting "Failed to fetch" error because the backend server is not running on `http://localhost:5000`.

## Immediate Solution

### Step 1: Start Backend Server
**Open a NEW Command Prompt or PowerShell window** (keep it separate from your frontend) and run:

```bash
cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
npm start
```

**OR** simply double-click: `start-backend-now.bat` in the Backend folder

### Step 2: Wait for Success Message
You should see:
```
🚀 Server running on port 5000
✅ Database connection successful
```

### Step 3: Test Backend Connection
In another terminal, run:
```bash
cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
node test-backend-connection.js
```

### Step 4: Test Google Authentication
- Go back to your frontend (http://localhost:5173)
- Try the Google authentication flow again
- It should work now!

## What's Happening

1. **Frontend** (React app) is running on `http://localhost:5173`
2. **Backend** (Node.js/Express) MUST be running on `http://localhost:5000`
3. **Your apiService.js** is configured to call `http://localhost:5000`
4. **If backend is not running** → "Failed to fetch" error

## Common Issues & Solutions

### Issue 1: Port Already in Use
If you get "Port 5000 is already in use":
```bash
# Kill any process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Issue 2: Database Connection Fails
If you get database errors:
```bash
# Run the database migration first
node add-google-fields.js
# Then start the server
npm start
```

### Issue 3: Module Not Found
If you get "Cannot find module" errors:
```bash
# Install dependencies
npm install
# Then start the server
npm start
```

## Expected Backend Console Output

When backend starts successfully:
```
🚀 Server running on port 5000
✅ Database connection successful
✅ All routes loaded including:
  - POST /api/auth/google/register
  - POST /api/auth/google/login
```

When Google auth is called:
```
=== GOOGLE REGISTRATION ===
Request body: { email: "user@example.com", firstName: "John", ... }
```

## Quick Test Commands

Test if backend is running:
```bash
curl http://localhost:5000/api/test
```

Test Google register endpoint:
```bash
curl -X POST http://localhost:5000/api/auth/google/register -H "Content-Type: application/json" -d '{"test": "data"}'
```

## Files Created to Help

- `start-backend-now.bat` - One-click backend startup
- `test-backend-connection.js` - Test if backend is accessible
- `add-google-fields.js` - Fix database if needed

## Next Steps

1. **Start backend server** using the batch file or npm command
2. **Keep the backend terminal open** (don't close it)
3. **Test Google authentication** in your frontend
4. **Check both frontend and backend console logs** for any errors

## If Still Not Working

1. Check if any antivirus/firewall is blocking port 5000
2. Try a different port by changing `PORT=5001` in Backend/.env
3. Update frontend apiService.js to use the new port
4. Restart both frontend and backend

---

**Remember: Both frontend AND backend must be running simultaneously for Google authentication to work!**
