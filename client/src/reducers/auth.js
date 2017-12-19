import { handleActions } from 'redux-actions';
import {
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  logout
} from './../actions/auth'

const initialState = {
  auth: {
    isPrepared: false,
    isLoggedIn: false,
    user: {
      username: undefined,
      password: undefined,
    },
    isFetching: false,
    error: undefined,
    jwt: ''
  }
};

const auth = handleActions({
  [failFetchingLoginState]: state => Object.assign({}, state, {
    isPrepared: true
  }),
  [fetchUser]: state => Object.assign({}, state, {
    isFetching: true,
    error: undefined
  }),
  [failFetchingUser]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  // [login]: (state, payload) => Object.assign({}, state, {
  // redux-actionsを使うのでちょっと違う
  [login]: (state, action) => Object.assign({}, state, {
    isPrepared: true,
    isLoggedIn: true,
    user: {
      username: action.payload.username,
      password: action.payload.password,
    },
    isFetching: false,
    error: undefined,
    jwt: action.payload.jwt
  }),
  [logout]: () => Object.assign({}, initialState.auth, {
    isPrepared: true
  })
}, initialState.auth);

export default auth;