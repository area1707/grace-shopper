import { combineReducers } from 'redux'
import glasses from './glasses'
import toys from './toys'
import hats from './hats'
import users from './users'
import accessories from './accessories'
import currentUser from './login'

const rootReducer = combineReducers({
  glasses,
  toys,
  hats,
  users,
  accessories,
  currentUser
})

export default rootReducer
