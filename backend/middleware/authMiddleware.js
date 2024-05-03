const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const auth = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;

            if(!token) throw new Error;

            const verified = jwt.verify(token, process.env.JWT_SECRET);

            var user;

            if(!(user = await User.findOne( { _id: verified.user } ))) throw new Error;

            if(!roles.some(role => user.roles.includes(role))) throw new Error;

            req.user = verified.user;
            next();
        }
        catch(err) {
            res.status(401).json({ errorMessage: "Unauthorized" });
        } 
    }
}

module.exports = auth;