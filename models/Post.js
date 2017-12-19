const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Photo = require('./Photo');
const Comment = require('./Comment');

/**
 * Postスキーマ定義
 * ほぼ/feedで取得できる形式
 */
const PostSchema = new Schema({
  // id: Schema.Types.ObjectId,
  username: String,
  created_time: Date,
  photos: [Photo],
  caption: String,
  comments: [Comment],
  likes: [String] // likeしたusernameのリストを持つ
});

module.exports = mongoose.model('Post', PostSchema);