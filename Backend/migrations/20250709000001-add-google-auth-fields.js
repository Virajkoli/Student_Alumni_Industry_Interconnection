'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn('Users', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add industry-specific fields
    await queryInterface.addColumn('Users', 'company_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'industry_type', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'company_size', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'designation', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add startup-specific fields
    await queryInterface.addColumn('Users', 'startup_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'startup_stage', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'funding_status', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'team_size', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Make password nullable for Google OAuth users
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'googleId');
    await queryInterface.removeColumn('Users', 'imageUrl');
    await queryInterface.removeColumn('Users', 'first_name');
    await queryInterface.removeColumn('Users', 'last_name');
    await queryInterface.removeColumn('Users', 'company_name');
    await queryInterface.removeColumn('Users', 'industry_type');
    await queryInterface.removeColumn('Users', 'company_size');
    await queryInterface.removeColumn('Users', 'designation');
    await queryInterface.removeColumn('Users', 'startup_name');
    await queryInterface.removeColumn('Users', 'startup_stage');
    await queryInterface.removeColumn('Users', 'funding_status');
    await queryInterface.removeColumn('Users', 'team_size');
  }
};
