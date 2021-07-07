const router = require('express').Router();
//const sequelize = require('../config/connection');
const {User} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
        User.findOne({
            where: {
                id: req.session.user_id
            }
        })
        .then(dbUserData => {
            res.render('chatroom', dbUserData);
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



module.exports = router;