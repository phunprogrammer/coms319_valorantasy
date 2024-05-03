const router = require('express').Router();
const { 
    getUserOwnedLeagues,
    getUserJoinedLeagues,
    postUserLeague,
    deleteUserLeague,
    joinLeague,
    renameLeague,
    deleteMember
} = require('../controllers/userController.js');
const auth = require('../middleware/authMiddleware');

router.get('/leagues/owned', auth(["user", "admin"]), getUserOwnedLeagues);
router.get('/leagues/joined', auth(["user", "admin"]), getUserJoinedLeagues);
router.put('/leagues/:id', auth(["user", "admin"]), joinLeague);
router.put('/leagues/:id/:name', auth(["user", "admin"]), renameLeague);
router.delete('/leagues/:id', auth(["user", "admin"]), deleteUserLeague);
router.delete('/leagues/:id/:userId', auth(["user", "admin"]), deleteMember);
router.post('/leagues/:name', auth(["user", "admin"]), postUserLeague);

module.exports = router;