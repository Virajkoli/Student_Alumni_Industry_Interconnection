"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // Basic Information
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(
          "student",
          "alumni",
          "college",
          "industry",
          "startup"
        ),
        allowNull: false,
        defaultValue: "student",
      },

      // Profile Information
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedinUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      twitterUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // Student/Alumni specific fields
      collegeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      graduationYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cgpa: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: true,
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },

      // College specific fields
      deanName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      establishedYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      accreditation: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
      departments: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
      studentCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      facultyCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      // Industry specific fields
      companyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactPerson: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      employeeCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      headquarters: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Startup specific fields
      startupName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      founderName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      foundedYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      stage: {
        type: Sequelize.ENUM("idea", "prototype", "mvp", "growth", "scale"),
        allowNull: true,
      },
      fundingStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      teamSize: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      startupDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Account status
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      emailVerificationToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emailVerificationExpires: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      // Password reset
      passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passwordResetExpires: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      // Login tracking
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      loginCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      // Social login
      google_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      microsoftId: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // Preferences
      emailNotifications: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      pushNotifications: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      profileVisibility: {
        type: Sequelize.ENUM("public", "connections", "private"),
        defaultValue: "public",
      },

      // Custom fields as JSONB for flexibility
      customFields: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: [],
      },

      // Timestamps
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes
    await queryInterface.addIndex("users", ["email"]);
    await queryInterface.addIndex("users", ["role"]);
    await queryInterface.addIndex("users", ["fullName"]);
    await queryInterface.addIndex("users", ["createdAt"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
