// OB/SRC: consistent file naming (why is this one .jsx and the others aren't)
import { combineReducers } from 'redux'
import glasses from './glasses'
import toys from './toys'
import hats from './hats'
import users from './users'
import cart from './cart'
import accessories from './accessories'
import currentUser from './login'

const rootReducer = combineReducers({
  glasses,
  toys,
  hats,
  users,
  accessories,
  currentUser,
  cart
})

export default rootReducer
