import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import App from './components/App';
import Home from './components/Home';
import SearchJob from './components/SearchJob';
import SignIn from './containers/auth/SignIn';

const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={SignIn}/>
        <Route path="/logout" component={SignIn}/>
        <Route path="/search-job" component={SearchJob}/>
      </Route>
    </Router>
)

export default routes