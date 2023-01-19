const { Product, User, PubUser, PubFavorite, Sequelize, Category, Image } = require("../models/index");
const { Op } = Sequelize;
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");

class Controller {
  // static async register(req, res, next) {
  //   try {
  //     const { username, email, password } = req.body;
  //     const newUser = await PubUser.create({
  //       username,
  //       email,
  //       password,
  //     });
  //     res.status(201).json({
  //       id: newUser.id,
  //       username: newUser.username,
  //       email: newUser.email,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // static async login(req, res, next) {
  //   try {
  //     //* deconstruct dr post
  //     const { email, password } = req.body;
  //     //* if email/pass falsy
  //     if (!email || !password) {
  //       throw { name: "BAD_REQUEST_LOGIN" };
  //     }
  //     const foundUser = await PubUser.findOne({
  //       where: {
  //         email,
  //       },
  //     });
  //     //* if user not found
  //     if (!foundUser) {
  //       throw { name: "INVALID_CREDENTIALS" };
  //     }
  //     //* if user found, but wrong password
  //     const passwordMatch = comparePassword(password, foundUser.password);
  //     if (!passwordMatch) {
  //       throw { name: "INVALID_CREDENTIALS" };
  //     }
  //     //* if email & password match
  //     //panggil si helper untuk membuat token
  //     const payload = {
  //       id: foundUser.id,
  //     };
  //     const access_token = createToken(payload);

  //     res.status(200).json({
  //       access_token,
  //       username: foundUser.username,
  //       email: foundUser.email,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  static async showProduct(req, res, next) {
    try {
      let product = await Product.findAll({
        include: [Category, Image],
        order: ["id"],
      });
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async showProductDetail(req, res, next) {
    try {
      const ProductId = req.params.id;
      const findProduct = await Product.findByPk(ProductId, {
        include: [Category, Image],
      });
      if (!findProduct) {
        throw { name: "DATA_NOT_FOUND" };
      }
      res.status(200).json(findProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addProduct(req, res, next) {
    // Transaction start
    const t = await Product.sequelize.transaction();

    try {
      // Create new product
      const { name, description, price, stock, mainImg, categoryId, Images, userId } = req.body;
      // const authorId = req.user.id;
      const authorId = 1;

      const slug = name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      const addProduct = await Product.create({ name, slug, description, price, stock, mainImg, categoryId, authorId, userId }, { transaction: t });
      if (!addProduct) {
        throw { name: "ADD_PRODUCT_FAILED" };
      }

      // Handle add Images
      const productId = addProduct.id;
      await Images.forEach((image) => {
        image.productId = productId;
      });
      const addImage = await Image.bulkCreate(Images, { validate: true, transaction: t });
      if (!addImage) {
        throw { name: "ADD_IMAGE_FAILED" };
      }

      // // Handle add spec
      // const addSpec = await Spec.create();

      await t.commit();

      res.status(201).json({
        msg: `Product with Id: ${addProduct.id} successfully added`,
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
  static async deleteProductById(req, res, next) {
    try {
      const id = Number(req.params.id);
      let findProductName = await Product.findByPk(id);
      let deleteById = await Product.destroy({
        where: { id },
      });
      if (!deleteById) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      res.status(200).json({
        msg: `Product ${findProductName.name} successfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    // Transaction start
    const t = await Product.sequelize.transaction();

    try {
      const id = Number(req.params.id);
      const { name, description, price, stock, mainImg, categoryId, Images, userId } = req.body;

      let findProduct = await Product.findByPk(id, { transaction: t });
      if (!findProduct) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      // const authorId = 1;
      const slug = name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      const editProduct = await Product.update({ name, slug, description, price, stock, mainImg, categoryId, userId }, { where: { id }, transaction: t });

      if (!editProduct) {
        throw { name: "EDIT_PRODUCT_FAILED" };
      }

      // Handle add images
      await Images.forEach((image) => {
        image.productId = id;
      });
      // Delete to clean Images
      const deleteAllImages = await Image.destroy({ where: { productId: id } });
      if (!deleteAllImages) {
        throw { msg: "Error delete image in edit" };
      }

      const addImage = await Image.bulkCreate(Images, { updateOnDuplicate: ["imgUrl"], validate: true, transaction: t });

      if (!addImage) {
        throw { name: "ADD_IMAGE_FAILED" };
      }

      // // Handle add spec
      // const addSpec = await Spec.create();

      await t.commit();

      res.status(201).json({
        msg: `Product with Id: ${findProduct.id} successfully updated`,
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;
