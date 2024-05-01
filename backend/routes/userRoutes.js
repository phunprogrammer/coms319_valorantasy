const router = require('express').Router();

router.post('/', (req, res) => {
    res.send('test');
});

router.get('/register', (req, res) => {
    res.send('this is register route');
});

module.exports = router;