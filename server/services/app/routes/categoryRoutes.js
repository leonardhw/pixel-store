const express = require("express");
const router = express.Router();
const Controller = require("../controllers/categoryController");

router.get("/", Controller.showCategory);
router.get("/:id", Controller.showCategoryDetail);
router.post("/", Controller.addCategory);
router.patch("/:id", Controller.editCategoryById);
router.delete("/:id", Controller.deleteCategoryById);

module.exports = router;
