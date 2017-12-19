var express = require('express');
var router = express.Router();
const Post = require('./../models/Post');

/**
 * 新規投稿
 */
router.post('/', (req, res, next) => {
  const reqestPost = {
    username: req.body.username,
    photos: req.body.photos,
    caption: req.body.caption|| '',
  };

  createNewPost(reqestPost).then(result => {
    res.status(200).json({});
  }).catch(err => {
    res.status(500).json({
      error: {
        message: `${ERROR}: ${err}`
      }
    });
  });
});

/**
 * DBに新規投稿を追加
 */
const createNewPost = (inputPost) => {
  const post = new Post({
    username: inputPost.username,
    photos: inputPost.photos,
    caption: inputPost.caption,
    created_time: new Date(),
    likes: []
  });
  return new Promise((resolve, reject) => {
    post.save((err) => {
      if (!err) {
        resolve();
      } else {
        console.log(err);
        reject(err);
      }
    });
  });
}

module.exports = router;
