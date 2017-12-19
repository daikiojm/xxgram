var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Post = require('./../models/Post');

/**
 * Feedの取得
 */
router.get('/', (req, res, next) => {
  getAllPost().then(posts => {
    res.status(200).json({
      feed: posts
    });
  })
  .catch(err => {
    res.status(500).json({
      error: {
        message: `${ERROR}: ${err}`
      }
    });
  });
});

/**
 * DBから投稿一覧を取得
 */
const getAllPost = () => {
  return new Promise((resolve, reject) => {
    // 結果は_idの降順で返す(新しいのを上位に表示させるため)
    Post.find({}).sort({'_id': -1}).exec((err, docs) => {
      if (!err) {
        let result = docs.map(doc => {
          return {
            id: doc._id,
            username: doc.username,
            created_time: doc.created_time,
            photos: doc.photos,
            caption: doc.caption || '',
            comments: doc.comments || [],
            likes: doc.likes || []
          };
        });
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = router;
