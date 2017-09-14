import axios from 'axios'
import history from '../components/history'
import { receiveLineItems } from './cart';

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const signup = (username, password) =>
  dispatch =>
    axios.post('/signup',
      {username, password})
      .then(() => dispatch(me()))
      .then((user) => history.push('/'))
      .catch(() => dispatch(me()))

export const login = (username, password) =>
  dispatch =>
    axios.post('/login',
      {username, password})
      .then(() => dispatch(me()))
      .then(() => history.push('/'))
      .catch(() => dispatch(me()))

export const logout = () =>
  dispatch =>
    axios.post('/logout')
      .then(() => dispatch(me()))
      .then(() => history.push('/'))
      .catch(() => dispatch(me()))

export const me = () =>
  dispatch =>
    axios.get('/me')
      .then(response => {
        const user = response.data
        console.log('user inside auth reducer', user)
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
