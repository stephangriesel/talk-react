const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = require('./user-model');

const topicSchema = new Schema({
  title: String,
  description: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;