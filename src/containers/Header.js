import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Immutable from 'immutable';

class Header extends React.Component {
  renderLinks() {
    if (this.props.auth.getIn(['signed_in'])) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="#">Logout</Link>
        </li>
      ]
    }
    else{
       return [<li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
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

export default connect(mapStateToProps)(Header);
