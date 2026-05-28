const express = require("express")
const router = express.Router()
const{getLogs} = require("../controllers/logController")
const {protect} = require("../middlewares/protect")
const {adminOnly, sellersOnly} = require("../middlewares/authorizeRole")

router.get("/", protect, getLogs)





module.exports =router