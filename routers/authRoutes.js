
const express= require("express")
const router = express.Router()
const {signUp,signIn, verifyEmail} = require("../controllers/authController")
const {validateSignUp,} = require("../middlewares/validators/authValidator")

router.post("/signUp",validateSignUp, signUp)
router.post("/signIn", signIn)
router.get("/verify/:token", verifyEmail)






module.exports = router
