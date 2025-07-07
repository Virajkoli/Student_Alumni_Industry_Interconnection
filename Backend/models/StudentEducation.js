const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentEducation = sequelize.define(
    "StudentEducation",
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
      institution: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      degree: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      field_of_study: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      start_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      end_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      grade: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      tableName: "student_education",
      timestamps: false,
    }
  );

  return StudentEducation;
};
