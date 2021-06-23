const router = require('express').Router();
const User = require('../../models');

// Get all Users /api/users (get)
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(userDbData => res.json(userDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Get one User /api/users/id (get)
router.get('/:id', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id.'})
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// Create a User /api/users (post)
router.post('/', (req, res) => {
    User.create({
        user_login: req.body.user_login,
        email: req.body.email,
        display_name: req.body.display_name,
        password: req.body.password
    })
    // .then(userDbData => {
    //     req.session.save(() => {
    //         req.session.user_id = userDbData.id;
    //         req.session.user_login = userDbData.user_login;
    //         req.session.loggedIn = true;

    //         res.json(userDbData)
    //     })
    .then(userDbData => res.json(userDbData))
    // })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// User Login (post)
// User logout (post)
// Update User (put)
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id. '})
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Delete User (delete)
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id.' })
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router