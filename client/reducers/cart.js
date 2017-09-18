import axios from 'axios'
import store from '../store'
import _ from 'lodash'

const CREATE_LINE_ITEM = 'CREATE_LINE_ITEM'
const RECEIVE_LINE_ITEMS  = 'RECEIVE_LINE_ITEMS'
const REMOVE_LINE_ITEM     = 'REMOVE_LINE_ITEM'
const UPDATE_LINE_ITEM     = 'UPDATE_LINE_ITEM'

const cartReducer = (state = [], action) => {

  switch (action.type) {
    case CREATE_LINE_ITEM:
      return [action.lineItem, ...state]

    case RECEIVE_LINE_ITEMS:
      return action.lineItems

    case REMOVE_LINE_ITEM:
      return state.filter(item => item.accessory.id !== action.lineItemId)

    case UPDATE_LINE_ITEM:
      let newState = state
      newState.forEach(item => {
        if (action.lineItemId === item.accessory.id) {
          item.quantity = action.quantity
        }
      })
      return newState

    default: 
      return state
  }
}

//ACTION CREATORS

export const receiveLineItem = (lineItem) => {
  return {
    type: CREATE_LINE_ITEM,
    lineItem
  }
}

export const receiveLineItems = (lineItems) => {
  return {
    type: RECEIVE_LINE_ITEMS,
    lineItems
  }
}

export const removeLineItem = (lineItemId) => {
  return {
    type: REMOVE_LINE_ITEM,
    lineItemId
  }
}

export const updateLineItem = (lineItemId, quantity) => {
  return {
    type: UPDATE_LINE_ITEM,
    lineItemId,
    quantity
  }
}

export default cartReducer

export const addToCart = (user, selectedProduct) => dispatch => {
  return axios.post(`/api/cart`, {orderedPrice: selectedProduct.price, accessoryId: selectedProduct.id})
    .then(createdLineItem => {
      dispatch(receiveLineItem(createdLineItem.data))
    })
    .catch(console.error)
}

export const removeFromCart = (lineItemId) => dispatch => {
  return axios.delete(`/api/cart/item/${lineItemId}`)
    .then(status => dispatch(removeLineItem(lineItemId)))
    .catch(console.error)
}

export const updateQuantity = (lineItemId, quantity) => dispatch => {
  return axios.put(`/api/cart/item/${lineItemId}`, {newQuantity: quantity})
    .then((newQuantity) => {
      dispatch(updateLineItem(lineItemId, newQuantity.data))
    })
    .catch(console.error)
}
export const fetchItemsInCart = () => dispatch => {
  return axios.get(`/api/cart`)
  .then(itemsArr => {
    dispatch(receiveLineItems(itemsArr.data))
  })
}

export const addAddressToOrder = (cartId, shippingAddress, emailAddress) => dispatch => {
  return axios.put(`/api/cart/${cartId}`, { shippingAddress, emailAddress })
  .then(updatedOrder => {
    dispatch(receiveLineItems([]))})
  .catch(console.error)
}

