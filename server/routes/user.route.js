const express = require("express")
const { signUp, signIn, activateAccount, forgotPassword, resetPassword, getUser, getUserByUserName } = require("../controllers/auth.controller")
const { userDetails, userNotifications } = require("../controllers/userDetails.controller")
const { userSignupValidator, userSigninValidator, userForgotValidator } = require("../validators/auth.validator")
const { runValidation } = require("../validators");

const router = express.Router()

router.post("/user/signup", userSignupValidator,runValidation, signUp)

router.post("/user/account-activation", activateAccount)

router.post("/user/signin", userSigninValidator,runValidation, signIn)

router.post("/user/forgot-password",userForgotValidator,runValidation, forgotPassword)

router.post("/user/reset-password", resetPassword)

router.post("/user/details", userDetails)

router.get("/user/notifications/:_id", userNotifications)

router.get("/user/:_id", getUser)

router.get("/user/user-name/:userName",getUserByUserName)

module.exports = router
