const router = require('express').Router();
const sequelize = require('../config/connection');
const {User} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    console.log(User)
    // res.render('homepage')
    User.findAll({})
        .then(dbUserData => {
            console.log(dbUserData)
            res.render('homepage', dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {

    User.findAll({})
    .then(dbUserData => {
        console.log(dbUserData)
        res.render('user-dash', dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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

router.get('/friend-search', (req, res) => {
    res.render('friend-search');
})

module.exports = router;