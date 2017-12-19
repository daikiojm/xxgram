const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/**
 * 追加したパッケージ
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * ルーター
 */
const index = require('./routes/index');
const user = require('./routes/user');
const feed = require('./routes/feed');
const post = require('./routes/post');
const photo = require('./routes/photo');
const comment = require('./routes/comment');
const like = require('./routes/like');

/**
 * 設定ファイル
 */
const config = require('./environments/config');

/**
 * DB Connection
 */
mongoose.connect(`${config.database}`, (err) => {
  if (err) {
    console.log(`DB Connect Failed: ${err}`);
  } else {
    console.log('DB Connect Success!!');
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// 以下API用
app.use('/api/user', user);
app.use('/api/feed', feed);
app.use('/api/post', post);
app.use('/api/photo', photo);
app.use('/api/comment', comment);
app.use('/api/like', like);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
