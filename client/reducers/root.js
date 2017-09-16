import { combineReducers } from 'redux'
import glasses from './glasses'
import toys from './toys'
import hats from './hats'
import users from './users'
import cart from './cart'
import accessories from './accessories'
import currentUser from './login'
import reviews from './reviews'
import orders from './orders'

const rootReducer = combineReducers({
  glasses,
  toys,
  hats,
  users,
  reviews,
  accessories,
  currentUser,
  cart,
  orders
})

export default rootReducer
