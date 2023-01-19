const { Image } = require("../models/index");

class Controller {
  static async showImages(req, res, next) {
    try {
      let images = await Image.findAll();
      res.status(200).json(images);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
