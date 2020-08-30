`use strict`;
const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'joe', likes: 0 });
        joe.save().then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);

    });

    it('Model instance can update ', (done) => {
        assertName(joe.update({ name: 'Alex' }), done);
    });

    it('A Modal class can update', (done) => {
        assertName(User.update({ name: 'joe' }, { name: 'Alex' }), done);
    });

    it('A Modal class can update one record', (done) => {
        assertName(User.findOneAndUpdate({ name: 'joe' }, { name: 'Alex' }), done);
    });

    it('A Modal class can find a record with an Id and update', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
    });

    it('A user can have their postCount increased by 1', (done) => { //update operator
        User.update({ name: 'joe' }, { $inc: { likes: 10 } })
            .then(() => {
                User.findOne({ name: 'joe' })
                    .then((user) => {
                        assert(user.likes === 10)
                        done();
                    })
            });
    });
});