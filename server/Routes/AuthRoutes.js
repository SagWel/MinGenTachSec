const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const authController = require('../Controllers/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
=======
const authController = require("../Controllers/AuthController");

router.post("/api/auth/register", authController.register);
router.post("/api/auth/login", authController.login);
>>>>>>> Nicolas

module.exports = router;
