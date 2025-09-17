const express = require("express");
const { registerValidator, loginValidator } = require("../validators/authValidators.js");
const { login, register } = require("../controllers/authController.js");

const router = express.Router();

router.post("/login", loginValidator, login );
router.post("/register", registerValidator, register);

module.exports = router;