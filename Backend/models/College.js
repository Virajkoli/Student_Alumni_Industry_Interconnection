const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const College = sequelize.define(
    "College",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "College name is required",
          },
          len: {
            args: [1, 100],
            msg: "College name must be between 1 and 100 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Please provide a valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: "Password must be at least 6 characters long",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      established: {
        type: DataTypes.INTEGER, // YEAR type as INTEGER
        allowNull: true,
        validate: {
          min: {
            args: 1800,
            msg: "Establishment year must be after 1800",
          },
          max: {
            args: new Date().getFullYear(),
            msg: "Establishment year cannot be in the future",
          },
        },
      },
      campusArea: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: {
            args: 0.01,
            msg: "Campus area must be positive",
          },
        },
      },
      nirfRank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 1,
            msg: "NIRF rank must be positive",
          },
        },
      },
      accreditation: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      totalStudents: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: "Total students must be non-negative",
          },
        },
      },
      totalFaculty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: "Total faculty must be non-negative",
          },
        },
      },
      website: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: {
            msg: "Please provide a valid website URL",
          },
        },
      },
      logoUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      backgroundUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      loginCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      // Google Authentication fields
      google_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        field: "google_id", // Map to database column name
      },
      github_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        field: "github_id", // Map to database column name
      },
      profile_picture: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "profile_picture", // Map to database column name
      },
      // Additional fields for college information
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      verifiedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "colleges",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      hooks: {
        beforeCreate: async (college) => {
          if (college.password) {
            const salt = await bcrypt.genSalt(10);
            college.password = await bcrypt.hash(college.password, salt);
          }
        },
        beforeUpdate: async (college) => {
          if (college.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            college.password = await bcrypt.hash(college.password, salt);
          }
        },
      },
    }
  );

  // Instance methods
  College.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  College.prototype.getProfileCompletion = function () {
    const fields = [
      "name",
      "email",
      "description",
      "location",
      "established",
      "website",
      "accreditation",
    ];
    const completedFields = fields.filter((field) => this[field]);
    return Math.round((completedFields.length / fields.length) * 100);
  };

  College.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  // Define associations
  College.associate = (models) => {
    // One-to-Many: College has many Campuses
    College.hasMany(models.CollegeCampus, {
      foreignKey: "college_id",
      as: "campuses",
      onDelete: "CASCADE",
    });
  };

  return College;
};
