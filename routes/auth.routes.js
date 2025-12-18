const router = require("express").Router();
const authController = require("../controllers/auth.controller"); // Ensure this points to auth controller
const authMiddleware = require("../middleware/auth.middleware");

// PUBLIC ROUTES (No token needed)
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify/:token", authController.verifyEmail);

module.exports = router;