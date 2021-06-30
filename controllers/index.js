const router = require('express').Router();

const userRoutes = require('./user-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const userDashRoutes = require('./user-dash-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes)
router.use('/users', userRoutes);
router.use('/user-dash', userDashRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;