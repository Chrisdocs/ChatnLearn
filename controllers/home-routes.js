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
    // Send user info to the handlebars
    User.findAll({})
    .then(dbUserData => {
        console.log('this is from the chat home route!!', dbUserData)
        res.render('chatroom', dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    let userName;
    // check if user is logged in
    if (req.session.loggedIn = true) {
        // if user is logged in, set userName to the name of th elogged in user
        userName = req.session.display_name
        console.log('userName is currently equal to:', userName)
    } else {
        // if not, set userName equal to "guest" with a random 5 digit number
        userName = 'Guest';
        console.log('userName is currently equal to:', userName)
    }
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