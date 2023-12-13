const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    updateThoughts,
    removeThoughts,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThoughts);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(removeThoughts);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;