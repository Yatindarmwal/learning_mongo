`use strict`;

const postSchema = require('./post');
const mongoose = require('mongoose');
const PostSchema = require('./post');
const schema = mongoose.Schema;

const UserSchema = new schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer then 2 characters.'
        }
    },
    postCount: Number,
    posts: [PostSchema]
});

const User = mongoose.model('users', UserSchema);

module.exports = User;