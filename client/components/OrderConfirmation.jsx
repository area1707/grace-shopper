import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import { addUser } from '../reducers/users'
import {addAddressToOrder, clearCart} from '../reducers/cart'
import {addCartId} from '../reducers/cartId'
import SingleOrder from './SingleOrder'
import store from '../store'


export default class OrderCheckout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    store.dispatch(addCartId())
  }

  render () {
    return (
      <div>
        <div className="banner">
          <img className="mascot" src="/img/cat-banner.gif" />
          <p>Your order has been placed!</p>
        </div>
        <p>Your tabby cat thanks you ...</p>
          <SingleOrder />
        <p> <NavLink to="/">Are you sure your tabby cat doesn't want more?</NavLink></p>

      </div>
    )
  }

}