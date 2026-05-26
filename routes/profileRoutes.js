
const express = require("express")
const router = express.Router()
const {  createProfile, listProfiles } = require("../controllers/profileController")
const {protect} = require("../middlewares/protect")


router.post("/create",protect, createProfile)
router.get("/list", protect, listProfiles)


module.exports = router