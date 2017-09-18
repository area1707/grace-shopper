import {connect} from 'react-redux'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {fetchOrders} from '../reducers/orders'
import store from '../store'


class SingleOrder extends Component{
    
    render() {
      const { orderAcc } = this.props
      console.log('my ORDER OBJ', orderAcc)
    return (
      <div className="list-group-item min-content students-item">
        {orderAcc && <div className="media" className="media-body">
            <h4 className="media-heading tucked">
              <span placeholder="order id here">Order #{orderAcc.order.id}</span>
            </h4>
            <p className="">
              <span placeholder="order created">Order placed on: {orderAcc.createdAt}</span>
            </p>
            <p className="">
              <span placeholder="status">Status: {orderAcc.order.status}</span>
            </p>
            <p className="">
              <span placeholder="accessoryNameQuantity">${orderAcc.accessory.accessoryId} ${orderAcc.accessory.quantity} ACCESSORY_NAME</span>
            </p>
            <p className="">
              <span placeholder="10">Total Cost: {orderAcc.orderedPrice}</span>
            </p>
          
        </div>}
      </div>
    );
  }
}

const mapState = function (state, ownProps) {
  const orderId = Number(ownProps.match.params.orderId)
  const selectedOrder = state.orderAccessories.filter(order => order.order.id == orderId)[0]
  return {
      orderAcc: selectedOrder      
  }
}

export default withRouter(connect(mapState)(SingleOrder));