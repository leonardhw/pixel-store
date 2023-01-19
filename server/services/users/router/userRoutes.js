const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");

// fetch all, fetch by id, add, delete
// router.post("/login", Controller.login);

router.get("/", Controller.fetchUser);
router.get("/:id", Controller.fetchUserById);
router.post("/register", Controller.register);
router.delete("/:id", Controller.deleteUserById);

module.exports = router;
