import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderLinks() {
    return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/auth/new">Login</Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link className="nav-link" to="/following">Following</Link>
      </li>,
      <li className="nav-item" key={3}>
        <Link className="nav-link" to="/followers">Followers</Link>
      </li>,
    ]
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">React Redux</Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
             { this.renderLinks() }
           </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
