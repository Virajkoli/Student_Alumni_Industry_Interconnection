const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentAbout = sequelize.define(
    "StudentAbout",
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
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "student_about",
      timestamps: false,
    }
  );

  return StudentAbout;
};
