# GitHub OAuth Fix Guide

## Current Issue
The GitHub OAuth integration is failing with a "Not Found" error when redirected to:
`/api/auth/github/callback?code=...`

## Step-by-Step Fix

### 1. Verify Backend Routes

The backend routes should be mounted correctly. Let's run a test script to verify:

```bash
cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
node test-routes.js
```

### 2. Test All Possible Endpoints

Run this script to test different possible endpoint variations:

```bash
cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
node test-github-endpoints.js
```

### 3. Modify the Backend GitHub Route Registration

Since we're getting a "Not Found" error, the most likely issue is that your backend routes aren't correctly registered. Edit `server.js`:

```javascript
// OLD:
app.use("/api", githubAuthRoutes);

// NEW:
app.use("/api/auth", githubAuthRoutes);
```

After making this change, update the route definitions in `github-auth.js`:

```javascript
// OLD:
router.get("/auth/github", (req, res) => { ... });
router.get("/auth/github/callback", async (req, res) => { ... });

// NEW:
router.get("/github", (req, res) => { ... });
router.get("/github/callback", async (req, res) => { ... });
```

### 4. Double-Check GitHub OAuth App Settings

Go to your GitHub Developer Settings:
https://github.com/settings/developers

Make sure the Authorization callback URL exactly matches:
`https://scaips-backend.onrender.com/api/auth/github/callback`

### 5. Update Frontend Integration 

Make sure your frontend GitHubAuth service is using the correct URLs:

```javascript
// In ElectrosoftAlumni/src/utils/githubAuth.js
constructor() {
  this.clientId = 'Ov23liJDM6B9xuTvVtBa';
  this.redirectUri = 'https://scaips-backend.onrender.com/api/auth/github/callback';
  this.apiBaseUrl = 'https://scaips-backend.onrender.com';
}
```

### 6. Test Using a Local Backend Server

Try running the backend locally to see detailed logs:

```bash
cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection"
.\start-backend-with-debug.bat
```

### 7. Check Network Traffic

Use the browser's developer tools (F12) to monitor network requests:
1. Open Chrome DevTools (F12)
2. Go to the Network tab
3. Click "Sign in with GitHub"
4. Watch the requests and check for errors

### 8. Create a Simple Debug Endpoint

Add this to your `server.js` file to help debug route registration:

```javascript
// Add this before your 404 handler
app.get('/api/debug/test-github', (req, res) => {
  res.json({
    success: true,
    message: 'GitHub debug endpoint is working',
    registeredRoutes: app._router.stack
      .filter(r => r.name === 'router')
      .flatMap(r => r.handle.stack)
      .filter(r => r.route)
      .map(r => ({
        path: r.route.path,
        methods: Object.keys(r.route.methods)
      }))
  });
});
```

### 9. Try Direct GitHub OAuth Flow

For testing, you can try initiating the GitHub OAuth flow directly:

1. Open this URL in your browser:
```
https://github.com/login/oauth/authorize?client_id=Ov23liJDM6B9xuTvVtBa&redirect_uri=https%3A%2F%2Fscaips-backend.onrender.com%2Fapi%2Fauth%2Fgithub%2Fcallback&scope=user:email
```

2. After authorizing, you should be redirected to your callback URL.
3. Check the browser console and backend logs for errors.

## Final Notes

- Ensure your backend is actually running and accessible at `https://scaips-backend.onrender.com`
- If running locally, make sure to use the correct local URL in your tests
- Remember that GitHub OAuth requires exact URL matching
