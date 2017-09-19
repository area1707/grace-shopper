import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { uniqBy } from 'lodash'

function UserProfile(props) {
    const { user, orderAccessories } = props
    const userOrderAccs = orderAccessories.length ? orderAccessories.filter(orderAcc => orderAcc.order.userId == user.id) : {}  
    let userOrders = userOrderAccs.length ? uniqBy(userOrderAccs,'orderId') : []

    
    return (
        <div>
            {user && 
            <div>
                <h1>Hello, {user.name}!</h1>
                <h3>Email: {user.email}</h3>
                <h3>Shipping Address: {user.shipping_address}</h3>
                <h3>Order History: </h3>

                {userOrders.length && userOrders.map(userOrder => {
                    return(
                        <NavLink to = {`/orders/${userOrder.orderId}`} key={userOrder.orderId}>
                        Order#{userOrder.orderId}____Placed On: {userOrder.order.createdAt.slice(0,10)}____Status:{userOrder.order.status}
                        <br/>
                        </NavLink>
                    )
                })}
            </div>
            }
        </div>
    )
}


const mapStateToProps = function (state, ownProps) {
    const userId = Number(ownProps.match.params.userId)
    const selectedUser = state.users.filter(user => user.id == userId)[0]
    const orderAcc = state.orderAccessories

    return {
        user: selectedUser,
        orderAccessories: orderAcc
    }
}

export default withRouter(connect(mapStateToProps)(UserProfile));