const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('./../models/Post');

/**
 * メッセージ定義(エラー)
 */
const ERROR = 'エラー'


/**
 * 新規コメント
 */
router.post('/', (req, res, next) => {
  const postId = req.body.post_id;
  const username = req.body.username;
  const payload = req.body.payload;

  createNewComment(postId, username, payload).then(result => {
    res.status(200).json({
      post: {
        id: result._id,
        username: result.username,
        created_time: result.created_time,
        photos: result.photos,
        caption: result.caption || '',
        comments: result.comments || {},
        likes: result.likes || []
      }
    });
  }).catch(err => {
    res.status(500).json({
      error: {
        message: `${ERROR}: ${err}`
      }
    });
  });
});

/**
 * コメント削除
 * TODO
 */
router.delete('/', (req, res, next) => {
  res.status(200).json({
    message: 'まだ実装してないよ'
  });
});

/**
 * DBに新規コメントを追加
 * (Postドキュメントを更新)
 */
const createNewComment = (postId, username, payload) => {
  // パスワードはとりあえず生文字列で持つよ
  const comment = {
    username: username,
    payload: payload,
    created_time: new Date()
  };
  return new Promise((resolve, reject) => {
    Post.findById(postId).exec((err, post) => {
      console.log(post);
      if (!err) {
        post.comments.push(comment);
        post.save((err, updatedPost) => {
          if (!err) {
            resolve(updatedPost);
          } else {
            reject(err);
          }
        });
      } else {
        reject(err);
      }
    })
  });
}

module.exports = router;
