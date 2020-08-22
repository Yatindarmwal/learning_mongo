`use strict`;

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    name: String,
    postCount: Number
});

const User = mongoose.model('users', UserSchema);

module.exports = User;