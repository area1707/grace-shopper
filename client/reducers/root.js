import { combineReducers } from 'redux'
import users from './users'
import cart from './cart'
import accessories from './accessories'
import currentUser from './login'
import reviews from './reviews'
import orderAccessories from './orders'
import cartId from './cartId'

const rootReducer = combineReducers({
  users,
  reviews,
  accessories,
  currentUser,
  cart,
  orderAccessories,
  cartId
})

export default rootReducer
