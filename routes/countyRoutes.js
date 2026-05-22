
const express = require("express")
const router= express.Router()
const {createCounty, editCounty} =  require("../controllers/countyController")
const { protect } = require("../middlewares/protect")
const {adminOnly, sellerOnly} = require("../middlewares/authorizeRole")
const {validateCounty} = require("../middlewares/validators/countyValidator")


router.post("/add", protect, adminOnly,validateCounty, createCounty)
router.put("/edit/:id", protect, adminOnly,validateCounty, editCounty)





module.exports =router