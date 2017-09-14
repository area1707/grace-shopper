import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {removeAccessory, addAccessory} from '../reducers/accessories'
import Home from './Home'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.updateQuantity = this.updateQuantity.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.calculateSubTotal = this.calculateSubTotal.bind(this)
  }
  render() {
    const {accessories, cart} = this.props
    console.log('cart', cart)
    if (!cart.length) {
      return(
        <div>
          <h3>Add Items to your cart!</h3>
          <Home />
        </div>
      )
    }
    return(
      <table className="table">
        <thead>
          <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
          </tr>
        </thead>
        <tbody className="container">
          {
            cart.map((itemDetails) => (
              <tr>
                <th key={itemDetails.item.name}>
                  {itemDetails.item.name}
                </th>
                <th>
                <input
                  name="quantity"
                  type="text"
                  required
                  className="form-like"
                  value={this.state.quantity}
                  onChange={this.updateQuantity}
                />
                </th>
                <th key={itemDetails.item.price}>
                  {itemDetails.item.price}
                </th>
                <th>
                  {this.calculateTotal(itemDetails.item.price, this.state.quantity)}
                </th>
              </tr>
            ))
          }
          <tr>
            <th></th>
            <th></th>
            <th>SubTotal</th>
            <th>{this.calculateSubTotal(cart)}</th>
          </tr>
        </tbody>
      </table>
    )
  }
  updateQuantity(event) {
    const quantity = event.target.value
    this.setState({quantity})
    // return quantity
  }
  calculateTotal(price, quantity) {
    return price * quantity
  }
  calculateSubTotal(cart) {
    let priceArr = []
    priceArr = cart.map(item => item.item.price)
    let sum = priceArr.reduce((sum, currVal) => (sum + currVal))
    return sum
  }
}

const mapState = ({accessories, cart}) => ({accessories, cart})
const mapDispatch = {removeAccessory, addAccessory};

export default withRouter(connect(mapState, mapDispatch)(Cart))
