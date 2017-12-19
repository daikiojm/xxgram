import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers/';
import rootSaga from './../sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware
      )
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}