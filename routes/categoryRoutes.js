
const express = require("express")
const router = express.Router()
const {createCategory, listCategory} = require("../controllers/categoryController")
const {protect} = require("../middlewares/protect")
const {adminOnly} = require("../middlewares/authorizeRole")
const {validateCategory} = require("../middlewares/validators/categoryValidator")

router.post("/add", protect, adminOnly, validateCategory, createCategory)
router.get("/list", protect, listCategory)







module.exports = router


