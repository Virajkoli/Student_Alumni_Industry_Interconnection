const { sequelize } = require("./config/database");

async function verifyGoogleColumns() {
  try {
    console.log("🔍 Verifying Google columns in database...");

    await sequelize.authenticate();
    console.log("✅ Connected to database");

    // Check Students table columns
    console.log("\n📋 Students table Google columns:");
    const [studentsColumns] = await sequelize.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns 
      WHERE table_name = 'Students' 
      AND column_name IN ('google_id', 'profile_picture')
      ORDER BY column_name;
    `);

    studentsColumns.forEach((col) => {
      console.log(
        `  ✅ ${col.column_name} (${col.data_type}${
          col.character_maximum_length
            ? `(${col.character_maximum_length})`
            : ""
        })`
      );
    });

    // Check Colleges table columns
    console.log("\n📋 Colleges table Google columns:");
    const [collegesColumns] = await sequelize.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns 
      WHERE table_name = 'Colleges' 
      AND column_name IN ('google_id', 'profile_picture')
      ORDER BY column_name;
    `);

    collegesColumns.forEach((col) => {
      console.log(
        `  ✅ ${col.column_name} (${col.data_type}${
          col.character_maximum_length
            ? `(${col.character_maximum_length})`
            : ""
        })`
      );
    });

    // Verify mapping
    console.log("\n🔧 Current Field Mapping:");
    console.log("  JavaScript → Database Column");
    console.log("  ├── google_id → google_id");
    console.log("  └── imageUrl → profile_picture");

    // Check if columns exist
    const studentsHasgoogle_id = studentsColumns.some(
      (col) => col.column_name === "google_id"
    );
    const studentsHasProfilePicture = studentsColumns.some(
      (col) => col.column_name === "profile_picture"
    );
    const collegesHasgoogle_id = collegesColumns.some(
      (col) => col.column_name === "google_id"
    );
    const collegesHasProfilePicture = collegesColumns.some(
      (col) => col.column_name === "profile_picture"
    );

    console.log("\n✅ Column Status:");
    console.log(
      `Students.google_id: ${studentsHasgoogle_id ? "✅ EXISTS" : "❌ MISSING"}`
    );
    console.log(
      `Students.profile_picture: ${
        studentsHasProfilePicture ? "✅ EXISTS" : "❌ MISSING"
      }`
    );
    console.log(
      `Colleges.google_id: ${collegesHasgoogle_id ? "✅ EXISTS" : "❌ MISSING"}`
    );
    console.log(
      `Colleges.profile_picture: ${
        collegesHasProfilePicture ? "✅ EXISTS" : "❌ MISSING"
      }`
    );

    if (
      studentsHasgoogle_id &&
      studentsHasProfilePicture &&
      collegesHasgoogle_id &&
      collegesHasProfilePicture
    ) {
      console.log("\n🎉 SUCCESS: All required columns exist!");
      console.log("✅ Google authentication should work now");
      console.log("🚀 Restart your backend server and test Google auth");
    } else {
      console.log(
        "\n⚠️  Some columns are missing. You may need to add them manually."
      );
    }
  } catch (error) {
    console.error("❌ Error verifying columns:", error.message);
  } finally {
    await sequelize.close();
  }
}

verifyGoogleColumns();
