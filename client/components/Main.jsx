import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import { Router } from 'react-router';
import store from '../store'
import Root from './Root'
import history from './history'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Cart from './Cart'
import UserProfile from './UserProfile'
import AccessoryDetail from './AccessoryDetail'
import Navbar from './Navbar'
import OrderCheckout from './OrderCheckout'
import {fetchAccessories} from '../reducers/accessories'
import {fetchUsers} from '../reducers/users'

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (searchValue) {
    this.setState({ searchValue })
  }

  componentDidMount () {
    store.dispatch(fetchAccessories())
    store.dispatch(fetchUsers())
  }

  render() {
    return(
      <Router history={history}>
        <Root>
          <Navbar handleSubmit={this.handleSubmit}/>
          <Switch>
            <Route exact path="/"
              render = {() =>
                <Home searchValue={''} handleSubmit={this.handleSubmit}/>}
            />
            <Route path="/search"
                render = {() => <Home searchValue={this.state.searchValue} />}
            />
            {/* for testing */}
            <Route path="/checkout" component={OrderCheckout} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/accessories/:accessoryId" component={AccessoryDetail} />
            <Route path="/users/:userId" component={UserProfile} />
          </Switch>
        </Root>
      </Router>
    )
  }
}

