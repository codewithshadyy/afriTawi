
/**
 * @swagger
 * tags:
 *   name: County
 *   description: County management routes
 */



const express = require("express")
const router= express.Router()
const {createCounty, editCounty, deleteCounty,getCounty } =  require("../controllers/countyController")
const { protect } = require("../middlewares/protect")
const {adminOnly, sellerOnly} = require("../middlewares/authorizeRole")
const {validateCounty} = require("../middlewares/validators/countyValidator")



/**
 * @swagger
 * /api/v1/counties/add:
 *   post:
 *     summary: Create county
 *     tags: [Counties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: County created successfully
 */
router.post("/add", protect, adminOnly,validateCounty, createCounty)

/**
 * @swagger
 * /api/counties/edit/{id}:
 *   put:
 *     summary: Update county
 *     tags: [Counties]
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
 *         description: County updated successfully
 */
router.put("/edit/:id", protect, adminOnly,validateCounty, editCounty)

/**
 * @swagger
 * /api/v1/counties/delete/{id}:
 *   delete:
 *     summary: Delete county
 *     tags: [Counties]
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
 *         description: County deleted successfully
 */


router.delete("/delete/:id", protect,adminOnly, deleteCounty)

/**
 * @swagger
 * /api/v1/counties:
 *   get:
 *     summary: Get all counties
 *     tags: [Counties]
 *     responses:
 *       200:
 *         description: Counties fetched successfully
 */
router.get("/", protect, getCounty)





module.exports =router