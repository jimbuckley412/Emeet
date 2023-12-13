const { Reaction, Thought, User } = require('../models');

module.exports = {
    async getAllReaction(req, res) {
        try {
            const reaction = await Reaction.find();
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneReaction(req, res) {
        try {
            const reaction = await Reaction.findOne({ _id: req.params.reactionId })
            .select('-__v');

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with this id!' });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            res.json(reaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with this id!' });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reaction: reaction._id } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with this id!' });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateReaction (req, res) {
        try {
            const reaction = await Reaction.findOneAndUpdate(
                { _id: req.params.reactionId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with this id!' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with this id!' });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

