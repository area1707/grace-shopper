import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function UserProfile(props) {

        const { user } = props
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


const mapStateToProps = function (state, ownProps) {
    const userId = Number(ownProps.match.params.userId)
    const selectedUser = state.users.filter(user => user.id == userId)[0]
    return {
        user: selectedUser
    }
}

export default withRouter(connect(mapStateToProps)(UserProfile));