const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('', async (req, res) => {
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
        console.log(savedUser);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get('/register', (req, res) => {
    res.send('this is register route');
});

module.exports = router;