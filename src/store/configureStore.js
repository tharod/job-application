import rootReducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';

//Thunk middleware for Redux
import reduxThunk from 'redux-thunk';

import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import Immutable from 'immutable';

export default function configureStore(i_state) {
  const middleware = routerMiddleware(browserHistory)
  const initialState = Immutable.Map(i_state);

  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(reduxThunk, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}