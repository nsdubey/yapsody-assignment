import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../reducers/root/rootReducer.js';
import { rootSaga } from '../reducers/root/rootSaga.js';

let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
