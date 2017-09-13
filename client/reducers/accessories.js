import axios from 'axios'

const GET_ACCESSORIES = 'GET_ACCESSORIES'
const REMOVE_ACCESSORIES  = 'REMOVE_ACCESSORIES'
const CREATE     = 'CREATE_ACCESSORIES'
const UPDATE     = 'UPDATE_ACCESSORIES'

const load = accessories => ({type: GET_ACCESSORIES, accessories})
const remove = id => ({ type: REMOVE_ACCESSORIES, id })
const create = accessory  => ({ type: CREATE, accessory })
const update = accessory   => ({ type: UPDATE, accessory })


const accessoriesReducer = function(state=[], action) {
  switch(action.type) {
    case GET_ACCESSORIES:
      return action.accessories
    case REMOVE_ACCESSORIES:
      return state.filter(accessory => accessory.id !== action.id)
    case CREATE:
      return [action.accessory, ...state]
    case UPDATE:
      return [
        ...state.filter(accessory => accessory.id !== action.accessory.id),
        Object.assign({}, action.accessory)
      ]
    default: return state
  }
}

export default accessoriesReducer

export function fetchAccessories() {
  return function thunk (dispatch) {
    return axios.get('/api/accessories')
      .then(res => res.data)
      .then(accessories => {
        dispatch(load(accessories))
      })
  }
}

export const removeAccessory = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/accessories/${id}`)
       .catch(err => console.error(`Removing accessory: ${id} unsuccessful`, err));
}

export const addAccessory = accessory => dispatch => {
  axios.post('/api/accessories', accessory)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating accessory: ${accessory} unsuccesful`, err))
}

export const updateAccessory = (id, accessory) => dispatch => {
  axios.put(`/api/accessories/${id}`, accessory)
       .then(res => {
         dispatch(update(res.data))
       })
       .catch(err => console.error(`Updating accessory: ${accessory} unsuccessful`, err))
}
