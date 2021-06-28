const router = require('express').Router();
const {User} = require('../../models');

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
    .then(userDbData => {
        req.session.save(() => {
            req.session.user_id = userDbData.id;
            req.session.user_login = userDbData.user_login;
            req.session.loggedIn = true;

            res.json(userDbData)
        })
    })
    .then(userDbData => res.json(userDbData))
    // })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// User Login (post)
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            user_login: req.body.user_login
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({
                message: 'No user with that login!'
            });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect password!'
            });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.user_login = dbUserData.user_login;
            req.session.loggedIn = true;

            res.json({
                user: dbUserData,
                message: 'You are now logged in!'
            });
        });
    });
});

// User logout (post)
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
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