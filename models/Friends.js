const { Schema, model } = require('mongoose');

const FriendsSchema = new Schema(
    {
        friendId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Friends = model('Friends', FriendsSchema);

module.exports = Friends;