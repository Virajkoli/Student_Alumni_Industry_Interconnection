const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentSkills = sequelize.define(
    "StudentSkills",
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
      skill_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      proficiency: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          isIn: [["Beginner", "Intermediate", "Advanced"]],
        },
      },
    },
    {
      tableName: "student_skills",
      timestamps: false,
    }
  );

  return StudentSkills;
};
