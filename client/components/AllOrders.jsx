import React from 'react'
import store from '../store';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { uniqBy } from 'lodash'

function AllOrders(props) {
  const { orderAccessories, users } = props
  let uniqueOrders = orderAccessories.length ? uniqBy(orderAccessories,'orderId') : []
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date Created</th>
            <th>Customer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {uniqueOrders.length && uniqueOrders.map(uniqOrder => {
            return(
              <tr key={uniqOrder.orderId}>
                <NavLink to={`/orders/${uniqOrder.orderId}`}>
                <th scope="row">{uniqOrder.orderId}</th>
                </NavLink>
                <td>{(uniqOrder.order.createdAt).slice(0,10)}</td>
                <td>USER uniqOrder.order.userId to filter thru users for name</td>
                <td>{uniqOrder.order.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}


const mapStateToProps = function (state){
  return{
    orderAccessories:state.orderAccessories,
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps)(AllOrders));