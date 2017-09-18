import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import { addUser } from '../reducers/users'
class OrderCheckout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    //const currentUser = req.user
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>Shipping Information</label>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              name="email"
              className="form-control"
              placeholder="Enter email..."
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Shipping Address</label>
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
        users: state.users
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: function(evt) {
          evt.preventDefault()
          const email = evt.target.email.value
          const shipping_address = evt.target.shippingAddress.value
          dispatch(addUser({email, shipping_address}))
        },
        addUsertoCart: function(evt) {
        },
        removeSessionCart: function() {
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderCheckout))
