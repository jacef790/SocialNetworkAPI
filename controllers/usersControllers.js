const { ObjectId } = require('mongoose').Types;
const { Users, Thoughts, Reactions } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
   
     Users.find()
      .then(async (users) => {
        const usersObj = {
          users,
        };
        return res.json(usersObj);
      })
      .catch((err) => {
        console.log(err); 
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
      .populate({path: 'thoughts', select: '-__v'})
      .populate({path: 'friends', select: '-__v'})
      // .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user matching ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    Users.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user exists' })
          : res.json({ message: 'Successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a User
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user matching id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a friend to a user
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: { _id: req.body._id } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user matching that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Remove a friend to a user
    removeFriend(req, res) {
      Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user matching that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};