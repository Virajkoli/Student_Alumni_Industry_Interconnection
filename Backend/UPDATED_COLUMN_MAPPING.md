# UPDATED: Google Column Mapping Fix

## Updated Database Column Mapping

### Your Actual Database Columns:
- ✅ `google_id` (for Google user ID)
- ✅ `profile_picture` (for Google profile image URL)

### Updated Model Field Mapping:

#### Students Model (`models/students.js`):
```javascript
googleId: {
  type: DataTypes.STRING,
  allowNull: true,
  unique: true,
  field: 'google_id', // ← Maps to your database column
},
imageUrl: {
  type: DataTypes.STRING,
  allowNull: true,
  field: 'profile_picture', // ← Maps to your database column
},
```

#### College Model (`models/College.js`):
```javascript
googleId: {
  type: DataTypes.STRING(255),
  allowNull: true,
  unique: true,
  field: 'google_id', // ← Maps to your database column
},
imageUrl: {
  type: DataTypes.STRING(500),
  allowNull: true,
  field: 'profile_picture', // ← Maps to your database column
},
```

## Complete Field Mapping:
```
JavaScript Property → Database Column
├── googleId        → google_id
└── imageUrl        → profile_picture
```

## What This Means:
- When your code uses `user.googleId`, it reads/writes to `google_id` column
- When your code uses `user.imageUrl`, it reads/writes to `profile_picture` column
- No database schema changes needed - just mapping fixes

## Next Steps:

### 1. Restart Backend Server
```bash
# Stop current server (Ctrl+C)
cd "f:\Pallavi Data\Internship\Student_Alumni_Industry_Interconnection\Backend"
npm start
```

### 2. Test Google Authentication
- Should work now without column errors
- Google profile picture will be saved to `profile_picture` column
- Google ID will be saved to `google_id` column

### 3. Expected Success
Backend console should show:
```
=== GOOGLE REGISTRATION ===
Request body: { email: "user@example.com", googleId: "123456", imageUrl: "https://..." }
Google registration successful for: user@example.com
```

## Files Updated:
- ✅ `Backend/models/students.js` - Updated imageUrl field mapping
- ✅ `Backend/models/College.js` - Updated imageUrl field mapping
- ✅ `Backend/verify-google-columns.js` - Verification script

## Verification:
Run this to double-check your database columns:
```bash
node verify-google-columns.js
```

---

**The mapping is now correct for your database schema! Restart your backend server and test Google authentication.**
