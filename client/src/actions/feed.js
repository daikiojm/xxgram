import { createAction } from 'redux-actions';

// feed用のアクション

/**
 * アクションの定義
 * 今回は別ファイルに分けない
 */
export const FETCH_FEED = 'FETCH_FEED';
export const FAIL_FETCHING_FEED = 'FAIL_FETCHING_FEED';
export const SUCCESS_FETCHING_FEED = 'SUCCESS_FETCHING_FEED';

/**
 * アクション作成
 * redux-actionsを使用する
 */
export const fetchFeed = createAction(FETCH_FEED);
export const failFetchingFeed = createAction(FAIL_FETCHING_FEED);
export const successFetchingFeed = createAction(SUCCESS_FETCHING_FEED);