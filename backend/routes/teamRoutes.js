const router = require('express').Router();
const {
    saveTeam
} = require('../controllers/teamController');
const auth = require('../middleware/authMiddleware');

router.post('', auth, saveTeam);

module.exports = router;