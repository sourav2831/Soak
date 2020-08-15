const express = require("express")
const { signUp, signIn, activateAccount, forgotPassword, resetPassword } = require("../controllers/auth.controller")
const { userDetails } = require("../controllers/userDetails.controller")
const { userSignupValidator, userSigninValidator } = require("../validators/auth.validator")

const router = express.Router()

router.post("/user/signup", userSignupValidator, signUp)

router.post("/user/account-activation", activateAccount)

router.post("/user/signin", userSigninValidator, signIn)

router.post("/user/forgot-password", forgotPassword)

router.post("/user/reset-password", resetPassword)

router.post("/user/details", userDetails)

module.exports = router
