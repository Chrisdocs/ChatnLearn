const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const userDashRoutes = require('./user-dash-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes)
router.use('/user-dash', userDashRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;