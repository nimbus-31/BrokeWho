const router = require("express").Router();
const authController = require("../controllers/auth.controller"); // Ensure this points to auth controller
const authMiddleware = require("../middleware/auth.middleware");

// PUBLIC ROUTES (No token needed)
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify/:token", authController.verifyEmail);

module.exports = router;
const auth = require("../middleware/auth.middleware");
const db = require("../config/db");

router.post("/preferences", auth, (req, res) => {
  const { receive_monthly_report, allow_chart_download } = req.body;

  db.run(
    `
    UPDATE users
    SET
      receive_monthly_report = ?,
      allow_chart_download = ?,
      preferences_set = 1
    WHERE id = ?
    `,
    [
      receive_monthly_report ? 1 : 0,
      allow_chart_download ? 1 : 0,
      req.user.id
    ],
    () => res.json({ success: true })
  );
});

