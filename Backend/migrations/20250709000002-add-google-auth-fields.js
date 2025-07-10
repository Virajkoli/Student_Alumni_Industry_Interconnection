"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Students", "google_id", {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn("Students", "imageUrl", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });

    await queryInterface.addColumn("Colleges", "google_id", {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn("Colleges", "imageUrl", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Students", "google_id");
    await queryInterface.removeColumn("Students", "imageUrl");
    await queryInterface.removeColumn("Colleges", "google_id");
    await queryInterface.removeColumn("Colleges", "imageUrl");
  },
};
