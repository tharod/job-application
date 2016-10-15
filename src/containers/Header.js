import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Immutable from 'immutable';

import * as AuthActions from '../actions/auth';
import { bindActionCreators } from 'redux';

class Header extends React.Component {
  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(event){
    this.props.authActions.destroySession();
    event.preventDefault()
  }

  renderLinks() {
    if (this.props.auth.getIn(['signedIn'])) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="#" onClick={(e)=> this.handleClick(e)}>Logout</Link>
        </li>
      ]
    }
    else{
       return [<li className="nav-item" key={2}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/signup">SignUp</Link>
        </li>
        ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Job Application</Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
             { this.renderLinks() }
           </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.getIn(['auth'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
