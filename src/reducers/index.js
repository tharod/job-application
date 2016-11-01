import { combineReducers } from 'redux-immutable';
import pageLoaderReducer from './pageLoader';
import auth from './auth';
import forgotPassword from './forgotPassword';
import customRehydrate from './customRehydrate';
import pendingJobs from './pendingJobs';
import { reducer as formReducer } from 'redux-form';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: auth,
  forgotPassword: forgotPassword,
  pendingJobs: pendingJobs,
  pageLoader: pageLoaderReducer,
  form: formReducer,
  customRehydrate: customRehydrate,
});

export default rootReducer;
