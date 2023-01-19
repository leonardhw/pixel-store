const { Log, Product, User, Category, Image } = require("../models");

class Controller {
  static async addProduct(req, res, next) {
    // Transaction start
    const t = await Product.sequelize.transaction();

    try {
      // Create new product
      const { name, description, price, stock, mainImg, categoryId, images } = req.body;
      const authorId = req.user.id;
      const slug = name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      const addProduct = await Product.create({ name, slug, description, price, stock, mainImg, categoryId, authorId }, { transaction: t });
      if (!addProduct) {
        throw { name: "ADD_PRODUCT_FAILED" };
      }

      // Handle add images
      const productId = addProduct.id;
      await images.forEach((image) => {
        image.productId = productId;
      });
      const addImage = await Image.bulkCreate(images, { validate: true, transaction: t });
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
  static async showProduct(req, res, next) {
    try {
      let product = await Product.findAll({
        include: [User, Category, Image],
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
      let productDetail = await Product.findByPk(req.params.id, {
        include: [User, Category, Image],
      });
      if (!productDetail) {
        throw { name: "DATA_NOT_FOUND" };
      }
      res.status(200).json(productDetail);
    } catch (error) {
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
      const { name, description, price, stock, mainImg, categoryId, images } = req.body;
      console.log(images);
      console.log(mainImg);

      let findProduct = await Product.findByPk(id, { transaction: t });
      if (!findProduct) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      const authorId = req.user.id;
      const slug = name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      const editProduct = await Product.update({ name, slug, description, price, stock, mainImg, categoryId, authorId }, { where: { id }, transaction: t });

      if (!editProduct) {
        throw { name: "EDIT_PRODUCT_FAILED" };
      }

      // Handle add images
      await images.forEach((image) => {
        image.productId = id;
      });
      // Delete to clean images
      const deleteAllImages = await Image.destroy({ where: { productId: id } });
      if (!deleteAllImages) {
        throw { msg: "Error delete image in edit" };
      }

      const addImage = await Image.bulkCreate(images, { updateOnDuplicate: ["imgUrl"], validate: true, transaction: t });

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
