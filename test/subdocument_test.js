const assert = require('assert');
const User = require('../src/user');

describe('Sub documents', () => {
    it('can create a sub document', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [
                {
                    title: 'post title'
                }
            ]
        });
        joe.save()
            .then(() => {
                User.findOne({ name: 'Joe' })
                    .then((user) => {
                        assert(user.posts[0].title == 'post title');
                        done();
                    });
            });
    });
    it('Can add sub document in an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({ title: 'New post' });
                return user.save();
            }).then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'New post');
                done();
            })
    });
    it('can remove an existing sub document', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{ title: 'New title' }]
        });
        joe.save()
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            }
            ).then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user.posts.length == 0);
                done();
            });
    });
    it.skip('can fetch specific entry from a sub document', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [
                {
                    title: 'post1',
                    created: '1/2/3'
                },
                {
                    title: 'post2',
                    created: '2/3'
                },
                {
                    title: 'post1',
                    created: '1/556'
                }
            ]
        });
        joe.save()
            .then(() => {
                User.aggregate([
                    { $match: { "name": "Joe" } },
                    { $unwind: "$posts" },
                    { $match: { "posts.title": "post1" } },
                    { $project: { "posts": "$posts.title", "created": "$posts.created" } }
                ]
                ).then((data) => {
                    console.log(data);
                });
            });
    });
});