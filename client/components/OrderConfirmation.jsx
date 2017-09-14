import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {removeAccessory, addAccessory} from '../reducers/accessories'

class OrderConfirmation extends Component {
  constructor(props) {
    super(props)
  }
  // need to render a form for shipping address and email
  // do a check on req.user to see if the email is already there and stuff
  // and then autocomplete
  // work for unauth 

  // will need to recreate a post request , so a thunk and a store value for this flow

  render() {
      const currentUser = req.user
      return (
        <div>
            
            <form onSubmit={props.handleSubmit}> 
                <div className='form-group'>
                <label htmlFor='name'>Hi! </label>
                <label>Email: </label>
                    <input 
                    className='form-control' 
                    type='text' 
                    name='email' 
                    placeholder='Enter email' 
                    />
                
                <label>Shipping Address: </label>
                    <input 
                    className='form-control' 
                    type='text' 
                    name='shippingAddress' 
                    placeholder='Enter Shipping Address' 
                    />
                
                {/* <label>Campus: </label>
                    <select 
                    name='studentcampus'>
                    {props.campuses.length && props.campuses.map(campus => {
                        return (<option key={campus.id} value={campus.id}>{campus.name}</option>)
                    })}
                    </select> */}

                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-default'>Submit Order</button>
                </div>
            </form>

        </div>
      )
  }

}
