
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Photoスキーマ定義
 */
const PhotoSchema = new Schema({
  id: String,
  ext: String
});

// module.exports = mongoose.model('Photo', PhotoSchema);
module.exports = PhotoSchema;