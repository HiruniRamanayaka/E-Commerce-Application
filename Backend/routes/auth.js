const express = require("express");
const { registerValidator } = require("../validators/authValidators.js");
const { loginValidator } = require("../validators/authValidators.js");
const { validationResult } = require("express-validator");
const { registerUser } = require("../services/authServices.js");
const { loginUser } = require("../services/authServices.js");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await loginUser(req.body); // returns { token, user details, message }
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.post("/register", registerValidator, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;