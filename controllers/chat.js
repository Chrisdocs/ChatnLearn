const router = require('express').Router();
//const sequelize = require('../config/connection');
const {User} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (request, response) => {
        User.findAll({})
        .then(dbUserData => {
            const users = dbUserData.map(user => user.get({ plain: true }));
            console.log('users console log for chat.js', users)
            response.render('chatroom', {users, loggedIn: true});
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err);
        });
});



module.exports = router;