const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

const usersTotals = async () => {
  const numberOfUsers = await User.countDocuments();
  return numberOfUsers;
};

const postedThought = async (thoughtId) => {
  return Thought.aggregate([
    {
      $match: {
        _id: ObjectId(thoughtId),
      },
    },
    {
      $unwind: '$thoughtText',
    },
    {
      $group: {
        _id: '$_id',
        thoughtText: { $first: '$thoughtText' },
        createdAt: { $first: '$createdAt' },
        reactions: { $push: '$reactions' },
      },
    },
    {
      $project: {
        _id: 0,
        thoughtId: '$_id',
        thoughtText: '$thoughtText',
        createdAt: '$createdAt',
        reactionCount: { $size: '$reactions' },
      },
    },
  ]);
};

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
        headCount: await usersTotals(),
      };
      res.json(userObj);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      const thought = await postedThought(user.thoughtId);

      res.json({
        user,
        thought,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      const thought = await Thought.findOneAndUpdate(
        { students: req.params.userId },
        { $pull: { students: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }

      res.json({ message: 'Successfully deleted the user!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addThought(req, res) {
    console.log('You are adding a thought');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
