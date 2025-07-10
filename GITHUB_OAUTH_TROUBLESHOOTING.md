# GitHub OAuth Setup and Troubleshooting Guide

This guide will help you set up and troubleshoot GitHub OAuth authentication for your application.

## OAuth Configuration

### GitHub OAuth App Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Select your OAuth app or create a new one
3. Make sure your settings match the following:

   - **Application name**: Your app name
   - **Homepage URL**: Your frontend URL (e.g., `https://electrosoft-alumni.vercel.app`)
   - **Authorization callback URL**: `https://scaips-backend.onrender.com/api/auth/github/callback`

   > ⚠️ **IMPORTANT**: The callback URL must exactly match what's in your code!

### Frontend Configuration

The frontend GitHub OAuth configuration is in:
`ElectrosoftAlumni/src/utils/githubAuth.js`

```javascript
constructor() {
  this.clientId = 'Ov23liJDM6B9xuTvVtBa';
  this.redirectUri = 'https://scaips-backend.onrender.com/api/auth/github/callback';
  this.apiBaseUrl = 'https://scaips-backend.onrender.com';
}
```

### Backend Configuration

The backend GitHub OAuth configuration is in:
`Backend/routes/github-auth.js`

```javascript
const GITHUB_CLIENT_ID = "Ov23liJDM6B9xuTvVtBa";
const GITHUB_CLIENT_SECRET = "01a1b0a5245ae5962397676c5b178193246513fe";
const REDIRECT_URI = "https://scaips-backend.onrender.com/api/auth/github/callback";
```

## Route Registration

In `server.js`, GitHub routes are registered with:

```javascript
// API routes
app.use("/api/auth", authRoutes);
// GitHub auth routes
app.use("/api", githubAuthRoutes);
```

And in `routes/github-auth.js`, routes are defined as:

```javascript
router.get("/auth/github", (req, res) => { ... });
router.get("/auth/github/callback", async (req, res) => { ... });
```

This creates the final paths:
- `/api/auth/github`
- `/api/auth/github/callback`

## Troubleshooting

### Common Issues

1. **404 Not Found Error**

   If you get a 404 error when GitHub redirects to your callback URL, check:
   
   - Is your backend server running?
   - Are the routes registered correctly in `server.js`?
   - Do the routes in `github-auth.js` have the correct paths?
   - Run the debug script to check registered routes: `node test-github-routes.js`

2. **"redirect_uri_mismatch" Error**

   If GitHub shows a "redirect_uri_mismatch" error, check:
   
   - Does the callback URL in your GitHub OAuth app settings match exactly what's in your code?
   - Check for trailing slashes, http vs https, etc.
   - Make sure the URL is correctly URL-encoded when used in requests

3. **No Token Returned**

   If the code exchange fails, check:
   
   - Is your client secret correct?
   - Are you sending the required parameters in the token request?
   - Check network requests for any error responses

### Debug Tools

We have provided several debug tools to help troubleshoot issues:

1. **Route Debugger**:
   ```
   node Backend/test-github-routes.js
   ```
   
   This will check if your routes are correctly registered and responding.

2. **OAuth Setup Tester**:
   ```
   node Backend/test-github-oauth.js
   ```
   
   This will test your GitHub OAuth configuration and API connectivity.

3. **Route Explorer Endpoint**:
   
   Visit `/api/debug/routes` on your backend server to see all registered routes.

## OAuth Flow

The GitHub OAuth flow works as follows:

1. User clicks "Sign in with GitHub" button on frontend
2. Frontend redirects to GitHub authorization URL
3. User authorizes the application on GitHub
4. GitHub redirects to your callback URL with a `code` parameter
5. Backend exchanges the code for an access token
6. Backend uses the token to fetch user data from GitHub
7. Backend creates or updates user in your database
8. Backend generates JWT tokens and sends them back
9. Frontend stores tokens and redirects to dashboard

## Need More Help?

If you're still having issues:

1. Check your browser console and network tab for errors
2. Look at your backend server logs
3. Verify all environment variables are set correctly
4. Try the flow with a different GitHub account
5. Make sure your backend server is accessible from the internet

Remember: OAuth requires precise configuration - even small discrepancies in URLs can cause the flow to fail.
