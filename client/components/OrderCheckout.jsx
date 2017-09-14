import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {addUser} from '../reducers/users'

class OrderCheckout extends Component {
  constructor(props) {
    super(props)
  }
  // need to render a form for shipping address and email
  // do a check on req.user to see if the email is already there and stuff
  // and then autocomplete
  // work for unauth 

  // will need to recreate a post request , so a thunk and a store value for this flow

  render() {
      //const currentUser = req.user
      return (
        <div>

            <form>
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
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: function(evt) {
            evt.preventDefault()
            const email = evt.target.email.value
            const shipping_address = evt.target.shippingAddress.value
            dispatch(addUser({ email, shipping_address }))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderCheckout))
