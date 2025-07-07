const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentCertifications = sequelize.define(
    "StudentCertifications",
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
      certificate_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      issuing_organization: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      credential_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      credential_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "student_certifications",
      timestamps: false,
    }
  );

  return StudentCertifications;
};
