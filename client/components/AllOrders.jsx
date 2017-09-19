import React from 'react'
import store from '../store';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { uniqBy } from 'lodash'

function AllOrders(props) {
  const { orderAccessories, users } = props
  let uniqueOrders = orderAccessories.length ? uniqBy(orderAccessories,'orderId') : []
  console.log('pls be unique', uniqueOrders)
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