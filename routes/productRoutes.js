
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */





const express  = require("express")
const router = express.Router()


const {upload} =require("../middlewares/upload")
const {validateProduct} = require("../middlewares/validators/productValidator.")
const {protect} = require("../middlewares/protect")

const {adminOnly, sellersOnly} = require("../middlewares/authorizeRole")
const {createProduct, getProducts,editProduct, deleteProduct} = require("../controllers/productController")



/**
 * @swagger
 * /api/v1/products/add:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */


router.post("/add", protect, sellersOnly, upload.single("image"),validateProduct, createProduct)

/**
 * @swagger
 * /api/v1/products/:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */

router.get("/",protect, getProducts)


/**
 * @swagger
 * /api/v1/products/edit/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 */




router.put("/edit/:id", protect, upload.single("image"), validateProduct, editProduct)



/**
 * @swagger
 * /api/v1/products/delete/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */

router.delete("/delete/:id",protect, deleteProduct)



module.exports = router