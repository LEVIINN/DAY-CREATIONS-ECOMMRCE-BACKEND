const jwt = require('jsonwebtoken');

const signJwt = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
};

const createSendToken = (user, statusCode, res, message) => {
    const token = signJwt(user._id);
    // const cookiesOption = {
    //     expires: new Date(
    //         Date.now() +
    //             Number(process.env.JWT_COOKIE_EXPIRES_IN) * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    //     sameSite: 'None',
    //     partition: true,
    //     secure: true,
    // };

    // res.cookie('token', token, cookiesOption);
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
