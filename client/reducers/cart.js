import axios from 'axios'
import store from '../store'

const RECEIVE_LINE_ITEM = 'RECEIVE_LINE_ITEM'
const RECEIVE_LINE_ITEMS  = 'RECEIVE_LINE_ITEMS'
const REMOVE_LINE_ITEM     = 'REMOVE_LINE_ITEM'
const UPDATE_LINE_ITEM     = 'UPDATE_LINE_ITEM'
const CLEAR_CART = 'CLEAR_CART'


const initialState = {
  lineItems: []
}

const cartReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_LINE_ITEM:
      let duplicate = newState.lineItems.filter(item => item.id === action.lineItem.id)
      if (duplicate.length) {
        duplicate[0].quantity = action.quantity
        newState.lineItems = [...newState.lineItems];
      }
      else { newState.lineItems = [...newState.lineItems, action.lineItem] }
      break;

    case RECEIVE_LINE_ITEMS:
      newState.lineItems = action.lineItems
      break;

    case REMOVE_LINE_ITEM:
      newState.lineItems = newState.lineItems.filter(item => item.id !== action.lineItemId)
      break;

    case UPDATE_LINE_ITEM:
      let itemToUpdate = newState.lineItems.filter(item => item.id === action.lineItemId)
      itemToUpdate[0].quantity = action.quantity
      newState.lineItems = [...newState.lineItems]

    case CLEAR_CART:
      return initialState

    default: return state;
    }
  return newState
}

//ACTION CREATORS

export const receiveLineItem = (lineItem, quantity) => {
  return {
    type: RECEIVE_LINE_ITEM,
    lineItem,
    quantity
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
    type: "UPDATE_LINE_ITEM",
    lineItemId,
    quantity
  }
}

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
    initialState
  }
}

export default cartReducer

export const addToCart = (user, selectedProduct, quantity) => dispatch => {
  return axios.post(`/api/cart`, {orderedPrice: selectedProduct.price, accessoryId: selectedProduct.id})
    .then(createdLineItem => {
      console.log('createdLineItem inside reducer', createdLineItem)
      dispatch(receiveLineItem(createdLineItem.data, quantity))
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
    .then((newQuantity) => dispatch(updateLineItem(lineItemId, newQuantity.data)))
    .catch(console.error)
}
export const fetchItemsInCart = () => dispatch => {
  return axios.get(`/api/cart`)
  .then(itemsArr => dispatch(receiveLineItems(itemsArr.data)))
}

export const addAddressToOrder = (cartId, shippingAddress, emailAddress) => dispatch => {
  return axios.put(`/api/cart/${cartId}`, { shippingAddress, emailAddress })
  .then(updatedOrder => {
    dispatch(receiveLineItems([]))})
  .catch(console.error)
}

