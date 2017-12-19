import { handleActions } from 'redux-actions';
import {
  changeDispName
} from './../actions/config'

const initialState = {
  config: {
    appDispName: 'xxx'
  }
};

const config = handleActions({
  [changeDispName]: (state, action) => {
    return {
      ...state,
      appDispName: action.payload.appName
    }
  }
}, initialState.config);

export default config;