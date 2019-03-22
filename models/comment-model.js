const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  topic: {type: Schema.Types.ObjectId, ref: 'Topic'}
});

const Comment = mongoose.model('Comment', taskSchema);

module.exports = Comment;