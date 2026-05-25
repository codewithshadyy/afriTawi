
const express = require("express")
const router = express.Router()
const {createCategory} = require("../controllers/categoryController")
const {protect} = require("../middlewares/protect")
const {adminOnly} = require("../middlewares/authorizeRole")

router.post("/add", protect, adminOnly, createCategory)







module.exports = router


