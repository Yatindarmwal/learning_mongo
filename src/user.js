`use strict`;

const mongoose = require('mongoose');
const PostSchema = require('./post');
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
    likes: Number,
    posts: [PostSchema],
    blogPost: [{ type: schema.Types.ObjectId, ref: 'blog_posts' }]
});

UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

UserSchema.pre('remove', function (next) {
    const BlogPost = mongoose.model('blog_posts');
    //this === joe
    BlogPost.remove({ _id: { $in: this.blogPost } })
        .then(() => next());
});

const User = mongoose.model('users', UserSchema);

module.exports = User;