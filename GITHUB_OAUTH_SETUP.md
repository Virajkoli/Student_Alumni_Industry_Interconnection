# GitHub OAuth Setup Guide

This guide will help you properly configure your GitHub OAuth application to work with your project.

## Step 1: Update Your GitHub OAuth Application Settings

1. Go to your [GitHub Developer Settings](https://github.com/settings/developers)
2. Select your OAuth App
3. Set the following settings exactly:

**Homepage URL:**
```
https://electrosoft-alumni.vercel.app
```

**Authorization callback URL:**
```
https://scaips-backend.onrender.com/api/auth/github/callback
```

⚠️ **IMPORTANT:** The callback URL must match EXACTLY what's in your code. Any difference in slashes, protocol, or subdomains will cause the "redirect_uri is not associated with this application" error.

## Step 2: Verify Your OAuth App Credentials

Make sure you're using the correct Client ID and Client Secret:

- Client ID: `Ov23liJDM6B9xuTvVtBa`
- Client Secret: `01a1b0a5245ae5962397676c5b178193246513fe`

## Step 3: Testing Local Development

For local development, you have two options:

### Option 1: Create a separate GitHub OAuth app for local development
- Create a new OAuth app in GitHub with these settings:
  - Homepage URL: `http://localhost:5173`
  - Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
- Update your local environment variables to use the local GitHub OAuth credentials

### Option 2: Use ngrok for testing
1. Install ngrok: [https://ngrok.com/download](https://ngrok.com/download)
2. Run your backend on port 5000
3. Run `ngrok http 5000`
4. Use the HTTPS URL provided by ngrok as your callback URL in GitHub OAuth settings

## Troubleshooting

If you continue to see the "redirect_uri is not associated with this application" error:

1. Double-check that your callback URL in GitHub matches exactly what's in your code
2. Ensure there are no typos or extra/missing slashes
3. Clear your browser cache and cookies
4. Try using a private/incognito browser window
5. Check the browser console for the exact redirect URL being used
