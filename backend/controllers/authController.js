const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

        const existingUser = await User.findOne( { username } );

        if(existingUser)
            return res.status(400).json( {errorMessage: "Username taken"} );

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, passwordHash
        });

        const savedUser = await newUser.save();

        res.cookie('token', signToken(savedUser), {
            httpOnly: true
        }).send();
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
        }).send();
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
}

module.exports = {
    register,
    login,
    logout
}