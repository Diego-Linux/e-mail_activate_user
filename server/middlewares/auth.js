const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'lifdus89fsdfods8fy9sdf',
        {
            expiresIn: '7d',
        }
    );
};

exports.isAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.slice(7, auth.length);
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'lifdus89fsdfods8fy9sdf',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};



