
const express= require("express")
const router = express.Router()
const {signUp} = require("../controllers/userController")
const {validateSignUp} = require("../middlewares/validators/authValidator")

router.post("/signUp",validateSignUp, signUp)






module.exports = router
