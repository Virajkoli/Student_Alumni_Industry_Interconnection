"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add unique constraint to post_reactions to prevent duplicate reactions
    // from the same user on the same post
    try {
      // First, remove any duplicate reactions that might exist
      await queryInterface.sequelize.query(`
        DELETE FROM post_reactions a USING post_reactions b
        WHERE a.reaction_id < b.reaction_id 
        AND a.post_id = b.post_id 
        AND (
          (a.student_id IS NOT NULL AND a.student_id = b.student_id) OR
          (a.college_id IS NOT NULL AND a.college_id = b.college_id) OR
          (a.industry_id IS NOT NULL AND a.industry_id = b.industry_id) OR
          (a.alumni_id IS NOT NULL AND a.alumni_id = b.alumni_id) OR
          (a.startup_id IS NOT NULL AND a.startup_id = b.startup_id)
        )
      `);

      // Add unique constraint for each user type
      await queryInterface.addConstraint("post_reactions", {
        fields: ["post_id", "student_id"],
        type: "unique",
        name: "unique_post_student_reaction",
        where: {
          student_id: {
            [Sequelize.Op.ne]: null,
          },
        },
      });

      await queryInterface.addConstraint("post_reactions", {
        fields: ["post_id", "college_id"],
        type: "unique",
        name: "unique_post_college_reaction",
        where: {
          college_id: {
            [Sequelize.Op.ne]: null,
          },
        },
      });

      await queryInterface.addConstraint("post_reactions", {
        fields: ["post_id", "industry_id"],
        type: "unique",
        name: "unique_post_industry_reaction",
        where: {
          industry_id: {
            [Sequelize.Op.ne]: null,
          },
        },
      });

      await queryInterface.addConstraint("post_reactions", {
        fields: ["post_id", "alumni_id"],
        type: "unique",
        name: "unique_post_alumni_reaction",
        where: {
          alumni_id: {
            [Sequelize.Op.ne]: null,
          },
        },
      });

      await queryInterface.addConstraint("post_reactions", {
        fields: ["post_id", "startup_id"],
        type: "unique",
        name: "unique_post_startup_reaction",
        where: {
          startup_id: {
            [Sequelize.Op.ne]: null,
          },
        },
      });

      console.log(
        "Successfully added unique constraints to post_reactions table"
      );
    } catch (error) {
      console.error("Error adding unique constraints:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove the unique constraints
    try {
      await queryInterface.removeConstraint(
        "post_reactions",
        "unique_post_student_reaction"
      );
      await queryInterface.removeConstraint(
        "post_reactions",
        "unique_post_college_reaction"
      );
      await queryInterface.removeConstraint(
        "post_reactions",
        "unique_post_industry_reaction"
      );
      await queryInterface.removeConstraint(
        "post_reactions",
        "unique_post_alumni_reaction"
      );
      await queryInterface.removeConstraint(
        "post_reactions",
        "unique_post_startup_reaction"
      );

      console.log(
        "Successfully removed unique constraints from post_reactions table"
      );
    } catch (error) {
      console.error("Error removing unique constraints:", error);
      throw error;
    }
  },
};
