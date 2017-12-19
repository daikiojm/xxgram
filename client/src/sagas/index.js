import { fork } from 'redux-saga/effects';
import * as auth from './auth';
import * as feed from './feed';
import * as comment from './comment';
import * as like from './like';

export default function* rootSaga() {
  yield fork(auth.handleFetchLoginState);
  yield fork(auth.handleLogin);
  yield fork(auth.handleLogout);
  yield fork(feed.handleFetchFeed);
  yield fork(comment.handleCreateComment);
  yield fork(like.handleCreateLike);
  yield fork(like.handleDeleteLike);
}