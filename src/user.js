`use strict`;

const mongoose = require('mongoose');
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
    postCount: Number
});

const User = mongoose.model('users', UserSchema);

module.exports = User;