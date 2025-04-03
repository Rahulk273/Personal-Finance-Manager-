// const express = require("express");
// const { setBudget } = require("../controllers/budgetController");
// const authMiddleware = require("../middleware/authMiddleware");
// const router = express.Router();
// router.post("/", authMiddleware, setBudget);
// module.exports = router;



const express = require("express");
const { setBudget, getBudgets, getBudgetAlerts } = require("../controllers/budgetController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, setBudget); // Set Budget
router.get("/", authMiddleware, getBudgets); // Get All Budgets
router.get("/alerts", authMiddleware, getBudgetAlerts); // Get Budget Alerts

module.exports = router;
