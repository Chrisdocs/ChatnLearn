const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const langSpkRoutes = require('./language-spk-routes')

router.use('/users', userRoutes);
router.use('/langspk', langSpkRoutes);

module.exports = router;