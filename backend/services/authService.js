const jwt = require('jsonwebtoken');

const signToken = (user) => {
    return jwt.sign({
        user: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN
    });
};

module.exports = {
    signToken
};