const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment's _id field
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        },
        reactionBody: {
        type: String,
        required: 'Please enter a reaction!',
        maxLength: 280,
        },
        username: {
        type: String,
        required: 'Please enter your username!',
        },
        createdAt: {
        type: Date,
        default: Date.now,
        // use moment in a getter method to format the timestamp on query
        get: (createdAtVal) => createdAtVal,
        },
    },
    {
        toJSON: {
        getters: true,
        },
    }
);

module.exports = ReactionSchema;
