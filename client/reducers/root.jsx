import { combineReducers } from 'redux'
import glasses from './glasses'
import toys from './toys'
import hats from './hats'
import users from './users'
import cart from './cart'
import accessories from './accessories'
import currentUser from './login'
import user from './auth'

const rootReducer = combineReducers({
  glasses,
  toys,
  hats,
  users,
  accessories,
  currentUser,
  cart,
  user
})

export default rootReducer
