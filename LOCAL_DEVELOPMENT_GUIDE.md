# Instructions to run backend locally

## Setup Local Backend for Development

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies (if not done):
```bash
npm install
```

3. Create a .env file with your database credentials:
```bash
# Copy from your production .env or create new local DB
DATABASE_URL=your_local_database_url
JWT_SECRET=your_jwt_secret
# ... other env variables
```

4. Run the backend locally:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

5. Update your frontend apiService.js to use local backend:
```javascript
const API_BASE_URL = "http://localhost:3000"; // Change this line
```

This avoids rate limits and provides faster development feedback.
