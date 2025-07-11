const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CollegeCampus = sequelize.define(
    "CollegeCampus",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      college_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "colleges",
          key: "id",
        },
        onDelete: "CASCADE",
        validate: {
          notEmpty: {
            msg: "College ID is required",
          },
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campus name is required",
          },
          len: {
            args: [1, 100],
            msg: "Campus name must be between 1 and 100 characters",
          },
        },
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campus type is required",
          },
          isIn: {
            args: [
              [
                "Main Campus",
                "Specialized Campus",
                "Medical Campus",
                "Engineering Campus",
                "Management Campus",
                "Research Campus",
                "Satellite Campus",
              ],
            ],
            msg: "Campus type must be one of the predefined values",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campus address is required",
          },
        },
      },
      student_count: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
        validate: {
          min: {
            args: -90,
            msg: "Latitude must be between -90 and 90",
          },
          max: {
            args: 90,
            msg: "Latitude must be between -90 and 90",
          },
        },
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
        validate: {
          min: {
            args: -180,
            msg: "Longitude must be between -180 and 180",
          },
          max: {
            args: 180,
            msg: "Longitude must be between -180 and 180",
          },
        },
      },
      dean: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: {
            msg: "Please provide a valid image URL",
          },
        },
      },
      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          is: {
            args: /^[\+]?[1-9][\d]{0,15}$/,
            msg: "Please provide a valid contact number",
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: {
            msg: "Please provide a valid email address",
          },
        },
      },
      custom_fields: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },
    },
    {
      tableName: "college_campuses",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Define associations
  CollegeCampus.associate = (models) => {
    // Many-to-One: Campus belongs to College
    CollegeCampus.belongsTo(models.College, {
      foreignKey: "college_id",
      as: "college",
      onDelete: "CASCADE",
    });
  };

  return CollegeCampus;
};
