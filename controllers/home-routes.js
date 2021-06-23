const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models');

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/chat', (req, res) => {
    res.render('chat')
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;