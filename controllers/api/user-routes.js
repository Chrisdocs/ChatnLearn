const router = require('express').Router();
const {User} = require('../../models');

// Get all Users /api/users (get)
router.get('/', async (request, response) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
        });

        response.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Get one User /api/users/id (get)
router.get('/:id', async (request, response) => {
    try {
        const dbUserData = await User.findByPk(request.params.id, {
            where: {
                id: request.params.id,
            }
        });
        if (!dbUserData) {
            response.status(404).json({ message: 'No user found with that id' });
            return;
        }
        response.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
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
    // .then(userDbData => res.json(userDbData))
    // })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// User Login (post)
// router.post('/login', (req, res) => {
//     User.findOne({
//         where: {
//             user_login: req.body.user_login
//         }
//     }).then(dbUserData => {
//         if (!dbUserData) {
//             res.status(400).json({
//                 message: 'No user with that login!'
//             });
//             return;
//         }

//         const validPassword = dbUserData.checkPassword(req.body.password);

//         if (!validPassword) {
//             res.status(400).json({
//                 message: 'Incorrect password!'
//             });
//             return;
//         }

//         req.session.save(() => {
//             // declare session variables
//             req.session.user_id = dbUserData.id;
//             req.session.user_login = dbUserData.user_login;
//             req.session.loggedIn = true;

//             res.json({
//                 user: dbUserData,
//                 message: 'You are now logged in!'
//             });
//         });
//     });
// });
router.post('/login', async (request, response) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                user_login: request.body.user_login,
            },
        });

        if (!dbUserData) {
            response.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(request.body.password);

        if (!validPassword) {
            response.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        request.session.save(() => {
            request.session.user_id = dbUserData.id;
            request.session.user_login = dbUserData.user_login;
            request.session.loggedIn = true;

            response.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
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