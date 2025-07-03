const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Certification = sequelize.define(
    "Certification",
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
      issuer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      credentialId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      pdfFile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      customFields: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "certifications",
      timestamps: true,
    }
  );

  return Certification;
};
