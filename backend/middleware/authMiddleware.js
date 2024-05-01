const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        const expiration = req.cookies.exp;

        if(!token) throw new Error;

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if(Date.now() >= expiration) throw new Error;

        next();
    }
    catch(err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    } 
}

module.exports = auth;