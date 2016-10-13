import { combineReducers } from 'redux-immutable';
import PageLoaderReducer from './pageLoader';
import Auth from './auth';
import { reducer as formReducer } from 'redux-form'
// import { Field, reduxForm } from 'redux-form/immutable'

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: Auth,
  pageLoader: PageLoaderReducer,
  form: formReducer
});

export default rootReducer;
