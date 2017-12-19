import { createAction } from 'redux-actions';

// Comment用のアクション

/**
 * アクションの定義
 * 今回は別ファイルに分けない
 */
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FAIL_CREATE_COMMENT = 'FAIL_CREATE_COMMENT';
export const SUCCESS_CREATE_COMMENT = 'SUCCESS_CREATE_COMMENT';

/**
 * アクション作成
 * redux-actionsを使用する
 */
export const createComment = createAction(CREATE_COMMENT);
export const failCreateComment = createAction(FAIL_CREATE_COMMENT);
export const successCreateComment = createAction(SUCCESS_CREATE_COMMENT);