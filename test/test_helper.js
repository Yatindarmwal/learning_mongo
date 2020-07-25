`use strict`;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user_test');

mongoose.connection
    .once('open', () => console.log('GTG'))
    .on('error', (error) => {
        console.warn('Error', error);
    });

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        //Ready to run the next test
        done();
    });
});