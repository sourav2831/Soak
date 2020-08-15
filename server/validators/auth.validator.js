const { check } = require("express-validator");

const MIN = 6;

exports.userSignupValidator = [
  check("fName").not().isEmpty().withMessage("The name field is required"),
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password")
    .isLength({ min: MIN })
    .withMessage(`Password must be at atleast ${MIN} characters long`),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password")
    .isLength({ min: MIN })
    .withMessage(`Password must be at atleast ${MIN} characters long`),
];