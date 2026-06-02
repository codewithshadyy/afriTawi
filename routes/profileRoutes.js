

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Profiles management routes
 */

const express = require("express")
const router = express.Router()
const {  createProfile, listProfiles, findProfileById, editProfile, deleteProfile } = require("../controllers/profileController")
const {protect} = require("../middlewares/protect")
const {upload} = require("../middlewares/upload")



/** * @swagger * /api/v1/profiles/create: * post: * summary: Create profile * tags: [Profiles] * security: * - bearerAuth: [] * requestBody: * required: true * content: * multipart/form-data: * schema: * type: object * properties: * phone_number: * type: string * bio: * type: string * county_id: * type: integer * image: * type: string * format: binary * responses: * 201: * description: Profile created successfully */

router.post("/create",protect,upload.single("avatar"), createProfile)


router.get("/list", protect, listProfiles)

/** * @swagger * /api/v1/profiles/{id}: * get: * summary: Get public seller profile * tags: [Profiles] * parameters: * - in: path * name: username * required: true * schema: * type: string * responses: * 200: * description: Seller profile fetched successfully */

router.get("/list/:id", protect, findProfileById)

/** * @swagger * /api/v1/profiles/{id}: * put: * summary: Update profile * tags: [Profiles] * security: * - bearerAuth: [] * responses: * 200: * description: Profile updated successfully */
router.put("/edit/:id", protect, upload.single("avatar"), editProfile)

/** * @swagger * /api/v1/profiles/{id}: * delete: * summary: Delete profile * tags: [Profiles] * security: * - bearerAuth: [] * responses: * 200: * description: Profile deleted successfully */
router.delete("/delete/:id", protect, deleteProfile)


module.exports = router