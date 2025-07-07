const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentCourses = sequelize.define(
    "StudentCourses",
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
      course_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      completion_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      tableName: "student_courses",
      timestamps: false,
    }
  );

  return StudentCourses;
};
