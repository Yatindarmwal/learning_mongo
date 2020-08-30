const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Comment = mongoose.model('comments', CommentsSchema);

module.exports = Comment;