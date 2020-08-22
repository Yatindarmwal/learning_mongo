`use strict`;

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    postCount: Number
});

const User = mongoose.model('users', UserSchema);

module.exports = User;