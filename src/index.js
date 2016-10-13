import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import routes from './routes'

import { syncHistoryWithStore } from 'react-router-redux'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState);
// client-side usage

ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('app')
);
