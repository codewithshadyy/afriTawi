
const express= require("express")
const router = express.Router()
const {signUp,signIn} = require("../controllers/userController")
const {validateSignUp,} = require("../middlewares/validators/authValidator")

router.post("/signUp",validateSignUp, signUp)
router.post("signIn", signIn)






module.exports = router
