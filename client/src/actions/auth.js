import { createAction } from 'redux-actions';

/**
 * アクションの定義
 * 今回は別ファイルに分けない
 */
export const FETCH_LOGIN_STATE = 'FETCH_LOGIN_STATE';
export const FAIL_FETCHING_LOGIN_STATE = 'FAIL_FETCHING_LOGIN_STATE';
export const FETCH_USER = 'FETCH_USER';
export const FAIL_FETCHING_USER = 'FAIL_FETCHING_USER';
export const LOGIN = 'LOGIN';
export const CLICK_LOGOUT = 'CLICK_LOGOUT';
export const LOGOUT = 'LOGOUT';


/**
 * アクション作
 * redux-actionsを使用する
 */
export const fetchLoginState = createAction(FETCH_LOGIN_STATE);
export const failFetchingLoginState = createAction(FAIL_FETCHING_LOGIN_STATE);
export const fetchUser = createAction(FETCH_USER);
export const failFetchingUser = createAction(FAIL_FETCHING_USER);
export const login = createAction(LOGIN);
export const clickLogout = createAction(CLICK_LOGOUT);
export const logout = createAction(LOGOUT);