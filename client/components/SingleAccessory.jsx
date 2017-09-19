import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {removeAccessory, updateAccessory} from '../reducers/accessories'
import {receiveLineItem, addToCart, updateLineItem} from '../reducers/cart'
import axios from 'axios'
import store from '../store'

export class SingleAccessory extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      name: this.props.accessory.name,
      image: this.props.accessory.imageUrl,
      price: this.props.accessory.price
    }
    this.removeAccessory = this.removeAccessory.bind(this)
    this.doneEdit = this.doneEdit.bind(this)
    this.clickEdit = this.clickEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.updateAccessoryName = this.updateAccessoryName.bind(this)
    this.updateAccessoryImage = this.updateAccessoryImage.bind(this)
    this.updateAccessoryPrice = this.updateAccessoryPrice.bind(this)
    this.handleCartAdd = this.handleCartAdd.bind(this)
  }

  render() {
    const {accessory, receiveLineItem, user, cart} = this.props
    return (
      <div className="list-group-item min-content accessory-item grey">
        <div className="media">
          <div className="media-left">
            <img src={accessory.imageUrl} height="200" width="400"/>
          </div>
          <div className="media-body">
            <h3 className="media-heading tucked center">
              <span >{accessory.name.toUpperCase()}</span>
            </h3>
            <p>
              <span >{accessory.description}</span>
            </p>
            <p className="">
              <span placeholder="10">Color: {accessory.color}</span>
            </p>
            <p className="">
              <span placeholder="$10">Price: ${accessory.price}</span>
            </p>
            <p className="">
              <span placeholder="10">In store: {accessory.inventory}</span>
            </p>
          </div>
          <div className="media-right media-middle">
             <NavLink to="/cart" onClick={(event) => this.handleCartAdd(event, user, accessory, cart)}>
            <button
                className="btn btn-default"
                value={accessory.id}>
              <span className="glyphicon glyphicon-plus" />
            </button>
          </NavLink>
          </div>
        </div>
      </div>
    );
  }
  removeAccessory(event) {
    const { accessory, removeAccessory } = this.props;
    event.stopPropagation()
    removeAccessory(accessory.id)
  }
  clickEdit(event) {
    this.setState({isEditing: true})
  }
  updateAccessoryName(event) {
    const name = event.target.value
    return this.setState({name})
  }
  updateAccessoryImage(event) {
    const image = event.target.value
    return this.setState({image})
  }
  updateAccessoryPrice(event) {
    const price = event.target.value
    return this.setState({price})
  }
  doneEdit(event) {
    const {accessory, updateAccessory} = this.props
    event.preventDefault()
    updateAccessory(accessory.id, {
      name: this.state.name,
      image: this.state.imageUrl,
      price: this.state.price
    })
    this.setState({isEditing: false})
  }
  cancelEdit(event) {
    return this.setState({isEditing: false})
  }
  handleCartAdd(event, user, selectedProduct, cart) {
    e.preventDefault()
    this.props.addToCart(user, selectedProduct)
  }
}

const mapState = ({accessories, user, cart}) => ({accessories, user, cart})
const mapDispatch = {removeAccessory, updateAccessory, receiveLineItem, addToCart, updateLineItem}

const SingleAccessoryContainer = withRouter(connect(mapState, mapDispatch)(SingleAccessory))
export default SingleAccessoryContainer
