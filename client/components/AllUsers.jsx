import React, { Component } from 'react'
import store from '../store';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers } from '../reducers/users'

export class AllUsers extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   store.dispatch(fetchUsers())
  // }

  render() {
    console.log('WHERE MA USERS AT', this.props)
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
              <tr>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><NavLink to={`/users/${user.id}`}>OrderHistory</NavLink></td>
              </tr>
              )
            })}
            {/* <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
      users: state.users
  }
}

export default withRouter(connect(mapStateToProps)(AllUsers));