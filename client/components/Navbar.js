import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    return (
      <nav>
        <div>
          { this.renderLogout() }
          { this.renderLoginSignup() }
        </div>
      </nav>
    )
  }

  renderLoginSignup() {
    return (
      <ul>
        <li>
          <button>
            <NavLink to="/signup" activeClassName="active">signup</NavLink>
          </button>
        </li>
        <li>
          <button>
            <NavLink to="/login" activeClassName="active">login</NavLink>
          </button>
        </li>
      </ul>
    );
  }

  renderLogout() {
    return (
      <ul>
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
    axios.get('/logout')
    .then(() => {
      console.log('You signed out.');
    })
    this.props.history.push('/');
  }
});

export default withRouter(connect(mapProps, mapDispatch)(Navbar));
