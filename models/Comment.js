const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Commentスキーマ定義
 */
const CommentSchema = new Schema({
  id: String,
  username: String,
  payload: String,
  created_time: Date
});

// module.exports = mongoose.model('Comment', CommentSchema);
module.exports = CommentSchema;