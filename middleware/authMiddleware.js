const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password"); // Attach user

        if (!req.user) {
            return res.status(401).json({ message: "User not found for token" });
        }
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
