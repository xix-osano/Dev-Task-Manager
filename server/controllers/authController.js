const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

// Signup Endpoint Logic
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists"});

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });

    const token = JWT.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json(token);
};

// Login Endpoint Logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

    const token = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json(token);
}; 