import axios from 'axios'
import store from '../store'
//REDUCER

const initialState = {
  lineItems: []
}

const cartReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case "RECEIVE_LINE_ITEM":
      let duplicate = newState.lineItems.filter(item => item.id === action.lineItem.id)
      if (duplicate.length) {
        duplicate[0].quantity += 1;
        newState.lineItems = [...newState.lineItems];
      }
      else { newState.lineItems = [...newState.lineItems, action.lineItem] }
      break;

    case "RECEIVE_LINE_ITEMS":
      newState.lineItems = action.lineItems
      break;

    case "REMOVE_LINE_ITEM":
      newState.lineItems = newState.lineItems.filter(item => item.id !== action.lineItemId)
      break;

    case "UPDATE_LINE_ITEM":
      let itemToUpdate = newState.lineItems.filter(item => item.id === action.lineItemId)
      itemToUpdate[0].quantity = action.quantity
      newState.lineItems = [...newState.lineItems];
      break;

    default: return state;
    }
  return newState
}

//ACTION CREATORS

export const receiveLineItem = (lineItem) => {
  return {
    type: "RECEIVE_LINE_ITEM",
    lineItem
  }
}

export const receiveLineItems = (lineItems) => {
  return {
    type: "RECEIVE_LINE_ITEMS",
    lineItems
  }
}

export const removeLineItem = (lineItemId) => {
  return {
    type: "REMOVE_LINE_ITEM",
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

export default cartReducer

export const addToCart = (user, selectedProduct) => dispatch => {
  return axios.post(`/api/cart/`, {product: selectedProduct})
    .then(createdLineItem => {
      console.log('createdLineItem inside addToCart', createdLineItem)
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
    .then((newQuantity) => dispatch(updateLineItem(lineItemId, newQuantity.data)))
    .catch(console.error)
}
export const fetchItemsInCart = (orderId) => dispatch => {
  return axios.get(`/api/cart/${orderId}`)
  .then(itemsArr => dispatch(receiveLineItems(itemsArr)))
}
