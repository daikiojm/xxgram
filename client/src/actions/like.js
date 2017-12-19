import { createAction } from 'redux-actions';

// Like用のアクション

/**
 * アクションの定義
 * 今回は別ファイルに分けない
 */
export const CREATE_LIKE = 'CREATE_LIKE';
export const FAIL_CREATE_LIKE = 'FAIL_CREATE_LIKE';
export const SUCCESS_CREATE_LIKE = 'SUCCESS_CREATE_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';
export const FAIL_DELETE_LIKE = 'FAIL_DELETE_LIKE';
export const SUCCESS_DELETE_LIKE = 'SUCCESS_DELETE_LIKE';

/**
 * アクション作成
 * redux-actionsを使用する
 */
export const createLike = createAction(CREATE_LIKE);
export const failCreateLike = createAction(FAIL_CREATE_LIKE);
export const successCreateLike = createAction(SUCCESS_CREATE_LIKE);
export const deleteLike = createAction(DELETE_LIKE);
export const failDeleteLike = createAction(FAIL_DELETE_LIKE);
export const successDeleteLike = createAction(SUCCESS_DELETE_LIKE);