import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const load = orderAccessories => ({type: GET_ORDERS, orderAccessories})
//change orders to be orderAccessories
export default function orderReducer(state = [], action){
  switch(action.type){
    case GET_ORDERS:
      return action.orderAccessories
    default:
      return state
  }
}

export function fetchOrderAccessories() {
  return function thunk (dispatch) {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orderAccessories => {
        dispatch(load(orderAccessories))
      })
  }
}