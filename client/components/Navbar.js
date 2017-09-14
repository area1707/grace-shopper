import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import history from './history'
import {logUserOut} from '../reducers/login'

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
          { this.renderCart() }
          { this.renderLogout() }
          { this.renderLoginSignup() }
          { this.renderSearch() }
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

  renderCart() {
    return (
      <ul className="nav navbar-nav navbar-left">
        <li>
          <NavLink to="/cart" activeClassName="active">Cart</NavLink>
        </li>
      </ul>
    )
  }

  renderSearch() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <form className="navbar-form navbar-right" role="search">
            <div className="form-group" >
                <input id="inputsm" type="text" className="form-control input-sm" placeholder="Search"/>
            </div>
            <button type="submit" className="navbar-btn btn btn-default">Submit</button>
          </form>
        </li>
      </ul>
    )
  }

  renderLoginSignup() {
    const {currentUser} = this.props
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <NavLink to="/signup" activeClassName="active">signup</NavLink>
        </li>
        {
        (Object.keys(currentUser).length !== 0) ?
        <li>
          <NavLink to={`users/${currentUser.id}`}>
          Welcome {this.props.currentUser.name}!
          </NavLink>
        </li>
        :
        <li>
          <NavLink to="/login" activeClassName="active">login</NavLink>
        </li>
      }
      </ul>
    );
  }

  renderLogout() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={() => this.props.logUserOut(this.props.currentUser)}>
          logout
        </button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({currentUser}) => {
  console.log('currentUser', currentUser)
  return {
    currentUser: currentUser
  }
}

const mapDispatch = {logUserOut}

export default withRouter(connect(mapProps, mapDispatch)(Navbar));
