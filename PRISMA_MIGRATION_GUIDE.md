# Prisma Migration Guide

## What We've Created

### 1. Prisma Schema (`Backend/prisma/schema.prisma`)

- Defines all four models: Student, College, Startup, Industry
- Maps to existing PostgreSQL tables
- Includes proper field types and relationships

### 2. Prisma Client Configuration (`Backend/config/prisma.js`)

- Configures Prisma client with logging and error handling
- Handles graceful shutdown

### 3. Simplified Authentication Service (`Backend/services/authService.js`)

- Unified authentication logic for all roles
- Password hashing and verification
- JWT token generation
- Google OAuth support
- Better error handling

### 4. Simplified Controller (`Backend/controllers/authController.js`)

- Clean REST endpoints
- Proper cookie handling
- Role-based authentication
- Input validation

### 5. Improved Middleware (`Backend/middleware/authMiddleware.js`)

- JWT token verification
- Role-based access control
- Better error handling

### 6. Updated Routes (`Backend/routes/auth-new.js`)

- Clean, RESTful routes
- Role-based endpoints
- Proper middleware usage

### 7. Frontend API Service (`ElectrosoftAlumni/src/services/apiService.js`)

- Axios instance with interceptors
- Automatic token refresh
- Error handling
- Role-based methods

### 8. Improved AuthContext (`ElectrosoftAlumni/src/contexts/AuthContext-new.js`)

- Better state management
- Role-specific methods
- Utility functions
- Error handling

## Migration Steps

### 1. Install Prisma Dependencies

```bash
cd Backend
npm install @prisma/client prisma
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Create Initial Migration

```bash
npx prisma migrate dev --name init
```

### 4. Update Environment Variables

Make sure your `.env` file has:

```env
DATABASE_URL=postgresql://scaips:wdDbXH0e86nefNAput4Q9s26pDXFKbNb@dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com:5432/scaips_portal?sslmode=require
```

### 5. Replace Old Files

1. Replace `Backend/routes/auth.js` with `Backend/routes/auth-new.js`
2. Replace `ElectrosoftAlumni/src/contexts/AuthContext.js` with `ElectrosoftAlumni/src/contexts/AuthContext-new.js`
3. Update `ElectrosoftAlumni/src/utils/apiService.js` with `ElectrosoftAlumni/src/services/apiService.js`

### 6. Update Server.js

Make sure server.js imports the new auth routes:

```javascript
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
```

### 7. Update Frontend Imports

Update all imports in your React components:

```javascript
// Old
import { useAuth } from "../contexts/AuthContext";
import apiService from "../utils/apiService";

// New (same imports, but files are updated)
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/apiService";
```

## API Changes

### Registration

```javascript
// Old
const response = await apiService.register(userData);

// New - more explicit
const response = await apiService.register({ ...userData, role: "student" });
// or use specific methods
const response = await authContext.registerStudent(userData);
```

### Login

```javascript
// Old
const response = await apiService.login({ email, password });

// New - role-based
const response = await apiService.login({ email, password, role: "student" });
// or use specific methods
const response = await authContext.loginStudent({ email, password });
```

### Google OAuth

```javascript
// Old
const response = await authContext.registerWithGoogle(userData);

// New - role-based
const response = await authContext.registerWithGoogle({
  ...userData,
  role: "student",
});
// or use specific methods
const response = await authContext.registerStudentWithGoogle(userData);
```

## Benefits of This Migration

1. **Simplified Database Operations**: Prisma provides type-safe database operations
2. **Better Error Handling**: Consistent error handling across all operations
3. **Role-Based Architecture**: Clear separation of concerns for different user types
4. **Type Safety**: Better TypeScript support with Prisma
5. **Automatic Migrations**: Database schema changes are versioned and tracked
6. **Better Performance**: Prisma's query engine is optimized for PostgreSQL
7. **Cleaner Code**: Less boilerplate code and better maintainability

## Testing

After migration, test these endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google/register` - Google OAuth registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

## Troubleshooting

1. **Database Connection Issues**: Check your DATABASE_URL
2. **Migration Errors**: Run `npx prisma migrate reset` and try again
3. **Client Generation Issues**: Run `npx prisma generate`
4. **Authentication Errors**: Check JWT_SECRET in environment variables

## Next Steps

1. Run the setup script: `./setup-prisma.bat` (Windows) or `./setup-prisma.sh` (Linux/Mac)
2. Test the registration and login flows
3. Update any other API endpoints to use Prisma
4. Add more tables and relationships as needed
