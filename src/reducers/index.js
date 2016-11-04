import { combineReducers } from 'redux-immutable';
import pageLoaderReducer from './pageLoader';
import auth from './auth';
import forgotPassword from './forgotPassword';
import customRehydrate from './customRehydrate';
import pendingJobs from './pendingJobs';
import pendingJobDetails from './pendingJobDetails';
import createJobs from './createJobs';
import { reducer as formReducer } from 'redux-form';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: auth,
  forgotPassword: forgotPassword,
  pendingJobs: pendingJobs,
  pendingJobDetails: pendingJobDetails,
  pageLoader: pageLoaderReducer,
  createJobs: createJobs,
  form: formReducer,
  customRehydrate: customRehydrate,
});

export default rootReducer;
