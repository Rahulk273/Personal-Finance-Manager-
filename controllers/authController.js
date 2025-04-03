const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Create new user
        user = new User({ name, email, password });
        await user.save();

        // Generate JWT token
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully"});
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};



// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token, user: { name: user.name, email: user.email } });
// };




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Check if user exists
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // 🔹 Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 🔹 Include `_id` in the response
        res.json({
            token,
            user: { _id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

