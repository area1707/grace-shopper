import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { uniqBy } from 'lodash'

function UserProfile(props) {
    const { user, orderAccessories, currentUser } = props
    const userOrderAccs = orderAccessories.length ? orderAccessories.filter(orderAcc => orderAcc.order.userId == user.id) : {}  
    let userOrders = userOrderAccs.length ? uniqBy(userOrderAccs,'orderId') : []
    console.log('HELLO CURRENT', currentUser)
    let spanStyle = {
        margin: 10,
        padding: 4
    }
    
    return (
        <div>
            {user && 
            <div>
                {(currentUser.id != user.id && currentUser.isAdmin) ? <h1>{user.name}</h1> : <h1>Hello, {user.name}!</h1>}
                <h3>Email: {user.email}</h3>
                <h3>Shipping Address: {user.shipping_address}</h3>
                <h3>Order History: </h3>

                {userOrders.length && userOrders.map(userOrder => {
                    return(
                        <NavLink to = {`/orders/${userOrder.orderId}`} key={userOrder.orderId}>
                        <span style={spanStyle}>Order#{userOrder.orderId}</span>
                        <span style={spanStyle}>Placed On: {userOrder.order.createdAt.slice(0,10)}</span>
                        <span style={spanStyle}>Status:{userOrder.order.status}</span>
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
        orderAccessories: orderAcc,
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(UserProfile));