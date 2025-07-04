#!/usr/bin/env node

const express = require("express");
const { sequelize } = require("../config/database");

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Database admin routes
app.get("/api/admin/tables", async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/admin/table/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    const [results] = await sequelize.query(
      `SELECT * FROM "${tableName}" LIMIT 100;`
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/admin/users", async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT id, email, "fullName", role, "isActive", "createdAt" 
      FROM users 
      ORDER BY "createdAt" DESC;
    `);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/admin/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query("DELETE FROM users WHERE id = :id", {
      replacements: { id },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple HTML interface
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>SCAIPS Database Admin</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .container { max-width: 1200px; margin: 0 auto; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .btn { padding: 10px 15px; margin: 5px; background: #007bff; color: white; border: none; cursor: pointer; }
            .btn:hover { background: #0056b3; }
            .danger { background: #dc3545; }
            .danger:hover { background: #c82333; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🗄️ SCAIPS Database Admin</h1>
            
            <div>
                <button class="btn" onclick="loadUsers()">👥 View Users</button>
                <button class="btn" onclick="loadTables()">📋 View Tables</button>
                <button class="btn danger" onclick="resetDatabase()">🔄 Reset Database</button>
            </div>
            
            <div id="content"></div>
        </div>

        <script>
            async function loadUsers() {
                const response = await fetch('/api/admin/users');
                const users = await response.json();
                
                let html = '<h2>👥 Users</h2><table><tr><th>ID</th><th>Email</th><th>Name</th><th>Role</th><th>Active</th><th>Created</th><th>Actions</th></tr>';
                users.forEach(user => {
                    html += \`<tr>
                        <td>\${user.id}</td>
                        <td>\${user.email}</td>
                        <td>\${user.fullName}</td>
                        <td>\${user.role}</td>
                        <td>\${user.isActive ? '✅' : '❌'}</td>
                        <td>\${new Date(user.createdAt).toLocaleDateString()}</td>
                        <td><button class="btn danger" onclick="deleteUser('\${user.id}')">Delete</button></td>
                    </tr>\`;
                });
                html += '</table>';
                document.getElementById('content').innerHTML = html;
            }
            
            async function loadTables() {
                const response = await fetch('/api/admin/tables');
                const tables = await response.json();
                
                let html = '<h2>📋 Database Tables</h2><ul>';
                tables.forEach(table => {
                    html += \`<li><a href="#" onclick="loadTable('\${table.table_name}')">\${table.table_name}</a></li>\`;
                });
                html += '</ul>';
                document.getElementById('content').innerHTML = html;
            }
            
            async function loadTable(tableName) {
                const response = await fetch(\`/api/admin/table/\${tableName}\`);
                const data = await response.json();
                
                if (data.length === 0) {
                    document.getElementById('content').innerHTML = \`<h2>📋 \${tableName}</h2><p>No data found.</p>\`;
                    return;
                }
                
                let html = \`<h2>📋 \${tableName}</h2><table><tr>\`;
                Object.keys(data[0]).forEach(key => {
                    html += \`<th>\${key}</th>\`;
                });
                html += '</tr>';
                
                data.forEach(row => {
                    html += '<tr>';
                    Object.values(row).forEach(value => {
                        html += \`<td>\${value}</td>\`;
                    });
                    html += '</tr>';
                });
                html += '</table>';
                document.getElementById('content').innerHTML = html;
            }
            
            async function deleteUser(id) {
                if (confirm('Are you sure you want to delete this user?')) {
                    await fetch(\`/api/admin/user/\${id}\`, { method: 'DELETE' });
                    loadUsers();
                }
            }
            
            function resetDatabase() {
                if (confirm('Are you sure you want to reset the database? This will delete all data!')) {
                    alert('Feature not implemented for safety. Use npm run db:reset in terminal.');
                }
            }
            
            // Load users by default
            loadUsers();
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🗄️ Database Admin Panel running at http://localhost:${PORT}`);
  console.log("📊 Use this interface to manage your SCAIPS database");
});
