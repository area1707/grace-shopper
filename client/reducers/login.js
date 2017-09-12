import axios from 'axios';
import history from '../components/history'

const LOGIN_USER = 'LOGIN_USER';
const CREATE_USER = 'CREATE_USER';
const INITIAL_USER = "INITIAL_USER";

const loginUser = user  => ({ type: LOGIN_USER, user });
const createUser = user => ({ type: CREATE_USER, user });
const initialUser = user => ({ type: INITIAL_USER, user});

export default function loginReducer(currentUser={}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    case CREATE_USER:
      return action.user
    case INITIAL_USER:
      return action.user
    default:
      return currentUser
  }
}

export const fetchCurrentUser = () => dispatch => {
  axios.get('/api/users/me')
      .then(res => dispatch(initialUser(res.data)));
}

export function verifyUser(user) {
  return function thunk(dispatch) {
    return axios.post('/api/users/login', user)
    .then(res => res.data)
    .then(currentUser => {
      console.log('currentUser', currentUser)
      dispatch(loginUser(currentUser))
      history.push(`/users/${currentUser.id}`)
    })
    .catch(console.error)
  }
}

export function createNewUser(user) {
  return function thunk(dispatch) {
    return axios.post('/api/users/signup', user)
    .then(res => res.data)
    .then(newUser => {
      console.log('got back new user!', newUser);
      dispatch(createUser(newUser));
      history.push(`/users/${newUser.id}`);
    })
    .catch(console.error)
  }
}
