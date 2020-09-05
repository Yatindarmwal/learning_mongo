const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');
const { populate } = require('../src/user');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'joe' });
        blogPost = new BlogPost({ title: 'blog', content: 'this is a blog' });
        comment = new Comment({ content: 'this is a comment' });
        joe.blogPost.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => {
                done();
            });
    });

    it('saves a relation between a user and blog post', (done) => {
        User.findOne({ name: 'joe' })
            .populate('blogPost')
            .then((user) => {
                assert(user.blogPost[0].content == 'this is a blog')
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'joe' })
            .populate({
                path: 'blogPost',
                populate: {
                    path: 'comments',
                    model: 'comments',
                    populate: {
                        path: 'user',
                        model: 'users'
                    }
                }
            })
            .then((user) => {
                assert(user.name == 'joe');
                assert(user.blogPost[0].title == 'blog');
                assert(user.blogPost[0].comments[0].content == 'this is a comment');
                assert(user.blogPost[0].comments[0].user.name == 'joe');
                done();
            });
    })
});