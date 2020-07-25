`use strict`;
const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({ name: 'joe' });
        joe.save()
            .then(() => done());
    });
    it('Find all users with name joe', (done) => {
        User.find({ name: 'joe' }).then((users) => {
            assert(users[0].id === joe.id);
            done();
        });
    });
    it('Find a user with the particular id', (done) => {
        User.findOne({ _id: joe._id }).then((user) => {
            assert(user.name === 'joe');
            done();
        });
    });

});