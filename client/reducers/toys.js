const GET_TOYS = 'GET_TOYS'
const REMOVE_TOYS  = 'REMOVE_TOYS'
const CREATE     = 'CREATE_toys'
const UPDATE     = 'UPDATE_toys'

const load = toys => ({type: GET_TOYS, toys})
const remove = id => ({ type: REMOVE_TOYS, id })
const create = toy  => ({ type: CREATE, toy })
const update = toy   => ({ type: UPDATE, toy })

const toysReducer = function(state=[], action) {
  switch(action.type) {
    case GET_TOYS:
      return action.toys
    case REMOVE_TOYS:
      return state.filter(toy => toy.id !== action.id)
    case CREATE:
      return [action.toy, ...state]
    case UPDATE:
      return [
        ...state.filter(toy => toy.id !== action.toy.id),
        Object.assign({}, action.toy)
      ]
    default: return state
  }
}

export default toysReducer
