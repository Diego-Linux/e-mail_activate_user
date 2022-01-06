const User = require("../models/User");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/nodemailer");
const { activateTemplate, resetTemplate } = require("../utils/emailTemplate");
const { generateToken } = require("../middlewares/auth");
const bcrypt = require("bcryptjs");

const { JWT_ACC_ACTIVATE, RESET_PASSWORD_KEY, CLIENT_URL } = process.env

// Creating a new user
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ error: "E-mail already exists." })
    }

    const token = jwt.sign({ username, email, password }, JWT_ACC_ACTIVATE,
        { expiresIn: '20m' });

    const url = `${CLIENT_URL}/verify/${token}`;

    const data = await activateTemplate(email, username, url);

    const sending = await transporter.sendMail(data);

    sending ?
        res.status(200).json({ message: `Email successfully sent!` })
        : res.status(400).json({
            error: 'Error sending email.'
        })
};

// Activating account
exports.activateAccount = async (req, res) => {
    const { checkToken } = req.body;
    if (checkToken) {
        jwt.verify(checkToken, JWT_ACC_ACTIVATE, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({ error: 'Incorrect or expired token.' })
            }
            const { username, email, password } = decodedToken;

            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: 'E-mail already exists.' });
            }

            const passwordHashed = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                email,
                password: passwordHashed
            })

            return res.status(200).json({ username, email });
        })
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: "User not found." })
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        return res.status(400).json({ error: "User not found." })
    }

    const { id, username } = user;

    return res.status(200).json({
        user: { id, username },
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        console.log(user);
        return res.status(400).json({ error: 'User not found.' });
    }

    const token = jwt.sign({ id: user._id }, RESET_PASSWORD_KEY,
        {
            expiresIn: '5m'
        });

    const url = `${CLIENT_URL}/reset-password/${token}`;

    const { username } = user;

    const data = await resetTemplate(email, username, url);

    await User.findOneAndUpdate({ email }, {
        resetLink: token
    });

    const sending = await transporter.sendMail(data);

    sending ?
        res.status(200).json({ message: `E-mail successfuly sent!` })
        :
        res.json({ error: 'Error sending email.' });
}

// Reset password
exports.resetPassword = async (req, res) => {
    const { resetLink, password, confirmPassword } = req.body;
    if (resetLink) {
        jwt.verify(resetLink, RESET_PASSWORD_KEY,
            async function (error, decodedToken) {
                if (error) {
                    return res.status(401).json({
                        error: 'Incorrect or expired token.'
                    })
                }
                const user = await User.findOne({ resetLink });
                if (user) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    if (password === confirmPassword) {
                        await User.findOneAndUpdate(
                            { resetLink },
                            { password: hashedPassword }
                        )
                        return res.status(200).json({ message: 'Password changed successfully' });
                    } else {
                        return res.status(400).json({ error: 'Passwords do not match' });
                    }
                } else {
                    return res.status(400).json({ error: 'User not found' })
                }
            })
    } else {
        return res.status(401).json({ error: 'Invalid data!' });
    }
};

