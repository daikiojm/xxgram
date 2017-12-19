import { take, call, put } from 'redux-saga/effects';
import {
  createComment,
  failCreateComment,
  successCreateComment
} from '../actions/comment';
import superFetch from './../modules/superFetch';

/**
 * Feed取得
 */
export function* handleCreateComment() {
  while (true) {
    const action = yield take(`${createComment}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/comment',
      type: 'POST',
      data: action.payload
    });

    if (!payload && err) {
      yield put(failCreateComment(String(err).split('Error: ')[1]));
      continue;
    }

    yield put(successCreateComment(Object.assign({}, payload.post)));
  }
}