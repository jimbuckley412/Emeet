const { Schema, model } = require('mongoose');
const ThoughtSchema = require('./Thought');
const FriendsSchema = require('./Friends');
const ReactionSchema = require('./Reaction');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter your username!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Please enter your email!',
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [ThoughtSchema],
        friends: [FriendsSchema],
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const User = model('User', UserSchema);

module.exports = User;