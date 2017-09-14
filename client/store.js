import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/root'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {me} from './reducers/auth'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
export default store

//set the auth info at start
store.dispatch(me())
