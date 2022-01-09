const User = require("../models/User");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/nodemailer");
const { activateTemplate, resetTemplate } = require("../utils/emailTemplate");
const bcrypt = require("bcryptjs");
const { JWT_ACC_ACTIVATE, RESET_PASSWORD_KEY,
    CLIENT_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

// Creating a new user
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ error: "E-mail already exists." })
    }

    const token = jwt.sign({ username, email, password }, JWT_ACC_ACTIVATE,
        { expiresIn: '20m' });

    const url = `${CLIENT_URL}/active/${token}`;

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
        console.log('chegou')
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

            await User.create({
                username,
                email,
                password: passwordHashed
            })

            return res.status(200).json({ username, email });
        })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "E-mail or password is invalid." })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "E-mail or password is invalid." })
        }

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })

        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/auth/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
        })

        return res.status(200).json({
            message: 'Login Success!',
            access_token,
            user: {
                ...user._doc,
                password: ''
            }
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
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

    const url = `${CLIENT_URL}/reset/${token}`;

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
    const { resetLink, password } = req.body;
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
                    await User.findOneAndUpdate(
                        { resetLink },
                        { password: hashedPassword }
                    )
                    return res.status(200).json({ message: 'Password changed successfully' });
                } else {
                    return res.status(400).json({ error: 'User not found' })
                }
            })
    } else {
        return res.status(401).json({ error: 'Invalid data!' });
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/api/auth/refresh_token' })
        return res.json({ message: "Logged out!" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

exports.generateAccessToken = async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken

        if (!rf_token) {
            return res.status(400).json({ msg: "Please login now." })
        }

        jwt.verify(rf_token, REFRESH_TOKEN_SECRET, async (err, result) => {
            if (err) {
                return res.status(400).json({ msg: "Please login now." });
            }

            const user = await User.findById(result.id).select("-password");

            if (!user) {
                return res.status(400).json({ msg: "This user does not exist." })
            }

            const access_token = createAccessToken({ id: result.id })

            res.json({
                access_token,
                user
            })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
}
