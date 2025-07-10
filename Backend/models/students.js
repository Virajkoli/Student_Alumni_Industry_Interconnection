const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100],
        },
      },
      contact_no: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      college_name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      interested_field: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          isIn: [["Computer", "Electronics", "Electrical", "Other"]],
        },
      },
      other_field: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      github_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      loginCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "students",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        beforeCreate: async (student) => {
          if (student.password) {
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(student.password, salt);
          }
        },
        beforeUpdate: async (student) => {
          if (student.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(student.password, salt);
          }
        },
      },
    }
  );

  // Instance methods
  Student.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  Student.prototype.getProfileCompletion = function () {
    const fields = [
      "first_name",
      "last_name",
      "email",
      "contact_no",
      "college_name",
      "interested_field",
    ];
    const filledFields = fields.filter((field) => this[field]);
    return Math.round((filledFields.length / fields.length) * 100);
  };

  Student.prototype.getFullName = function () {
    return `${this.first_name || ""} ${this.last_name || ""}`.trim();
  };

  return Student;
};
