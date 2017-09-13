export const ADD_TO_CART = 'ADD_TO_CART'

export default function cart (state=[], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.item]
    default: return state;
  }
}

const addItemToCart = item => ({
  type: ADD_TO_CART,
  item
})

export const addItem = item => dispatch => {
  dispatch(addItemToCart(item))
}
