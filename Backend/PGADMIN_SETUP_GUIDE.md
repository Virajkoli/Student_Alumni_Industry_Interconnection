# 🔧 pgAdmin Setup Guide for SCAIPS Database

## ❌ Common Error: "password authentication failed for user 'scaips'"

If you're getting this error, it means the database credentials are incorrect or you're connecting to the wrong server.

## ✅ **Correct Database Credentials:**

Use these EXACT values when setting up pgAdmin:

### **Connection Details:**

- **Name:** `SCAIPS Shared Database`
- **Host:** `dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com`
- **Port:** `5432`
- **Database:** `scaips_portal`
- **Username:** `scaips`
- **Password:** `wdDbXH0e86nefNAput4Q9s26pDXFKbNb`

### **SSL Settings (Advanced Tab):**

- **SSL Mode:** `Require`
- **SSL Compression:** `False`

## 📋 **Step-by-Step Setup:**

### **1. Register New Server in pgAdmin:**

- Click **"Add New Server"** or right-click **"Servers"** → **"Register"** → **"Server"**

### **2. General Tab:**

- **Name:** `SCAIPS Shared Database` (or any name you prefer)

### **3. Connection Tab:**

- **Host name/address:** `dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com`
- **Port:** `5432`
- **Maintenance database:** `scaips_portal`
- **Username:** `scaips`
- **Password:** `wdDbXH0e86nefNAput4Q9s26pDXFKbNb`
- **Save password:** ✅ (Check this box)

### **4. Advanced Tab:**

- **SSL mode:** `require`

### **5. Save:**

- Click **"Save"** button

## 🚨 **Troubleshooting:**

### **If you still get authentication errors:**

1. **Double-check credentials:** Copy-paste the exact values above
2. **Check internet connection:** Make sure you can access external websites
3. **Verify host:** The host must be exactly `dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com`
4. **SSL required:** Make sure SSL mode is set to "require"

### **If you see IP addresses instead of hostnames:**

- Don't use IP addresses like `35.227.164.209`
- Always use the full hostname: `dpg-d1jmef24d50c73879slg-a.oregon-postgres.render.com`

## ✅ **After Successful Connection:**

You should see:

```
📁 Servers
  └── 📁 SCAIPS Shared Database
      └── 📁 Databases
          └── 📁 scaips_portal
              └── 📁 Schemas
                  └── 📁 public
                      └── 📁 Tables
                          └── 📋 users (with 7+ users)
```

## 🎯 **Quick Test:**

After connecting, run this query to verify:

```sql
SELECT COUNT(*) as user_count FROM users;
```

You should see a count of 7 or more users.

## 📞 **Still Having Issues?**

If you're still getting errors:

1. **Screenshot the error** and share it
2. **Verify your .env file** has the correct credentials
3. **Check if pgAdmin version** is up to date
4. **Try connecting from a different network** (sometimes corporate firewalls block database connections)

---

**Note:** These credentials are for the shared development database. Keep them secure and only share with team members.
