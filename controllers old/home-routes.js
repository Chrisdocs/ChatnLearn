const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('homepage')
});

router.get('/user-dash', (req, res) => {
    res.render('user-dash')
});

router.get('/chat', (req, res) => {
    res.render('chatroom')
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;