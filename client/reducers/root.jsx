import { combineReducers } from 'redux'
import glasses from './glasses'
import toys from './toys'
import hats from './hats'
import users from './users'

const rootReducer = combineReducers({
  glasses,
  toys,
  hats,
  users
})

export default rootReducer
