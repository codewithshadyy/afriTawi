

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

const express = require("express")
const router = express.Router()

const {getSellerProfile} = require("../controllers/userController")
const {protect} = require("../middlewares/protect")


/** * @swagger * /api/profiles/{username}: * get: * summary: Get public seller profile * tags: [Profiles] * parameters: * - in: path * name: username * required: true * schema: * type: string * responses: * 200: * description: Seller profile fetched successfully */
router.get("/seller/:username", protect, getSellerProfile)


module.exports = router
