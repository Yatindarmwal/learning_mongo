`use strict`;
const mongoose = require('mongoose');
const { before } = require('mocha');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/user_test',{ useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Error', error);
        });

});

beforeEach((done) => {
    let { users, comments, blog_posts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blog_posts.drop(() => {
                done();
            });
        });
    });
});