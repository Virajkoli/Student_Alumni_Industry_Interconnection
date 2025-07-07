const { Sequelize } = require("sequelize");
const config = require("./config");
const path = require("path");
const fs = require("fs");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions || {},
  }
);

// Object to hold all models
const db = {};

// Read all model files and initialize them
const modelsDir = path.join(__dirname, "../models");
const modelFiles = fs
  .readdirSync(modelsDir)
  .filter((file) => file.endsWith(".js") && file !== "index.js");

// Initialize all models
modelFiles.forEach((file) => {
  const modelDefiner = require(path.join(modelsDir, file));
  const model = modelDefiner(sequelize);
  db[model.name] = model;
});

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add sequelize instance and Sequelize constructor to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully");
    return true;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    return false;
  }
};

// Sync database (create tables if they don't exist)
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    if (force) {
      console.log("🔄 Database tables recreated successfully");
    } else {
      console.log("📊 Database tables synchronized successfully");
    }
    return true;
  } catch (error) {
    console.error("❌ Database sync failed:", error.message);
    return false;
  }
};

module.exports = {
  ...db,
  testConnection,
  syncDatabase,
};
