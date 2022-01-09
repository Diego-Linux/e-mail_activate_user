const User = require("../models/User");
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")

        if (!token) return res.status(400).json({ message: "Invalid Authentication." })

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
        if (!decoded) return res.status(400).json({ message: "Invalid Authentication." })

        const user = await User.findOne({ _id: decoded.id })

        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = auth