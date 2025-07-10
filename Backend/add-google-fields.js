const { sequelize } = require("./config/database");

async function addGoogleFields() {
  try {
    console.log("🔧 Adding Google auth fields to database...");

    // Test connection first
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // Add google_id column to Students table
    console.log("Adding google_id to Students table...");
    await sequelize
      .query(
        `
      ALTER TABLE "Students" ADD COLUMN "google_id" VARCHAR(255) UNIQUE;
    `
      )
      .catch((err) => {
        if (err.message.includes("already exists")) {
          console.log("⚠️  google_id column already exists in Students table");
        } else {
          throw err;
        }
      });

    // Add imageUrl column to Students table
    console.log("Adding imageUrl to Students table...");
    await sequelize
      .query(
        `
      ALTER TABLE "Students" ADD COLUMN "imageUrl" VARCHAR(500);
    `
      )
      .catch((err) => {
        if (err.message.includes("already exists")) {
          console.log("⚠️  imageUrl column already exists in Students table");
        } else {
          throw err;
        }
      });

    // Add google_id column to Colleges table
    console.log("Adding google_id to Colleges table...");
    await sequelize
      .query(
        `
      ALTER TABLE "Colleges" ADD COLUMN "google_id" VARCHAR(255) UNIQUE;
    `
      )
      .catch((err) => {
        if (err.message.includes("already exists")) {
          console.log("⚠️  google_id column already exists in Colleges table");
        } else {
          throw err;
        }
      });

    // Add imageUrl column to Colleges table
    console.log("Adding imageUrl to Colleges table...");
    await sequelize
      .query(
        `
      ALTER TABLE "Colleges" ADD COLUMN "imageUrl" VARCHAR(500);
    `
      )
      .catch((err) => {
        if (err.message.includes("already exists")) {
          console.log("⚠️  imageUrl column already exists in Colleges table");
        } else {
          throw err;
        }
      });

    // Verify columns were added
    console.log("Verifying Students table columns...");
    const [studentsColumns] = await sequelize.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'Students' AND column_name IN ('google_id', 'imageUrl');
    `);
    console.log("Students table Google fields:", studentsColumns);

    console.log("Verifying Colleges table columns...");
    const [collegesColumns] = await sequelize.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'Colleges' AND column_name IN ('google_id', 'imageUrl');
    `);
    console.log("Colleges table Google fields:", collegesColumns);

    console.log("✅ Google auth fields added successfully!");
    console.log("✅ You can now use Google authentication");
  } catch (error) {
    console.error("❌ Error adding Google fields:", error.message);
    console.error("Full error:", error);
  } finally {
    await sequelize.close();
  }
}

addGoogleFields();
