import { take, call, put } from 'redux-saga/effects';
import {
  createLike,
  failCreateLike,
  successCreateLike,
  deleteLike,
  failDeleteLike,
  successDeleteLike
} from '../actions/like';
import superFetch from './../modules/superFetch';

/**
 * Likeする
 */
export function* handleCreateLike() {
  while (true) {
    const action = yield take(`${createLike}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/like/create',
      type: 'POST',
      data: action.payload
    });

    if (!payload && err) {
      yield put(failCreateLike(String(err).split('Error: ')[1]));
      continue;
    }

    yield put(successCreateLike(Object.assign({}, payload.post)));
  }
}

/**
 * Likeを取り消す
 */
export function* handleDeleteLike() {
  while (true) {
    const action = yield take(`${deleteLike}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/like/delete',
      type: 'POST',
      data: action.payload
    });

    if (!payload && err) {
      yield put(failDeleteLike(String(err).split('Error: ')[1]));
      continue;
    }

    yield put(successDeleteLike(Object.assign({}, payload.post)));
  }
}