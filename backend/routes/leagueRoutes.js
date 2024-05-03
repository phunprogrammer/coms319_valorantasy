const router = require('express').Router();
const { 
    getLeagues,
    getLeague,
    deleteLeague,
    getLeagueMembers
} = require('../controllers/leagueController.js');
const auth = require('../middleware/authMiddleware');

router.get('', auth(["user", "admin"]), getLeagues);
router.get('/:id', auth(["user", "admin"]), getLeague);
router.get('/:id/members', auth(["user", "admin"]), getLeagueMembers);
router.delete('/:id', auth(["admin"]), deleteLeague);

module.exports = router;