const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controllers/thoughtsController');

  router.route('/')
    .get(getThoughts)
    .post(createThought)

  router
    .route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

    router
    .route('/:thoughtID/reactions')
    .post(createReaction);

    router.route('/:thoughtID/reactions/:reactionsID')
    .delete(deleteReaction)

    module.exports = router;