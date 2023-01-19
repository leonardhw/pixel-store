"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email has already been taken.",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "What's your email?",
          },
          notEmpty: {
            msg: "What's your email?",
          },
          isEmail: {
            msg: "Please enter a valid email.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill your password.",
          },
          notEmpty: {
            msg: "Please fill your password.",
          },
          minLen(value) {
            if (value.length < 5) {
              throw new Error("Minimum password length is 5.");
            }
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  //* Hooks bcryptjs
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
