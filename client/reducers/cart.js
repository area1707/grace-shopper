export const ADD_TO_CART = 'ADD_TO_CART'
//cart = [{item, quantity}, {item, quantity}]
export default function cart (state=[], action) {
  switch (action.type) {
    case ADD_TO_CART:
      // return [...state, action.item]
      return [...state, {"item": action.item, "quantity": action.quantity}]
    default: return state;
  }
}

const addItemToCart = (item, quantity) => ({
  type: ADD_TO_CART,
  item,
  quantity
})

export const addItem = (item, quantity) => dispatch => {
  dispatch(addItemToCart(item, quantity))
}

export const updateQuantity = (idx, quantity) => dispatch => {
  
}
