const router = require('express').Router();
const { 
    getUserLeagues,
    postUserLeague
} = require('../controllers/userController.js');
const auth = require('../middleware/authMiddleware');

router.get('/leagues', auth(["user", "admin"]), getUserLeagues);
router.post('/leagues/:name', auth(["user", "admin"]), postUserLeague);

module.exports = router;