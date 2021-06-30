const router = require('express').Router();
const {User, Friends} = require('../../models');

// Get all Users friends
router.get('/:id', (req, res) => {
    Friends.findAll({
        where: {
            id: req.session.user_id
        },
        include: {
            model: User,
            key: 'id'
        }
    })
    .then(friendsDbData => res.json(friendsDbData))
})
// Get a single users friend
// Create a friend
// Update a friend
// Delete a friend
