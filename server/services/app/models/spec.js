"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spec.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill specification name.",
          },
          notEmpty: {
            msg: "Please fill specification name.",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill specification description.",
          },
          notEmpty: {
            msg: "Please fill specification description.",
          },
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product id.",
          },
          notEmpty: {
            msg: "Please fill product id.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Spec",
    }
  );
  return Spec;
};
