
const express= require("express")
const router = express.Router()
const {signUp,signIn, verifyEmail, logout} = require("../controllers/authController")
const {validateSignUp,} = require("../middlewares/validators/authValidator")
const {protect} = require("../middlewares/protect")

router.post("/signUp",validateSignUp, signUp)
router.post("/signIn", signIn)
router.get("/verify/:token", verifyEmail)
router.post("/logout",protect, logout)






module.exports = router
