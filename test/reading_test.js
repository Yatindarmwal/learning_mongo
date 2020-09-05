`use strict`;
const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({ name: 'joe' });
        kit = new User({ name: 'kit' });
        alex = new User({ name: 'alex' });
        zack = new User({ name: 'zack' });
        Promise.all([joe.save(), kit.save(), alex.save(), zack.save()])
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
    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then(users => {
                assert(users[0].name == 'joe');
                assert(users[1].name == 'kit');
                done();
            });
    });
});