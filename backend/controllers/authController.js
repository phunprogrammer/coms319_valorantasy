const { User, MAX_LENGTH } = require('../models/userModel.js');

const bcrypt = require('bcryptjs');
const {
    signToken
} = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) 
            return res.status(400).json( {errorMessage: "Invalid Fields"} );

        if(password.length < 8)
            return res.status(400).json( {errorMessage: "Password too short"} );

        if(username.length > MAX_LENGTH)
            return res.status(400).json( {errorMessage: "Username too long"} );

        const existingUser = await User.findOne( { username } );

        if(existingUser)
            return res.status(400).json( {errorMessage: "Username taken"} );

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, passwordHash, roles: ["user"]
        });

        const savedUser = await newUser.save();

        res.cookie('token', signToken(savedUser), {
            httpOnly: true
        }).json(savedUser).send();
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }  
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) 
            return res.status(400).json({errorMessage: "Invalid Fields"});

        const existingUser = await User.findOne({username});

        if(!existingUser)
            return res.status(401).json({errorMessage: "Invalid username or password"});

        const passwordIsCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if(!passwordIsCorrect)
            return res.status(401).json({errorMessage: "Invalid username or password"});

        res.cookie('token', signToken(existingUser), {
            httpOnly: true
        }).json(existingUser).send();
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const logout = async (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
};

const loggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.json(true);
    } catch(err) {
        res.json(false);
    }
};

module.exports = {
    register,
    login,
    logout,
    loggedIn
}