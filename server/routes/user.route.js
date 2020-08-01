const express = require("express")
const { signUp, signIn, activateAccount, forgotPassword } = require("../controllers/user.controller")

const router = express.Router()

router.post("/user/signup", signUp)

router.post("/user/account-activation", activateAccount)

router.post("/user/signin", signIn)

router.post("/user/forgot-password", forgotPassword)

module.exports = router
