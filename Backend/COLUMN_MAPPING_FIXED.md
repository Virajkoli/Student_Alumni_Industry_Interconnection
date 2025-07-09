# FIXED: Google Column Mapping Issue

## Problem Identified
✅ **Root Cause Found**: Your database has `google_id` (snake_case) but the Sequelize model was looking for `googleId` (camelCase).

## Solution Applied

### 1. Updated Student Model (`models/students.js`)
```javascript
// Before (WRONG):
googleId: {
  type: DataTypes.STRING,
  allowNull: true,
  unique: true,
},

// After (CORRECT):
googleId: {
  type: DataTypes.STRING,
  allowNull: true,
  unique: true,
  field: 'google_id', // Maps to database column
},
```

### 2. Updated College Model (`models/College.js`)
```javascript
// Before (WRONG):
googleId: {
  type: DataTypes.STRING(255),
  allowNull: true,
  unique: true,
},

// After (CORRECT):
googleId: {
  type: DataTypes.STRING(255),
  allowNull: true,
  unique: true,
  field: 'google_id', // Maps to database column
},
```

### 3. Added Field Mapping for Both Models
- `googleId` (JavaScript) → `google_id` (Database)
- `imageUrl` (JavaScript) → `image_url` (Database)

## Current Database Schema
Your database should have these columns:
- **Students table**: `google_id`, `image_url`
- **Colleges table**: `google_id`, `image_url`

## Files Updated
- ✅ `Backend/models/students.js` - Added field mapping
- ✅ `Backend/models/College.js` - Added field mapping
- ✅ `Backend/check-google-columns.js` - Column verification script

## Next Steps

### 1. Restart Backend Server
If your backend server is running, restart it:
```bash
# Stop current server (Ctrl+C)
# Then restart:
cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
npm start
```

### 2. Test Google Authentication
- Go to your frontend
- Try the Google authentication flow
- Should work without the "googleId does not exist" error

### 3. Expected Success
Backend console should show:
```
=== GOOGLE REGISTRATION ===
Request body: { email: "user@example.com", ... }
Google registration successful for: user@example.com
```

## Why This Happened
- **PostgreSQL convention**: Uses `snake_case` for column names
- **JavaScript convention**: Uses `camelCase` for object properties
- **Sequelize solution**: Use `field` property to map between conventions

## Verification
Run this to check your database columns:
```bash
node check-google-columns.js
```

You should see:
```
Students table Google/Image columns:
  - google_id (character varying(255))
  - image_url (character varying(500))
```

---

**The fix is complete! Restart your backend server and test Google authentication now.**
