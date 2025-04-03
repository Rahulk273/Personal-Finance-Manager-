// const express = require("express");
// const { addTransaction } = require("../controllers/transactionController");
// const authMiddleware = require("../middleware/authMiddleware");
// const router = express.Router();
// router.post("/", authMiddleware, addTransaction);
// module.exports = router;


const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new transaction (Protected Route)
router.post("/", authMiddleware, addTransaction);

// Fetch all transactions for the logged-in user (Protected Route)
router.get("/", authMiddleware, getTransactions);

module.exports = router;
