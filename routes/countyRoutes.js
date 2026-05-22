
const express = require("express")
const router= express.Router()
const {createCounty, editCounty, deleteCounty} =  require("../controllers/countyController")
const { protect } = require("../middlewares/protect")
const {adminOnly, sellerOnly} = require("../middlewares/authorizeRole")
const {validateCounty} = require("../middlewares/validators/countyValidator")


router.post("/add", protect, adminOnly,validateCounty, createCounty)
router.put("/edit/:id", protect, adminOnly,validateCounty, editCounty)
router.delete("/delete/:id", protect,adminOnly, deleteCounty)





module.exports =router