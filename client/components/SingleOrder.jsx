import {connect} from 'react-redux'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {fetchItemsInCart} from '../reducers/cart'


class SingleOrder extends Component {
  render(){
    const { cart } = this.props
    
    return (
      <div className="list-group-item min-content students-item">
        <div className="media">
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/accessories/${accessory.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="order id here">{order.id}</span>
            </h4>
            <p className="">
              <span placeholder="order created">Order place on: {order.createdAt}</span>
            </p>
            <p className="">
              <span placeholder="status">Status: {order.status}</span>
            </p>
            <p className="">
              <span placeholder="accessoryNameQuantity">${order.accessoryId} ${order.quantity} ACCESSORY_NAME</span>
            </p>
            <p className="">
              <span placeholder="10">Total Cost: {order.orderedPrice}</span>
            </p>
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapState = ({cart}) => ({cart})
const mapDispatch = {fetchItemsInCart}
