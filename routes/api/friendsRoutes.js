const router = require('express').Router();

const {
    getAllFriends,
    getFriendsById,
    addFriend,
    removeFriend
} = require('../../controllers/friends-controller');

// /api/friends
router
    .route('/')
    .get(getAllFriends);
    
// /api/friends/:id
router
    .route('/:id')
    .get(getFriendsById);

// /api/friends/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
