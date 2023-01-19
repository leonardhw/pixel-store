"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsTo(models.User, { foreignKey: "authorId" });
      Product.hasMany(models.Spec, { foreignKey: "productId" });
      Product.hasMany(models.Image, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product name.",
          },
          notEmpty: {
            msg: "Please fill product name.",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product slug.",
          },
          notEmpty: {
            msg: "Please fill product slug.",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product description.",
          },
          notEmpty: {
            msg: "Please fill product description.",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product price.",
          },
          notEmpty: {
            msg: "Please fill product price.",
          },
          minPrice(value) {
            if (value < 20) {
              throw new Error("Minimum product price is 20");
            }
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product stock.",
          },
          notEmpty: {
            msg: "Please fill product stock.",
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product mainImg.",
          },
          notEmpty: {
            msg: "Please fill product mainImg.",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product category.",
          },
          notEmpty: {
            msg: "Please fill product category.",
          },
        },
      },
      userId: DataTypes.STRING,
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please fill product author.",
          },
          notEmpty: {
            msg: "Please fill product author.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
