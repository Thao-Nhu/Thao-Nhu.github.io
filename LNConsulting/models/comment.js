const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content:String,
  created_at:{ type: Date, default: Date.now },
  project_id:{type: Schema.Types.ObjectId, ref: 'Project'},
  user_id:{type: Schema.Types.ObjectId, ref: 'User'},
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;