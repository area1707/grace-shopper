import {connect} from 'react-redux'
import React from 'react'
import {withRouter} from 'react-router'
import OrderAccessory from './OrderAccessory'

export function SingleOrder(props){
  const { orderAccs } = props
  const order = orderAccs.length ? orderAccs[0].order: {}
  let total = 0;
  let pinkBackground = {
    backgroundColor: '#c9d2fc',
    borderRadius: 6
  }

  return (
    <div>
      {orderAccs.length &&
        <div>
        <h2>Order #{order.id}</h2>
        <div className="list-group-item min-content media" style={pinkBackground}> 
          <p className="">
            <span placeholder="order created">Order placed on: {(order.createdAt).slice(0,10)}</span>
          </p>
          <p className="">
            <span placeholder="status">Status: {order.status}</span>
          </p>
          <ul>
          {orderAccs.map(orderAcc => {
            {total+=orderAcc.orderedPrice}
            return(
                <OrderAccessory key={orderAcc.accessoryId} orderAcc={orderAcc}/> 
            )
          })
          }
          </ul>
          <p className="">
          <span placeholder="10">Total Cost: ${+total}</span>
          </p>
        
        </div>
        </div>
      }
    </div>
  )  
}

const mapState = function (state, ownProps) {
  const orderId = Number(ownProps.match.params.orderId)
  const selectedOrderAcc = state.orderAccessories.filter(orderAcc => orderAcc.order.id == orderId)
  return {
      orderAccs: selectedOrderAcc
  }
}

export default withRouter(connect(mapState)(SingleOrder));