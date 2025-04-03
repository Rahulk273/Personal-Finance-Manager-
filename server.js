const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/budget", require("./routes/budgetRoutes")); // ✅ Add this line

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Only start server if not in test mode
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export `app` for testing
module.exports = app;
