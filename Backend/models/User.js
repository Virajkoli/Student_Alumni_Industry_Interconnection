const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // Basic Information
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100],
        },
      },
      role: {
        type: DataTypes.ENUM(
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 500],
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      linkedinUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      twitterUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },

      // Student/Alumni specific fields
      collegeName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      course: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      graduationYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cgpa: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },

      // College specific fields
      deanName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      establishedYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      accreditation: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      departments: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      studentCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      facultyCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      // Industry specific fields
      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactPerson: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      employeeCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      headquarters: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Startup specific fields
      startupName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      founderName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      foundedYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      stage: {
        type: DataTypes.ENUM("idea", "prototype", "mvp", "growth", "scale"),
        allowNull: true,
      },
      fundingStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      teamSize: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      startupDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Account status
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emailVerificationExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      // Password reset
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      // Login tracking
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      loginCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      // Social login
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      microsoftId: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Preferences
      emailNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      pushNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      profileVisibility: {
        type: DataTypes.ENUM("public", "connections", "private"),
        defaultValue: "public",
      },

      // Custom fields as JSONB for flexibility
      customFields: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      tableName: "users",
      timestamps: true,
      indexes: [
        { fields: ["email"] },
        { fields: ["role"] },
        { fields: ["fullName"] },
        { fields: ["createdAt"] },
      ],
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  // Instance methods
  User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  User.prototype.generateEmailVerificationToken = function () {
    const token = crypto.randomBytes(20).toString("hex");
    this.emailVerificationToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    return token;
  };

  User.prototype.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    return resetToken;
  };

  User.prototype.getProfileCompletion = function () {
    let completed = 0;
    let total = 10;

    if (this.fullName) completed++;
    if (this.bio) completed++;
    if (this.location) completed++;
    if (this.avatar) completed++;
    if (this.phone) completed++;
    if (this.collegeName) completed++;
    if (this.course) completed++;
    if (this.skills && this.skills.length > 0) completed++;
    if (this.website) completed++;
    if (this.linkedinUrl) completed++;

    return Math.round((completed / total) * 100);
  };

  return User;
};
