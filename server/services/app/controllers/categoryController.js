const { Category } = require("../models");

class Controller {
  static async showCategory(req, res, next) {
    try {
      let category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async showCategoryDetail(req, res, next) {
    try {
      const id = req.params.id;
      let category = await Category.findByPk(id);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addCategory(req, res, next) {
    try {
      let { name } = req.body;
      let addData = await Category.create({ name });
      res.status(201).json({
        msg: `Category with Id: ${addData.id} successfully added`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async editCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      let findCategoryName = await Category.findByPk(id);
      let editById = await Category.update(
        { name },
        {
          where: { id },
        }
      );
      if (!findCategoryName) {
        throw { name: "DATA_NOT_FOUND_CATEGORY", id };
      }
      res.status(200).json({
        msg: `Category ${findCategoryName.name} successfully updated`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      let findCategoryName = await Category.findByPk(id);
      let deleteById = await Category.destroy({
        where: { id },
      });
      if (!findCategoryName) {
        throw { name: "DATA_NOT_FOUND_CATEGORY", id };
      }
      res.status(200).json({
        msg: `Category ${findCategoryName.name} successfully deleted`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
