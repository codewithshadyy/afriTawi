
const express = require("express")
const router= express.Router()
const {createCounty} =  require("../controllers/countyController")
const { protect } = require("../middlewares/protect")
const {adminOnly, sellerOnly} = require("../middlewares/authorizeRole")


router.post("/add", protect, adminOnly, createCounty)





module.exports =router