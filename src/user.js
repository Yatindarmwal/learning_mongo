`use strict`;

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
    posts: [PostSchema]
});

UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

const User = mongoose.model('users', UserSchema);

module.exports = User;