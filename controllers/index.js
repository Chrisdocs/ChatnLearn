const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const userDashRoutes = require('./user-dash-routes.js');
const findFriendRoutes = require('./friend-search');
const chatRoutes = require('./chat');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/user-dash', userDashRoutes);
router.use('/friend-search', findFriendRoutes);
router.use('/chat', chatRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;