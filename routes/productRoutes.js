const express  = require("express")
const router = express.Router()


const {upload} =require("../middlewares/upload")
const {validateProduct} = require("../middlewares/validators/productValidator.")
const {protect} = require("../middlewares/protect")

const {adminOnly, sellersOnly} = require("../middlewares/authorizeRole")
const {createProduct, getProducts,editProduct, deleteProduct} = require("../controllers/productController")

router.post("/add", protect, sellersOnly, upload.single("image"),validateProduct, createProduct)
router.get("/",protect, getProducts)
router.put("/edit/:id", protect, upload.single("image"), validateProduct, editProduct)
router.delete("/delete/:id",protect, deleteProduct)



module.exports = router