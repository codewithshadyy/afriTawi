const express  = require("express")
const router = express.Router()


const {upload} =require("../middlewares/upload")
const {validateProduct} = require("../middlewares/validators/productValidator.")
const {protect} = require("../middlewares/protect")

const {adminOnly, sellersOnly} = require("../middlewares/authorizeRole")
const {createProduct} = require("../controllers/productController")

router.post("/add", protect, sellersOnly, validateProduct, upload.single("image"), createProduct)
