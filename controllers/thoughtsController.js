const { ObjectId } = require('mongoose').Types;
const { Users, Thoughts, Reactions } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought matching ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        return Users.findOneAndUpdate(
          {username: req.body.username},
          {$addToSet: {thoughts: thought._id}},
          {new: true}
        );
      }).then((user) => {
        !user? res.status(404).json({ message: "No user matching ID!"})
        :res.json(`Thought Created`)}
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'No thought matching ID' })
      : res.json({message: `Thought deleted`})
  )
  .catch((err) => res.status(500).json(err));
},
  // Update thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought matching ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought matching ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought matching ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};