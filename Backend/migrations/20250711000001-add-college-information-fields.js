const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Add new columns to colleges table
      await queryInterface.addColumn('colleges', 'about', {
        type: DataTypes.TEXT,
        allowNull: true,
      }, { transaction });

      await queryInterface.addColumn('colleges', 'verified', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }, { transaction });

      await queryInterface.addColumn('colleges', 'verifiedDate', {
        type: DataTypes.DATE,
        allowNull: true,
      }, { transaction });

      // Create college_campuses table
      await queryInterface.createTable('college_campuses', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        college_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'colleges',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        student_count: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        latitude: {
          type: DataTypes.DECIMAL(9, 6),
          allowNull: true,
        },
        longitude: {
          type: DataTypes.DECIMAL(9, 6),
          allowNull: true,
        },
        dean: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        image_url: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        contact_number: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        custom_fields: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: {},
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }, { transaction });

      await transaction.commit();
      console.log('✅ Migration completed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Drop college_campuses table
      await queryInterface.dropTable('college_campuses', { transaction });

      // Remove added columns from colleges table
      await queryInterface.removeColumn('colleges', 'about', { transaction });
      await queryInterface.removeColumn('colleges', 'verified', { transaction });
      await queryInterface.removeColumn('colleges', 'verifiedDate', { transaction });

      await transaction.commit();
      console.log('✅ Migration rollback completed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Migration rollback failed:', error);
      throw error;
    }
  },
};
