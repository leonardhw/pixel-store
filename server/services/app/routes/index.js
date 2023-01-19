const express = require("express");
const router = express.Router();
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoute");
const pubRoutes = require("./publicRoutes");
const imageRoutes = require("./imageRoutes");
const { authentication } = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", userRoutes);
router.use("/pub", pubRoutes);
router.use("/products", authentication, productRoutes);
router.use("/categories", authentication, categoryRoutes);
router.use("/images", authentication, imageRoutes);
router.use(errorHandler);

module.exports = router;
