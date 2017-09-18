import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class UserProfile extends Component {
    constructor(props){
        super(props)

    }

    componentDidMount(){
      //const userOrders = this.props.orderAccessories.orders.filter(order => order.userId == this.props.user.id)
      //console.log('hope this wors', userOrders)
      //console.log('hi', this.props.orderAccessories[0].order)
    }

    render(){  
        const { user, orderAccessories } = this.props
        const userOrders = orderAccessories.length ? orderAccessories.filter(orderAcc => orderAcc.order.userId == user.id) : {}   
        console.log('wtf', userOrders)
        return (
            <div>
                {user && 
                <div>
                    <h1>Hello, {user.name}!</h1>
                    <h3>Email: {user.email}</h3>
                    <h3>Shipping Address: {user.shipping_address}</h3>
                    <h3>Order History: </h3>

                    { /*MAP THRU ORDERACCESSORIES.ORDER 
                    WHERE ORDER.USERID == MATCH PARAM*/}
                </div>
                }
            </div>
        )
    }
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