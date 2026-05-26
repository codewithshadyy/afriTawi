
const express = require("express")
const router = express.Router()
const {  createProfile, listProfiles, findProfileById, editProfile } = require("../controllers/profileController")
const {protect} = require("../middlewares/protect")


router.post("/create",protect, createProfile)
router.get("/list", protect, listProfiles)
router.get("/list/:id", protect, findProfileById)
router.put("/edit/:id", protect, editProfile)


module.exports = router