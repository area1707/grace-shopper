import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import { addUser } from '../reducers/users'
import {addAddressToOrder, clearCart} from '../reducers/cart'
import {addCartId} from '../reducers/cartId'
import store from '../store'


export default class OrderCheckout extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h1>Your order is being processed...</h1>
        <p> render the single order component here from Raz</p>
        <p> <NavLink to="/">Click to go back to main page</NavLink></p>
      </div>
    )
  }

}