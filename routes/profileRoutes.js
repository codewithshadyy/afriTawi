
const express = require("express")
const router = express.Router()
const {  createProfile, listProfiles, findProfileById, editProfile } = require("../controllers/profileController")
const {protect} = require("../middlewares/protect")
const {upload} = require("../middlewares/upload")


router.post("/create",protect,upload.single("avatar"), createProfile)
router.get("/list", protect, listProfiles)
router.get("/list/:id", protect, findProfileById)
router.put("/edit/:id", protect, upload.single("avatar"), editProfile)


module.exports = router