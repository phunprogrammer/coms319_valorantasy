const router = require('express').Router();
const { 
    getLeagues,
    getLeague,
    deleteLeague
} = require('../controllers/leagueController.js');
const auth = require('../middleware/authMiddleware');

router.get('', auth(["user", "admin"]), getLeagues);
router.get('/:id', auth(["user", "admin"]), getLeague);
router.delete('/:id', auth(["admin"]), deleteLeague);

module.exports = router;