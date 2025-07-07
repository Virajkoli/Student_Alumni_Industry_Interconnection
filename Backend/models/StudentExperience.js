const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentExperience = sequelize.define(
    "StudentExperience",
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
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(150),
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      employment_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "Full-time",
      },
      currently_working: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      tableName: "student_experience",
      timestamps: false,
    }
  );

  return StudentExperience;
};
