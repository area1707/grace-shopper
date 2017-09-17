
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import { addUser } from '../reducers/users'
import {addAddressToOrder, clearCart} from '../reducers/cart'
import {addCartId} from '../reducers/cartId'
import store from '../store'


class OrderCheckout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    store.dispatch(addCartId())
  }

  render() {
    console.log(this.props.cartId, 'cartId')
    return (
      <div>

        <form onSubmit={(evt) => {this.props.handleSubmit(evt, this.props.cartId)}}>
          <label>Shipping Information</label>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input 
              name="email"
              className="form-control" 
              placeholder="Enter email..." 
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Shipping Address</label>
            <input 
              name="shippingAddress"
              className="form-control" 
              placeholder="Enter shipping address..."
            />
          </div>
          <div className='form-group'>
              <button type='submit' className='btn btn-default'>Submit Order</button>
          </div>
        </form>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentUser: state.currentUser,
        cartId: state.cartId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: function(evt, cartId) {
          evt.preventDefault()
          const emailAddress = evt.target.email.value
          const shippingAddress = evt.target.shippingAddress.value
          dispatch(addAddressToOrder(cartId, shippingAddress, emailAddress))
          // dispatch(clearCart())
          console.log('are you HERE')
        },
        removeSessionCart: function() {

        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderCheckout))
