# Industry Profile Cover Image Upload Fix

## Problem
The IndustryProfileHeader component was trying to upload cover images using the student upload endpoint (`/api/students/cover-image`), which caused a 500 error when used by industry profiles.

## Root Cause
1. The frontend was calling `apiService.uploadCoverImage()` which pointed to the student endpoint
2. There was no corresponding industry upload endpoint in the backend
3. The industry database schema uses different field names (`backgroundUrl`, `logoUrl`) vs students (`cover_picture`, `profile_picture`)

## Solution

### Backend Changes (routes/industries.js)
1. **Added required imports:**
   - `upload` middleware for handling multipart form data
   - `streamifier` for streaming file buffers
   - `cloudinary` for cloud storage

2. **Added new endpoints:**
   - `POST /api/industries/cover-image` - Upload cover/background image
   - `POST /api/industries/profile-image` - Upload profile/logo image

3. **Features of new endpoints:**
   - Proper authentication check (industry role required)
   - File validation
   - Cloudinary upload with industry-specific folders
   - Database update with new image URLs
   - Consistent response format

### Frontend Changes

#### API Service (services/apiService.js)
1. **Added new methods:**
   - `uploadIndustryCoverImage()` - Points to `/api/industries/cover-image`
   - `uploadIndustryProfileImage()` - Points to `/api/industries/profile-image`

#### Industry Profile Header (components/industry/IndustryProfileHeader.jsx)
1. **Updated upload handlers:**
   - `handleUploadCoverPic()` now uses `apiService.uploadIndustryCoverImage()`
   - Added `handleUploadProfilePic()` for profile image uploads
   - Removed dependency on non-existent `fetchUserData()` function

2. **Added image initialization:**
   - Initialize `coverPicUrl` from `industryData.backgroundUrl`
   - Initialize `profilePicUrl` from `industryData.logoUrl`

## Field Mapping
- **Cover Image:** `coverImage` (form field) → `backgroundUrl` (database) → `cover_picture` (response)
- **Profile Image:** `profileImage` (form field) → `logoUrl` (database) → `profile_picture` (response)

## Testing
1. **Start Backend Server:**
   ```bash
   cd Backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd ElectrosoftAlumni
   npm run dev
   ```

3. **Test Upload:**
   - Log in as an industry user
   - Navigate to industry profile
   - Click the camera icon to edit images
   - Upload a cover image and/or profile image
   - Verify the image appears immediately after upload

## File Changes
- ✅ `Backend/routes/industries.js` - Added upload endpoints
- ✅ `ElectrosoftAlumni/src/services/apiService.js` - Added industry upload methods
- ✅ `ElectrosoftAlumni/src/components/industry/IndustryProfileHeader.jsx` - Fixed upload handlers

## Error Resolution
The original error:
```
Failed to upload cover picture: AxiosError {message: 'Request failed with status code 500'...}
```

Should now be resolved as the industry profile component uses the correct industry-specific upload endpoint instead of the student endpoint.
