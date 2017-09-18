import axios from 'axios'
import store from '../store'

const RECEIVE_CART_ID = 'RECEIVE_CART_ID'

const addId = id => ({type: RECEIVE_CART_ID, id})

const idReducer = (state = 0, action) => {
    switch(action.type) {
        case RECEIVE_CART_ID:
            return action.id
        default:
            return state
    }
}

export const addCartId = () => dispatch => {
    return axios.get(`/api/cart/id`) 
        .then(cart => {
            dispatch(addId(cart.data.id))
        })
        .catch(console.error)
}

export default idReducer