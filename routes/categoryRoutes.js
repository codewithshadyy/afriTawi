

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management routes
 */



const express = require("express")
const router = express.Router()
const {createCategory, listCategory,findCategoryById, editCategory, deleteCategory} = require("../controllers/categoryController")
const {protect} = require("../middlewares/protect")
const {adminOnly} = require("../middlewares/authorizeRole")
const {validateCategory} = require("../middlewares/validators/categoryValidator")


/** * @swagger * /api/v1/categories/add: * post: * summary: Create category * tags: [Categories] * security: * - bearerAuth: [] * responses: * 201: * description: Category created successfully */

router.post("/add", protect, adminOnly, validateCategory, createCategory)


/** * @swagger * /api/v1/categories/list: * get: * summary: Get all categories * tags: [Categories] * responses: * 200: * description: Categories fetched successfully */
router.get("/list", protect, listCategory)



router.get("/list/:id", protect, findCategoryById)

/** * @swagger * /api/v1/categories/{id}: * put: * summary: Update category * tags: [Categories] * security: * - bearerAuth: [] * responses: * 200: * description: Category updated successfully */
router.put("/edit/:id", protect, adminOnly, validateCategory, editCategory)

/** * @swagger * /api/v1/categories/{id}: * delete: * summary: Delete category * tags: [Categories] * security: * - bearerAuth: [] * responses: * 200: * description: Category deleted successfully */
router.delete("/delete/:id", protect, adminOnly, deleteCategory)







module.exports = router


