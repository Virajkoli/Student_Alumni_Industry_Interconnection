"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add missing fields to student_experience table
    await queryInterface.addColumn("student_experience", "location", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    await queryInterface.addColumn("student_experience", "employment_type", {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: "Full-time",
    });

    await queryInterface.addColumn("student_experience", "currently_working", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the added columns
    await queryInterface.removeColumn("student_experience", "location");
    await queryInterface.removeColumn("student_experience", "employment_type");
    await queryInterface.removeColumn(
      "student_experience",
      "currently_working"
    );
  },
};
