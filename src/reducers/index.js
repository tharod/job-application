import { combineReducers } from 'redux-immutable';
import pageLoaderReducer from './pageLoader';
import auth from './auth';
import forgotPassword from './forgotPassword';
import customRehydrate from './customRehydrate';
import pendingJobs from './pendingJobs';
import pendingJobDetails from './pendingJobDetails';
import createJobs from './createJobs';
import invitedJobs from './invitedJobs';
import invitedJobUserDetails from './invitedJobUserDetails';
import searchUsers from './searchUsers';
import searchUserDetails from './searchUserDetails';

import { reducer as formReducer } from 'redux-form';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: auth,
  forgotPassword: forgotPassword,
  searchUsers: searchUsers,
  searchUserDetails: searchUserDetails,
  invitedJobs: invitedJobs,
  invitedJobUserDetails: invitedJobUserDetails,
  pendingJobs: pendingJobs,
  pendingJobDetails: pendingJobDetails,
  pageLoader: pageLoaderReducer,
  createJobs: createJobs,
  form: formReducer,
  customRehydrate: customRehydrate,
});

export default rootReducer;
