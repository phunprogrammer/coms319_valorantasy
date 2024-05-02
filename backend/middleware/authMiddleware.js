const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) throw new Error;

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if(!(await User.findOne( { _id: verified.user } ))) throw new Error;

        req.user = verified.user;
        next();
    }
    catch(err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    } 
}

module.exports = auth;