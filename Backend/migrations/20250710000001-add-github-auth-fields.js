'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add githubId column to Students table
    await queryInterface.addColumn('Students', 'githubId', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add githubId column to Colleges table
    await queryInterface.addColumn('Colleges', 'githubId', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Remove githubId column from Students table
    await queryInterface.removeColumn('Students', 'githubId');

    // Remove githubId column from Colleges table
    await queryInterface.removeColumn('Colleges', 'githubId');

    return Promise.resolve();
  }
};
