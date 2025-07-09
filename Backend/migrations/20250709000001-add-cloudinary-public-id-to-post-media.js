"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("post_media", "cloudinary_public_id", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "Cloudinary public ID for file management",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("post_media", "cloudinary_public_id");
  },
};
