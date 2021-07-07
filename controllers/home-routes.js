const router = require('express').Router();
const sequelize = require('../config/connection');
const {User} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    console.log(User)
    // res.render('homepage')
    User.findAll({})
        .then(dbUserData => {
            res.render('homepage', dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
});


module.exports = router;