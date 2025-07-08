"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create posts table
    await queryInterface.createTable("posts", {
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "students",
          key: "id",
        },
      },
      college_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "college",
          key: "id",
        },
      },
      industry_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "industry",
          key: "id",
        },
      },
      alumni_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "alumni",
          key: "id",
        },
      },
      startup_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "startup",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create post_media table
    await queryInterface.createTable("post_media", {
      media_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      media_type: {
        type: Sequelize.ENUM("image", "video"),
        allowNull: false,
      },
      media_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create post_polls table
    await queryInterface.createTable("post_polls", {
      poll_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      option_text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create post_reactions table
    await queryInterface.createTable("post_reactions", {
      reaction_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      reaction_type: {
        type: Sequelize.ENUM("like", "love", "share", "wow", "sad"),
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "students",
          key: "id",
        },
      },
      college_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "college",
          key: "id",
        },
      },
      industry_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "industry",
          key: "id",
        },
      },
      alumni_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "alumni",
          key: "id",
        },
      },
      startup_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "startup",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create post_comments table
    await queryInterface.createTable("post_comments", {
      comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "students",
          key: "id",
        },
      },
      college_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "college",
          key: "id",
        },
      },
      industry_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "industry",
          key: "id",
        },
      },
      alumni_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "alumni",
          key: "id",
        },
      },
      startup_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "startup",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create post_shares table
    await queryInterface.createTable("post_shares", {
      share_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "students",
          key: "id",
        },
      },
      college_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "college",
          key: "id",
        },
      },
      industry_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "industry",
          key: "id",
        },
      },
      alumni_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "alumni",
          key: "id",
        },
      },
      startup_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "startup",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    console.log("Successfully created all posts-related tables");
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order due to foreign key constraints
    await queryInterface.dropTable("post_shares");
    await queryInterface.dropTable("post_comments");
    await queryInterface.dropTable("post_reactions");
    await queryInterface.dropTable("post_polls");
    await queryInterface.dropTable("post_media");
    await queryInterface.dropTable("posts");

    console.log("Successfully dropped all posts-related tables");
  },
};
