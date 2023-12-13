const { Friends, User } = require('../models');

module.exports = {
  async getAllFriends(req, res) {
    try {
      const friends = await Friends.find();
      res.json(friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getOneFriend(req, res) {
    try {
      const friend = await Friends.findOne({ _id: req.params.friendId }).select('-__v');
      if (!friend) {
        return res.status(404).json({ message: 'No friend found with this id!' });
      }
      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createFriend(req, res) {
    try {
      const friend = await Friends.create(req.body);
      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const friend = await Friends.findOneAndDelete({ _id: req.params.friendId });
      if (!friend) {
        return res.status(404).json({ message: 'No friend found with this id!' });
      }
      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const friend = await Friends.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: friend._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
