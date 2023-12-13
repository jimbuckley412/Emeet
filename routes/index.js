const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const friendsRoutes = require('./friendsRoutes');
const reactionRoutes = require('./reactionRoutes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/friends', friendsRoutes);
router.use('/reaction', reactionRoutes);

router.use((req, res) => {
    res.send('<h1>Wrong Route!</h1>')
});

module.exports = router;
