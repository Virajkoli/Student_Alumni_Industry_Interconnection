const { sequelize } = require("./config/database");

async function checkGoogleColumns() {
  try {
    console.log("🔍 Checking Google columns in database...");

    await sequelize.authenticate();
    console.log("✅ Connected to database");

    // Check Students table columns
    console.log("\n📋 Checking Students table columns:");
    const [studentsColumns] = await sequelize.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns 
      WHERE table_name = 'Students' 
      AND (column_name LIKE '%google%' OR column_name LIKE '%image%')
      ORDER BY column_name;
    `);

    console.log("Students table Google/Image columns:");
    studentsColumns.forEach((col) => {
      console.log(
        `  - ${col.column_name} (${col.data_type}${
          col.character_maximum_length
            ? `(${col.character_maximum_length})`
            : ""
        })`
      );
    });

    // Check Colleges table columns
    console.log("\n📋 Checking Colleges table columns:");
    const [collegesColumns] = await sequelize.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns 
      WHERE table_name = 'Colleges' 
      AND (column_name LIKE '%google%' OR column_name LIKE '%image%')
      ORDER BY column_name;
    `);

    console.log("Colleges table Google/Image columns:");
    collegesColumns.forEach((col) => {
      console.log(
        `  - ${col.column_name} (${col.data_type}${
          col.character_maximum_length
            ? `(${col.character_maximum_length})`
            : ""
        })`
      );
    });

    // Check if we need to add image_url columns
    const studentsHasImageUrl = studentsColumns.some(
      (col) => col.column_name === "image_url"
    );
    const collegesHasImageUrl = collegesColumns.some(
      (col) => col.column_name === "image_url"
    );

    console.log("\n🔧 Column Status:");
    console.log(
      `Students table has image_url: ${
        studentsHasImageUrl ? "✅ YES" : "❌ NO"
      }`
    );
    console.log(
      `Colleges table has image_url: ${
        collegesHasImageUrl ? "✅ YES" : "❌ NO"
      }`
    );

    // Add missing image_url columns if needed
    if (!studentsHasImageUrl) {
      console.log("\n➕ Adding image_url column to Students table...");
      try {
        await sequelize.query(
          'ALTER TABLE "Students" ADD COLUMN "image_url" VARCHAR(500);'
        );
        console.log("✅ Added image_url to Students table");
      } catch (error) {
        console.log("❌ Error adding image_url to Students:", error.message);
      }
    }

    if (!collegesHasImageUrl) {
      console.log("\n➕ Adding image_url column to Colleges table...");
      try {
        await sequelize.query(
          'ALTER TABLE "Colleges" ADD COLUMN "image_url" VARCHAR(500);'
        );
        console.log("✅ Added image_url to Colleges table");
      } catch (error) {
        console.log("❌ Error adding image_url to Colleges:", error.message);
      }
    }

    console.log("\n🎉 Column check complete!");
    console.log("✅ Models updated to use field mapping:");
    console.log("   - google_id -> google_id");
    console.log("   - imageUrl -> image_url");
    console.log(
      "\n🚀 You can now restart your backend server and test Google authentication!"
    );
  } catch (error) {
    console.error("❌ Error checking columns:", error.message);
  } finally {
    await sequelize.close();
  }
}

checkGoogleColumns();
