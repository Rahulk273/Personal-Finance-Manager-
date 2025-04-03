const Transaction = require("../models/Transaction");
// exports.addTransaction = async (req, res) => {
//     const { description, amount, type, category } = req.body;
//     const userId = req.user.userId;
//     const transaction = new Transaction({ userId, description, amount, type, category });
//     await transaction.save();
//     res.status(201).json({ message: "Transaction added", transaction });
// };




exports.addTransaction = async (req, res) => {
    try {

        const { amount, type, category, description, date } = req.body;
        const userId = req.user.userId;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }
        
        // Ensure userId is correctly assigned
        const transaction = new Transaction({
            userId: req.user.userId, // Extract from authenticated user
            amount,
            type,
            category,
            description,
            date,
        });

        await transaction.save();

        res.status(201).json({ message: "Transaction added", transaction });
    } catch (err) {
        console.error("Error adding transaction:", err);
        res.status(400).json({ message: err.message });
    }
};


exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
