import { take, call, put } from 'redux-saga/effects';
import {
  fetchLoginState,
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  clickLogout,
  logout
} from '../actions/auth';
import superFetch from './../modules/superFetch';

/**
 * リフレッシュ時にユーザー情報をstoreに保存する
 */
export function* handleFetchLoginState() {
  while (true) {
    yield take(`${fetchLoginState}`);

    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const { payload, err } = yield call(superFetch, {
        url: '/api/user/login',
        type: 'GET',
        custom: {
          headers: {
            authorization: `Bearer ${jwt}`
          }
        }
      });

      if (payload && !err) {
        yield put(login(Object.assign({}, payload.user, { jwt })));
        continue;
      }
    }

    yield put(failFetchingLoginState());
  }
}

/**
 * 初回ログイン時の処理
 */
export function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/user/login',
      type: 'POST',
      data: action.payload
    });

    if (!payload && err) {
      yield put(failFetchingUser(String(err).split('Error: ')[1]));
      continue;
    }

    const jwt = payload.token;

    localStorage.setItem('jwt', jwt);

    yield put(login(Object.assign({}, payload.user, { jwt })));
  }
}

/**
 * ログアウト時の処理
 */
export function* handleLogout() {
  while (true) {
    yield take(`${clickLogout}`);

    localStorage.removeItem('jwt');

    yield put(logout());
  }
}
