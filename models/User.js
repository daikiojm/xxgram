const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Userスキーマ定義
 */
let UserSchema = new Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
