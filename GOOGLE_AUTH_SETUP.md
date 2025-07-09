# Google Authentication Setup Guide (Updated with Google Identity Services)

## Overview
This guide explains how to set up Google Sign-in and Sign-up functionality using the new Google Identity Services (GIS) API for your Student-Alumni-Industry Interconnection platform.

## ⚠️ Important Update
The implementation has been updated to use Google Identity Services (GIS) instead of the deprecated Google Sign-In JavaScript library. This resolves the `idpiframe_initialization_failed` error.

## Features Implemented

### 1. Google Sign-in Button Component
- **Location**: `src/components/GoogleSignInButton.jsx`
- **Features**: 
  - Uses Google Identity Services API
  - Customizable for both Sign-in and Sign-up
  - Loading states and error handling
  - Beautiful Google-styled button

### 2. Google Authentication Service
- **Location**: `src/utils/googleAuth.js`
- **Features**:
  - Google Identity Services initialization
  - OAuth2 popup flow
  - User profile extraction via Google APIs
  - Access token handling

### 3. Complete Google Signup Flow
- **Location**: `src/pages/auth/CompleteGoogleSignup.jsx`
- **Features**:
  - Role selection (Student, College, Industry, Startup)
  - Role-specific additional information forms
  - Seamless integration with existing registration flow

### 4. Test Page
- **Location**: `src/components/GoogleAuthTest.jsx`
- **URL**: `/auth/google-test`
- **Features**:
  - Test Google authentication flow
  - Debug information
  - Error handling demonstration

## Google Cloud Configuration

### Client ID
```
120148362755-dmisbc1usk06heg33nan4cklovcreqm6.apps.googleusercontent.com
```

### Required API Endpoints
- **Google Identity Services**: `https://accounts.google.com/gsi/client`
- **Google OAuth2 API**: `https://www.googleapis.com/oauth2/v2/userinfo`

## Technical Implementation

### New Authentication Flow
1. **Load Google Identity Services**: Script loads from `accounts.google.com/gsi/client`
2. **Initialize OAuth2 Client**: Configure with client ID and scopes
3. **Request Access Token**: Use popup flow to get user consent
4. **Fetch User Info**: Use access token to get user profile
5. **Backend Verification**: Verify token by calling Google's userinfo endpoint

### Backend Token Verification
```javascript
const verifyGoogleToken = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
  const userInfo = await response.json();
  return userInfo;
};
```

## Testing the Setup

### 1. Frontend Test
Navigate to `/auth/google-test` to test Google authentication:
- Click "Sign in with Google" to test login flow
- Click "Sign up with Google" to test registration flow
- Check debug information for troubleshooting

### 2. Manual Testing Steps
1. **Start the application**: `npm run dev`
2. **Navigate to**: `/auth/login` or `/auth/signup`
3. **Click**: "Sign in with Google" or "Sign up with Google"
4. **Google Popup**: Should open asking for permission
5. **Permission Grant**: Select Google account and grant permissions
6. **Complete Flow**: For signup, complete role selection
7. **Access Profile**: User information should be available

## User Information Available

### From Google OAuth2 API
- **ID**: `userInfo.id`
- **Email**: `userInfo.email`
- **Name**: `userInfo.name`
- **First Name**: `userInfo.given_name`
- **Last Name**: `userInfo.family_name`
- **Picture**: `userInfo.picture`
- **Verified Email**: `userInfo.verified_email`

### Stored in Database
All Google user information plus role-specific data as described in the previous sections.

## Troubleshooting

### Common Issues and Solutions

1. **"idpiframe_initialization_failed" Error**
   - ✅ **Fixed**: Updated to use Google Identity Services
   - **Old issue**: Was using deprecated Google Sign-In library

2. **Popup Blocked**
   - **Solution**: Enable popups for your domain
   - **Alternative**: Use redirect flow (can be implemented if needed)

3. **Token Verification Failed**
   - **Check**: Access token is being sent correctly
   - **Check**: Google userinfo endpoint is accessible
   - **Check**: Token hasn't expired

4. **CORS Issues**
   - **Check**: Backend CORS configuration allows your frontend domain
   - **Check**: Google APIs allow your domain

5. **User Not Found on Login**
   - **Expected**: User must sign up first before signing in
   - **Solution**: Direct users to complete signup flow

### Debug Mode
Check browser console for detailed authentication flow:
```javascript
// In googleAuth.js
console.log('Google user info:', userInfo);
console.log('Access token:', accessToken);
```

### Backend Debugging
Check backend logs for Google authentication:
```javascript
console.log("=== GOOGLE LOGIN ===");
console.log("Google user info:", googleUserInfo);
```

## Migration from Old Implementation

### What Changed
- **Old**: `gapi.auth2` (deprecated)
- **New**: `google.accounts.oauth2` (Google Identity Services)
- **Token**: Now uses access tokens instead of ID tokens
- **Verification**: Backend verifies by calling Google's userinfo endpoint

### Benefits of New Implementation
- **Future-proof**: Uses Google's latest authentication system
- **Better security**: Access tokens with proper scope management
- **Improved UX**: Faster initialization and better popup handling
- **No deprecation warnings**: Fully supported by Google

## Security Features

- **Token Verification**: Access tokens verified by calling Google's userinfo endpoint
- **Email Validation**: Ensures Google email matches provided email
- **Scope Limitation**: Only requests email and profile information
- **Secure Storage**: User information securely stored in database
- **HTTPS Required**: Google Identity Services requires HTTPS in production

