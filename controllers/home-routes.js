const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('homepage')
});

router.get('/chat', (req, res) => {
    res.render('chat')
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;