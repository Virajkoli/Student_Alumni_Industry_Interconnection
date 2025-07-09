'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'googleId', {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });
    
    await queryInterface.addColumn('Students', 'imageUrl', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
    
    await queryInterface.addColumn('Colleges', 'googleId', {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });
    
    await queryInterface.addColumn('Colleges', 'imageUrl', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'googleId');
    await queryInterface.removeColumn('Students', 'imageUrl');
    await queryInterface.removeColumn('Colleges', 'googleId');
    await queryInterface.removeColumn('Colleges', 'imageUrl');
  }
};
