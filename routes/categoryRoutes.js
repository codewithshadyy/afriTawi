
const express = require("express")
const router = express.Router()
const {createCategory, listCategory,findCategoryById, editCategory, deleteCategory} = require("../controllers/categoryController")
const {protect} = require("../middlewares/protect")
const {adminOnly} = require("../middlewares/authorizeRole")
const {validateCategory} = require("../middlewares/validators/categoryValidator")

router.post("/add", protect, adminOnly, validateCategory, createCategory)
router.get("/list", protect, listCategory)
router.get("/list/:id", protect, findCategoryById)
router.put("/edit/:id", protect, adminOnly, validateCategory, editCategory)
router.delete("/delete/:id", protect, adminOnly, deleteCategory)







module.exports = router


