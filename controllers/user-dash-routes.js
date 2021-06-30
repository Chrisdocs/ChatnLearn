const router = require('express').Router();
//const sequelize = require('../config/connection');
const { User } = require('../models');
//const authentication = require('../utils/auth');

// Get all users on dashboard
router.get('/', (request, response) => {
        User.findAll({
            where: {
                id: request.session.id,
            },
            attributes: [
                'display_name',
            ],
            // include: [
            //     {
            //         model: User,
            //         attributes: ['username'],
            //     },
            //     {
            //         model: Comment,
            //         attributes: [
            //             'id',
            //             'comment_text',
            //             'post_id',
            //             'user_id',
            //             'created_at'
            //         ],
            //         include: {
            //             model: User,
            //             attributes: ['username'],
            //         },
            //     },
            // ],
        })
        .then(dbUserData => {
            const users = dbUserData.map(user => user.get({ plain: true }));
            response.render('user-dash', { users, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err);
        });
});



module.exports = router;
