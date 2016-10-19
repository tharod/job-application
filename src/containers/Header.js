import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
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
      return (
        <Nav>
          <li key={1}>
            <Link className="nav-link" to="#" onClick={(e)=> this.handleClick(e)}>Logout</Link>
          </li>
        </Nav>
      )
    }
    else{
      return(
        <Nav>
          <li key={2}>
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li key={3}>
            <Link className="nav-link" to="/signup">SignUp</Link>
          </li>
        </Nav>
      )
    }
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">Job Application</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.renderLinks() }
        </Navbar.Collapse>
      </Navbar>
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
