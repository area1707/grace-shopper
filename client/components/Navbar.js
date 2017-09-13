import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import history from './history'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          { this.renderHome() }
          { this.renderLogout() }
          { this.renderLoginSignup() }
        </div>
      </nav>
    )
  }

  renderHome() {
    return (
      <ul className="nav navbar-nav navbar-left">
        <li>
          <NavLink to="/" activeClassName="active">Home</NavLink>
        </li>
      </ul>
    )
  }

  renderLoginSignup() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <NavLink to="/signup" activeClassName="active">signup</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">login</NavLink>
        </li>
      </ul>
    );
  }

  renderLogout() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          logout
        </button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
  logout: () => {
    axios.get('/api/users/logout')
    .then(() => {
      console.log('You signed out.');
    })
    history.push('/');
  }
});

export default withRouter(connect(mapProps, mapDispatch)(Navbar));
