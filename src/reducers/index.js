import { combineReducers } from 'redux-immutable';
import PageLoaderReducer from './pageLoader';
import Auth from './auth';
import ForgotPassword from './forgotPassword';
import { reducer as formReducer } from 'redux-form';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: Auth,
  forgotPassword: ForgotPassword,
  pageLoader: PageLoaderReducer,
  form: formReducer
});

export default rootReducer;
