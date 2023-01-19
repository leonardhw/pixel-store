const express = require("express");
const router = express.Router();
const Controller = require("../controllers/publicController");
const { authenticationPub } = require("../middlewares/authentication");

router.get("/products", Controller.showProduct);
router.get("/products/:id", Controller.showProductDetail);
router.post("/products", Controller.addProduct);
router.delete("/products/:id", Controller.deleteProductById);
router.put("/products/:id", Controller.editProduct);

module.exports = router;
