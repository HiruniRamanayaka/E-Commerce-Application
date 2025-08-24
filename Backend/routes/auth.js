const express = require("express");
const { registerValidator } = require("../validators/authValidators.js");
const { validationResult } = require("express-validator");
const { registerUser } = require("../services/authServices.js");

const router = express.Router();

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