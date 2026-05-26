
const express = require("express")
const router = express.Router()
const {createProfile} = require("../controllers/profileController")
const {protect} = require("../middlewares/protect")


router.post("/create",protect,createProfile )