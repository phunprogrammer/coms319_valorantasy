const router = require('express').Router();
const User = require('../models/userModel');
const { 
    register,
    login,
    logout
} = require('../controllers/authController.js');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;