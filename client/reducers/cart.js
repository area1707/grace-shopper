import axios from 'axios'
import store from '../store'

const RECEIVE_LINE_ITEM = 'RECEIVE_LINE_ITEM'
const RECEIVE_LINE_ITEMS  = 'RECEIVE_LINE_ITEMS'
const REMOVE_LINE_ITEM     = 'REMOVE_LINE_ITEM' // KM/SC -- make '=' spacing consistent
const UPDATE_LINE_ITEM     = 'UPDATE_LINE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

// KM/SC -- If not already doing so, change the reducer to only be looking at the array rather than object with array within it.
const initialState = {
  lineItems: []
}

const cartReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_LINE_ITEM: // KM/SC -- can simplify this when initialState is only an array rather than object with array inside it.
      let duplicate = newState.lineItems.filter(item => item.id === action.lineItem.id) // KM/SC -- consider 'find' rather than 'filter'.
      if (duplicate.length) {
        duplicate[0].quantity = action.quantity
        newState.lineItems = [...newState.lineItems];
      }
      else { newState.lineItems = [...newState.lineItems, action.lineItem] }
      break; // KM/SC -- watch semicolons

    case RECEIVE_LINE_ITEMS:
      newState.lineItems = action.lineItems
      break;

    case REMOVE_LINE_ITEM:
      newState.lineItems = newState.lineItems.filter(item => item.id !== action.lineItemId)
      break;

    // KM/SC -- remove this - duplicate of case above!
    case REMOVE_LINE_ITEM:
      newState.lineItems = newState.lineItems.filter(item => item.id !== action.lineItemId)

    case UPDATE_LINE_ITEM:
      let itemToUpdate = newState.lineItems.filter(item => item.id === action.lineItemId)
      itemToUpdate[0].quantity = action.quantity
      newState.lineItems = [...newState.lineItems]
      // KM/SC -- Make sure you 'break' here, as you did in the other cases.

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
    // KM/SC -- make sure types are variables rather than strings (also, consistent quotes).
    type: "UPDATE_LINE_ITEM",
    lineItemId,
    quantity
  }
}

export const clearCart = () => {
  return {
    // KM/SC -- make sure types are variables rather than strings.
    type: 'CLEAR_CART',
    initialState
  }
}

export default cartReducer

export const addToCart = (user, selectedProduct, quantity) => dispatch => {
  return axios.post(`/api/cart`, {orderedPrice: selectedProduct.price, accessoryId: selectedProduct.id})
    .then(createdLineItem => {
      console.log('createdLineItem inside reducer', createdLineItem) // KM/SC -- make sure you remove console.logs from master
      dispatch(receiveLineItem(createdLineItem.data, quantity))
    })
    .catch(console.error) // KM/SC -- Consider either having consistent error handling strategy, or giving specific message to user (Lower-priority suggestion)
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

// KM/SC -- Consider changing name of this thunk to something like 'Checkout', since you're doing more than just adding address.
export const addAddressToOrder = (cartId, shippingAddress, emailAddress) => dispatch => {
  return axios.put(`/api/cart/${cartId}`, { shippingAddress, emailAddress })
  .then(updatedOrder => {
    dispatch(receiveLineItems([]))}) // KM/SC -- Consider having an actual action creator called 'clearCart' for clarity, though this is ok, too.
  .catch(console.error)
}

