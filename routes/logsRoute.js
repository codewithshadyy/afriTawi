
/**
 * @swagger
 * tags:
 *   name: Audit Logs
 *   description: Admin audit logging routes
 */


const express = require("express")
const router = express.Router()
const{getLogs} = require("../controllers/logController")
const {protect} = require("../middlewares/protect")
const {adminOnly, sellersOnly} = require("../middlewares/authorizeRole")



/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logs fetched successfully
 *       403:
 *         description: Admin access required
 */

router.get("/", protect, adminOnly, getLogs)





module.exports =router