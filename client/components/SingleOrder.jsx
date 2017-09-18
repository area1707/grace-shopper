import {connect} from 'react-redux'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {fetchOrders} from '../reducers/orders'
import store from '../store'


class SingleOrder extends Component{
    
    render() {
      const { orderAcc } = this.props
      const order = orderAcc.length ? orderAcc[0].order: {}

    return (
      <div className="list-group-item min-content students-item">
        {orderAcc.length && <div className="media" className="media-body">
            {console.log('my ORDER OBJ', orderAcc)}
            <h4 className="media-heading tucked">
              <span placeholder="order id here">Order #{order.id}</span>
            </h4>
            <p className="">
              <span placeholder="order created">Order placed on: {order.createdAt}</span>
            </p>
            <p className="">
              <span placeholder="status">Status: {order.status}</span>
            </p>
            {/*<p className="">
              <span placeholder="accessoryNameQuantity">${orderAcc.accessory.accessoryId} ${orderAcc.accessory.quantity} ACCESSORY_NAME</span>
    </p>*/}
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
  const selectedOrderAcc = state.orderAccessories.filter(orderAcc => orderAcc.order.id == orderId)
  console.log(selectedOrderAcc)
  return {
      orderAcc: selectedOrderAcc
  }
}

export default withRouter(connect(mapState)(SingleOrder));