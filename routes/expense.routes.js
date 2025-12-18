const router = require("express").Router();
const auth = require("../middleware/auth.middleware"); // Import the new middleware
const controller = require("../controllers/expense.controller");

// This one line protects ALL routes below it
router.use(auth);

router.get("/", controller.getExpenses);
router.post("/", controller.addExpense);
router.get("/summary", controller.getSummary);
router.delete("/:id", controller.deleteExpense);

module.exports = router;