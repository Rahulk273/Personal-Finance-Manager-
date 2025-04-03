

const mongoose = require("mongoose");
const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

// Set or Update Budget for a Category
exports.setBudget = async (req, res) => {
    try {
        const { category, amount } = req.body;
        const userId = req.user.userId;

        let budget = await Budget.findOne({ userId, category });

        if (budget) {
            budget.amount = amount; // Update budget amount if exists
        } else {
            budget = new Budget({ userId, category, amount }); // Create new budget
        }

        await budget.save();
        res.status(201).json({ message: "Budget set successfully", budget });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

//  Get User's Budgets
exports.getBudgets = async (req, res) => {
    try {
        const userId = req.user.userId;
        const budgets = await Budget.find({ userId });
        res.json({ budgets });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get Budget Alerts (if spending nears or exceeds budget)

exports.getBudgetAlerts = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        const budgets = await Budget.find({ userId });

        console.log("Budgets Found:", budgets);

        let alerts = [];

        for (let budget of budgets) {
            const totalSpent = await Transaction.aggregate([
                { $match: { userId: userId, category: budget.category, type: "expense" } },
                { $group: { _id: null, totalSpent: { $sum: "$amount" } } }
            ]);

            const spentAmount = totalSpent.length > 0 ? totalSpent[0].totalSpent : 0;
            const remainingAmount = budget.amount - spentAmount;
            const threshold = 0.8 * budget.amount; // 80% of budget

            console.log(`🟢 Category: ${budget.category}, Budget: ${budget.amount}, Spent: ${spentAmount}, Remaining: ${remainingAmount}`);

            // 🔥 Fix: Ensure alert triggers correctly
            if (spentAmount >= threshold) {
                alerts.push({
                    category: budget.category,
                    budget: budget.amount,
                    spent: spentAmount,
                    remaining: remainingAmount > 0 ? remainingAmount : 0,
                    message: `⚠️ Warning: You have spent ₹${spentAmount} out of ₹${budget.amount} for ${budget.category}.`
                });
            }
        }

        console.log("Final Alerts:", alerts);
        res.json({ alerts });
    } catch (err) {
        console.error("Error fetching budget alerts:", err);
        res.status(500).json({ error: "Server error" });
    }
};



