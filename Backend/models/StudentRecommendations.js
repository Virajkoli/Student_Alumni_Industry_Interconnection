const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentRecommendations = sequelize.define(
    "StudentRecommendations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "students",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      recommender_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      relationship: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "student_recommendations",
      timestamps: false,
    }
  );

  return StudentRecommendations;
};
