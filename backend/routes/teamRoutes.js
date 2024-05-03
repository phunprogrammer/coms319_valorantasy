const router = require('express').Router();
const {
    saveTeam
} = require('../controllers/teamController');
const auth = require('../middleware/authMiddleware');

router.post('', auth(["user", "admin"]), saveTeam);

module.exports = router;