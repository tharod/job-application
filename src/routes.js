import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import App from './components/App';
import Home from './components/Home';
import SearchJob from './components/SearchJob';
import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';
import ForgotPassword from './containers/forgotPassword/ForgotPassword';
import ChangePassword from './containers/auth/ChangePassword';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/forgotPassword" component={ForgotPassword}/>
      <Route path="/changePassword" component={ChangePassword}/>
      <Route path="/search-job" component={SearchJob}/>
    </Route>
  </Router>
)

export default routes