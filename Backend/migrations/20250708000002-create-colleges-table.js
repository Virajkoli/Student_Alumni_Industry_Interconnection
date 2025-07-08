"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("colleges", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      established: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      campusArea: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      nirfRank: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      accreditation: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      totalStudents: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalFaculty: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      logoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      backgroundUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      loginCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes
    await queryInterface.addIndex("colleges", ["email"], {
      unique: true,
      name: "colleges_email_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("colleges");
  },
};
