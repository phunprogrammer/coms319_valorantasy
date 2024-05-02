const router = require('express').Router();
const { 
    postLeague,
} = require('../controllers/leagueController.js');
const auth = require('../middleware/authMiddleware');

router.post('/:name', auth, postLeague);

module.exports = router;