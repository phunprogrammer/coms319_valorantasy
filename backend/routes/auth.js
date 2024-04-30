const express = require('express');
const router = express.Router();
const path = require('path');
const hbs = require('hbs');

router.get('/login', (req, res) => {
    res.send('this is login route');
});

router.get('/register', (req, res) => {
    res.send('this is register route');
});

module.exports = router;