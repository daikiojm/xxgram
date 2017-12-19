import { handleActions } from 'redux-actions';
import {
  fetchFeed,
  failFetchingFeed,
  successFetchingFeed
} from './../actions/feed';
import {
  createComment,
  failCreateComment,
  successCreateComment
} from './../actions/comment';
import {
  createLike,
  failCreateLike,
  successCreateLike,
  deleteLike,
  failDeleteLike,
  successDeleteLike
} from './../actions/like';

const initialState = {
  feed: {
    isFetching: false,
    error: undefined,
    posts: [
      {
        id: '',
        username: '',
        created_time: '',
        photos: [
          { id: '', ext: '' }
        ],
        comments: [
          { id: '', username: '', payload: '', created_time: '' }
        ],
        likes: []
      }
    ]
  }
};

const feed = handleActions({
  [fetchFeed]: (state, action) => Object.assign({}, state, {
    isFetching: true,
    error: undefined
  }),
  [failFetchingFeed]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  [successFetchingFeed]: (state, action) => Object.assign({}, state, {
    isFetching: false,
    error: undefined,
    posts: action.payload.feed
  }),
  [createComment]: (state, action) => Object.assign({}, state, {
    isFetching: true,
    error: undefined
  }),
  [failCreateComment]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  [successCreateComment]: (state, action) => {
    const updatedPost = state.posts.find(post => (
      post.id === action.payload.id
    ));
    const updatedPostIndex = state.posts.indexOf(updatedPost);
    return {
      ...state,
      isFetching: false,
      error: undefined,
      posts: [
        ...state.posts.slice(0, updatedPostIndex),
        action.payload,
        ...state.posts.slice(updatedPostIndex + 1),
      ]
    }
  },
  [createLike]: (state, action) => {
    return {
      ...state,
      isFetching: true,
      error: undefined
    }
  },
  [failCreateLike]: (state, err) => {
    return {
      ...state,
      isFetching: false,
      error: err
    }
  },
  // successCreateCommentと同様
  [successCreateLike]: (state, action) => {
    const updatedPost = state.posts.find(post => (
      post.id === action.payload.id
    ));
    const updatedPostIndex = state.posts.indexOf(updatedPost);
    return {
      ...state,
      isFetching: false,
      error: undefined,
      posts: [
        ...state.posts.slice(0, updatedPostIndex),
        action.payload,
        ...state.posts.slice(updatedPostIndex + 1),
      ]
    }
  },
  [deleteLike]: (state, action) => {
    return {
      ...state,
      isFetching: true,
      error: undefined
    }
  },
  [failDeleteLike]: (state, err) => {
    return {
      ...state,
      isFetching: false,
      error: err
    }
  },
  // successCreateCommentと同様
  [successDeleteLike]: (state, action) => {
    const updatedPost = state.posts.find(post => (
      post.id === action.payload.id
    ));
    const updatedPostIndex = state.posts.indexOf(updatedPost);
    return {
      ...state,
      isFetching: false,
      error: undefined,
      posts: [
        ...state.posts.slice(0, updatedPostIndex),
        action.payload,
        ...state.posts.slice(updatedPostIndex + 1),
      ]
    }
  },
}, initialState.feed);

export default feed;