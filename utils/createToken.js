const jwt = require('jsonwebtoken');

const signJwt = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
};

const createSendToken = (user, statusCode, res, message) => {
    const token = signJwt(user._id);

    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        message,
        data: {
            user,
        },
        token,
    });
};

module.exports = {
    signJwt,
    createSendToken,
};
