const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('./../models/Post');

/**
 * メッセージ定義(エラー)
 */
const ERROR = 'エラー';
const EXIST_LIKE = '指定されたユーザーは既にいいしています';
const NOT_EXIST_LIKE = '指定されたユーザーによるいいねは存在しません';

/**
 * like
 */
router.post('/create', (req, res, next) => {
  console.log(req.body);
  const postId = req.body.post_id;
  const username = req.body.username;

  createNewLike(postId, username).then(result => {
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
router.post('/delete', (req, res, next) => {
  const postId = req.body.post_id;
  const username = req.body.username;

  deleteNewLike(postId, username).then(result => {
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
 * DBを更新してlikeを追加
 * (Postドキュメントを更新)
 */
const createNewLike = (postId, username) => {
  return new Promise((resolve, reject) => {
    Post.findById(postId).exec((err, post) => {
      if (!err) {
        // 指定されたユーザーのlikeが既に存在する
        if (post.likes.indexOf(username) >= 0) {
          reject(EXIST_LIKE);
        }

        let tmpLikes = post.likes; 
        tmpLikes.push(username);
        post.likes = tmpLikes;
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

/**
 * DBを更新してlikeを取り消し
 * (Postドキュメントを更新)
 */
const deleteNewLike = (postId, username) => {
  return new Promise((resolve, reject) => {
    Post.findById(postId).exec((err, post) => {
      if (!err) {
        // 指定されたユーザーのlikeが存在しない
        if (post.likes.indexOf(username) === -1) {
          reject(NOT_EXIST_LIKE);
        }

        let tmpLikes = post.likes; 
        tmpLikes = tmpLikes.filter(item => item !== username);
        post.likes = tmpLikes;
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
