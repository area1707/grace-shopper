import React, { Component } from 'react'
import store from '../store';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSingleUser } from '../reducers/users'

class UserProfile extends Component {
    render() {
        const { user } = this.props
        return (
            <div>
                {!!user && 
                <div>
                    <h1>Hello, {user.name}!</h1>
                    <h3>Email: {user.email}</h3>
                    <h3>Shipping Address: {user.shipping_address}</h3>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    const userId = Number(ownProps.match.params.userId)
    const selectedUser = state.users.filter(user => user.id == userId)[0]
    return {
        user: selectedUser
    }
}

export default withRouter(connect(mapStateToProps)(UserProfile));