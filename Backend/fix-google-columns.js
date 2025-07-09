const { sequelize } = require('./config/database');

async function fixGoogleColumns() {
  try {
    console.log('🔧 Fixing Google columns in database...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Connected to database');
    
    // Add columns one by one with error handling
    const queries = [
      {
        name: 'Students.googleId',
        sql: 'ALTER TABLE "Students" ADD COLUMN "googleId" VARCHAR(255);'
      },
      {
        name: 'Students.imageUrl', 
        sql: 'ALTER TABLE "Students" ADD COLUMN "imageUrl" VARCHAR(500);'
      },
      {
        name: 'Colleges.googleId',
        sql: 'ALTER TABLE "Colleges" ADD COLUMN "googleId" VARCHAR(255);'
      },
      {
        name: 'Colleges.imageUrl',
        sql: 'ALTER TABLE "Colleges" ADD COLUMN "imageUrl" VARCHAR(500);'
      }
    ];
    
    for (const query of queries) {
      try {
        await sequelize.query(query.sql);
        console.log(`✅ Added ${query.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  ${query.name} already exists - skipping`);
        } else {
          console.log(`❌ Error adding ${query.name}: ${error.message}`);
        }
      }
    }
    
    // Verify columns exist
    console.log('\n🔍 Verifying columns...');
    const [results] = await sequelize.query(`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_name IN ('Students', 'Colleges') 
      AND column_name IN ('googleId', 'imageUrl')
      ORDER BY table_name, column_name;
    `);
    
    console.log('Found columns:', results);
    
    if (results.length >= 4) {
      console.log('\n✅ SUCCESS: All Google columns are now present!');
      console.log('✅ You can now use Google authentication');
    } else {
      console.log('\n❌ Some columns are missing. Manual database update may be needed.');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.log('\n🔧 Try these manual steps:');
    console.log('1. Connect to your database using pgAdmin or another tool');
    console.log('2. Run these SQL commands:');
    console.log('   ALTER TABLE "Students" ADD COLUMN "googleId" VARCHAR(255);');
    console.log('   ALTER TABLE "Students" ADD COLUMN "imageUrl" VARCHAR(500);');
    console.log('   ALTER TABLE "Colleges" ADD COLUMN "googleId" VARCHAR(255);');
    console.log('   ALTER TABLE "Colleges" ADD COLUMN "imageUrl" VARCHAR(500);');
  } finally {
    await sequelize.close();
  }
}

fixGoogleColumns();
