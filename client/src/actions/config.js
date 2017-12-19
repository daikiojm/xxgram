import { createAction } from 'redux-actions';

// Config用のアクション

/**
 * アクションの定義
 * 今回は別ファイルに分けない
 */
export const CHANGE_DISP_NAME = 'CHANGE_DISP_NAME';


/**
 * アクション作
 * redux-actionsを使用する
 */
export const changeDispName = createAction(CHANGE_DISP_NAME);