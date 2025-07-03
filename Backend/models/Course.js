const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      certificateUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customFields: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "courses",
      timestamps: true,
    }
  );

  return Course;
};
