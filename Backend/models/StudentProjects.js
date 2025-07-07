const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentProjects = sequelize.define(
    "StudentProjects",
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
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      technologies: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      project_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "student_projects",
      timestamps: false,
    }
  );

  return StudentProjects;
};
