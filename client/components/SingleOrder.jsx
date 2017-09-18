import {connect} from 'react-redux'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {fetchOrders} from '../reducers/orders'
import store from '../store'


class SingleOrder extends Component{
    
    render() {
      const { order } = this.props
    return (
      <div className="list-group-item min-content students-item">
        {order && <div className="media" className="media-body">
        
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
          
        </div>}
      </div>
    );
  }
}

const mapState = function (state, ownProps) {
  const orderId = Number(ownProps.match.params.orderId)
  const selectedOrder = state.orderAccessories.filter(order => order.order.id == orderId)[0]
  console.log('what is selectedOrder', selectedOrder)
  return {
      order: selectedOrder      
  }
}

export default withRouter(connect(mapState)(SingleOrder));