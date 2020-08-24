const { check } = require("express-validator");

const MIN = 5;

exports.userSignupValidator = [
  check("fName").not().isEmpty().withMessage({fName:"The name field is required"}),
  check("userName").not().isEmpty().withMessage({userName:"The user name field is required"}),
  check("email").isEmail().withMessage({email:"Must be a valid email"}),
  check("password")
    .isLength({ min: MIN })
    .withMessage({password:`Password must be at atleast ${MIN} characters long`}),
];  

exports.userSigninValidator = [
  check("email").isEmail().withMessage({email:"Must be a valid email"}),
  check("password")
    .isLength({ min: MIN })
    .withMessage({password:`Password must be at atleast ${MIN} characters long`}),
]; 

exports.userForgotValidator = [
  check("email").isEmail().withMessage({email:"Must be a valid email"}),
];  