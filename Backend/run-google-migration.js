const { sequelize } = require('./config/database');
const { QueryInterface } = require('sequelize');

async function runMigration() {
  try {
    console.log('🔧 Running Google Auth Fields Migration...');
    
    const queryInterface = sequelize.getQueryInterface();
    
    // Add googleId column to Students table
    console.log('Adding googleId column to Students table...');
    await queryInterface.addColumn('Students', 'googleId', {
      type: sequelize.Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });
    
    // Add imageUrl column to Students table
    console.log('Adding imageUrl column to Students table...');
    await queryInterface.addColumn('Students', 'imageUrl', {
      type: sequelize.Sequelize.STRING(500),
      allowNull: true,
    });
    
    // Add googleId column to Colleges table
    console.log('Adding googleId column to Colleges table...');
    await queryInterface.addColumn('Colleges', 'googleId', {
      type: sequelize.Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });
    
    // Add imageUrl column to Colleges table
    console.log('Adding imageUrl column to Colleges table...');
    await queryInterface.addColumn('Colleges', 'imageUrl', {
      type: sequelize.Sequelize.STRING(500),
      allowNull: true,
    });
    
    console.log('✅ Migration completed successfully!');
    console.log('✅ Google auth fields added to Students and Colleges tables');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error.message.includes('already exists')) {
      console.log('⚠️  Columns may already exist, which is fine.');
    }
  } finally {
    await sequelize.close();
  }
}

runMigration();
