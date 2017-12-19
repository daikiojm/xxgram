import { take, call, put } from 'redux-saga/effects';
import {
  fetchFeed,
  failFetchingFeed,
  successFetchingFeed
} from '../actions/feed';
import superFetch from './../modules/superFetch';

/**
 * Feed取得
 */
export function* handleFetchFeed() {
  while (true) {
    yield take(`${fetchFeed}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/feed',
      type: 'GET'
    });

    if (!payload && err) {
      yield put(failFetchingFeed(String(err).split('Error: ')[1]));
      continue;
    }

    yield put(successFetchingFeed(Object.assign({}, payload)));
  }
}