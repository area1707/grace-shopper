import axios from 'axios'

// KM/SC -- keep spaces around '=' consistent
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
      return state.map(accessory => accessory.id == action.accessory.id ? action.accessory : accessory)
    default:
      return state
  }
}

export default accessoriesReducer

export const fetchAccessories = () => dispatch => {
  return axios.get('/api/accessories')
    .then(res => res.data)
    .then(accessories => {
      dispatch(load(accessories))
    })
}

// KM/SC -- do axios and THEN dispatch in a '.then', to ensure that it was actually deleted before you delete it from store
export const removeAccessory = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/accessories/${id}`)
    .catch(err => console.error(`Removing accessory: ${id} unsuccessful`, err)); // KM/SC -- consider actually *rendering* your error to the user (Toaster?)
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
