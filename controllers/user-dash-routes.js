const router = require('express').Router();
//const sequelize = require('../config/connection');
const User = require('../models');
const withAuth = require('../utils/auth');

// Get all users on dashboard
router.get('/', withAuth, (request, response) => {
        User.findAll({})
        .then(dbUserData => {
            console.log('=======>', dbUserData);
            const users = dbUserData.map(user => user.get({ plain: true }));
            console.log('this is the User data ====>', users)
            response.render('user-dash', {users, loggedIn: true});
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err);
        });
});



module.exports = router;
