const router = require('express').Router();
const { 
    postLeague,
    getLeagues,
    getLeague
} = require('../controllers/leagueController.js');
const auth = require('../middleware/authMiddleware');

router.post('/:name', auth, postLeague);
router.get('', auth, getLeagues);
router.get('/:id', auth, getLeague);

module.exports = router;