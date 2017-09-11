const GET_HATS = 'GET_HATS'
const REMOVE_HATS  = 'REMOVE_HATS'
const CREATE     = 'CREATE_hats'
const UPDATE     = 'UPDATE_hats'

const load = hats => ({type: GET_HATS, hats})
const remove = id => ({ type: REMOVE_HAT, id })
const create = hat  => ({ type: CREATE, hat })
const update = hat   => ({ type: UPDATE, hat })

const hatsReducer = function(state=[], action) {
  switch(action.type) {
    case GET_HATS:
      return action.hats
    case REMOVE_HATS:
      return state.filter(hat => hat.id !== action.id)
    case CREATE:
      return [action.hat, ...state]
    case UPDATE:
      return [
        ...state.filter(hat => hat.id !== action.hat.id),
        Object.assign({}, action.hat)
      ]
    default: return state
  }
}

export default hatsReducer
