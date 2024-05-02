const router = require('express').Router();
const { 
    getUserLeagues,
} = require('../controllers/userController.js');
const auth = require('../middleware/authMiddleware');

router.get('/leagues', auth, getUserLeagues);

module.exports = router;