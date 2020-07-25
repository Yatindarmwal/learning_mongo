`use strict`;
const mongoose = require('mongoose');
const { before } = require('mocha');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/user_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Error', error);
        });

});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        //Ready to run the next test
        done();
    });
});