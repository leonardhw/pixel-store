const express = require("express");
const router = express.Router();
const Controller = require("../controllers/imageController");

router.get("/", Controller.showImages);

module.exports = router;
