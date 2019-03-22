const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const topicSchema = new Schema({
  title: String,
  description: String,
  tasks: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  // owner will be added later on
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;