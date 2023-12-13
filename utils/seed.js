const connection = require('../config/connection');
const { User, Thought, Friends, Reaction } = require('../models');
const { getRandomUser, getRandomThought, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.db.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.db.dropCollection('thoughts');
    }
    let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
    if (reactionCheck.length) {
        await connection.db.dropCollection('reactions');
    }
    let friendsCheck = await connection.db.listCollections({ name: 'friends' }).toArray();
    if (friendsCheck.length) {
        await connection.db.dropCollection('friends');
    }

    const users = [];
    const thoughts = [];
    const reactions = [];
    const friends = [];

    for (let i = 0; i < 10; i++) {
        const user = getRandomUser();
        const thoughts = getRandomThought();
        const reactions = getRandomReaction();
        const friends = getRandomFriend();
        users.push({
            first,
            last,
            email,
            username,
            thoughts,
            reactions,
            friends
        });

        thoughts.push({
            thoughtText,
            username,
            createdAt
        });

        reactions.push({
            reactionBody,
            username,
            createdAt
        });

        friends.push({
            username,
            friendCount
        });
    }

    await User.insertMany(users);
    await Thought.insertMany(thoughts);
    await Reaction.insertMany(reactions);
    await Friends.insertMany(friends);
    
    await User.collection.insertOne({ username: 'John' });
    await User.collection.insertOne({ username: 'Peter' });
    await User.collection.insertOne({ username: 'Anthony' });

    await Thought.collection.insertOne({ thoughtText: 'I like to code' });
    await Thought.collection.insertOne({ thoughtText: 'I like to play video games' });
    await Thought.collection.insertOne({ thoughtText: 'I like to read' });
    await Thought.collection.insertOne({ thoughtText: 'I like to watch movies' });

    await Reaction.collection.insertOne({ reactionBody: 'Like' });
    await Reaction.collection.insertOne({ reactionBody: 'Dislike' });
    await Reaction.collection.insertOne({ reactionBody: 'Love' });
    await Reaction.collection.insertOne({ reactionBody: 'Hate' });

    await Friends.collection.insertOne({ username: 'John' });
    await Friends.collection.insertOne({ username: 'Peter' });
    await Friends.collection.insertOne({ username: 'Anthony' });

    console.log('all done!');
    process.exit(0);
}
);

