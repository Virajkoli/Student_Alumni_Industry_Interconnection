"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add github_id column to Students table
    await queryInterface.addColumn("Students", "github_id", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add github_id column to Colleges table
    await queryInterface.addColumn("Colleges", "github_id", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Remove github_id column from Students table
    await queryInterface.removeColumn("Students", "github_id");

    // Remove github_id column from Colleges table
    await queryInterface.removeColumn("Colleges", "github_id");

    return Promise.resolve();
  },
};
