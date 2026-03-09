const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/context", authController.context);
router.post("/logout", authController.logout);

module.exports = router;
