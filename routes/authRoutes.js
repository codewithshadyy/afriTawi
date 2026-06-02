




/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication routes
 */



const {
    signUp,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail
} = require("../controllers/authController")

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", signUp)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", logout)

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset link sent
 */
router.post("/forgot-password", forgotPassword)

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   put:
 *     summary: Reset password
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.put("/reset-password/:token", resetPassword)

/**
 * @swagger
 * /api/auth/verify-email/{token}:
 *   get:
 *     summary: Verify email
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.get("/verify-email/:token", verifyEmail)

module.exports = router
```





const express= require("express")
const router = express.Router()
const {signUp,signIn, verifyEmail, logout, forgotPassword, resetPassword, viewUsers} = require("../controllers/authController")
const {validateSignUp,validatePasswordReset} = require("../middlewares/validators/authValidator")
const {protect} = require("../middlewares/protect")
const {adminOnly, sellerOnly} = require("../middlewares/authorizeRole")



router.post("/signUp",validateSignUp, signUp)
router.post("/signIn", signIn)
router.get("/verify/:token", verifyEmail)
router.post("/logout",protect, logout)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token",validatePasswordReset,resetPassword )
router.get("/users",  viewUsers)






module.exports = router
