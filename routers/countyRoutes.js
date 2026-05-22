
const express = require("express")
const router= express.Router()
const {createCounty} =  require("../controllers/countyController")
const {protect} = require("../middlewares/protect")
const {authorizeRole} = require("../middlewares/authorizeRole")


router.post("/add", protect, authorizeRole("Admin"), createCounty)