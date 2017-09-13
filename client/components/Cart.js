import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {removeAccessory, addAccessory} from '../reducers/accessories'

class Cart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {accessories, cart} = this.props
    return(
      <table className="table">
        <thead>
          <tr>
              <th>Product</th>
              <th>Quantiy</th>
              <th>Price</th>
              <th>Total</th>
          </tr>
        </thead>
        <tbody className="container">
          {
            cart.map((item, idx) => (
              <tr>
                <th key={item.name}>
                  {item.name}
                </th>
                <th>
                  1
                </th>
                <th key={item.price}>
                  {item.price}
                </th>
                <th>
                  {item.price}
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

const mapState = ({accessories, cart}) => ({accessories, cart})
const mapDispatch = {removeAccessory, addAccessory};

export default withRouter(connect(mapState, mapDispatch)(Cart))
