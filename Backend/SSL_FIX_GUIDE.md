# SCAIPS Database Connection Fix Guide

## 🚨 SSL/TLS Required Error Solution

If you're getting "SSL/TLS required" error when connecting to the Render database, follow these steps:

### Step 1: Verify Your .env File

Make sure your `.env` file has **EXACTLY** these values:

```properties
# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration (PostgreSQL) - Render Database
DB_USERNAME=scaips
DB_PASSWORD=wdDbXH0e86nefNAput4Q9s26pDXFKbNb
DB_DATABASE=scaips_portal
DB_DATABASE_TEST=scaips_test
DB_HOST=dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com
DB_PORT=5432
DB_SSL=true

# JWT Configuration
JWT_SECRET=scaips_dev_secret_key_2024_change_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=scaips_refresh_secret_2024
JWT_REFRESH_EXPIRE=30d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Step 2: Check Common Issues

**❌ WRONG:**

- `DB_SSL=false` (Render requires SSL)
- Missing `.env` file
- Wrong host URL
- Extra spaces in values

**✅ CORRECT:**

- `DB_SSL=true` (MUST be true for Render)
- `.env` file in Backend folder
- Exact host URL as shown above
- No extra spaces or quotes

### Step 3: Test Your Connection

Run the troubleshooter:

```bash
cd Backend
npm run troubleshoot
```

This will check your environment variables and test the connection.

### Step 4: If Still Not Working

1. **Delete and recreate your .env file** completely
2. **Copy the exact values** from above
3. **Restart your terminal/VS Code**
4. **Run the troubleshooter again**

### Step 5: Alternative Test

Try this direct test:

```bash
cd Backend
npm run test-db
```

### Step 6: Verify Dependencies

Make sure you have all required packages:

```bash
cd Backend
npm install
```

### Common Mistakes to Avoid:

1. **Wrong file location**: `.env` must be in the `Backend` folder, not root
2. **Wrong SSL setting**: Must be `DB_SSL=true` for Render
3. **Typos in host URL**: Must be exact match
4. **Quotes in .env**: Don't use quotes around values
5. **Spaces**: No spaces around = sign

### If Everything Fails:

1. **Delete the entire Backend folder**
2. **Re-clone from the main repository**
3. **Create a fresh .env file with the exact values above**
4. **Run npm install**
5. **Run npm run troubleshoot**

### Need Help?

Share the output of `npm run troubleshoot` for specific debugging.
