const router = require('express').Router();
const { 
    getUserOwnedLeagues,
    getUserJoinedLeagues,
    postUserLeague,
    deleteUserLeague,
    joinLeague
} = require('../controllers/userController.js');
const auth = require('../middleware/authMiddleware');

router.get('/leagues/owned', auth(["user", "admin"]), getUserOwnedLeagues);
router.get('/leagues/joined', auth(["user", "admin"]), getUserJoinedLeagues);
router.put('/leagues/:id', auth(["user", "admin"]), joinLeague);
router.delete('/leagues/:id', auth(["user", "admin"]), deleteUserLeague);
router.post('/leagues/:name', auth(["user", "admin"]), postUserLeague);

module.exports = router;