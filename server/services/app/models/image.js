"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init(
    {
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
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill image url.",
          },
          notEmpty: {
            msg: "Please fill image url.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