## Production Deployment

### Google Cloud Console Setup
1. **Enable APIs**: OAuth2 API, Google+ API
2. **Configure OAuth Consent Screen**: Add your domain
3. **Add Authorized Domains**: Your production domain
4. **Set Redirect URIs**: Your production URLs

### Environment Variables
```bash
# Backend .env
GOOGLE_CLIENT_ID=120148362755-dmisbc1usk06heg33nan4cklovcreqm6.apps.googleusercontent.com
```

---

**Your Google authentication is now updated to use Google Identity Services and should work without any deprecation errors!**

## Quick Test
Visit `/auth/google-test` to test the implementation immediately.

## User Information Available

When a user signs up/logs in with Google, you get access to:

### Basic Information (Always Available)
- **Name**: `user.name` (Full name)
- **First Name**: `user.firstName`
- **Last Name**: `user.lastName`
- **Email**: `user.email`
- **Profile Picture**: `user.imageUrl`
- **Google ID**: `user.googleId`

### Role-Specific Information (Based on User Selection)

#### Student Role
- **College Name**: `user.student_college_name`
- **Contact Number**: `user.contact_no`
- **Interested Field**: `user.interested_field`
- **Other Field**: `user.other_field` (if applicable)

#### College Role
- **College Name**: `user.college_name`
- **Address**: `user.college_address`
- **Establishment Year**: `user.establishment_year`
- **Website**: `user.website`
- **Campus Area**: `user.campus_area`
- **NIRF Rank**: `user.nirf_rank`
- **Accreditation**: `user.accreditation`
- **Total Students**: `user.total_students`
- **Total Faculty**: `user.total_faculty`
- **Description**: `user.description`

#### Industry Role
- **Company Name**: `user.company_name`
- **Industry Type**: `user.industry_type`
- **Company Size**: `user.company_size`
- **Designation**: `user.designation`

#### Startup Role
- **Startup Name**: `user.startup_name`
- **Startup Stage**: `user.startup_stage`
- **Funding Status**: `user.funding_status`
- **Team Size**: `user.team_size`

## How to Use User Information

### 1. In React Components
```jsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <img src={user.imageUrl} alt="Profile" />
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      
      {user.role === 'student' && (
        <p>College: {user.student_college_name}</p>
      )}
      
      {user.role === 'industry' && (
        <p>Company: {user.company_name}</p>
      )}
    </div>
  );
};
```

### 2. In API Calls
```javascript
// Get current user information
const response = await apiService.getCurrentUser();
const userInfo = response.data.user;

// User info includes all the fields based on their role
console.log('User Info:', userInfo);
```

## Profile Page Integration

The `UserProfile` component automatically displays all available user information in a beautiful, organized layout:

- **Basic Information**: Name, email, role, profile picture
- **Role-Specific Information**: Automatically adapts based on user role
- **Account Information**: Registration date, Google account status
- **Additional Information**: Any description or extra fields

## Backend Endpoints

### Google Login
- **Endpoint**: `POST /api/auth/google/login`
- **Purpose**: Authenticate existing users with Google
- **Response**: JWT token and user information

### Google Register
- **Endpoint**: `POST /api/auth/google/register`
- **Purpose**: Register new users with Google
- **Response**: JWT token and user information

## Database Schema

The system automatically stores Google user information in the database:

```sql
-- Additional fields added to Users table
ALTER TABLE Users ADD COLUMN googleId VARCHAR(255) UNIQUE;
ALTER TABLE Users ADD COLUMN imageUrl VARCHAR(255);
ALTER TABLE Users ADD COLUMN first_name VARCHAR(255);
ALTER TABLE Users ADD COLUMN last_name VARCHAR(255);
ALTER TABLE Users ADD COLUMN company_name VARCHAR(255);
-- ... and more role-specific fields
```

## Testing the Integration

1. **Start the application**: `npm run dev`
2. **Navigate to**: `/auth/login` or `/auth/signup`
3. **Click**: "Sign in with Google" or "Sign up with Google"
4. **Complete**: Role selection and additional information
5. **Access**: User profile to view all information

## Security Features

- **Token Verification**: All Google tokens are verified server-side
- **Email Validation**: Ensures Google email matches provided email
- **Role-Based Access**: Different information based on user role
- **Secure Storage**: User information securely stored in database

## Next Steps

1. **Customize Profile Page**: Add edit functionality for user profiles
2. **Add More Fields**: Extend role-specific information as needed
3. **Social Features**: Use Google profile pictures in social interactions
4. **Analytics**: Track user engagement with Google sign-in
5. **Advanced Features**: Implement Google Calendar integration, etc.

## Troubleshooting

### Common Issues
1. **Google API Not Loading**: Check internet connection and API key
2. **Token Verification Failed**: Ensure backend has correct Google Client ID
3. **User Not Found**: Make sure user completes registration process
4. **Role Information Missing**: Verify user completed role-specific form

### Debug Mode
Enable debug logging in the browser console to see authentication flow:
```javascript
// In googleAuth.js, uncomment console.log statements
console.log('Google user:', googleUser);
console.log('Authentication result:', result);
```

---

**Your Google authentication is now fully integrated and ready to use! Users can sign up and log in with Google, and all their information will be available throughout the application.**
