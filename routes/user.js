const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const config = require('./../environments/config');

/**
 * メッセージ定義(エラー)
 */
const USER_NOT_EXISTS = 'ユーザーが存在しません。';
const USER_EXISTS = '指定されたユーザー名は既に存在します。';
const ERROR = 'エラー'
const AUTHENTICATION_ERROR = '認証エラー';

/* ユーザー一覧取得 */
router.get('/', (req, res, next) => {
  getUserList().then(userlist => {
    res.status(200).json({
      userlist: userlist
    });
  }).catch(err => {
    res.status(500).json({
      error: {
        message: `${ERROR}: ${err}`
      }
    });
  });
});

/* ユーザー登録 */
router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  createNewUser(username, password).then(result => {
    res.status(200).json({});
  }).catch(err => {
    res.status(500).json({
      error: {
        message: `${ERROR}: ${err}`
      }
    });
  });
});

/* ユーザー削除 */
router.delete('/:username', (req, res, next) => {
  const username = req.params.username;
  deleteUser(username)
    .then(_ => {
      res.status(200).json({});
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
 * ユーザー認証
 */
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);

  // 指定されたユーザーを検索
  getUser(username)
    .then(user => {
      // パスワードが一致しない
      if (user.password !== password) {
        res.status(401).json({
          error: {
            message: `${AUTHENTICATION_ERROR}`
          }
        });
        return;
      } else {
        // 認証成功とみなしてjwtを発行
        const token = jwt.sign(user, `${config.secret}`, {
          expiresIn: '24h'
        });

        res.status(200).json({
          user: {
            username: user.username,
            password: user.password
          },
          token: token
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        error: {
          message: `${AUTHENTICATION_ERROR}`
        }
      });
    });
});

/**
 * ユーザー認証(確認)
 */
router.get('/login', (req, res, next) => {
  // Bearerを取り除く
  const jsonWebToken = req.headers.authorization.split(' ')[1];
  jwt.verify(jsonWebToken, `${config.secret}`, (err, decode) => {

    if (!err) {
      // DBにユーザーを問い合わせる
      getUser(decode.username)
      .then(user => {
        if (user.username === decode.username) {
          res.status(200).json({
            user: {
              username: user.username,
              password: user.password
            }
          });
        }
      })
      .catch(err => {
        res.status(401).json({
          error: {
            message: `${AUTHENTICATION_ERROR}`
          }
        });
      });
    } else {
      console.log(err);
      res.status(401).json({
        error: {
          message: `${AUTHENTICATION_ERROR}`
        }
      });
    }
  });
});



/**
 * DBからユーザー一覧を取得
 */
const getUserList = () => {
  return new Promise((resolve, reject) => {
    User.find({}).exec((err, docs) => {
      if (!err) {
        let result = docs.map(doc => {
          return {
            id: doc._id,
            password: doc.password,
          };
        });
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * DBに新規ユーザー情報を追加
 */
const createNewUser = (username, password) => {
  // パスワードはとりあえず生文字列で持つよ
  const user = new User({
    username: username,
    password: password, 
  });

  return new Promise((resolve, reject) => {
    user.save((err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

/**
 * DBから指定したusernameのユーザーを削除
 */
const deleteUser = (username) => {
  return new Promise((resolve, reject) => {
    User.remove({ username: username }).exec((err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

/**
 * ユーザーを検索
 * 戻り値→ { username, password }
 */
const getUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: username}).exec((err, user) => {
      if (!err) {
        const resultUser = {
          username: user.username,
          password: user.password
        };
        resolve(resultUser);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = router;
