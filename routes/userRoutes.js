
const express = require("express")
const router = express.Router()
const {getSellerProfile} = require("../controllers/userController")
const {protect} = require("../middlewares/protect")

router.get("/seller/:username", protect, getSellerProfile)


module.exports = router
