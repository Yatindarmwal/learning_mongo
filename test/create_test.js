'use strict';

const User = require('../src/user');
const assert = require('assert');

describe('Creating records', () => {

    it('saves a user', (done) => {
        const joe = new User({ name: 'joe' });
        joe.save().then(() => {
            assert(!joe.isNew);
            done();
        });
    });
});