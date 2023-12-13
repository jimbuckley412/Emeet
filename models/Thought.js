const { Schema, Types } = require('mongoose');
 
const ThoughtSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: 'Please enter your thought!',
        minLength: 1,
        maxLength: 280,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        // use moment in a getter method to format the timestamp on query
        get: (createdAtVal) => createdAtVal,
        },
        username: {
        type: String,
        required: 'Please enter your username!',
        },
        // use ReplySchema to validate data for a reply
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
        virtuals: true,
        getters: true,
        },
        id: false,
    }
);

module.exports = ThoughtSchema;