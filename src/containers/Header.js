import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import Immutable from 'immutable';

import * as AuthActions from '../actions/auth';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import { LinkContainer } from 'react-router-bootstrap';

import * as routePath from '../constants/routePath'

class Header extends React.Component {
  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleClick = this.handleClick.bind(this)
    this.onSelect = this.onSelect.bind(this);
  }
  
  handleClick(event){
    this.props.authActions.destroySession();
    event.preventDefault()
  }

  onSelect(e){
//    alert("test1111")
    $('.navbar-toggle').click()
  }

  renderLinks() {
    if (this.props.auth.getIn(['signedIn'])) {
      return (
        <Nav onSelect={this.onSelect}>
          <LinkContainer to={{ pathname: '/changePassword' }} className="nav-link">
            <NavItem>Change Password</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: routePath.POST_JOB }} className="nav-link">
            <NavItem>Post Job</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: '#' }} className="nav-link" onClick={(e)=> this.handleClick(e)}>
            <NavItem>Logout</NavItem>
          </LinkContainer>
        </Nav>
      )
    }
    else{
      return(
        <Nav onSelect={this.onSelect}>
          <LinkContainer to={{ pathname: '/login' }} className="nav-link">
            <NavItem>Login</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: '/signup' }} className="nav-link">
            <NavItem>SignUp</NavItem>
          </LinkContainer>

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
          {this.renderLinks()}
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
