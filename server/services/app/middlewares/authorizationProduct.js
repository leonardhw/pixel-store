const { Product } = require("../models/");

async function authorizationProduct(req, res, next) {
  try {
    let product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { name: "DATA_NOT_FOUND" };
    }
    if (product.authorId === req.user.id || req.user.role === "admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authorizationProduct };
