const router = require('express').Router();

const {
    getAllReactions,
    getReactionsById,
    addReaction,
    removeReaction
} = require('../../controllers/reaction-controller');

// /api/reaction
router
    .route('/')
    .get(getAllReactions);

// /api/reaction/:id
router
    .route('/:id')
    .get(getReactionsById);

// /api/reaction/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/reaction/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;