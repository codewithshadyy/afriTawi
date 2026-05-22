
const express = require("express")
const router= express.Router()
const {createCounty} =  require("../controllers/countyController")


router.post("/add", createCounty)