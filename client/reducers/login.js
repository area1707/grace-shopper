import axios from 'axios';
const LOGIN_USER = 'LOGIN_USER'
const CREATE_USER = 'CREATE_USER'
const INITIAL_USER = 'INITIAL_USER'
const LOG_OUT = 'LOG_OUT'

const loginUser = user  => ({ type: LOGIN_USER, user })
const createUser = user => ({ type: CREATE_USER, user })
const initialUser = user => ({ type: INITIAL_USER, user})
const logOut = user => ({ type: LOG_OUT, user})

export default function loginReducer(currentUser={}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    case CREATE_USER:
      return action.user
    case INITIAL_USER:
      return action.user
    case LOG_OUT:
      return {}
    default:
      return currentUser
  }
}

export const fetchCurrentUser = () => dispatch => {
  axios.get('/auth/me')
    .then(res => {
      dispatch(initialUser(res.data))
    })
    .catch(console.error)
}

export const verifyUser = (user) => dispatch => {
  return axios.post('/auth/login', user)
  .then(res => res.data)
  .then(currentUser => {
    dispatch(loginUser(currentUser))
  })
  .catch(console.error)
}

export const createNewUser = (user) => dispatch => {
  return axios.post('/auth/signup', user)
  .then(res => res.data)
  .then(newUser => {
    dispatch(createUser(newUser));
  })
  .catch(console.error)
}

export const logUserOut = (user) => dispatch => {
  return axios.get('/auth/logout')
    .then(() => {
      console.log('You signed out.')
      dispatch(logOut(user))
    })
}
