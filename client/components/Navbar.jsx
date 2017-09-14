import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import history from './history'

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
  }

  render() {

    const { accessories } = this.props

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          { this.renderHome() }
          { this.renderCart() }
          { this.renderCategories() }
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
    return (
      <ul className="nav navbar-nav navbar-left">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">One more separated link</a></li>
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
