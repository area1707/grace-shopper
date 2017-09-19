import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import {logUserOut} from '../reducers/login'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    }

    this.renderHome = this.renderHome.bind(this);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderCart = this.renderCart.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.renderAdmin = this.renderAdmin.bind(this);
  }

  render() {

    const { accessories, currentUser } = this.props

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          { this.renderHome() }
          { this.renderCart() }
          { this.renderCategories() }
          { (currentUser.isAdmin) ? this.renderAdmin() : null }
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

  renderCategories() {
    const sortByCategory = (category) => {
      this.props.handleSubmit(category)
      this.props.history.push(`/search/${category}`)
    }
    return (
      <ul className="nav navbar-nav navbar-left">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories<span className="caret"></span></a>
          <ul className="dropdown-menu" >
            <li><a onClick={() => {sortByCategory('glasses')}}>Glasses</a></li>
            <li><a onClick={() => {sortByCategory('hats')}}>Hats</a></li>
            <li><a onClick={() => {sortByCategory('toys')}}>Toys</a></li>
            <li><a onClick={() => {sortByCategory('')}}>All Accessories</a></li>
          </ul>
        </li>
      </ul>
    )
  }

  renderAdmin() {
    return (
      <ul className="nav navbar-nav navbar-left">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin<span className="caret"></span></a>
          <ul className="dropdown-menu" >
            <li><a onClick={() => this.props.history.push('/admin/allusers')}>All Users</a></li>
            <li><a onClick={() => this.props.history.push('/admin/allorders')}>All Orders</a></li>
          </ul>
        </li>
      </ul>
    )
  } 

  // search everything for the searchValue
  renderSearch() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <form className="navbar-form navbar-right" role="search" onSubmit={ (event) => {
            event.preventDefault()
            this.props.handleSubmit(this.state.searchValue)
            this.setState({searchValue: ''})
            } }>

            <div className="form-group" >
                <input
                  id="inputsm"
                  type="text"
                  className="form-control input-sm"
                  placeholder="Search for..."
                  onChange={evt => this.setState({ searchValue: evt.target.value })}
                  value={this.state.searchValue}
                  />
            </div>
            <button
              type="submit"
              className="navbar-btn btn btn-default"
              onClick={() => this.props.history.push(`/search/${this.state.searchValue}`)}>Submit</button>
          </form>
        </li>
      </ul>
    )
  }

  renderLoginSignup() {
    const {currentUser} = this.props
    return (
      <ul className="nav navbar-nav navbar-right">
        {/* This is not working, doesn't refresh after logout */}
        { (currentUser) ? null : <li>
          <NavLink to="/signup" activeClassName="active">signup</NavLink>
        </li> }
        {
        (Object.keys(currentUser).length !== 0) ?
        <li>
          <NavLink to={`/users/${currentUser.id}`}>
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
          onClick={() => this.props.logOut(this.props.currentUser)}>
          logout
        </button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({currentUser}) => {
  return {
    currentUser: currentUser
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    logOut: (currentUser) => {
      dispatch(logUserOut(currentUser))
      ownProps.history.push('/')
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(Navbar));
