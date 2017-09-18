import {connect} from 'react-redux'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import SingleAccessory from './SingleAccessory'
//SINGLEACCESSORY IS BLOATED NOW, MAKE A NEW ACCESSORY COMPONENT
//THAT U ONLY NEED FOR ORDERS

function SingleOrder(props){
  const { orderAccs } = props
  const order = orderAccs.length ? orderAccs[0].order: {}
  let total = 0;

  return (
    <div>
      {orderAccs.length &&
        <div>
        <h2>Order #{order.id}</h2>
        <div className="list-group-item min-content media "> 
          {console.log('my ORDER OBJ', orderAccs)}
          <p className="">
            <span placeholder="order created">Order placed on: {order.createdAt}</span>
          </p>
          <p className="">
            <span placeholder="status">Status: {order.status}</span>
          </p>
          <ul>
          {orderAccs.map(orderAcc => {
            {total+=orderAcc.orderedPrice}
            return(
                <SingleAccessory key={orderAcc.accessoryId} accessory={orderAcc.accessory} />

              
            )
          })
          }
          </ul>
          <p className="">
          <span placeholder="10">Total Cost: {total}</span>
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
  console.log(selectedOrderAcc)
  return {
      orderAccs: selectedOrderAcc
  }
}

export default withRouter(connect(mapState)(SingleOrder));