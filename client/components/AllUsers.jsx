import React, { Component } from 'react'
import store from '../store';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers, removeUser } from '../reducers/users'

export class AllUsers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { users } = this.props
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Link to User Order History</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => {
              return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><NavLink to={`/users/${user.id}`}>Order History</NavLink></td>
                <button
                  className="btn btn-default"
                  value={user.id}
                  onClick={() => this.props.handleRemove(user.id)}>
                  <span className="glyphicon glyphicon-minus" />
                </button>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemove: function(id) {
      dispatch(removeUser(id))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUsers));