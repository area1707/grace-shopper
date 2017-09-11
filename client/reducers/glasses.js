const GET_GLASSES = 'GET_GLASSES'
const REMOVE_GLASSES  = 'REMOVE_GLASSES'
const CREATE     = 'CREATE_GLASSES'
const UPDATE     = 'UPDATE_GLASSES'

const load = glasses => ({type: GET_GLASSES, glasses})
const remove = id => ({ type: REMOVE_GLASSES, id })
const create = glass  => ({ type: CREATE, glass })
const update = glass   => ({ type: UPDATE, glass })

const glassesReducer = function(state=[], action) {
  switch(action.type) {
    case GET_GLASSES:
      return action.glasses
    case REMOVE_GLASSES:
      return state.filter(glass => glass.id !== action.id)
    case CREATE:
      return [action.glass, ...state]
    case UPDATE:
      return [
        ...state.filter(glass => glass.id !== action.glass.id),
        Object.assign({}, action.glass)
      ]
    default: return state
  }
}

export default glassesReducer
