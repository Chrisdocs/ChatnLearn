const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const langSpkRoutes = require('./language-spk-routes')
const userDashRoutes = require('../user-dash-routes');

router.use('/users', userRoutes);
router.use('/langspk', langSpkRoutes);
router.use('/user-dash', userDashRoutes);

module.exports = router;