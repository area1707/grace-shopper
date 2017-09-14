import axios from 'axios'

const GET_REVIEWS = 'GET_REVIEWS'
const REMOVE_REVIEWS  = 'REMOVE_REVIEWS'
const CREATE     = 'CREATE_REVIEWS'
const UPDATE     = 'UPDATE_REVIEWS'

const load = reviews => ({type: GET_REVIEWS, reviews})
const remove = id => ({ type: REMOVE_REVIEWS, id })
const create = review  => ({ type: CREATE, review })
const update = review   => ({ type: UPDATE, review })


const reviewReducer = function(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case REMOVE_REVIEWS:
      return state.filter(review => review.id !== action.id)
    case CREATE:
      return [action.review, ...state]
    case UPDATE:
      return [
        ...state.filter(review => review.id !== action.review.id),
        Object.assign({}, action.review)
      ]
    default: return state
  }
}

export default reviewReducer

export function fetchReviews() {
  return function thunk (dispatch) {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => {
        dispatch(load(reviews))
      })
  }
}

export const removeReview = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/reviews/${id}`)
       .catch(err => console.error(`Removing review: ${id} unsuccessful`, err));
}

export const addReview = review => dispatch => {
  axios.post('/api/reviews', review)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating review: ${review} unsuccesful`, err))
}

export const updateReview = (id, review) => dispatch => {
  axios.put(`/api/reviews/${id}`, review)
       .then(res => {
         dispatch(update(res.data))
       })
       .catch(err => console.error(`Updating review: ${review} unsuccessful`, err))
}
