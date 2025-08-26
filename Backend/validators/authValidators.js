const { body } = require("express-validator");

const registerValidator = [
  body("userName")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  body("email")
    .isEmail().withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("countryCode")
    .trim()
    .notEmpty().withMessage("Country code is required")
    .matches(/^\+\d{1,4}$/).withMessage("Enter a valid country code"),
  
  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .matches(/^\d{7,12}$/).withMessage("Enter a valid phone number"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain a number"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidator, loginValidator };