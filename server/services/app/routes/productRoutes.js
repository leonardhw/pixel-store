const express = require("express");
const router = express.Router();
const Controller = require("../controllers/productController");

router.post("/", Controller.addProduct);
router.get("/", Controller.showProduct);
router.get("/:id", Controller.showProductDetail);
router.delete("/:id", Controller.deleteProductById);
router.put("/:id", Controller.editProduct);

module.exports = router;
