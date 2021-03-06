import React, {Component} from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../store'
import Root from './Root'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Cart from './Cart'
import UserProfile from './UserProfile'
import AccessoryDetail from './AccessoryDetail'
import Navbar from './Navbar'
import WriteReview from './WriteReview'
import SingleOrder from './SingleOrder'
import OrderCheckout from './OrderCheckout'
import OrderConfirmation from './OrderConfirmation'
import AllUsers from './AllUsers'
import AllOrders from './AllOrders'
import {fetchAccessories} from '../reducers/accessories'
import {fetchUsers } from '../reducers/users'
import { receiveProducts, receiveProduct } from '../reducers/accessories'
import {fetchReviews} from '../reducers/reviews'
import {fetchOrderAccessories} from '../reducers/orders'
import {fetchCurrentUser} from '../reducers/login'

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
    store.dispatch(fetchReviews())
    store.dispatch(fetchCurrentUser())
    store.dispatch(fetchOrderAccessories())
  }

  render() {
    return (
      <Router >
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
            <Route path="/checkout" component={OrderCheckout} />
            <Route path="/confirmation/:orderId" component={OrderConfirmation} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/review/:userId/:accessoryId" component={WriteReview} />
            <Route path="/accessories/:accessoryId" component={AccessoryDetail} />
            <Route path="/users/:userId" component={UserProfile} />
            <Route path="/orders/:orderId" component={SingleOrder} />
            <Route path="/admin/allusers" component={AllUsers} />
            <Route path="/admin/allorders" component={AllOrders} />
          </Switch>
        </Root>
      </Router>
    )
  }
}
