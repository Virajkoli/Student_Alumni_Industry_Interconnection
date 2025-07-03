# SCAIPS Backend - PostgreSQL Migration

This backend has been migrated from MongoDB to PostgreSQL using Sequelize ORM.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set up PostgreSQL Database**

   Make sure PostgreSQL is installed and running on your system.

   Create a database:

   ```sql
   CREATE DATABASE scaips_db;
   CREATE DATABASE scaips_test; -- for testing
   ```

3. **Environment Configuration**

   Copy `.env.example` to `.env` and update the database credentials:

   ```properties
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=scaips_db
   DB_HOST=localhost
   DB_PORT=5432
   ```

4. **Run Database Migrations**

   ```bash
   npm run migrate
   ```

5. **Seed Database (Optional)**
   ```bash
   npm run seed
   ```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run migrate:undo` - Undo last migration
- `npm run seed` - Run database seeders
- `npm run seed:undo` - Undo all seeders
- `npm run db:create` - Create database
- `npm run db:drop` - Drop database

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Users

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (with filtering)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/avatar` - Upload avatar

### Other Features (Coming Soon)

- Posts (`/api/posts`)
- Connections (`/api/connections`)
- Jobs (`/api/jobs`)
- Notifications (`/api/notifications`)

## Database Models

### User Model

The User model supports multiple role types:

- **Student**: Academic information, skills, projects
- **Alumni**: Professional experience, current company
- **College**: Institution details, departments
- **Industry**: Company information, job postings
- **Startup**: Startup details, funding information

Key features:

- UUID primary keys
- Role-based fields
- Profile completion tracking
- Social login support
- Email verification
- Password reset functionality

### Related Models (Already Created)

- Experience
- Project
- Certification
- Course

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

- Access tokens (7 days by default)
- Refresh tokens (30 days by default, stored in httpOnly cookies)

Include the access token in requests:

```
Authorization: Bearer <your_token>
```

## Demo Users

After running seeds, you can use these demo accounts:

1. **Admin**: admin@scaips.com / Admin123!
2. **Student**: student@scaips.com / Admin123!
3. **Alumni**: alumni@scaips.com / Admin123!
4. **Industry**: industry@scaips.com / Admin123!
5. **Startup**: startup@scaips.com / Admin123!

## Development

1. Start PostgreSQL service
2. Run migrations: `npm run migrate`
3. Start development server: `npm run dev`
4. API will be available at `http://localhost:5000`

## Production Deployment

1. Set `NODE_ENV=production`
2. Update database credentials in `.env`
3. Run migrations: `npm run migrate`
4. Start server: `npm start`

## Migration from MongoDB

The migration includes:

- ✅ Converted Mongoose schemas to Sequelize models
- ✅ Updated authentication system for Sequelize
- ✅ Created database migrations and seeders
- ✅ Updated route handlers for PostgreSQL
- ✅ Maintained all existing API endpoints
- ✅ Added profile completion tracking
- ✅ Preserved role-based user system

## Support

For issues or questions, please check the logs and ensure:

1. PostgreSQL is running
2. Database credentials are correct
3. Migrations have been run
4. Required environment variables are set
