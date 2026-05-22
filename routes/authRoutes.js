
const express= require("express")
const router = express.Router()
const {signUp,signIn, verifyEmail, logout, forgotPassword, resetPassword, viewUsers} = require("../controllers/authController")
const {validateSignUp,validatePasswordReset} = require("../middlewares/validators/authValidator")
const {protect} = require("../middlewares/protect")
const {adminOnly, sellerOnly} = require("../middlewares/authorizeRole")



router.post("/signUp",validateSignUp, signUp)
router.post("/signIn", signIn)
router.get("/verify/:token", verifyEmail)
router.post("/logout",protect, logout)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token",validatePasswordReset,resetPassword )
router.get("/users",  viewUsers)






module.exports = router
