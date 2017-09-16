import React, {Component} from 'react'
import { Grid, Row, Col, Button, FormControl, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateLineItem, removeLineItem, addToCart, fetchItemsInCart} from '../reducers/cart'

class Cart extends Component {

  constructor(props) {
    super(props)
  }
  render() {
  let total = 0
  const {lineItems, handleUpdate, handleRemove} = this.props
  let rows = lineItems && lineItems.map(item => {
    !item.quantity ? item.quantity = 1 : item.quantity
    let price = (item.price * item.quantity).toFixed(2);
    total += +price;

    return (
      <div key={item.id} >
        <Row className="show-grid">
          <Col sm={2} md={2} >
            <Link to={`accessories/${item.id}`}>
              <img className="image-responsive" src={item.imageUrl} />
            </Link>
          </Col>

          <Col sm={5} md={5} >
            <h3>{item.name}</h3>
            <br />
            <Form inline onSubmit={(e) => handleUpdate(e, item.id)}>
              <FormGroup controlId="formInlineName">
                <ControlLabel><h4>Quantity: </h4></ControlLabel>
                {' '}
                <FormControl className="quantity-form" type="text" defaultValue={item.quantity} name="inputField"/>
                <Button type="submit" bsStyle='primary'>Update Cart</Button>
              </FormGroup>
            </Form>
          </Col>

          <Col sm={2} md={2}>
            <h4>${price}
            </h4>
          </Col>
          <br />
          <Button bsStyle='danger' onClick={(e) => handleRemove(e, item.id)}>Remove</Button>

        </Row>
        <hr />
      </div>
    )
  })

  if (!rows.length) {rows = <h4>Add your items!</h4>}
  total = total === 0 ? null : '$' + total.toFixed(2);

  return (
    <Grid className="cart">
      <h1>Your Cart</h1>
      <br />
      <br />
       <Row className="show-grid">
         { rows }
       </Row>
       <Row className="show-grid">
         <Col sm={2} md={2} />
         <Col sm={2} md={5} />
         <Col sm={2} md={2}><h4>{total}</h4></Col>
          <LinkContainer to="/order" >
            <Button bsStyle='info'>
              PROCEED TO CHECKOUT
            </Button>
          </LinkContainer>

       </Row>
    </Grid>
  )
}
}

const mapState = (state) => {
  console.log("state inside Cart component", state)
  return {
    lineItems: state.cart.lineItems
  }
}
// const mapState = {}

const mapDispatch = (dispatch) => {
  return {
    handleRemove: function(e, lineItemId) {
      e.preventDefault();
      axios.delete(`/api/cart/item/${lineItemId}`)
        .then(status => {
          dispatch(removeLineItem(lineItemId))
        })
        .catch(console.error)
    },
    handleUpdate: function(e, lineItemId) {
      e.preventDefault();
      axios.put(`/api/cart/item/${lineItemId}`, {newQuantity: e.target.inputField.value})
        .then((newQuantity) => dispatch(updateLineItem(lineItemId, newQuantity.data)))
        .catch(console.error)
    },
    fetchItems: function(orderId) {
      dispatch(fetchItemsInCart(orderId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Cart))
